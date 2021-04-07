import React, { useState, useEffect } from 'react';
import { Button, Navbar, Form } from 'react-bootstrap';
import axios from "axios";
import Swal from 'sweetalert2';
import {FaCaretDown} from "react-icons/fa";

export default function LoginForm(props) {
    const [loginyet, setLoginyet] = useState(false);
    const [user, setUser] = useState("");

    useEffect(() => {
        axios.get('/login').then(res => {
            if (res.data.session?.user) {
                if (res.data.session.user.condition == 1) {
                    setLoginyet(true)
                    setUser(res.data.session.user.name)
                    props.setLoginYet(true)
                }
            } else {
                setLoginyet(false)
            }
        })
    }, [loginyet])

    if (loginyet == false) {

        return (
            <div>
                <Form inline onSubmit={(e) => login(e)}>
                    <Form.Group className="mr-sm-2">
                        <Form.Control autoComplete="off" type="text" placeholder="Employee ID" id="username" style={{ marginRight: "10px" }}></Form.Control>
                        <Form.Control type="password" placeholder="Password" id="password" style={{ marginRight: "10px" }}></Form.Control>
                        <Button variant="success" type="submit">Login</Button>
                    </Form.Group>
                </Form>
            </div>
        )
    } else { // Already login 

        return (
            <>
                <Navbar.Text>
                    Signed in as: 
                    
                    <a href="#">{user} </a>
                </Navbar.Text>
                
                <Button variant="success" onClick={(e) => logout(e)}>LOG OUT</Button>
            </>
        );
    }
    function login(e) {
        e.preventDefault();
        let request = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        }
        axios.post('/login', request).then(res => {
            if (res.data.success == true) {
                setLoginyet(true)
                Swal.fire(
                    'LOGIN SUCCESS',
                    `Welcome ${user}!`,
                    'success',
                )
            } else {
                Swal.fire(
                    'LOGIN FAILED',
                    `Please try again`,
                    'error',
                )
                document.getElementById('username').value = "";
                document.getElementById('password').value = "";
            }
        })
    }
    function logout(e) {
        axios.get('/login/logout').then(res => {
            Swal.fire(
                'LOGOUT SUCCESS',
                `Good bye ${user}`,
                'success',
            )
        })
        setLoginyet(false);
        window.location.href = "/"
    }
}

