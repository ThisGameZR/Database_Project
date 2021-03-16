import React, {Component} from "react";
import axios from "axios";
import { Container, InputGroup, FormControl, Card, Button, CardColumns, Spinner, Form, Modal} from "react-bootstrap";
import SelectSearch, {fuzzySearch } from 'react-select-search'
import Select from 'react-select'
import './CSS/SelectSearch.css'
import images from './Images/images'
import ShoppingCart from './ShoppingCart'
export default class Product extends Component {
    constructor(){
        super();

        this.state = {
            search: "",
            loading: false,
            products: [],
            filter: [],
            filterReady: false,
            productReady: false,
            supplierOptions: [],
            sizeOptions: [],
            sizeValue: [],
            supplierValue: 0,
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
        else
        {
            return this.state.products.map((item) => {
                if(this.state.sizeValue.length == 0)
                {
                    if(this.state.supplierValue == item.SID || this.state.supplierValue == 0){
                        return (
                            <Card key={item.PID}>
                                <Card.Body>
                                    <Card.Title>{item.ProductName}</Card.Title>
                                    <Card.Text>Made by {item.SName}</Card.Text>
                                    <Card.Text>Size: {item.Size}</Card.Text>
                                    <h2>${item.UnitPrice}</h2>
                                    <Button varient="primary" value={item.PID} name={item.ProductName} onClick={(e) => this.AddToCart(e)}>Add to Cart</Button>
                                </Card.Body>
                            </Card>
                        )
                    }
                }
                else
                {
                    let sizeFilter = []
                    this.state.sizeValue.forEach(item => {
                        sizeFilter.push(item.name)
                    })

                    if((this.state.supplierValue == item.SID || this.state.supplierValue == 0) && sizeFilter.includes(item.Size)){
                        return (
                            <Card key={item.PID}>
                                <Card.Body>
                                    <Card.Title>{item.ProductName}</Card.Title>
                                    <Card.Text>Made by {item.SName}</Card.Text>
                                    <Card.Text>Size: {item.Size}</Card.Text>
                                    <h1>${item.UnitPrice}</h1>
                                    <Button varient="primary" value={item.PID} name={item.ProductName} onClick={(e) => this.AddToCart(e)}>Add to Cart</Button>
                                </Card.Body>
                            </Card>
                        )
                    }
                }
            })
        }
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
            this.state.sizeOptions[i] = {
                name: filter.Size,
                label: filter.Size,
                value: i+1
            }
        })
    }

    updateSupplierValue(e){
        this.setState({ supplierValue : e })
        if(this.state.supplierOptions[this.state.supplierOptions.length-1].value != 0)
            this.setState({ supplierOptions: this.state.supplierOptions.concat([{name: "All" , value: 0}])})
    }

    updateSizeValue(e){
        this.setState({
            sizeValue: e
        })
    }

    // When you want to use method of 'ShoppingCart' class
    // 1.) add ref to component and assign component to object
    // 2.) when you want to call method, just call it regularly on that object

    DisplayCart = () => {
        this._cart.CartShow()
    }

    AddToCart = (e) => {
        let item = {
            pid: e.target.value,
            name: e.target.name,
            amount: 1
        }

        this._cart.AddItem(item)
    }

    render() {
        return (

            <Container fluid='xl'>
                
                {/*Searching Bar*/}
                <div style={{width:"32%", marginTop:"20px", display:"inline-block", marginRight:"2%"}}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Search</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl onChange={(e) => this.ProductSearch(e)}/>
                    </InputGroup>
                </div>
            

                {/*Filter Bar*/}
                <Form.Group style={{position:"relative",top:"-2px", display:"inline-flex", flexDirection:'row'}}>
                    {this.Supplier_FilterRender()}
                    {this.state.filterReady ?   <div style={{marginBottom:"10px", marginRight:"20px"}}><SelectSearch search
                                                
                                                    onChange={(e) => this.updateSupplierValue(e)} 
                                                    emptyMessage="Result not found"
                                                    placeholder="Select Supplier" 
                                                    options={this.state.supplierOptions}
                                                    filterOptions={fuzzySearch}
                                                /></div>
                    : null}

                    {this.Size_FilterRender()}
                    {this.state.filterReady ?   <div style={{width:"300px", fontFamily: 'Noto Sans, sans-serif', fontSize:"14px"}}><Select 
                                                    isMulti
                                                    emptyMessage="Result not found"
                                                    placeholder="Select Size"
                                                    options={this.state.sizeOptions}
                                                    onChange={(e) => this.updateSizeValue(e)}
                                                /></div>
                    : null}
                </Form.Group>
                
                <Button varient="primary" onClick={this.DisplayCart}>Cart</Button>
                <ShoppingCart ref={(cart) => this._cart = cart}/>

                {this.state.search == "" ? <></> : <h2>Search for: {this.state.search}</h2>}
                {this.state.products.length == 0? <h2>No result</h2> : <></>}

                {/*Product Cards*/}
                <CardColumns>
                    {this.ProductRender()}
                </CardColumns>
                
            </Container>
        )
    }
}