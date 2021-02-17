import React, {useState} from 'react';
import {Col, Container, Row, Button, Image, Navbar, Nav, FormControl, Form, Tab} from 'react-bootstrap';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import shoppingCart from './Images/shoppingCart.png';
import LoginForm from './LoginForm';

function NavigationBar(){

    return(
        <Container fluid >
            {/* Header bar */}
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Navbar.Brand href="/home">
                    <Image src={shoppingCart} roundedCircle style={{width:"100px",height:"100px"}}/>
                    PLASTIC SHOP
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between" style={{marginLeft:"50px"}}>
                    <Nav mr="auto">
                        <Nav.Link href="/product">PRODUCT</Nav.Link>
                    </Nav>
                    <LoginForm/>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
}

export default NavigationBar;