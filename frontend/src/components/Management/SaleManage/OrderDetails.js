import React, { Component } from 'react'
import { Container, Table, InputGroup, FormControl, Button, Card } from 'react-bootstrap'
import axios from 'axios'
import './CSS/orderdetails.css'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

export class OrderDetails extends Component {

    constructor(props) {
        super(props)

        this.state = {

            eid: null,
            info: [],
            position: null,
            employeeInfo: null,
            orderStatus: [],
            dno: null,
        }

        axios.get('/login').then(res => {
            this.setState({ eid: res.data.session.user.eid, position: res.data.session.user.position, dno: res.data.session.user.dno })
            this.setInfo()
        })

        axios.get('/placeOrder/getOrderStatus').then(res => {
            this.setState({ orderStatus: res.data })
        })
    }

    setInfo() {
        axios.get('/placeOrder/getOrder', { params: { eid: this.state.eid } }).then(res => {
            this.setState({ info: res.data })
        })
    }

    showOrderDetail(oid) {
        axios.get('/employee/getOrderDetail', { params: { oid } }).then(res => {

            let myhtml = ""

            res.data.map(el => {
                myhtml += `<tr>
                        <td>${el.PID}</td>
                        <td>${el.Quantity}</td>
                        <td>${el.TotalPrice} ฿</td>
                    </tr>`
            })

            Swal.fire({
                title: `ORDER DETAILS`,
                html: `<div style="width:100%; justify-content:center; display:flex; align-items:center"><table>
                    <tr>
                        <th>PID</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                    ${myhtml}
                </table></div>`,
                icon: 'info'
            })
        })
    }

    showEmployee(eid) {
        axios.get('/employee/getEmployee', { params: { eid } }).then(res => {
            Swal.fire({
                title: `EMPLOYEE INFO`,
                html: `<div>
                    <div><span class="bold">EMPLOYEE ID: </span>${res.data[0].EID}</div>
                    <div><span class="bold">EMPLOYEE NAME: </span>${res.data[0].Name}</div>
                    <div><span class="bold">POSITION: </span>${res.data[0].Position}</div>
                    <div><span class="bold">SALARY: </span>${res.data[0].Salary}</div>
                </div>`,
                icon: `info`
            })
        })
    }

    showCustomer(cid) {
        axios.get('/customer/editProfile', { params: { cid } }).then(res => {
            let customerInfo = res.data.customerInfo
            Swal.fire({
                title: `CUSTOMER INFO`,
                html:
                    `<div><span class="bold">Customer ID:</span> ${customerInfo.CID}</div>` +
                    `<div><span class="bold">Customer Name:</span> ${customerInfo.FirstName + ' ' + customerInfo.MiddleName + ' ' + customerInfo.LastName} </div>` + `<div><span class="bold">Customer Contact:</span> ${customerInfo.Contact}</div>`,
                icon: `info`,
            })
        })
    }

    showAddress(caddrid) {
        axios.get('/customer/getAddress', { params: { caddrid } }).then(res => {
            Swal.fire({
                title: 'ADDRESS INFO',
                html: `<div><span class="bold">Address ID: </span>${res.data[0].CAddrID}</div>
                    <div><span class="bold">Address: </span>${res.data[0].Address}</div>
                    <div><span class="bold">City: </span>${res.data[0].City}</div>
                    <div><span class="bold">Province: </span>${res.data[0].Province}</div>
                    <div><span class="bold">Postal Code: </span>${res.data[0].PostalCode}</div>
                    <div><span class="bold">Country: </span>${res.data[0].Country}</div>
                `,
                icon: 'info',
            })
        })
    }

    statusidToStatus(statusid) {
        return this.state.orderStatus.map(el => {
            if (el.StatusID == statusid) {
                return (
                    <div>{el.Description}</div>
                )
            }
        })
    }

