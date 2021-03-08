import React, {Component} from "react";
import axios from "axios";
import { Container, Navbar, InputGroup, FormControl, Card, Button, CardColumns, Spinner, Form} from "react-bootstrap";
import SelectSearch, { fuzzySearch } from 'react-select-search'
import './CSS/SelectSearch.css'
import images from './Images/images'

export default class Product extends Component {
    constructor(){
        super();
        this.state = {
            search: "",
            loading: false,
            error: null,
            products: [],
            filter: [],
            filterReady: false,
            productReady: false,
            supplierOptions: [],
            supplierValue: 0,
            filteredProduct: []
        }

        this.GetAllProducts();
        this.GetFilter();
    }

    GetAllProducts = () => {
        axios.get('/products').then(res => {
            this.setState({
                products: res.data,
                productReady: true
            })
        })
    };

    GetFilter = () => {
        axios.get('/products/getsupplier').then(res => {
            this.state.filter.push(res.data)

            axios.get('/products/getsize').then(res2 => {
                this.state.filter.push(res2.data)

                this.setState({filterReady: true})
            })
        })
    }

    ProductSearch = (e) => {
        this.setState({productReady: false})
        axios.get('/products').then(res => {
            let keyword = e.target.value;

            this.setState({
                search: keyword,
                products: res.data
            });

            let regx = new RegExp(keyword, 'i')
            let productspecified = [];
            
            this.state.products.map((item) => {
                if (regx.test(item.ProductName))
                {
                    productspecified.push(item)
                }
            })
    
            this.setState({
                products: productspecified,
                productReady: true
            })
        })
    };

    ProductRender = () => {
        if (!this.state.productReady)
        {
            return (
                <Spinner animation="border" role="status"/>
            )
        }
        return this.state.products.map((item) => {
            if(this.state.supplierValue == item.SID || this.state.supplierValue == 0){
                return (
                    <Card key={item.PID}>
                        {images.map(({id,image}) => item.PID == id ? <Card.Img src={image} id={id} /> : null )}
                        <Card.Body>
                            <Card.Title>{item.ProductName}</Card.Title>
                            <h1>${item.UnitPrice}</h1>
                            <Button varient="primary" id={item.PID}>Add to Cart</Button>
                        </Card.Body>
                    </Card>
                )
            }
        })
    }

    Supplier_FilterRender = () => {

        if (!this.state.filterReady)
        {
            return (
                <Spinner animation="border" role="status"/>
            )
        }
        
        else return this.state.filter[0].map((filter,i) => {
            this.state.supplierOptions[i] =
                {name: `${filter.SName}`, value : filter.SID}
            })
    }

    Size_FilterRender = () => {
        if (!this.state.filterReady)
        {
            return (
                <Spinner animation="border" role="status"/>
            )
        }
        else
        return this.state.filter[1].map((filter, i) => {
            return (
                <Form.Check
                    style={{display:"inline-block"}}
                    type="checkbox"
                    key={i}
                    name={filter.Size}
                    label={filter.Size}
                />
            )
        })
    }

    updateSupplierValue(e){
        this.setState({ supplierValue : e })
        if(this.state.supplierOptions[this.state.supplierOptions.length-1].value != 0)
            this.setState({ supplierOptions: this.state.supplierOptions.concat([{name: "Select Supplier" , value: 0}])})
    }

    render() {
        return (
            <Container>
                {/*Searching Bar*/}
                <Navbar variant="dark" style={{width: "500px"}}>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Search</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl onChange={(e) => this.ProductSearch(e)}/>
                    </InputGroup>
                </Navbar>
            
                <Form.Group>
                    <Form.Check.Label>Supplier</Form.Check.Label>
                    {this.Supplier_FilterRender()}
                    {this.state.filterReady ? <div><SelectSearch search
                                                    value={this.state.supplierValue}
                                                    onChange={(e) => this.updateSupplierValue(e)} 
                                                    emptyMessage="Result not found"
                                                    placeholder="Select Supplier" 
                                                    options={this.state.supplierOptions}
                                                    filterOptions={fuzzySearch}
                                                    ></SelectSearch></div>
                    : null}
                    <Form.Check.Label>Size</Form.Check.Label> 
                    {this.Size_FilterRender()}
                </Form.Group>
                
                { this.state.search == "" ? <></> : <h2>Search for: {this.state.search} </h2>}
                {this.state.products.length == 0? <h2>No result</h2> : <></>}
                <CardColumns>
                    {this.ProductRender()}
                </CardColumns>
            </Container>
        )
    }
}