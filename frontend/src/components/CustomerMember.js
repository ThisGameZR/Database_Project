import React, { Component } from 'react'
import { Pagination } from 'react-bootstrap';
import {Button, Form, InputGroup, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './CSS/CustomerMember.css'

export class CustomerMember extends Component {

    constructor(){
        super();
        this.state = {
            active: 0,
            maxAddress: 3,
            address: [],
            
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
                            <Form onSubmit={(e) => }>
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
                                <Button variant="success">SUBMIT</Button>
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
                            <Form>
                                <fieldset id="customer-address-form" disabled>
                                    <Form.Group controlId="customer-id">
                                        <Form.Control type="text" placeholder="Customer ID"></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="customer-address">
                                        <Form.Control type="text" placeholder="Address"></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="customer-address-city">
                                        <Form.Control type="text" placeholder="City"></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="customer-address-province">
                                        <Form.Control type="text" placeholder="Province"></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="customer-address-postal-code">
                                        <Form.Control type="text" placeholder="Postal Code"></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="customer-address-country">
                                        <Form.Control type="text" placeholder="Country"></Form.Control>
                                    </Form.Group>
                                    <Button variant="success">SUBMIT</Button>
                                </fieldset>
                            </Form>
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
                            <Form>
                                <fieldset id="customer-card-form" disabled>
                                    <Form.Group controlId="customer-id">
                                        <Form.Control type="text" placeholder="Customer ID"></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="customer-card-number">
                                        <Form.Control type="text" placeholder="Card Number"></Form.Control>
                                    </Form.Group>
                                    <Button variant="success">SUBMIT</Button>
                                </fieldset>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>

                    </Card.Footer>
                </Card>
            </div>
        )
    }

    submitCustomer = () => {
        
    }

    renderAddress = () => {
        let items = [];
        for(let number = 1; number <= this.state.maxAddress ; number++){
            
            if(number === this.state.maxAddress-1){
                number = "+"
            }
            if(number === this.state.maxAddress){
                number = "-"
            }
            items.push(
                <Pagination.Item key={number} active={this.state.active == number} onClick={(e) => this.pageAddress(e,number)}>
                    {number}
                </Pagination.Item>
            )
            if(number === "+"){
                number = this.state.maxAddress-1
            }
        }
        return items
    }
    pageAddress = (e, number) => {
        this.setState({active:number})
        if(number === parseInt(number,10) && number != this.state.maxAddress-1){

            

        }
        
        if(number == this.state.maxAddress-1){ /// number === "+"
            
            this.setState({maxAddress: this.state.maxAddress+1})

        }
        if(number == "-"){
            
            this.setState({maxAddress: this.state.maxAddress-1})

        }
    }
}

export default CustomerMember

