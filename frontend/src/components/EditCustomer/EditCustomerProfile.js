import axios from 'axios'
import React, { Component } from 'react'
import { Col, Container, Nav, Row, Button, Tab, Form,Card, InputGroup, FormControl} from 'react-bootstrap'
import EditInfo from './EditInfo'

export class EditCustomerProfile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             customerInfo: null,
        }
        
    }

    setCustomer(){
        let cid = this.props.cid
        axios.get('/customer/editProfile', {params: {cid}}).then(res => {
            this.state.customerInfo = res.data.customerInfo
            document.getElementById('FirstName').value = res.data.customerInfo[0].FirstName
            document.getElementById('MiddleName').value = res.data.customerInfo[0].MiddleName
            document.getElementById('LastName').value = res.data.customerInfo[0].LastName
            document.getElementById('contact').value = res.data.customerInfo[0].Contact
        })
    }

    render() {
        return (
            <div>
                {this.props.cid ? this.setCustomer() : null}
                <Card>
                    <Card.Header>
                            <div className="customer-info-header-text">CUSTOMER PROFILE</div>
                    </Card.Header>
                    <Card.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>First Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="FirstName" disabled autoComplete="off"/>
                            <InputGroup.Append> 
                                <Button variant="outline-danger" onClick={(e) => EditInfo(e,this.props.cid)} id="FirstName-edit">EDIT</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Middle Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="MiddleName" disabled autoComplete="off"/>
                            <InputGroup.Append> 
                                <Button variant="outline-danger" onClick={(e) => EditInfo(e,this.props.cid)} id="MiddleName-edit">EDIT</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Last Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="LastName" disabled autoComplete="off"/>
                            <InputGroup.Append> 
                                <Button variant="outline-danger" onClick={(e) => EditInfo(e,this.props.cid)} id="LastName-edit">EDIT</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Contact</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="contact" disabled autoComplete="off"/>
                            <InputGroup.Append> 
                                <Button variant="outline-danger" onClick={(e) => EditInfo(e,this.props.cid)} id="contact-edit">EDIT</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Card.Body>
                    <Card.Footer>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}

export default EditCustomerProfile
