import React, {Component} from "react";
import {Modal, Button, Container, Col, Row} from 'react-bootstrap'
import axios from "axios";

export default class ShoppingCart extends Component {
    constructor(){
        super()

        this.state = {
            showCart: false,
            cartReady: false,
            cart: [],
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
        let stack = false;
        this.state.cart.map(el => {
            if(item.pid == el.pid){
                el.amount++;
                stack = true
            }
        })
        if(stack === false)
            this.state.cart.push(item)
    }

    DisplayCart = () => {
        return this.state.cart.map((item,i) => {
            return (
                    <Row >
                        <Col sm={2} style={{background:"#e8f1ff"}}>{i+1}</Col>
                        <Col sm={5} style={{background:"#dbfffd"}}>{item.name}</Col>
                        <Col sm={2} style={{background:"#fbebff"}}>{item.price}</Col>
                        <Col sm={2} style={{background:"#fff7eb"}}>{item.amount}</Col>
                        <Col sm={1} style={{background:"#ffebeb"}}>{item.size}</Col>
                    </Row>      
            )
        })
    }

    GetCartSize = () => {
        let count = 0;
        this.state.cart.map(item => {
            count += item.amount;
        })
        return count
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
                        <Col sm={5}>Name</Col>
                        <Col sm={2}>Price</Col>
                        <Col sm={2}>Amount</Col>
                        <Col sm={1}>Size</Col>
                    </Row>
                    {this.DisplayCart()}
                </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.placeOrder} disable>Place Order</Button>
                </Modal.Footer>
          </Modal>
        )
    }

    placeOrder = () => {
        this.CartHide();
        axios.get('/login').then(res => {
            if(res.data.session?.user){
                localStorage.setItem("itemInCart", JSON.stringify(this.state.cart))
                window.location.href = "/PlaceOrder"
            }else{
                alert("You need to login to place the order")
            }
        })
    }
}

