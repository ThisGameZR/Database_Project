import React, {Component} from "react";
import axios from "axios";
import { Container, Navbar, InputGroup, FormControl, Card, Button, CardColumns} from "react-bootstrap";

export default class Product extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            loading: false,
            error: null,
            products: []
        }

        this.GetAllProducts();
    }

    GetAllProducts = () => {
        axios.get('/products').then(res => {
            this.setState({
                products: res.data
            })
        })
    };

    ProductSearch = (e) => {
        axios.get('/products').then(res => {
            this.setState({
                products: res.data
            });

            let keyword = e.target.value;
            let regx = new RegExp(keyword, 'i')
            let productspecified = [];
            
            this.state.products.map((item) => {
                if (regx.test(item.ProductName))
                {
                    productspecified.push(item)
                }
            })
    
            this.setState({
                name: keyword,
                products: productspecified
            })
        })
    };

    ProductRender = () => {
        return this.state.products.map((item) => {
            return (
                <Card key={item.ID}>
                    <Card.Body>
                        <Card.Title>{item.ProductName}</Card.Title>
                        <h1>${item.Price}</h1>
                        <Button varient="primary" id={item.ID}>Add to Cart</Button>
                    </Card.Body>
                </Card>
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
                <h1>{this.state.name}</h1>

                <CardColumns>
                    {this.ProductRender()}
                </CardColumns>
            </Container>
        )
    }
}