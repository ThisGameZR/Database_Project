import React, {useState, Component} from 'react';
import {Container, Image, Navbar, Nav, NavDropdown, DropdownButton, Dropdown} from 'react-bootstrap';
import axios from "axios";
import shoppingCart from './Images/shoppingCart.png';
import LoginForm from './LoginForm';
import './CSS/Navigation.css';
import {connect} from 'react-redux';

export class NavigationBar extends Component{

    constructor(){
        super();
        this.state = {
            loginYet: false,
        }
        axios.get('/login').then(res => {
            if(res.data.session?.user){
                this.setState({loginYet : true})
            }
        })
    }

    render(){

        return(
            <Container fluid>
                {/* Header bar */}
                <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                    <Navbar.Brand href="/">
                        <Image src={shoppingCart} roundedCircle style={{width:"80px",height:"80px"}}/>
                        PLASTIC SHOP
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav mr="auto" style={{marginRight: "auto"}}>
                            <Nav.Link href="/products" id="responsive-nav-dropdown" variant="dark">Product</Nav.Link>
                            <NavDropdown title="Support" id="responsive-nav-dropdown" variant="dark">
                                <NavDropdown.Item href="#">
                                    <div class="support-text">Contact Number</div>
                                    <div class="phone-number">123-456-789</div>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#">
                                    <div class="support-text">Facebook</div>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#">
                                    <div class="support-text">Line ID</div>
                                    <div class="phone-number">@AXIOS</div>
                                </NavDropdown.Item>
                            </NavDropdown>
                            {this.state.loginYet == true ? <Nav.Link href="/customerMember">Customer Registration</Nav.Link> : null}
                            {this.state.loginYet == true ? <Nav.Link href="/EditCustomer">Edit Customer</Nav.Link> : null}
                        </Nav>
                        <LoginForm/>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        );   
    }
}



export default NavigationBar;
