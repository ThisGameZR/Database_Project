import React, { Component } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { VscClose } from 'react-icons/vsc'
import Select from 'react-dropdown-select'
import Swal from 'sweetalert2'

export class Order extends Component {

    constructor(props) {
        super(props)

        this.state = {
            orderInfo: [],
            eid: null,
            orderSelect: [{
                StatusID: 7,
                Description: "ALL STATUS"
            }],
            orderStatus: [],
        }

        axios.get('/login').then(res => {
            this.setState({ eid: res.data.session.user.eid })
            this.setOrderInfo()
        })

        this.setOrderStatus()
    }

    async setOrderStatus() {
        axios.get('/placeOrder/getOrderStatus').then(async res => {
            this.state.orderStatus = await res.data
            this.state.orderStatus[this.state.orderStatus.length] = await {
                StatusID: 7,
                Description: "ALL STATUS"
            }
            await this.setState({
                orderStatus: this.state.orderStatus,
            })
        })
    }

    setOrderInfo() {
        axios.get('/placeOrder/getOrder', { params: { eid: this.state.eid } }).then(res => {
            this.setState({ orderInfo: res.data })
        })
    }

    renderOrderInfo() {
        return this.state.orderInfo?.map(el => {
            if (this.state.orderSelect[0]?.Description == "ALL STATUS" || this.state.orderSelect[0].Description == el.Description)
                return (
                    <tr key={el.OrderID}>
                        <td>{el.OrderID}</td>
                        <td>{el.CID}</td>
                        <td>{el.FirstName + ' ' + el.MiddleName + ' ' + el.LastName}</td>
                        <td>{el.Address}</td>
                        <td>{el.TotalPrice}</td>
                        <td>{new Date(el.OrderDate).toLocaleString()}</td>
                        <td>{el.RequiredDate ? new Date(el.RequiredDate).toLocaleString() : <VscClose></VscClose>}</td>
                        <td>
                            {el.PaymentDate ? new Date(el.PaymentDate).toLocaleString() : <VscClose></VscClose>}
                        </td>
                        <td><Button variant="success" style={{ width: "100%" }}
                            onClick={() => this.updateOrderStatus()}>
                            {el.Description}
                        </Button>
                        </td>
                    </tr>
                )
        })
    }

    updateOrderStatus() {
        Swal.fire({
            title: 'Update Status',
            input: 'select',
            inputOptions: {
                'Status': {
                    1: 'In progress',
                    2: 'Cancel',
                    3: 'Disputed',
                    4: 'On hold',
                    5: 'Resolved',
                    6: 'Shipped',
                }
            },
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {

            }
        })
    }

    renderSelect() {
        return (
            <Select
                options={this.state.orderStatus}
                placeholder="Select Order Status"
                onChange={values => this.setState({ orderSelect: values })}
                labelField="Description"
                valueField="StatusID"
                color="#ff6984"
            ></Select>
        )
    }

    render() {
        return (
            <Container fluid>
                {this.state.orderStatus.length != 0 ? this.renderSelect() : null}
                <Table>
                    <thead>
                        <th>OID</th>
                        <th>CID</th>
                        <th>Customer</th>
                        <th>Address</th>
                        <th>TotalPrice</th>
                        <th>OrderDate</th>
                        <th>RequiredDate</th>
                        <th>PaymentDate</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {this.state.orderInfo.length != 0 ? this.renderOrderInfo() : null}
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default Order
