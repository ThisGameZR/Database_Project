import React, { Component } from 'react'
import { Col, Container, Nav, Row, Button, Tab, Form,Card, InputGroup, FormControl} from 'react-bootstrap'
import axios from 'axios'
import {Link} from 'react-router-dom'
import SelectSearch, {fuzzySearch } from 'react-select-search'
import './CSS/EditCustomer.css'
import EditCustomerProfile from './EditCustomer/EditCustomerProfile'
import EditCustomerAddress from './EditCustomer/EditCustomerAddress'
import EditCustomerCard from './EditCustomer/EditCustomerCard'

export class EditCustomer extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            loginYet:false,
            customer:[],
            customerValue: 0,
        }
        axios.get('/login').then(res => {
            if(res.data.session?.user){
                this.setState({loginYet : true})
            }
        })    
    }
    
    componentDidMount(){
        
        let data = []
        axios.get('/customer').then(res => {
            Object.entries(res.data.customer).forEach(([key,value]) => {
                data[key] = {name: value.name, value: value.cid}
            })
            this.setState({customer: data})            
        })
    
    }

    render() {
        if(this.state?.loginYet === true){
            return (
                <Container fluid style={{margin:"20px"}}>
                   <Tab.Container id="tab" defaultActiveKey="profile">
                        <Row>
                            <Col sm={3} style={{}}>
                                <SelectSearch search
                                                
                                                onChange={(e) => this.setState({customerValue: e})} 
                                                emptyMessage="Result not found"
                                                placeholder="Select Customer" 
                                                options={this.state.customer}
                                                filterOptions={fuzzySearch}
                                />
                                <Nav className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="profile">Edit Profile</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="address">Edit Address</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="card">Edit Card</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content style={{width:"60%"}}>
                                    <Tab.Pane eventKey="profile">
                                        <EditCustomerProfile cid={this.state.customerValue}/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="address">
                                        <EditCustomerAddress cid={this.state.customerValue}/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="card">
                                        <EditCustomerCard cid={this.state.customerValue}/>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Container>
            )
        }else{
            return(
                <div style={{margin:"20px"}}>
                    <h2>Sorry.. This page is only for our employee!</h2>
                    <Link to="/"><Button>GO BACK</Button></Link>
                </div>
            );
        }
    }
}

export default EditCustomer
