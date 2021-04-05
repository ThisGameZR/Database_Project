import axios from 'axios'
import React, { Component } from 'react'
import { Button, Container, Table, InputGroup, FormControl } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import DatePicker from './DatePicker'
import { FaTrashAlt } from 'react-icons/fa'

const ReactSwal = withReactContent(Swal)

export class Coupon extends Component {

    constructor(props) {
        super(props)

        this.state = {
            coupon: [],
            expiretime: null,
        }
        this.setCoupon()
    }

    componentDidUpdate(prevProps) {
        if (this.props.onChange != prevProps.onChange) {
            this.setCoupon()
        }
    }

    setCoupon() {
        axios.get('/products/coupon').then(res => {
            this.setState({ coupon: res.data })
        })
    }

    renderCoupon = () => {

        return this.state.coupon?.map((el, i) => {
            return (
                <tr key={i}>
                    <td>
                        <Button variant="danger" style={{ width: "100%" }}
                            onClick={() => this.editCoupon(el.Code, "Code")}>
                            {el.Code}
                        </Button>
                    </td>
                    <td>
                        <Button variant="primary" style={{ width: "100%" }}
                            onClick={() => this.editCoupon(el.Code, "PID")}>
                            {el.PID}
                        </Button>
                    </td>
                    <td>{el.ProductName}</td>
                    <td>
                        <Button variant="success" style={{ width: "100%" }}
                            onClick={() => this.editCoupon(el.Code, "Discount")}>
                            {el.Discount} %
                        </Button>
                    </td>
                    <td>
                        <Button variant="info" style={{ width: "100%" }}
                            onClick={() => this.editCoupon(el.Code, "ExpiredDate")}>
                            {new Date(el.ExpiredDate).toLocaleString()}
                        </Button>
                    </td>
                    <td>
                        <Button variant="warning" style={{ width: "100%", fontWeight: "bold" }}
                            onClick={() => this.editCoupon(el.Code, "Available_number")}>
                            {el.Available_number}
                        </Button>
                    </td>
                    <td><Button variant="danger" style={{ width: "100%" }}><FaTrashAlt /></Button></td>
                </tr>
            )
        })
    }

    editCoupon = (code, type) => {

        if (type != "ExpiredDate") {
            Swal.fire({

                title: 'Enter new value',
                icon: 'info',
                input: 'text',
                showCancelButton: true,
                showLoaderOnConfirm: true,
                preConfirm: (value) => {

                    axios.post('/products/editCoupon', {
                        value, code, type
                    }).then(res => {

                        Swal.fire({
                            title: `${res.data.status.toUpperCase()}`,
                            text: `${res.data.message}`,
                            icon: res.data.status,
                        })

                        this.setCoupon()
                    })
                }
            })
        } else {

            ReactSwal.fire({

                title: 'Select Date',
                html: (<DatePicker onChangeValue={(value) => this.setState({ expiretime: new Date(value) })} />),
                icon: 'info',
                showCancelButton: true,
                showLoaderOnConfirm: true,
                preConfirm: () => {

                    axios.post('/products/editCoupon', {
                        value: this.state.expiretime, code, type
                    }).then(res => {

                        Swal.fire({
                            title: `${res.data.status.toUpperCase()}`,
                            text: `${res.data.message}`,
                            icon: res.data.status,
                        })

                        this.setCoupon()
                    })
                }

            })

        }
    }

    Search = (e) => {

        axios.get('/products/coupon').then(res => {
            let keyword = e.target.value;

            this.setState({
                coupon: res.data
            });

            let regx = new RegExp(keyword, 'i')
            let productspecified = [];

            this.state.coupon.map((item) => {
                if (regx.test(item.ProductName)) {
                    productspecified.push(item)
                }
            })

            this.setState({
                coupon: productspecified,
            })

        })
        if (e.target.value == "") {
            this.setCoupon()
        }
    }

    render() {
        return (
            <Container>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>SEARCH FOR</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl autoComplete="off" onChange={(e) => this.Search(e)} placeholder="Type Product Name here"></FormControl>
                </InputGroup>
                <Table striped bordered hover responsive variant="dark">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Discount</th>
                            <th>Expired Date</th>
                            <th>Available Number</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCoupon()}
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default Coupon
