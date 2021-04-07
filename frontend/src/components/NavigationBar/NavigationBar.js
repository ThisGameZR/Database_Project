import React, { useState, Component } from 'react';
import { Container, Image, Navbar, Nav, NavDropdown, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from "axios";
import shoppingCart from '../Images/shoppingCart.png';
import LoginForm from './LoginForm';
import '../CSS/Navigation.css';


export class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginYet: false,
            position: null,
            dno: null,
        }

    }

    setLoginYet = (bool) => {
        if (bool) {

            axios.get('/login').then(res => {
                if (res.data.session?.user) {
                    if (res.data.session.user.condition == 1)
                        this.setState({
                            loginYet: true,
                            position: res.data.session.user.position,
                            dno: res.data.session.user.dno
                        })
                }
            })
        }
    }

    render() {

        return (
            <Navbar bg="light" expand="lg" collapseOnSelect>
                {/* Header bar */}
                <Container>
                    <Navbar.Brand href="/">
                       PlastShop
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav mr="auto" style={{ marginRight: "auto" }}>
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
                            {this.state.loginYet == true && this.state.dno == '100' ?
                            <NavDropdown title="Employee Menu" id="responsive-nav-dropdown" variant="dark">
                                <NavDropdown.Item href="/customerMember">
                                    {this.state.loginYet == true && this.state.dno == '100' ? <Nav.Link href="/customerMember">Customer Register</Nav.Link> : null}
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/EditCustomer">
                                    {this.state.loginYet == true && this.state.dno == '100' ? <Nav.Link href="/EditCustomer">Edit Customer</Nav.Link> : null}
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/SaleManagement">
                                    {this.state.loginYet == true && this.state.dno == '100' ? <Nav.Link href="/SaleManagement">Sale Management</Nav.Link> : null}
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/EmployeeManagement">
                                    {this.state.position?.includes("Manager") ? <Nav.Link href="/EmployeeManagement">Employee Management</Nav.Link> : null}
                                </NavDropdown.Item>
                            </NavDropdown>
                            : null}
                            {/* {this.state.loginYet == true && this.state.dno == '100' ? <Nav.Link href="/customerMember">Customer Register</Nav.Link> : null}
                            {this.state.loginYet == true && this.state.dno == '100' ? <Nav.Link href="/EditCustomer">Edit Customer</Nav.Link> : null}
                            {this.state.loginYet == true && this.state.dno == '100' ? <Nav.Link href="/SaleManagement">Sale Management</Nav.Link> : null}
                            {this.state.position?.includes("Manager") ? <Nav.Link href="/EmployeeManagement">Employee Management</Nav.Link> : null} */}
                        </Nav>
                        <LoginForm setLoginYet={(bool) => this.setLoginYet(bool)} />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}



export default NavigationBar;
