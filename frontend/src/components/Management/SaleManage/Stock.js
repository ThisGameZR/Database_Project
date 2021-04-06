import React, { Component } from 'react'
import { Container, Table, FormControl, InputGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './CSS/stock.css'
import Swal from 'sweetalert2'
import { FaTrashAlt } from 'react-icons/fa'

export class Stock extends Component {

    constructor(props) {
        super(props)

        this.state = {
            products: [],
            position: null,
        }
        this.setProduct()
        axios.get('/login').then(res => {
            this.setState({ position: res.data.session.user.position })
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.onChange != prevProps.onChange) {
            this.setProduct()
        }
    }

    setProduct() {
        axios.get('/products/orderbypid').then(res => {
            this.setState({ products: res.data })
        })
    }

    renderStock = () => {

        return this.state.products.map(el => {
            return (
                <tr key={el.PID}>
                    <td>{el.PID}</td>
                    <td>
                        <Button variant="info" style={{ width: "100%" }}
                            onClick={() => this.editProduct(el.PID, "productname")}>
                            {el.ProductName}
                        </Button>
                    </td>
                    <td>{el.SName}</td>
                    <td>
                        <Button variant="warning" style={{ width: "100%", fontWeight: "bold" }}
                            onClick={() => this.editProduct(el.PID, "unitprice")}>
                            {el.UnitPrice}
                        </Button>
                    </td>
                    <td>
                        <Button variant="primary" style={{ width: "100%" }}
                            onClick={() => this.editProduct(el.PID, "size")}>
                            {el.Size}
                        </Button>
                    </td>
                    <td>
                        <Button variant="success" style={{ width: "100%" }}
                            onClick={() => this.editProduct(el.PID, "stocks")}>
                            {el.Stocks}
                        </Button>
                    </td>
                    <td><Button variant="danger" style={{ width: "100%" }}
                        onClick={() => this.deleteProduct(el.PID)}><FaTrashAlt /></Button></td>
                </tr >
            )
        })

    }

    deleteProduct(pid) {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'question',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                axios.post('/products/deleteProduct', {
                    pid
                }).then(res => {
                    Swal.fire({
                        title: `${res.data.status.toUpperCase()}`,
                        text: `${res.data.message}`,
                        icon: res.data.status,
                    })
                    this.setProduct()
                })
            }
        })
    }

    editProduct = (pid, type) => {

        Swal.fire({

            title: 'Enter new value',
            icon: 'info',
            input: 'text',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: (value) => {

                axios.post('/products/editStock', {
                    value, pid, type
                }).then(res => {

                    Swal.fire({
                        title: `${res.data.status.toUpperCase()}`,
                        text: `${res.data.message}`,
                        icon: res.data.status,
                    })

                    this.setProduct()
                })
            }
        })

    }

    Search = (e) => {

        axios.get('/products/orderbypid').then(res => {
            let keyword = e.target.value;

            this.setState({
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

            })

        })
        if (e.target.value == "") {
            this.setProduct()
        }
    }

    render() {
        if (this.state.position?.includes("Warehouse") || this.state.position?.includes("Manager")) {
            return (
                <Container>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>SEARCH FOR</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl autoComplete="off" onChange={(e) => this.Search(e)} placeholder="Type Product Name here"></FormControl>
                    </InputGroup>
                    <Table striped bordered hover variant="dark" responsive>
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Product Name</th>
                                <th>Supplier Name</th>
                                <th>UnitPrice</th>
                                <th>Size</th>
                                <th>Stocks</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderStock()}
                        </tbody>
                    </Table>
                </Container>

            )
        } else {
            return (
                <div style={{ margin: "20px" }}>
                    <h2>Sorry.. This page is only for Warehouse Officer!</h2>
                </div>
            )
        }
    }
}

export default Stock
