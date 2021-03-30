import React, { Component } from "react";
import axios from "axios";
import { Container, InputGroup, FormControl, Card, Button, CardColumns, Spinner, Form, Modal, Badge, Pagination } from "react-bootstrap";
import SelectSearch, { fuzzySearch } from 'react-select-search'
import Select from 'react-select'
import './CSS/SelectSearch.css'
import images from './Images/images'
import ShoppingCart from './ShoppingCart'

export default class Product extends Component {
    constructor(props) {
        super(props);


        this.state = {
            search: "",
            loading: false,
            filter: [],
            products: [],
            filterReady: false,
            productReady: false,
            supplierOptions: [],
            sizeOptions: [],
            sizeValue: [],
            supplierValue: 0,
            cartNum: 0,
            some: [],
            pagenumber: 1,
            allProducts: [],
        }

        axios.get('/products').then(res => {
            this.state.products = res.data
        })

        this.GetAllProducts();
        this.GetFilter();

    }

    componentDidUpdate(prevProps, prevState) {

        if (this.state.pagenumber !== prevState.pagenumber) {
            this.GetAllProducts()
            this.GetFilter()
        }

    }

    GetAllProducts = () => {

        axios.get('/products').then(res => {
            this.state.allProducts = res.data
            this.setState({
                productReady: true
            })
        })
    };

    GetFilter = async () => {

        await axios.get('/products/getsupplier').then(async res => {
            this.state.filter[0] = res.data

            await axios.get('/products/getsize').then(res2 => {
                this.state.filter[1] = res2.data

                this.setState({ filterReady: true })
            })
        })
    }

    ProductSearch = (e) => {
        this.setState({ productReady: false })
        axios.get('/products').then(res => {
            let keyword = e.target.value;

            this.setState({
                search: keyword,
                products: res.data
            });

            let regx = new RegExp(keyword, 'i')
            let productspecified = [];

            this.state.products.map((item) => {
                if (regx.test(item.ProductName)) {
                    productspecified.push(item)
                }
            })

            this.setState({
                products: productspecified,
                productReady: true
            })

        })
        if (e.target.value == "") {
            axios.get('/products').then(res => {
                this.setState({ products: res.data })
            })
            this.GetAllProducts()
        }
    };

    ProductRender = () => {
        if (!this.state.productReady) {
            return (
                <Spinner animation="border" role="status" />
            )
        }
        else {
            if (this.state.supplierValue == 0 && this.state.sizeValue.length == 0 && this.state.search == "") {
                return this.state.allProducts.map((item, i) => {
                    if (i < this.state.pagenumber * 9 && i >= (this.state.pagenumber - 1) * 9) {
                        { this.state.some[item.PID] = item }
                        return (
                            <Card key={item.PID}>
                                <Card.Body>
                                    <Card.Title>{item.ProductName}</Card.Title>
                                    <Card.Text>Made by {item.SName}</Card.Text>
                                    <Card.Text>Size: {item.Size}</Card.Text>
                                    <h2>${item.UnitPrice}</h2>
                                    {item.Stocks === 0 ? <Button variant="secondary">SOLD OUT</Button> :
                                        <Button variant="primary" value={item.PID} onClick={(e) => this.AddToCart(e)}>Add to Cart</Button>
                                    }
                                </Card.Body>
                            </Card>
                        )
                    }
                })
            } else {
                let data = []
                let sizeFilter = []
                this.state.sizeValue.forEach(item => {
                    sizeFilter.push(item.name)
                })
                this.state.allProducts.map(el1 => {
                    this.state.products.map(el2 => {
                        if (el1.PID == el2.PID || el1.SID == this.state.supplierValue || sizeFilter.includes(el1.Size))
                            data.push(el2)
                    })
                })
                const set = new Set(data)
                const array = [...set]

                return array.map((item, i) => {
                    if (i < this.state.pagenumber * 9 && i >= (this.state.pagenumber - 1) * 9) {
                        { this.state.some[item.PID] = item }
                        return (
                            <Card key={item.PID}>
                                <Card.Body>
                                    <Card.Title>{item.ProductName}</Card.Title>
                                    <Card.Text>Made by {item.SName}</Card.Text>
                                    <Card.Text>Size: {item.Size}</Card.Text>
                                    <h2>${item.UnitPrice}</h2>
                                    {item.Stocks === 0 ? <Button variant="secondary">SOLD OUT</Button> :
                                        <Button variant="primary" value={item.PID} onClick={(e) => this.AddToCart(e)}>Add to Cart</Button>
                                    }
                                </Card.Body>
                            </Card>
                        )
                    }
                })
            }
        }
    }