    renderInfo() {
        return this.state.info.map(el => {
            if (this.state.position?.includes("Manager")) {
                return (
                    <tr key={el.OrderID}>
                        <td onClick={() => this.showOrderDetail(el.OrderID)}>
                            {el.OrderID}
                        </td>
                        <td onClick={() => this.showEmployee(el.EID)}>
                            {el.EID}
                        </td>
                        <td onClick={() => this.showCustomer(el.CID)}>
                            {el.CID}
                        </td>
                        <td onClick={() => this.showAddress(el.CAddrID)}>
                            {el.CAddrID}
                        </td>
                        <td>
                            {el.TotalPrice} ฿
                        </td>
                        <td>
                            {el.TotalPoints}
                        </td>
                        <td>
                            {el.PromoCode}
                        </td>
                        <td>
                            {new Date(el.OrderDate).toLocaleString() || "X"}
                        </td>
                        <td>
                            {el.RequiredDate ? new Date(el.RequiredDate).toLocaleString() : "X"}
                        </td>
                        <td>
                            {el.PaymentDate ? new Date(el.PaymentDate).toLocaleString() : "X"}
                        </td>
                        <td>
                            {this.statusidToStatus(el.StatusID)}
                        </td>
                    </tr>
                )
            }
            else {
                if (this.state.eid == el.EID) {
                    return (
                        <tr key={el.OrderID}>
                            <td onClick={() => this.showOrderDetail(el.OrderID)}>
                                {el.OrderID}
                            </td>
                            <td onClick={() => this.showEmployee(el.EID)}>
                                {el.EID}
                            </td>
                            <td onClick={() => this.showCustomer(el.CID)}>
                                {el.CID}
                            </td>
                            <td onClick={() => this.showAddress(el.CAddrID)}>
                                {el.CAddrID}
                            </td>
                            <td>
                                {el.TotalPrice} ฿
                        </td>
                            <td>
                                {el.TotalPoints}
                            </td>
                            <td>
                                {el.PromoCode}
                            </td>
                            <td>
                                {new Date(el.OrderDate).toLocaleString() || "X"}
                            </td>
                            <td>
                                {el.RequiredDate ? new Date(el.RequiredDate).toLocaleString() : "X"}
                            </td>
                            <td>
                                {el.PaymentDate ? new Date(el.PaymentDate).toLocaleString() : "X"}
                            </td>
                            <td>
                                {this.statusidToStatus(el.StatusID)}
                            </td>
                        </tr>
                    )
                }
            }
        })
    }

    Search = (e) => {

        axios.get('/placeOrder/getOrder', { params: { eid: this.state.eid } }).then(res => {
            let keyword = e.target.value;

            this.setState({
                info: res.data
            });

            let regx = new RegExp(keyword, 'i')
            let productspecified = [];

            this.state.info.map((item) => {
                if (regx.test(item.OrderID)) {
                    productspecified.push(item)
                }
            })

            this.setState({
                info: productspecified,
            })

        })
        if (e.target.value == "") {
            this.setInfo()
        }
    }

    render() {
        if (this.state.position?.includes("Sale")) {
            return (
                <Container style={{ marginTop: "30px" }}>
                    <Card>
                        <Card.Header>
                            Order Detail
                        </Card.Header>
                        <Card.Body>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>SEARCH FOR</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl autoComplete="off" onChange={(e) => this.Search(e)} placeholder="Type Order ID here"></FormControl>
                            </InputGroup>

                            <Table striped bordered hover responsive style={{ marginTop: "12px" }}>
                                <thead className="table-head">
                                    <tr>
                                        <th>OID</th>
                                        <th>EID</th>
                                        <th>CID</th>
                                        <th>CAddrID</th>
                                        <th>TotalPrice</th>
                                        <th>TotalPoints</th>
                                        <th>Coupon</th>
                                        <th>OrderDate</th>
                                        <th>RequiredDate</th>
                                        <th>PaymentDate</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderInfo()}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Container>
            )
        } else {
            return (
                <div>

                    <h2>This page is only for Sale Officer!</h2>
                    <Link to="/SaleManagement"><Button>GO BACK</Button></Link>
                </div>
            )
        }
    }
}

export default OrderDetails
