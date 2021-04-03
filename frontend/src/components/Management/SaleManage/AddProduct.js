import React, { Component } from 'react'
import { Container, Form, Button, Card, Col, Row } from 'react-bootstrap'
import SelectSearch, { fuzzySearch } from 'react-select-search'
import Select from 'react-dropdown-select'
import axios from 'axios'
import Swal from 'sweetalert2'

export class AddProduct extends Component {

    constructor(props) {
        super(props)

        this.state = {
            supplierValue: null,
            supplierOptions: [],
            sizeOptions: [],
            sizeValue: null,
        }
        this.getSupplier()
        this.declareOptions()
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.onChange != prevProps.onChange) {
    //         this.declareOptions()
    //     }
    // }

    componentWillUnmount() {
        this.setState({ sizeOptions: [] })
    }

    async declareOptions() {
        let sizeOptions = await [
            {
                "id": 1,
                "size": "xs",
                "name": "Extra Small",
            }, {
                "id": 2,
                "size": "s",
                "name": "Small"
            }, {
                "id": 3,
                "size": "m",
                "name": "Medium",
            }, {
                "id": 4,
                "size": "l",
                "name": "Large",
            }, {
                "id": 5,
                "size": "xl",
                "name": "Extra Large",
            }, {
                "id": 6,
                "size": "xxl",
                "name": "Extra+ Large",
            }
        ]

        this.setState({ sizeOptions })

    }

    getSupplier() {
        axios.get('/products/getsupplier').then(res => {
            res.data.map((el, i) => {
                this.state.supplierOptions[i] = {
                    name: el.SName,
                    value: el.SID
                }
            })

            this.setState({ supplierOptions: this.state.supplierOptions })
        })
    }

    supplier(e) {
        e.preventDefault();
        let request = {
            sname: document.getElementById('sname').value,
            contact: document.getElementById('contact').value,
            address: document.getElementById('address').value,
        }
        axios.post('/insertProduct/supplier', request).then(res => {
            Swal.fire({
                title: `${res.data.message}`,
                icon: 'success',
            })
            this.getSupplier()

        }).catch(err => {
            console.log(err);
        });
    }
    product(e) {
        e.preventDefault();

        let request = {
            sid: this.state.supplierValue,
            productname: document.getElementById('productname').value,
            unitprice: document.getElementById('unitprice').value,
            size: this.state.sizeValue[0].size,
            stock: document.getElementById('stock').value
        }

        axios.post('/insertProduct/product', request).then(res => {

            Swal.fire({
                title: `${res.data.message}`,
                icon: 'success',
            })

        }).catch(err => {
            console.log(err);
        });
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col sm={6}>
                        <Card>
                            <Card.Header></Card.Header>
                            <Card.Body>
                                <Form onSubmit={(e) => this.supplier(e)}>
                                    <Form.Group>
                                        <h2>ADD SUPPLIER</h2>
                                        <Form.Control id="sname" placeholder="Supplier Name"></Form.Control>
                                        <Form.Control id="contact" placeholder="Supplier Contact"></Form.Control>
                                        <Form.Control id="address" placeholder="Supplier Address"></Form.Control>
                                        <Button variant="success" type="submit" style={{ marginTop: "20px" }}>ADD SUPPLIER</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                            <Card.Footer></Card.Footer>
                        </Card>
                    </Col>
                    <Col sm={6}>
                        <Card>
                            <Card.Header></Card.Header>
                            <Card.Body>
                                <Form onSubmit={(e) => this.product(e)}>
                                    <Form.Group>
                                        <h2>ADD PRODUCT</h2>
                                        {this.state.supplierOptions.length != 0 ?
                                            < SelectSearch
                                                value={this.state.supplierValue}
                                                onChange={(e) => this.setState({ supplierValue: e })}
                                                emptyMessage="Result not found"
                                                placeholder="Select Supplier"
                                                options={this.state.supplierOptions}
                                                filterOptions={fuzzySearch}
                                            ></ SelectSearch>
                                            : null}
                                        <Form.Control id="productname" placeholder="Product Name"></Form.Control>
                                        <Form.Control id="unitprice" placeholder="Unit Price"></Form.Control>

                                        {this.state.sizeOptions.length != 0 ?
                                            <Select
                                                options={this.state.sizeOptions}
                                                placeholder="Select Product Size"
                                                onChange={values => this.setState({ sizeValue: values })}
                                                labelField="name"
                                                valueField="size"
                                                color="#ff6984"
                                            />
                                            : null}
                                        <Form.Control id="stock" placeholder="Number in stocks"></Form.Control>
                                        <Button variant="success" type="submit" style={{ marginTop: "10px" }}>ADD PRODUCT</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                            <Card.Footer></Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container >
        )
    }
}
export default AddProduct
