import React, { Component } from 'react'
import { Container, Tab, Nav, Col, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Stock, Coupon, Order, Invoice } from './SaleManage/SaleExport'

export class SaleManagement extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loginYet: false,
        }

        axios.get('/login').then(res => {
            if (res.data.session?.user) {
                this.setState({ loginYet: true })
            }
        })

    }


    render() {
        if (this.state?.loginYet === true) {
            return (
                <Container fluid>
                    <Tab.Container id="tab" defaultActiveKey="stock">
                        <Row>
                            <Col sm={3}>
                                <Nav className="flex-column" variant="pills">
                                    <Nav.Item>
                                        <Nav.Link eventKey="stock">Edit Stock</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="coupon">Edit Coupon</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="order">Edit Order</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="invoice">Edit Invoice</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="stock">
                                        <Stock></Stock>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="coupon">
                                        <Coupon></Coupon>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="stock">
                                        <Order></Order>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="coupon">
                                        <Invoice></Invoice>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
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

export default SaleManagement

