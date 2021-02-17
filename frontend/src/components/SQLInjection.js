import React from 'react';
import {Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function SQLInjection() {
    return (
        <div>
            <Form onSubmit={(e) => inject(e)}>
                <Form.Group>
                    <Form.Control id="eid" placeholder="EID"></Form.Control>
                    <Form.Control id="username1" placeholder="username"></Form.Control>
                    <Form.Control id="password1" placeholder="password"></Form.Control>
                    <Button type="submit">SUBMIT</Button>
                </Form.Group>
            </Form>
        </div>
    )
}
function inject(e){
    e.preventDefault();
    let request = {
        eid: document.getElementById('eid').value,
        username: document.getElementById('username1').value,
        password: document.getElementById('password1').value
    }
    axios.post('/sqlInjection',request).then(res =>{
        alert(res.data);
    }).catch(err => {
        console.log(err);
    });
}

export default SQLInjection;
