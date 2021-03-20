import React, {Component} from "react";
import {Modal, Button, Table, Form, FormGroup, ButtonGroup, Col} from 'react-bootstrap'
import {BsFillXCircleFill} from 'react-icons/bs'
import axios from "axios";
import Product from "./Product";
export default class ShoppingCart extends Component {
    constructor(props){
        super(props)

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
                        <td>
                            <ButtonGroup size="sm">
                                <Button value={i} onClick={(e) => this.DecreaseAmount(e)}>-</Button>
                                <Button value={i} onClick={(e) => this.IncreaseAmount(e)}>+</Button>
                                <Button variant="danger" value={i} onClick={(e) => this.DeleteItem(e)}>
                                    <BsFillXCircleFill/>
                                </Button>
                            </ButtonGroup>
                        </td>
                    </tr>      

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

    IncreaseAmount = (e) => {
        let tempCart = this.state.cart
        tempCart[e.target.value].amount += 1;
        tempCart[e.target.value].price = tempCart[e.target.value].baseprice * tempCart[e.target.value].amount

        this.setState({
            cart: tempCart
        })
    }

    DecreaseAmount = (e) => {
        let tempCart = this.state.cart

        tempCart[e.target.value].amount -= 1;

        if (tempCart[e.target.value].amount < 0)
        {
            this.DeleteItem(e)
        }
        else
        {
            tempCart[e.target.value].price = tempCart[e.target.value].baseprice * tempCart[e.target.value].amount

            this.setState({
                cart: tempCart
            })
        }
    }

    DeleteItem = (e) => {
        let tempCart = this.state.cart
        tempCart.splice(e.target.value, 1)

        this.setState({
            cart: tempCart
        }, () => {
            this.props.changeBadge();
        })
    }

    render() {
        
        return (
            <Modal show={this.state.showCart} onHide={this.CartHide} size="lg">
                <Modal.Header closeButton>
                    <Form>
                        <FormGroup>
                            <Form.Control type="text" placeholder="Customer ID"/>
                        </FormGroup>
                    </Form>
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
                    <Button variant="primary" onClick={this.CartHide}>Place Order</Button>

                </Modal.Footer>
          </Modal>
        )
    }

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


