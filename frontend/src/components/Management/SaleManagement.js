import React, { Component } from 'react'
import { Container, Tab, Nav, Col, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Stock, Coupon, Order, Invoice, AddProduct, AddCoupon } from './SaleManage/SaleExport'

export class SaleManagement extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loginYet: false,
            onChange: false,
            onChange1: false,
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
                    <Tab.Container id="tab" defaultActiveKey="addproduct">
                        <Row>
                            <Col sm={2}>
                                <Nav className="flex-column" variant="pills">
                                    <Nav.Item >
                                        <Nav.Link eventKey="addproduct">Add Product</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="addcoupon">Add Coupon</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item onClick={() => this.setState({ onChange: !this.state.onChange })} >
                                        <Nav.Link eventKey="stock">Edit Stock</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item onClick={() => this.setState({ onChange: !this.state.onChange })} >
                                        <Nav.Link eventKey="coupon">Edit Coupon</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item onClick={() => this.setState({ onChange1: !this.state.onChange1 })} >
                                        <Nav.Link eventKey="order">Edit Order</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item onClick={() => this.setState({ onChange: !this.state.onChange })} >
                                        <Nav.Link eventKey="invoice">Edit Invoice</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={10}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="addproduct">
                                        <AddProduct ></AddProduct>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="addcoupon">
                                        <AddCoupon onChange={this.state.onChange}></AddCoupon>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="stock">
                                        <Stock onChange={this.state.onChange}></Stock>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="coupon">
                                        <Coupon onChange={this.state.onChange}></Coupon>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="order">
                                        <Order onChange1={this.state.onChange1}></Order>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="invoice">
                                        <Invoice onChange={this.state.onChange}></Invoice>
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

