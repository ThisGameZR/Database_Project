import React, { Component } from 'react'
import { Pagination } from 'react-bootstrap';
import { Button, Form, InputGroup, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2'

export class CustomerMember extends Component {

    constructor() {
        super();
        this.state = {
            active: 0,
            maxAddress: 3,
            address: [],
            cid: null,
            loginYet: false,
        }
        axios.get('/login').then(res => {
            if (res.data.session?.user) {
                if (res.data.session.user.dno == '100')
                    if (res.data.session.user.condition == 1)
                        this.setState({ loginYet: true })
            }
        })
    }

    render() {
        if (this.state.loginYet == false) {
            return (
                <div style={{ margin: "20px" }}>
                    <h2>Sorry.. This page is only for employee in Sale Department!</h2>
                    <Link to="/"><Button>GO BACK</Button></Link>
                </div>
            );
        }

        return (
            // style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: "3%" }}
            <Container style={{ marginTop: "30px" }}>
                <Card>
                    <Card.Header>Customer Register</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col sm={6}>
                                <Card >
                                    <Card.Header>
                                        <div className="customer-info-header-text">Customer Info</div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form onSubmit={(e) => this.submitCustomer(e)}>
                                            <fieldset id="customer-form">
                                                <Form.Group controlId="customer-first-name">
                                                    <Form.Control type="text" placeholder="First name"></Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="customer-middle-name">
                                                    <Form.Control type="text" placeholder="Middle name"></Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="customer-last-name">
                                                    <Form.Control type="text" placeholder="Last name"></Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="customer-contact">
                                                    <Form.Control type="text" placeholder="Contact"></Form.Control>
                                                </Form.Group>
                                                <Button variant="success" type="submit">SUBMIT</Button>
                                            </fieldset>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={6}>
                                <Card>
                                    <Card.Header>
                                        <div className="customer-address-header-text">Customer Address</div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form onSubmit={(e) => this.submitAddress(e)}>
                                            <fieldset id="customer-address-form" disabled>
                                                <Form.Group controlId="customer-id">
                                                    <Form.Control type="text" placeholder="Customer ID" disabled></Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="customer-address">
                                                    <Form.Control type="text" placeholder="Address"></Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="customer-address-city">
                                                    <Form.Control type="text" placeholder="City"></Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="customer-address-province">
                                                    <Form.Control type="text" placeholder="Province"></Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="customer-address-postal-code">
                                                    <Form.Control type="text" placeholder="Postal Code"></Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="customer-address-country">
                                                    <Form.Control type="text" placeholder="Country"></Form.Control>
                                                </Form.Group>
                                                <Button variant="success" type="submit">SUBMIT</Button>
                                            </fieldset>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        
                    </Card.Body>
                </Card>


            </Container>
        )
    }

    submitCustomer = (e) => {
        e.preventDefault()

        let req = {
            firstname: document.getElementById('customer-first-name').value,
            middlename: document.getElementById('customer-middle-name').value,
            lastname: document.getElementById('customer-last-name').value,
            contact: document.getElementById('customer-contact').value
        }

        

        axios.post('/customerMember/submitCustomer', req).then(res => {
            
            Swal.fire({
                title: res.data.status.toUpperCase(),
                text: res.data.message,
                icon: res.data.status
            })

            if(res.data.status == "success"){
                document.getElementById('customer-first-name').value = ""
                document.getElementById('customer-middle-name').value = ""
                document.getElementById('customer-last-name').value = ""
                document.getElementById('customer-contact').value = ""
                document.getElementById('customer-address-form').disabled = false;
                document.getElementById('customer-id').value = res.data.cid;
                this.setState({ cid: res.data.cid })
                document.getElementById('customer-form').disabled = true
            }

        })


    }

    submitAddress = (e) => {
        e.preventDefault();
        if (!this.state.cid) {
            Swal.fire({
                title: `Don't script!!!!`,
                icon:'error'
            })
            window.location.reload(false)
            return;
        }
        let req = {
            cid: this.state.cid,
            address: document.getElementById('customer-address').value,
            city: document.getElementById('customer-address-city').value,
            province: document.getElementById('customer-address-province').value,
            postalcode: document.getElementById('customer-address-postal-code').value,
            country: document.getElementById('customer-address-country').value
        }

        axios.post('/customerMember/submitAddress', req).then(res => {

            Swal.fire({
                title: res.data.status.toUpperCase(),
                text: res.data.message,
                icon: res.data.status
            })
            if(res.data.status == "success"){
                document.getElementById('customer-address').value = ""
                document.getElementById('customer-address').value = ""
                document.getElementById('customer-address-city').value = ""
                document.getElementById('customer-address-province').value = ""
                document.getElementById('customer-address-postal-code').value = ""
                document.getElementById('customer-address-country').value = ""
    
                document.getElementById('customer-address-form').disabled = true
                window.location.href = "/products"   
            }
        })

    }

}

export default CustomerMember

