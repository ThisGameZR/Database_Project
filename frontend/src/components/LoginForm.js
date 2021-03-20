import React, {useState, useEffect} from 'react';
import {Button, Navbar, Form} from 'react-bootstrap';
import axios from "axios";
import setAuthorizationToken from '../utils/setAuthorizationToken';
import ToastBox from './ToastBox';

const LOCAL_STORAGE_KEY_LOGIN = "loginForm.loginyet";
const LOCAL_STORAGE_KEY_USER = "loginForm.user";

export default function LoginForm() {
    const [loginyet, setLoginyet] = useState(false);
    const [user,setUser] = useState("");
    const [toast, setToast] = useState(false);

    useEffect(() => {
        axios.get('/login').then(res => {
            if(res.data.session?.user){
                setLoginyet(true)
            }else{
                setLoginyet(false)
            }
        })
    });

    useEffect(()=>{
        
        const storedUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USER));

        if(storedUser) setUser(storedUser);
        
    }, []);


    useEffect(()=>{
        localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(user))
    },[user]);

    if(loginyet == false){
    
        return (
            <div>
                <ToastBox message={user} ></ToastBox>
                <Form inline onSubmit={(e) => login(e)}>                
                    <Form.Group className="mr-sm-2">
                        <Form.Control autoComplete="off" type="text" placeholder="Employee ID" id="username" style={{marginRight:"10px"}}></Form.Control>
                        <Form.Control type="password" placeholder="Password" id="password" style={{marginRight:"10px"}}></Form.Control>
                        <Button variant="success" type="submit">LOGIN</Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }else{ // Already login 
        
        return(
            <>
                
                <ToastBox message={"You login as " + user} ></ToastBox>
                <div style={{width:"280px"}}></div>
                <Navbar.Brand id="welcomeMessage">{user}</Navbar.Brand>
                <Button variant="success"onClick={(e) => logout(e)}>LOG OUT</Button>
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
            if(res.data.success == true){
                setUser(res.data.message);
                setMyToast(true);
                window.location.reload(false);
            }else{
                setUser(res.data.message);
                setMyToast(true);
                window.location.reload(false);
                document.getElementById('username').value = "";
                document.getElementById('password').value = "";
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    function logout(e){
        setLoginyet(false);
        axios.get('/login/logout').then(res => {
            console.log(res.data);
        })
        window.location.reload(false);
    }
    function setMyToast(x){
        setToast(x);
        localStorage.setItem("loginForm.toast",x);
    }
}

