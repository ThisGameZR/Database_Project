import React, { Component } from 'react'
import { Card, Container, Button, Col, InputGroup, FormControl } from 'react-bootstrap'
import DateTimePicker from 'react-datetime-picker/dist/DateTimePicker'
import axios from 'axios'
import Swal from 'sweetalert2'

export class AddCoupon extends Component {

    constructor(props) {
        super(props)

        this.state = {
            pid: null,
            expiredtime: null,
            ProductName: null,
        }

    }

    setProductName() {
        axios.get('/products/getProductName', { params: { pid: this.state.pid } }).then(res => {
            if (res.data.status != 'error') {
                this.setState({ ProductName: res.data.name })
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.pid != prevState.pid) {
            this.setProductName()
        }
    }

    AddCoupon() {
        axios.post('/products/addCoupon', {
            Code: document.getElementById('coupon-code').value,
            PID: this.state.pid,
            Discount: document.getElementById('coupon-discount').value,
            ExpiredDate: this.state.expiredtime,
            Available_number: document.getElementById('coupon-available-number').value,
        }).then(res => {
            Swal.fire({
                title: res.data.status.toUpperCase(),
                text: res.data.message,
                icon: res.data.status,
            })
        })
    }

    render() {
        return (
            <Container>
                <Col sm={9}>
                    <Card>
                        <Card.Header></Card.Header>
                        <Card.Body>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>CODE</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id="coupon-code"></FormControl>
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>PID</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl onChange={(e) => this.setState({ pid: e.target.value })}></FormControl>
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>PRODUCT NAME</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl value={this.state.ProductName} disabled></FormControl>
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>DISCOUNT</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id="coupon-discount"></FormControl>
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Expired Date</InputGroup.Text>
                                </InputGroup.Prepend>
                                <DateTimePicker
                                    dayPlaceholder="dd"
                                    monthPlaceholder="mm"
                                    yearPlaceholder="yyyy"
                                    format="dd/MM/y h:mm:ss a"
                                    disableClock={true}
                                    onChange={(e) => {
                                        this.setState({ expiredtime: e })
                                    }
                                    }
                                    value={this.state.expiredtime}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Available Number</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id="coupon-available-number"></FormControl>
                            </InputGroup>
                            <Button variant="success" onClick={() => this.AddCoupon()}>ADD COUPON</Button>
                        </Card.Body>
                        <Card.Footer></Card.Footer>
                    </Card>
                </Col>
            </Container>
        )
    }
}

export default AddCoupon
