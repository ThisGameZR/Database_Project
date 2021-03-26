import axios from 'axios'
import React, { Component } from 'react'
import { Button,Card, InputGroup, FormControl, ButtonToolbar, ButtonGroup} from 'react-bootstrap'
import EditInfo from './EditInfo'

export class EditCustomerAddress extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            cid: null,
            addressInfo: null,
            
        }
    }
    
    setAddress(){
        let cid = this.props.cid
        axios.get('/customer/EditAddress',{params: {cid}}).then(res => {
            this.setState({addressInfo: res.data.addressInfo})
        })
        this.state.cid = cid
    }
    
    renderButton(){
        return(
            <div>
                <ButtonToolbar>
                    <ButtonGroup>
                        {this.state.addressInfo.map((el,i) => {
                            return (
                                <Button key={el.CAddrID} onClick={() => this.renderAddress(el.CAddrID, el.CID)}>{i+1}</Button>
                            )
                        })}
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button onClick={() => this.addAddress()}>+</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </div>
        )
    }

    renderAddress(CAddrID, CID){
        console.log(CAddrID, CID)
    }

    addAddress(){

        let req = {
            cid: this.state.cid,
        }
        axios.post('/customer/editAddress/addAddress', req).then(res => {
            
        })

    }

    render() {
        return (
            <div>
                {this.props.cid && (this.state.addressInfo == null || this.state.cid != this.props.cid) ? this.setAddress() : null}
                <Card>
                    <Card.Header>
                            <div className="customer-info-header-text">CUSTOMER ADDRESS</div>
                    </Card.Header>
                    <Card.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Address</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="Address" disabled autoComplete="off"/>
                            <InputGroup.Append> 
                                <Button variant="outline-danger" onClick={(e) => EditInfo(e,this.props.cid)} id="Address-edit">EDIT</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>City</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="City" disabled autoComplete="off"/>
                            <InputGroup.Append> 
                                <Button variant="outline-danger" onClick={(e) => EditInfo(e,this.props.cid)} id="City-edit">EDIT</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Province</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="Province" disabled autoComplete="off"/>
                            <InputGroup.Append> 
                                <Button variant="outline-danger" onClick={(e) => EditInfo(e,this.props.cid)} id="Province-edit">EDIT</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Postal Code</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="PostalCode" disabled autoComplete="off"/>
                            <InputGroup.Append> 
                                <Button variant="outline-danger" onClick={(e) => EditInfo(e,this.props.cid)} id="PostalCode-edit">EDIT</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Country</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="Country" disabled autoComplete="off"/>
                            <InputGroup.Append> 
                                <Button variant="outline-danger" onClick={(e) => EditInfo(e,this.props.cid)} id="Country-edit">EDIT</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Card.Body>
                    <Card.Footer>
                        {this.state.addressInfo?.length > 0 ? this.renderButton() : null}
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}

export default EditCustomerAddress
