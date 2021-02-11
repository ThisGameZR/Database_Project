import React, {Component} from "react";
import axios from "axios";

export default class Product extends Component {
    constructor(){
        super();
        this.state = {
            name: "not yet gotten",
            price: "not yet gotten"
        }
    }
    buttonClick = () => {
        axios.get("/product").then(res => {
           this.setState({
               name: res.data[0].name,
               price: res.data[0].price
            });
        });
    };

    render() {
        return (
            <div>
                <button onClick={this.buttonClick}>Get Product from backend</button>
                <h1>The product name is:{this.state.name} </h1>
                <h1>The product price is:{this.state.price}</h1>
            </div>
        )
    }
}