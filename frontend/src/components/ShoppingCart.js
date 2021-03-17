import React, {Component} from "react";
import {Modal, Button, Table} from 'react-bootstrap'
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
        if (this.state.cart.length == 0)
        {
            this.state.cart.push(item)
        }
        else
        {
            let pushstate = false;
            this.state.cart.forEach((elem, i) => {
                if (elem.pid === item.pid)
                {
                    this.state.cart[i].amount += 1;
                    this.state.cart[i].price = this.state.cart[i].baseprice * this.state.cart[i].amount;
                    pushstate = true;
                }
            })

            if (pushstate == false)
            {
                this.state.cart.push(item)
            }
        }
        
        console.log(this.state.cart)
    }

    DisplayCart = () => {
        return this.state.cart.map((item,i) => {
            return (
                    <tr>
                        <td>{i+1}</td>
                        <td>{item.name}</td>
                        <td>{item.price} ฿</td>
                        <td>{item.amount}</td>
                    </tr>      
            )
        })
    }

    GetCartSize = () => {
        return this.state.cart.length
    }

    CartHeaderRender = () => {
        return (
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Amount</th>
                </tr>         
            </thead>
        )
    }
    render() {
        return (
            <Modal show={this.state.showCart} onHide={this.CartHide} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover responsive>
                        {this.CartHeaderRender()}
                        <tbody>
                            {this.DisplayCart()}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.CartHide} disable>Place Order</Button>
                </Modal.Footer>
          </Modal>
        )
    }
}

