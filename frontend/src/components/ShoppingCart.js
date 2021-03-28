import React, {Component} from "react";
import {Modal, Button, Table, Form, FormGroup, ButtonGroup, Badge, Alert} from 'react-bootstrap'
import { BsFillXCircleFill } from 'react-icons/bs'
import SelectSearch, {fuzzySearch } from 'react-select-search'
import axios from "axios";
import Product from "./Product";
export default class ShoppingCart extends Component {
    constructor(props){
        super(props)

        this.state = {
            showCart: false,
            cartReady: false,
            cart: [],
            TotalPrice: 0,
            showAlert: false,
            customer: [],
            customerValue: null,
        }
    }

    componentDidMount() {
        axios.get('/customer').then(res => {
            res.data.customer.map((el,i) => {
                this.state.customer[i] = {
                    name: el.name,
                    value: el.cid
                }    
            })
        })
    }

    CartHide = () => {
        this.setState({
            showCart: false,
            customerValue: null,
            showAlert: false,
        })
    }

    CartShow = () => {
        this.setState({
            showCart: true
        })
    }

    TotalPrice() {
        let totalprice = 0
        this.state.cart.map(el => {
            totalprice += el.price
        })
        this.state.TotalPrice = parseFloat(totalprice).toFixed(2)
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
                    this.IncreaseAmount(null,i)
                    pushstate = true;
                }
            })

            if (pushstate == false)
            {
                this.state.cart.push(item)
            }
        }
        
    }

    DisplayCart = () => {
        return this.state.cart.map((item,i) => {
            return (

                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{item.name}</td>
                        <td>{parseFloat(item.price).toFixed(2)} ฿</td>
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

    IncreaseAmount = async (e,ind) => {
        let index = e?.target.value || ind
        let tempCart = this.state.cart
        let stockAmount
        await axios.get('/products/getstock', { params: { pid: this.state.cart[index].pid } }).then(res => {
            stockAmount = res.data[0].stocks || 0
        })

        if (tempCart[index].amount + 1 <= stockAmount) {
            tempCart[index].amount += 1;
            tempCart[index].price = tempCart[index].baseprice * tempCart[index].amount

            this.props.changeBadge();
        } else {
            if (e) {
                await this.setState({ showAlert: true })
                document.getElementById('error-msg').innerHTML = "Not enough item in stock"   
            }
        }
    }

    DecreaseAmount = (e) => {
        let tempCart = this.state.cart

        tempCart[e.target.value].amount -= 1;

        if (tempCart[e.target.value].amount <= 0)
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
        this.props.changeBadge();
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
                        <FormGroup controlId="customerId">
                            <SelectSearch search
                                                
                                                    onChange={(e) => this.setState({customerValue: e})} 
                                                    emptyMessage="Result not found"
                                                    placeholder="Select Customer" 
                                                    options={this.state.customer}
                                                    filterOptions={fuzzySearch}
                        />
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
                    <div style={{ position: "absolute", left: "0" }}>
                        {this.TotalPrice()}
                        <Button variant="outline-info">TOTAL PRICE: <Badge>{this.state.TotalPrice}</Badge></Button>
                    </div>
                    <Button variant="primary" onClick={this.placeOrder}>Place Order</Button>
                </Modal.Footer>
                {this.state.showAlert === true ? 
                    <Alert variant="danger" onClose={() => this.setState({showAlert: false})} dismissible>
                        <Alert.Heading>AN ERROR!</Alert.Heading>
                        <p id="error-msg"></p>
                    </Alert>
                : null} 
            </Modal>
        )
    }

    placeOrder = async () => {
        if (this.state.cart.length == 0) {
            await this.setState({ showAlert: true })
            document.getElementById('error-msg').innerHTML = "At least one item need to be in the cart"
            return
        }
        if(this.state.customerValue == null){
            await this.setState({ showAlert: true })
            document.getElementById('error-msg').innerHTML = "You need to select customer"
            return
        }
        axios.get('/login').then(async res => {
            if (res.data.session?.user) {
                axios.post('/placeOrder', {
                    cart: this.state.cart,
                    cid: this.state.customerValue,
                    eid: res.data.session.user.eid
                }).then(res => {
                    window.location.href = "/PlaceOrder"
                })
            }else{
                await this.setState({ showAlert: true })
                document.getElementById('error-msg').innerHTML = "You need to login to place order"
            }
        })
    }
}
