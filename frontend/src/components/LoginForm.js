import React, {useState} from 'react';
import {Col, Container, Row, Button, Image, Navbar, Nav, FormControl, Form, Tab} from 'react-bootstrap';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginForm() {
    const [loginyet, setLoginyet] = useState(false); 
    if(loginyet == false){
        return (
            <div>
                <Form inline onSubmit={(e) => login(e)}>                
                    <Form.Group>
                        <Form.Control autoComplete="off" type="text" placeholder="Employee ID" id="username" style={{marginRight:"10px"}}></Form.Control>
                        <Form.Control type="password" placeholder="Password" id="password" style={{marginRight:"10px"}}></Form.Control>
                        <Button type="submit">LOGIN</Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }else{ // Already login 
        return(
            <>
                <Navbar.Brand id="welcomeMessage"></Navbar.Brand>
            </>
        );
    }
    function login(e){
        e.preventDefault();
        let request = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        }
        axios.post('/login',request).then(res =>{
            setLoginyet(true);
            document.getElementById('welcomeMessage').innerHTML = res.data.message;
        }).catch(err=>{
            console.log(err);
        })
    }
}

