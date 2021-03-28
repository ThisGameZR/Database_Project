import React, { Component } from 'react'
import {Button, Card, Container, Table,Row,Col, InputGroup, FormControl} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'

export class PlaceOrder extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            loginYet:false,
            cart:[],
            cid: null,
            eid: null,
            cname: null,
            tempcart: [],
            coupon: null,
        }
        axios.get('/login').then(res => {
            if(res.data.session?.user){
                this.setState({loginYet : true})
            }
        })
        
    }

    componentDidMount(){
        axios.get('/login').then(async res => {
            if (res.data.session?.user) {
                if (res.data.session?.order) {
                    const order = res.data.session.order
                    this.state.cart = order.cart
                    this.state.tempcart = order.cart
                    this.state.eid = order.eid
                    await this.setState({ cid: order.cid })
                    this.customerName()
                    this.employeeName()
                }
            }
        })
    }

    itemDisplay = () => {
        return this.state.cart.map((item, i) => {
            return (
                <tr key={i}>
                        <td>{i+1}</td>
                        <td>{item.name}</td>
                        <td id={`price-${item.pid}`}>{parseFloat(item.price).toFixed(2)} ฿</td>
                        <td>{item.amount}</td>
                </tr> 
            )
        })  
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
        
        this.setState({cname: name})
    }

    employeeName = async () => {
        if (this.state.eid == null) {
            return
        }
        let name 
        await axios.get('/login').then(res => {
            const session = res.data.session.user
            if (!session.middlename) {
                name = session.firstname + ' ' + session.lastname
                return
            }
            name = session.firstname + ' ' + session.middlename + ' ' + session.lastname
        })
        
        this.setState({ename: name})
    }

    SubTotal = () => {
        let subtotal = 0
        this.state.cart.map( el => {
            subtotal += el.price
        })
        return subtotal
    }

    Discount = () => {
        const coupon = this.state.coupon || null
        let discount = 0
        if (coupon != null) {
            this.state.cart.map((el,i) => {
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
        return parseInt( this.Total() / 100 * 3 )
    }

    setCoupon = () => {
        axios.post('/placeOrder/checkCoupon', {
            code: document.getElementById('coupon-code').value
        }).then(res => {
            this.setState({coupon: res.data.coupon})
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


    render() {

        if(this.state?.loginYet === true){
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
                                <Table style={{justifyContent:"center",alignItems:"center",textAlign:"center"}}>
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
                                        <tr style={{fontWeight:"bold"}}>
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
                                    <Row sm={8}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>COUPON</InputGroup.Text>
                                            </InputGroup.Prepend>
                                                <FormControl id="coupon-code"></FormControl>
                                                <Button onClick={() => this.setCoupon()}>CHECK</Button>
                                                <Button onClick={() => this.clearCoupon()} variant="danger">X</Button>
                                        </InputGroup>
                                    </Row>
                                    <Row>
                                        
                                    </Row>
                                </Card.Body>
                                <Card.Footer>

                                </Card.Footer>
                            </Card>
                    </Col>
                    </Row>
                </Container>
            )
        }else{
            return(
                <div style={{margin:"20px"}}>
                    <h2>Sorry.. This page is only for our employee!</h2>
                    <Link to="/"><Button>GO BACK</Button></Link>
                </div>
            );
        }
    }
}

export default PlaceOrder
