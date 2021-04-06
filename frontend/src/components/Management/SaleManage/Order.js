import React, { Component } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
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
            position: null,
        }

        axios.get('/login').then(res => {
            this.setState({ eid: res.data.session.user.eid, position: res.data.session.user.position })
            this.setOrderInfo()
        })

    }

    componentDidUpdate(prevProps) {

        if (this.props.onChange1 != prevProps.onChange1) {
            this.setOrderStatus()
            this.setOrderInfo()
        }
    }

    componentWillUnmount() {
        this.setState({ orderStatus: [] })
    }

    async setOrderStatus() {
        axios.get('/placeOrder/getOrderStatus').then(async res => {
            this.state.orderStatus = await res.data
            this.state.orderStatus[this.state.orderStatus.length] = {
                "id": 7,
                "StatusID": 7,
                "Description": "ALL STATUS"
            }
            this.setState({
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
        if (!this.state.position?.includes('Manager')) {
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
                            <td>
                                {el.Description == 'In progress' ?
                                    <Button variant="info" style={{ width: "100%" }}
                                        onClick={() => this.updateOrderStatus(el.OrderID)}>
                                        {el.Description}
                                    </Button>
                                    : null}
                                {el.Description == 'Disputed' || el.Description == 'On hold' ?
                                    <Button variant="warning" style={{ width: "100%" }}
                                        onClick={() => this.updateOrderStatus(el.OrderID)}>
                                        {el.Description}
                                    </Button>
                                    : null}
                                {el.Description == 'Resolved' ?
                                    <Button variant="success" style={{ width: "100%", background: "#5e008c" }}
                                        onClick={() => this.updateOrderStatus(el.OrderID)}>
                                        {el.Description}
                                    </Button>
                                    : null}
                                {el.Description == 'Cancel' ?
                                    <Button variant="danger" style={{ width: "100%" }}>
                                        {el.Description}
                                    </Button>
                                    : null}
                                {el.Description == 'Shipped' ?
                                    <Button variant="success" style={{ width: "100%" }}>
                                        {el.Description}
                                    </Button>
                                    : null}
                            </td>
                        </tr>
                    )
            })
        } else {
            return this.state.orderInfo?.map(el => {
                if (this.state.orderSelect[0]?.Description == "ALL STATUS" || this.state.orderSelect[0].Description == el.Description)
                    return (
                        <tr key={el.OrderID}>
                            <td>{el.OrderID}</td>
                            <td>{el.EID}</td>
                            <td>{el.CID}</td>
                            <td>{el.FirstName + ' ' + el.MiddleName + ' ' + el.LastName}</td>
                            <td>{el.TotalPrice}</td>
                            <td>{new Date(el.OrderDate).toLocaleString()}</td>
                            <td>{el.RequiredDate ? new Date(el.RequiredDate).toLocaleString() : <VscClose></VscClose>}</td>
                            <td>
                                {el.PaymentDate ? new Date(el.PaymentDate).toLocaleString() : <VscClose></VscClose>}
                            </td>
                            <td>
                                {el.Description == 'In progress' ?
                                    <Button variant="info" style={{ width: "100%" }}
                                        onClick={() => this.updateOrderStatus(el.OrderID)}>
                                        {el.Description}
                                    </Button>
                                    : null}
                                {el.Description == 'Disputed' || el.Description == 'On hold' ?
                                    <Button variant="warning" style={{ width: "100%" }}
                                        onClick={() => this.updateOrderStatus(el.OrderID)}>
                                        {el.Description}
                                    </Button>
                                    : null}
                                {el.Description == 'Resolved' ?
                                    <Button variant="success" style={{ width: "100%", background: "#5e008c" }}
                                        onClick={() => this.updateOrderStatus(el.OrderID)}>
                                        {el.Description}
                                    </Button>
                                    : null}
                                {el.Description == 'Cancel' ?
                                    <Button variant="danger" style={{ width: "100%" }}>
                                        {el.Description}
                                    </Button>
                                    : null}
                                {el.Description == 'Shipped' ?
                                    <Button variant="success" style={{ width: "100%" }}>
                                        {el.Description}
                                    </Button>
                                    : null}
                            </td>
                        </tr>
                    )
            })
        }
    }

    updateOrderStatus(orderid) {
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
            preConfirm: (input) => {
                let status = {
                    1: 'In progress',
                    2: 'Cancel',
                    3: 'Disputed',
                    4: 'On hold',
                    5: 'Resolved',
                    6: 'Shipped',
                }

                Swal.fire({
                    title: `Are you sure?`,
                    text: `Change status to ${status[input]}`,
                    icon: 'question',
                    showCancelButton: true,
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        if (input == 2) {
                            axios.post('/placeOrder/cancelPayment', { OrderID: orderid }).then(res => {
                                Swal.fire({
                                    title: `${res.data.status.toUpperCase()}`,
                                    text: `${res.data.message}`,
                                    icon: res.data.status,
                                })
                                this.setOrderInfo()
                            })
                        } else {
                            axios.post('/placeOrder/updateOrderStatus', {
                                StatusID: input,
                                OrderID: orderid,
                            }).then(res => {
                                Swal.fire({
                                    title: `${res.data.status.toUpperCase()}`,
                                    text: `${res.data.message}`,
                                    icon: res.data.status,
                                })
                                this.setOrderInfo()
                            })
                        }
                    }
                })
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
                clearOnBlur={true}
                clearOnSelect={true}
                sortBy="Description"
                searchBy="Description"
                closeOnSelect={true}
            ></Select>
        )
    }

    renderThead() {
        if (!this.state.position?.includes('Manager')) {
            return (
                <thead>
                    <tr>
                        <th>OID</th>
                        <th>CID</th>
                        <th>Customer</th>
                        <th>Address</th>
                        <th>Total(฿)</th>
                        <th>OrderDate</th>
                        <th>RequiredDate</th>
                        <th>PaymentDate</th>
                        <th>Status</th>
                    </tr>
                </thead>
            )
        } else {
            return (
                <thead>
                    <tr>
                        <th>OID</th>
                        <th>EID</th>
                        <th>CID</th>
                        <th>Customer</th>
                        <th>Total(฿)</th>
                        <th>OrderDate</th>
                        <th>RequiredDate</th>
                        <th>PaymentDate</th>
                        <th>Status</th>
                    </tr>
                </thead>
            )
        }
    }

    render() {
        if (this.state.position?.includes("Sale") || this.state.position?.includes("Manager"))
            return (
                <Container fluid>
                    {this.state.orderStatus.length != 0 ? this.renderSelect() : null}
                    <Table striped bordered hover responsive variant="dark">
                        {this.renderThead()}
                        <tbody>
                            {this.state.orderInfo.length != 0 ? this.renderOrderInfo() : null}
                        </tbody>
                    </Table>
                </Container>
            )
        else
            return (
                <div style={{ margin: "20px" }}>
                    <h2>Sorry.. This page is only for Sale Officer!</h2>
                </div>
            )
    }
}

export default Order
