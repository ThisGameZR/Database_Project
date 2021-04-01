import axios from 'axios'
import React, { Component } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import Swal from 'sweetalert2'

export class Coupon extends Component {

    constructor(props) {
        super(props)

        this.state = {
            coupon: [],
        }
        this.setCoupon()
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
                    <td>{el.PID}</td>
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
                </tr>
            )
        })
    }

    editCoupon = (code, type) => {

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

    }

    render() {
        return (
            <Container>
                <Table striped bordered hover responsive variant="dark">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Discount</th>
                            <th>Expired Date</th>
                            <th>Available Number</th>
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
