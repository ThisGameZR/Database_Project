import React, {useState} from 'react';
import {Container, Image, Navbar, Nav, NavDropdown, DropdownButton, Dropdown} from 'react-bootstrap';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import shoppingCart from './Images/shoppingCart.png';
import LoginForm from './LoginForm';
import './CSS/Navigation.css';

function NavigationBar(){

    return(
        <Container fluid >
            {/* Header bar */}
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Navbar.Brand href="/">
                    <Image src={shoppingCart} roundedCircle style={{width:"100px",height:"100px"}}/>
                    PLASTIC SHOP
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" style={{marginLeft:"50px"}}>
                    <Nav mr="auto">
                        <Nav.Link href="/product">PRODUCT</Nav.Link>
                        <NavDropdown title="Recommend" id="responsive-nav-dropdown" variant="dark">
                            <NavDropdown.Item href="#" style={{color:"dodgerblue", fontSize:"14px"}}>Kitchen Tools</NavDropdown.Item>
                            <NavDropdown.Item href="#" style={{color:"dodgerblue", fontSize:"14px"}}>Everyday Life</NavDropdown.Item>
                            <NavDropdown.Item href="#" style={{color:"dodgerblue", fontSize:"14px"}}>Kid Toys</NavDropdown.Item>
                        </NavDropdown>
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
                    </Nav>
                    <div style={{width:"400px"}}></div>
                    <LoginForm/>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
}

export default NavigationBar;