    Supplier_FilterRender = () => {
        if (!this.state.filterReady) {
            return (
                <Spinner animation="border" role="status" />
            )
        }

        else return this.state.filter[0].map((filter, i) => {
            this.state.supplierOptions[i] =
                { name: `${filter.SName}`, value: filter.SID }

            if (this.state.filter[0].length - 1 == i) {
                this.state.supplierOptions[i + 1] = {
                    name: "ALL SUPPLIER", value: 0
                }
            }
        })
    }

    Size_FilterRender = () => {
        if (!this.state.filterReady) {
            return (
                <Spinner animation="border" role="status" />
            )
        }
        else
            return this.state.filter[1].map((filter, i) => {
                this.state.sizeOptions[i] = {
                    name: filter.Size,
                    label: filter.Size,
                    value: i + 1
                }
            })
    }

    updateSupplierValue(e) {
        this.setState({ supplierValue: e })
    }

    updateSizeValue(e) {
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
        let data = this.state.some[e.target.value]

        let item = {
            sname: data.SName,
            size: data.Size,
            pid: data.PID,
            name: data.ProductName,
            amount: 1,
            price: data.UnitPrice,
            baseprice: data.UnitPrice,
            stocks: data.Stocks
        }

        this._cart.AddItem(item)
        this.renderCartLength()
    }

    renderCartLength = () => {
        this.setState({
            cartNum: this._cart?.GetCartSize()
        })
    }

    renderPage = () => {
        let pages = Math.ceil(this.state.products.length / 9)
        let page = []
        page.push(
            <Pagination.First key="first" onClick={() => this.setState({ pagenumber: 1 })}></Pagination.First>
        )
        page.push(
            <Pagination.Prev key="prev" onClick={() => {
                if (this.state.pagenumber != 1)
                    this.setState({ pagenumber: this.state.pagenumber - 1 })
            }}></Pagination.Prev>
        )
        for (let i = 1; i <= pages; i++) {
            page.push(
                <Pagination.Item key={i} active={i === this.state.pagenumber} onClick={() => this.setState({ pagenumber: i })}>
                    {i}
                </Pagination.Item>
            )
        }
        page.push(
            <Pagination.Next key="next" onClick={() => {
                if (this.state.pagenumber + 1 <= pages)
                    this.setState({ pagenumber: this.state.pagenumber + 1 })
            }}></Pagination.Next>
        )
        page.push(
            <Pagination.Last key="last" onClick={() => this.setState({ pagenumber: pages })}></Pagination.Last>
        )
        return page
    }

    render() {
        return (
            < Container fluid='xl' >
                {/*Searching Bar*/}
                <div style={{ width: "32%", marginTop: "20px", display: "inline-block", marginRight: "2%" }}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Search</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl onChange={(e) => this.ProductSearch(e)} />
                    </InputGroup>
                </div>

                {/*Filter Bar*/}
                < Form.Group style={{ position: "relative", top: "-2px", display: "inline-flex", flexDirection: 'row' }}>
                    {this.Supplier_FilterRender()}
                    {
                        this.state.filterReady ? <div style={{ marginBottom: "10px", marginRight: "20px" }}><SelectSearch search

                            onChange={(e) => this.updateSupplierValue(e)}
                            emptyMessage="Result not found"
                            placeholder="Select Supplier"
                            options={this.state.supplierOptions}
                            filterOptions={fuzzySearch}
                        /></div>
                            : null
                    }

                    {this.Size_FilterRender()}
                    {
                        this.state.filterReady ? <div style={{ width: "300px", fontFamily: 'Noto Sans, sans-serif', fontSize: "14px" }}><Select
                            isMulti
                            emptyMessage="Result not found"
                            placeholder="Select Size"
                            options={this.state.sizeOptions}
                            onChange={(e) => this.updateSizeValue(e)}
                        /></div>
                            : null
                    }
                </Form.Group >


                <ShoppingCart ref={(cart) => this._cart = cart} changeBadge={this.renderCartLength} GetAllProducts={this.GetAllProducts} />
                <Button variant="primary" onClick={this.DisplayCart}>Cart
                <Badge variant="danger" id="badge" style={{ marginLeft: "4px" }}>{this.state.cartNum}</Badge>

                </Button>

                { this.state.search == "" ? <></> : <h2>Search for: {this.state.search}</h2>}
                { this.state.allProducts.length == 0 ? <h2>No result</h2> : <></>}

                {/*Product Cards*/}
                <CardColumns>
                    {this.ProductRender()}
                </CardColumns>
                <Pagination>
                    {this.renderPage()}
                </Pagination>
            </Container >
        )
    }
}