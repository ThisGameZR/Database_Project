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
            currentAddress: null,
        }
    }
    
    setAddress(){
        let cid = this.props.cid
        axios.get('/customer/EditAddress',{params: {cid}}).then(res => {
            let min = Infinity
            res.data.addressInfo.map(el => {
                if(el.CAddrID < min){
                    min = el.CAddrID
                }
            })
            this.renderAddress(min,res.data.addressInfo)
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
                                <Button key={el.CAddrID} onClick={() => this.renderAddress(el.CAddrID)}>{i+1}</Button>
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

    renderAddress(CAddrID,addressInfo){
        addressInfo = addressInfo || this.state.addressInfo
        addressInfo.map(el => {
                if(el.CAddrID == CAddrID){
                    this.state.currentAddress = CAddrID
                    document.getElementById('Address').value = el.Address
                    document.getElementById('City').value = el.City
                    document.getElementById('Province').value = el.Province
                    document.getElementById('PostalCode').value = el.PostalCode
                    document.getElementById('Country').value = el.Country
                }
        })
    }

    addAddress(){

        let req = {
            cid: this.state.cid,
        }
        axios.post('/customer/editAddress/addAddress', req).then(res => {
            this.setAddress()
        })

    }

    deleteAddress() {
        let req = {
            CAddrID: this.state.currentAddress
        }
        axios.post('/customer/editAddress/deleteAddress', req).then(res => {
            this.setAddress()
        })
    }

    async submit(e) {
        const msg = await EditInfo(e, '', this.state.currentAddress)
        
        if (msg != "EDIT" && msg == "SAVE") {
            axios.get('/customer/editAddress', { params: { cid: this.props.cid } }).then(res => {
                this.setState({ addressInfo: res.data.addressInfo })
            })
        }
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
                                <Button variant="outline-danger" onClick={(e) => this.submit(e)} id="Address-edit">EDIT</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>City</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="City" disabled autoComplete="off"/>
                            <InputGroup.Append> 
                                <Button variant="outline-danger" onClick={(e) => this.submit(e)} id="City-edit">EDIT</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Province</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="Province" disabled autoComplete="off"/>
                            <InputGroup.Append> 
                                <Button variant="outline-danger" onClick={(e) => this.submit(e)} id="Province-edit">EDIT</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Postal Code</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="PostalCode" disabled autoComplete="off"/>
                            <InputGroup.Append> 
                                <Button variant="outline-danger" onClick={(e) => this.submit(e)} id="PostalCode-edit">EDIT</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Country</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="Country" disabled autoComplete="off"/>
                            <InputGroup.Append> 
                                <Button variant="outline-danger" onClick={(e) => this.submit(e)} id="Country-edit">EDIT</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <Button variant="danger" onClick={() => this.deleteAddress()}>DELETE</Button>
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
