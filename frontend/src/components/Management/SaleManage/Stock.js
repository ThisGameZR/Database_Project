import React, { Component } from 'react'
import { Container, Table, FormControl, InputGroup, Button } from 'react-bootstrap'
import axios from 'axios'
import './CSS/stock.css'
import Swal from 'sweetalert2'

export class Stock extends Component {

    constructor(props) {
        super(props)

        this.state = {
            products: []
        }
        this.setProduct()
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
                        <Button variant="success" style={{ width: "100%" }}
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
                        <Button variant="danger" style={{ width: "100%" }}
                            onClick={() => this.editProduct(el.PID, "stocks")}>
                            {el.Stocks}
                        </Button>
                    </td>
                </tr >
            )
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
        this.setState({ productReady: false })
        axios.get('/products/orderbypid').then(res => {
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
            this.setProduct()
        }
    }

    render() {
        return (
            <Container>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>SEARCH FOR</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl autoComplete="off" onChange={(e) => this.Search(e)} id="search" placeholder="Type Product Name here"></FormControl>
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
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderStock()}
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default Stock
