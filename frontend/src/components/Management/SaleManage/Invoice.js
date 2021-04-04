import React, { Component } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { VscClose } from 'react-icons/vsc'
import Swal from 'sweetalert2'
import DatePicker from './DatePicker'
import Select from 'react-dropdown-select'
import withReactContent from 'sweetalert2-react-content'

const ReactSwal = withReactContent(Swal)

export class Invoice extends Component {

    constructor(props) {
        super(props)

        this.state = {
            paymentInfo: [],
            eid: null,
            paymenttime: null,
            paymentStatus: [],
            paymentSelect: [{
                Payment_StatusID: 4,
                Payment_Description: "ALL STATUS",
            }],
        }
        axios.get('/login').then(res => {
            this.setState({ eid: res.data.session.user.eid })
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.onChange2 != prevProps.onChange2) {
            this.setPaymentInfo()
            this.setPaymentStatus()
        }
    }

    setPaymentStatus() {
        axios.get('/placeOrder/getPaymentStatus').then(res => {
            this.state.paymentStatus = res.data
            this.state.paymentStatus[3] = {
                Payment_StatusID: 4,
                Payment_Description: "ALL STATUS",
            }
            this.setState({ paymentStatus: this.state.paymentStatus })
        })
    }

    setPaymentInfo() {
        axios.get('/placeOrder/getPaymentInfo', { params: { eid: this.state.eid } }).then(res => {
            this.setState({ paymentInfo: res.data })
        })
    }

    renderPaymentInfo() {

        return this.state.paymentInfo.map(el => {
            if (this.state.paymentSelect[0].Payment_Description == "ALL STATUS" || this.state.paymentSelect[0].Payment_Description == el.Payment_Description)
                return (
                    <tr key={el.PaymentID}>
                        <td>{el.PaymentID}</td>
                        <td>{el.OrderID}</td>
                        <td>{el.TotalPrice}</td>
                        <td>
                            {el.Payment_Description == "Waiting for payment" ?
                                <Button variant="info" style={{ width: "100%" }}
                                    onClick={() => this.updatePaymentStatus(el.PaymentID)}>
                                    {el.Payment_Description}
                                </Button>
                                : null}
                            {el.Payment_Description == "Cancelled" ?
                                <Button variant="danger" style={{ width: "100%" }}>{el.Payment_Description}</Button>
                                : null}
                            {el.Payment_Description == "Confirm Payment" ?
                                <Button variant="success" style={{ width: "100%" }}>{el.Payment_Description}</Button>
                                : null}
                        </td>
                        <td>{el.PaymentDate ? new Date(el.PaymentDate).toLocaleString() : <VscClose></VscClose>}</td>
                    </tr>
                )
        })
    }

    updatePaymentStatus(PaymentID) {
        Swal.fire({
            title: 'Update Status',
            input: 'select',
            inputOptions: {
                'Status': {
                    2: 'Cancelled',
                    3: 'Confirm payment',
                }
            },
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: (input) => {
                if (input == 2) {
                    axios.post('/placeOrder/cancelPayment', { PaymentID }).then(res => {
                        Swal.close()
                        Swal.fire({
                            title: res.data.status.toUpperCase(),
                            text: res.data.message,
                            icon: res.data.status,
                        })
                        this.setPaymentInfo()
                    })
                }
                if (input == 3) {
                    Swal.close()
                    ReactSwal.fire({

                        title: 'Select Date',
                        html: (<DatePicker onChangeValue={(value) => this.setState({ paymenttime: new Date(value) })} />),
                        icon: 'info',
                        showCancelButton: true,
                        showLoaderOnConfirm: true,
                        preConfirm: () => {

                            axios.post('/placeOrder/confirmPayment', {
                                PaymentTime: this.state.paymenttime,
                                PaymentID
                            }).then(res => {

                                Swal.fire({
                                    title: `${res.data.status.toUpperCase()}`,
                                    text: `${res.data.message}`,
                                    icon: res.data.status,
                                })

                                this.setPaymentInfo()
                            })
                        }

                    })
                }
            }
        })
    }

    renderSelect() {
        return (
            <Select
                options={this.state.paymentStatus}
                placeholder="Select Payment Status"
                onChange={values => this.setState({ paymentSelect: values })}
                labelField="Payment_Description"
                valueField="Payment_StatusID"
                color="#ff6984"
                clearOnBlur={true}
                sortBy="Payment_Description"
                searchBy="Payment_Description"
                clearOnSelect={true}
                closeOnSelect={true}
            ></Select>
        )
    }

    render() {
        return (
            <Container>
                {this.state.paymentStatus.length != 0 ? this.renderSelect() : null}
                <Table striped bordered hover responsive variant="dark">
                    <thead>
                        <tr>
                            <th>PAYMENT ID</th>
                            <th>ORDER ID</th>
                            <th>TOTAL PRICE</th>
                            <th>PAYMENT STATUS</th>
                            <th>PAYMENT DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.paymentInfo.length != 0 ? this.renderPaymentInfo() : null}
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default Invoice
