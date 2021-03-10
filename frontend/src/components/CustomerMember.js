import React, { Component } from 'react'
import { Pagination } from 'react-bootstrap';
import {Button, Form, InputGroup, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './CSS/CustomerMember.css'

export class CustomerMember extends Component {

    constructor(){
        super();
        this.state = {
            active: 0

        }
    }

    render() {

        const loginYet = localStorage.getItem('loginForm.loginyet');

        if(loginYet == "false"){
            return(
                <div style={{margin:"20px"}}>
                    <h2>Sorry.. This page is only for our employee!</h2>
                    <Link to="/"><Button>GO BACK</Button></Link>
                </div>
            );
        }

        return (
            <div className="container">
                <Card>
                    <Card.Header>
                            <div className="customer-info-header-text">CUSTOMER INFO</div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Form>
                                <Form.Group controlId="customer-first-name">
                                    <Form.Control type="text" placeholder="First name"></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="customer-middle-name">
                                    <Form.Control type="text" placeholder="Middle name"></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="customer-last-name">
                                    <Form.Control type="text" placeholder="Last name"></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="customer-contact">
                                    <Form.Control type="text" placeholder="Contact"></Form.Control>
                                </Form.Group>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>

                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Header>
                            <div className="customer-address-header-text">CUSTOMER ADDRESS</div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>

                        </Card.Text>
                    </Card.Body>
                    <Card.Footer style={{display:"flex", justifyContent:"center", alignItems:"center", textAlign:"center"}}>
                        <Pagination>
                            {this.renderAddress()}
                        </Pagination>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Header>
                            <div className="customer-card-header-text">CUSTOMER CARD</div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>

                    </Card.Footer>
                </Card>
            </div>
        )
    }
    renderAddress = () => {
        let items = [];
        for(let number = 1; number <= 4; number++){
            items.push(
                <Pagination.Item key={number} active={this.state.active == number} onClick={(e) => this.pageAddress(e,number)}>
                    {number}
                </Pagination.Item>
            )
        }
        return items
    }
    pageAddress = (e, number) => {
        this.setState({active:number})
        
    }
}

export default CustomerMember
