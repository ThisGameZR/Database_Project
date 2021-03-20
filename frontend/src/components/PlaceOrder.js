import React, { Component } from 'react'
import {Button, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'

export class PlaceOrder extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             loginYet:false,
             cart:[],
        }
        axios.get('/login').then(res => {
            if(res.data.session?.user){
                this.setState({loginYet : true})
            }
        })
        
    }

    componentDidMount(){
        let items = JSON.parse(localStorage.getItem("itemInCart")) 
        this.state.cart = items
    }

    itemDisplay = () => {
        
    }

    render() {

        if(this.state?.loginYet === true){
            return (
                <div>
                    <h2>PLACE ORDER PAGE</h2>
                    {console.log(this.state.cart)}
                </div>
            )
        }else{
            return(
                <div style={{margin:"20px"}}>
                    <h2>Sorry.. This page is only for our employee!</h2>
                    <Link to="/"><Button>GO BACK</Button></Link>
                </div>
            );
        }
    }
}

export default PlaceOrder
