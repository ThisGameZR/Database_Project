import React, {Component} from "react";
import {Modal, Button, Container, Col, Row} from 'react-bootstrap'
import axios from "axios";

export default class ShoppingCart extends Component {
    constructor(){
        super()

        this.state = {
            showCart: false,
            cartReady: false,
            cart: []
        }
    }

    CartHide = () => {
        this.setState({
            showCart: false
        })
    }

    CartShow = () => {
        this.setState({
            showCart: true
        })
    }

    AddItem = (item) => {
        this.state.cart.push(item)
    }

    DisplayCart = () => {
        return this.state.cart.map((item,i) => {
            return (
                    <Row>
                        <Col sm={2}>{i+1}</Col>
                        <Col sm={4}>{item.name}</Col>
                        <Col sm={2}>{item.price}</Col>
                        <Col sm={1}>{item.amount}</Col>
                    </Row>      
            )
        })
    }

    GetCartSize = () => {
        return this.state.cart.length
    }

    render() {
        return (
            <Modal show={this.state.showCart} onHide={this.CartHide} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Container>
                    <Row style={{backgroundColor: "#e5e5e5"}}>
                        <Col sm={2}>Number</Col>
                        <Col sm={4}>Name</Col>
                        <Col sm={2}>Price</Col>
                        <Col sm={1}>Amount</Col>
                    </Row>
                    {this.DisplayCart()}
                </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.CartHide} disable>Place Order</Button>
                </Modal.Footer>
          </Modal>
        )
    }
}

