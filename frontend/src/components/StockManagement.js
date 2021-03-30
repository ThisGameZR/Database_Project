import React, { Component } from 'react'
import { Container, Tab, Nav, Col, Row, Button } from 'react-bootstrap'
import Coupon from './StockManage/Coupon'
import { Link } from 'react-router-dom'
import Stock from './StockManage/Stock'
import axios from 'axios'

export class StockManagement extends Component {

    constructor(props) {
        super(props)

        this.state = {

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
                                <Nav className="flex-column" variant="pills">>
                                <Nav.Item>
                                        <Nav.Link eventKey="stock">Edit Stock</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="coupon">Edit Coupon</Nav.Link>
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

export default StockManagement

