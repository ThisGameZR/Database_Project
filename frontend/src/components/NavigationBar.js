import React from 'react';
import {Col, Container, Row, Button, Image, Navbar, Nav, FormControl, Form, Tab} from 'react-bootstrap';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import shoppingCart from './Images/shoppingCart.png';

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
                    <Form inline onSubmit={(e) => login(e)}>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Employee ID" id="username" style={{marginRight:"10px"}}></Form.Control>
                            <Form.Control type="password" placeholder="Password" id="password" style={{marginRight:"10px"}}></Form.Control>
                            <Button type="submit">LOGIN</Button>
                        </Form.Group>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
}

function login(e){
    e.preventDefault();
    let request = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }
    axios.post('/',request).then(res =>{
        alert(res.data.message);
    }).catch(err=>{
        console.log(err);
    })
}

export default NavigationBar;