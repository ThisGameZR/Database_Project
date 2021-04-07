import axios from 'axios'
import React, { Component } from 'react'
import { Button,Card, InputGroup, FormControl, Badge} from 'react-bootstrap'
import Swal from 'sweetalert2'
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
            document.getElementById('FirstName').value = res.data.customerInfo.FirstName
            document.getElementById('MiddleName').value = res.data.customerInfo.MiddleName
            document.getElementById('LastName').value = res.data.customerInfo.LastName
            document.getElementById('contact').value = res.data.customerInfo.Contact
            document.getElementById('point').innerHTML = res.data.customerInfo.Points
        })
    }

    deleteCustomer(){
        
        axios.post('/customer/deleteCustomer', {cid : this.props.cid}).then(res => {
            Swal.fire({
                title: res.data.status.toUpperCase(),
                text: res.data.message,
                icon: res.data.status,
            })
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
                        <Button variant="outline-success">POINTS <span style={{fontSize:"26", fontWeight:"600"}} id="point"></span></Button>
                        
                    </Card.Body>
                    <Card.Footer>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}

export default EditCustomerProfile
