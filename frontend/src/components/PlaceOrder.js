import React, { Component } from 'react'
import { Button, Card, Container, Table, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SelectSearch, { fuzzySearch } from 'react-select-search'
import DateTimePicker from 'react-datetime-picker'
import Swal from 'sweetalert2'

export class PlaceOrder extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loginYet: false,
            cart: [],
            cid: null,
            eid: null,
            cname: null,
            coupon: null,
            shiptime: null,
            address: [],
            addressInfo: [],
            addressValue: null,
        }
        axios.get('/login').then(res => {
            if (res.data.session?.user) {
                this.setState({ loginYet: true })
            }
        })

    }

    componentDidMount() {
        axios.get('/login').then(async res => {
            if (res.data.session?.user) {
                if (res.data.session?.order) {
                    const order = res.data.session.order
                    this.state.cart = order.cart
                    this.state.eid = order.eid
                    await this.setState({ cid: order.cid })
                    this.customerName()
                    this.employeeName()
                    this.setAddress()
                }
            }
        })
    }

    itemDisplay = () => {
        return this.state.cart.map((item, i) => {
            return (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td id={`price-${item.pid}`}>{parseFloat(item.price).toFixed(2)} ฿</td>
                    <td>{item.amount}</td>
                </tr>
            )
        })
    }

    setAddress = async () => {
        if (this.state.cid == null) {
            return
        }
        let address = []
        await axios.get('/customer/editAddress', { params: { cid: this.state.cid } }).then(res => {
            const addressInfo = res.data.addressInfo
            addressInfo.map((el, i) => {
                address[i] = {
                    name: el.Address,
                    value: el.CAddrID,
                }
                if (i == 0) {
                    this.state.addressValue = el.CAddrID
                }
            })
            this.state.addressInfo = addressInfo
        })
        this.setState({ address })
        address = this.state.addressInfo[0]
        document.getElementById('Address').value = address.Address
        document.getElementById('City').value = address.City
        document.getElementById('Province').value = address.Province
        document.getElementById('PostalCode').value = address.PostalCode
        document.getElementById('Country').value = address.Country

    }

    customerName = async () => {
        if (this.state.cid == null) {
            return
        }
        let name
        await axios.get('/customer/editProfile', { params: { cid: this.state.cid } }).then(res => {
            const customer = res.data.customerInfo
            if (!customer.MiddleName) {
                name = customer.FirstName + " " + customer.LastName
                return
            }
            name = customer.FirstName + ' ' + customer.MiddleName + ' ' + customer.LastName
        })

        this.setState({ cname: name })
    }

    employeeName = async () => {
        if (this.state.eid == null) {
            return
        }
        let name
        await axios.get('/login').then(res => {
            name = res.data.session.user.name
            console.log(res.data.session)
        })
        this.setState({ ename: name })
    }

    SubTotal = () => {
        let subtotal = 0
        this.state.cart.map(el => {
            subtotal += el.price
        })
        return subtotal
    }

    Discount = () => {
        const coupon = this.state.coupon || null
        let discount = 0
        if (coupon != null) {
            this.state.cart.map((el, i) => {
                if (coupon.PID == el.pid) {
                    discount = (el.price * coupon.Discount / 100)
                    document.getElementById(`price-${el.pid}`).innerHTML = `<span id='discount-price' name='${el.pid}'
                                                                                    style="color:red">
                                                                    ${parseFloat(el.price - discount).toFixed(2)} 
                                                                ฿</span>`
                }
            })
        }
        return discount
    }

    Tax = () => {
        const tax = 0.07
        return ((this.SubTotal() - this.Discount()) * tax)
    }

    Total = () => {
        return (this.Tax() + this.SubTotal() - this.Discount())
    }

    Point = () => {
        return parseInt(this.Total() / 100 * 3)
    }

    setCoupon = () => {
        axios.post('/placeOrder/checkCoupon', {
            code: document.getElementById('coupon-code').value
        }).then(res => {
            if (res.data.coupon == null) {
                Swal.fire(
                    'Coupon not found',
                    'Please try again...',
                    'error'
                )
            }
            this.setState({ coupon: res.data.coupon })
        })
    }

    clearCoupon = () => {
        this.setState({ coupon: null })
        let box = document.getElementById('discount-price')
        let price
        this.state.cart.map(el => {
            if (el.pid == box.getAttribute('name')) {
                price = el.price
            }
        })
        box.style = "color:black"
        box.innerHTML = `${price} ฿`
        document.getElementById('coupon-code').value = ""
    }

    updateAddress = (e) => {
        this.setState({ addressValue: e })
        let address
        this.state.addressInfo.map(el => {
            if (el.CAddrID == e) {
                address = el
            }
        })
        document.getElementById('Address').value = address.Address
        document.getElementById('City').value = address.City
        document.getElementById('Province').value = address.Province
        document.getElementById('PostalCode').value = address.PostalCode
        document.getElementById('Country').value = address.Country
    }

    Submit = () => {

        let eid = this.state.eid
        let cid = this.state.cid
        let address = this.state.addressValue

        const subtotal = this.SubTotal()
        const discount = this.Discount()
        const tax = this.Tax()
        const total = this.Total()
        const points = this.Point()

        let cart = this.state.cart

        if (this.Discount() != 0) {
            const box = document.getElementById('discount-price')

            cart.map((el, i) => {
                if (el.pid == box?.getAttribute('name')) {
                    cart[i].price -= this.Discount()
                }
            })
        }

        const shiptime = this.state.shiptime

        const coupon = this.state.coupon

        axios.post('/placeOrder/submitOrder', {
            eid, cid, address, subtotal, discount, tax, total, points, shiptime, coupon, cart
        }).then(res => {

        })

    }

    render() {

        if (this.state?.loginYet === true) {
            return (
                <Container fluid>
                    <Row>
                        <Col sm={6}>
                            <Card>
                                <Card.Header>
                                    <Row>
                                        <Col sm={6}>
                                            <Button variant="outline-dark">CUSTOMER : </Button>
                                            <Button variant="dark">{this.state?.cname}</Button>
                                        </Col>
                                        <Col sm={6}>
                                            <Button variant="outline-dark">EMPLOYEE : </Button>
                                            <Button variant="dark">{this.state?.ename}</Button>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.itemDisplay()}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                                <Card.Footer>
                                    <Table style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                                        <thead>
                                            <tr>
                                                <th><Button variant="info">SUBTOTAL</Button></th>
                                                <th><Button variant="warning" style={{ color: "#fff", background: "#d1b02e" }}>DISCOUNTED</Button></th>
                                                <th><Button variant="danger">TAX</Button></th>
                                                <th><Button variant="success">TOTAL</Button></th>
                                                <th><Button variant="primary">POINTS</Button></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style={{ fontWeight: "bold" }}>
                                                <td>{parseFloat(this.SubTotal()).toFixed(2)}</td>
                                                <td>{parseFloat(this.Discount()).toFixed(2)}</td>
                                                <td>{parseFloat(this.Tax()).toFixed(2)}</td>
                                                <td>{parseFloat(this.Total()).toFixed(2)}</td>
                                                <td>{this.Point()}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col sm={6}>
                            <Card>
                                <Card.Header>

                                </Card.Header>
                                <Card.Body>

                                    <Col sm={7}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>COUPON</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <div style={{ width: "53%" }}><FormControl autoComplete="off" id="coupon-code"></FormControl></div>
                                            <Button onClick={() => this.setCoupon()} variant="success">✓</Button>
                                            <Button onClick={() => this.clearCoupon()} variant="danger">X</Button>
                                        </InputGroup>
                                    </Col>

                                    <Col sm={7} style={{ marginTop: "10px" }}>

                                        <div style={{ marginBottom: "10px" }}>

                                            <SelectSearch search
                                                onChange={(e) => this.updateAddress(e)}
                                                emptyMessage="Result not found"
                                                defaultValue={0}
                                                options={this.state.address}
                                                filterOptions={fuzzySearch}
                                            />
                                        </div>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Address</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <div style={{ width: "72%" }}><FormControl id="Address" disabled autoComplete="off" /></div>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>City</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <div style={{ width: "72%" }}><FormControl id="City" disabled autoComplete="off" /></div>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Province</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <div style={{ width: "72%" }}><FormControl id="Province" disabled autoComplete="off" /></div>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Postal</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <div style={{ width: "72%" }}><FormControl id="PostalCode" disabled autoComplete="off" /></div>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Country</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <div style={{ width: "72%" }}><FormControl id="Country" disabled autoComplete="off" /></div>
                                        </InputGroup>
                                    </Col>

                                    <Col sm={7} style={{ marginTop: "10px" }}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>SHIP TIME</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <div style={{ marginRight: "10px" }}></div>
                                            <DateTimePicker
                                                dayPlaceholder="dd"
                                                monthPlaceholder="mm"
                                                yearPlaceholder="yyyy"
                                                format="dd/MM/y h:mm:ss a"
                                                onChange={(e) => this.setState({ shiptime: e })}
                                                value={this.state.shiptime}
                                            />
                                        </InputGroup>
                                    </Col>
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="success" onClick={() => this.Submit()}>SUBMIT</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )
        } else {
            return (
                <div style={{ margin: "20px" }}>
                    <h2>Sorry.. This page is only for our employee!</h2>
                    <Link to="/"><Button>GO BACK</Button></Link>
                </div>
            );
        }
    }
}

export default PlaceOrder
