import React, {Component} from "react";
import axios from "axios";
import { Container, Navbar, InputGroup, FormControl, Card, Button, CardColumns, Spinner, Form} from "react-bootstrap";

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
            productReady: false
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
        return this.state.products.map((item) => {
            return (
                <Card key={item.PID}>
                    <Card.Body>
                        <Card.Title>{item.ProductName}</Card.Title>
                        <h1>${item.UnitPrice}</h1>
                        <Button varient="primary" id={item.PID}>Add to Cart</Button>
                    </Card.Body>
                </Card>
            )
        })
    }

    Supplier_FilterRender = () => {
        if (!this.state.filterReady)
        {
            return (
                <Spinner animation="border" role="status"/>
            )
        }
        else
        return this.state.filter[0].map(filter => {
            return (
                <Form.Check
                    type="checkbox"
                    key={filter.SID}
                    name={filter.SName}
                    label={filter.SName}
                />
            )
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
                    type="checkbox"
                    key={i}
                    name={filter.Size}
                    label={filter.Size}
                />
            )
        })
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
                    <Form.Check.Label>Size</Form.Check.Label>
                    {this.Size_FilterRender()}
                </Form.Group>

                <h1>{this.state.search}</h1>
                <CardColumns>
                    {this.ProductRender()}
                </CardColumns>
            </Container>
        )
    }
}