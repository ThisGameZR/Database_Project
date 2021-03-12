import React, {Component} from "react";
import {Modal, Button} from 'react-bootstrap'
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
        return this.state.cart.map(item => {
            return (
                <p>
                    Item: {item.pid}
                    Name: {item.name}
                    Amount: {item.amount}
                </p>
            )
        })
    }

    render() {
        return (
            <Modal show={this.state.showCart} onHide={this.CartHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.DisplayCart()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.CartHide}>Close</Button>
                    <Button variant="primary" onClick={this.CartHide} disable>Place Order</Button>
                </Modal.Footer>
          </Modal>
        )
    }
}

