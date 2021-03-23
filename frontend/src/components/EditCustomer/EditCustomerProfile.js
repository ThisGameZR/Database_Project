import React, { Component } from 'react'
import { Col, Container, Nav, Row, Button, Tab, Form,Card, InputGroup, FormControl} from 'react-bootstrap'
import EditInfo from './EditInfo'

export class EditCustomerProfile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>
                            <div className="customer-info-header-text">CUSTOMER PROFILE</div>
                    </Card.Header>
                    <Card.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>First Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="first-name" disabled/>
                            <InputGroup.Append> 
                                <Button variant="outline-danger" onClick={(e) => EditInfo(e)} id="first-name-edit">EDIT</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Middle Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="middle-name" disabled/>
                            <InputGroup.Append> 
                                <Button variant="outline-danger" onClick={(e) => EditInfo(e)} id="middle-name-edit">EDIT</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Last Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="last-name" disabled/>
                            <InputGroup.Append> 
                                <Button variant="outline-danger" onClick={(e) => EditInfo(e)} id="last-name-edit">EDIT</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Contact</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="contact" disabled/>
                            <InputGroup.Append> 
                                <Button variant="outline-danger" onClick={(e) => EditInfo(e)} id="contact-edit">EDIT</Button>
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
