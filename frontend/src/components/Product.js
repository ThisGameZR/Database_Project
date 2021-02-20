import React, {Component} from "react";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import axios from "axios";
import { Container, Navbar, InputGroup, FormControl } from "react-bootstrap";

export default class Product extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            price: "not yet gotten"
        }
    }
    buttonClick = () => {
        axios.get("/product").then(res => {
           this.setState({
               name: res.data[1].ProductName,
               price: res.data[1].Price
            });
        });
    };

    ProductSearch = (e) => {
        let keyword = e.target.value;
        this.setState({
            name: keyword
        })
    };

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
                <Router>
                    <Switch>
                        {/* <Route path="/products" exact component={AllProduct}/>
                        <Route path="/products/kitchentools" exact component={KitchenProduct}/>
                        <Route path="/products/everydaytools" exact component={DailyTools}/>
                        <Route path="/products/kidtoys" exact component={KidToys}/> */}
                    </Switch>
                </Router>
            </Container>
        )
    }
}