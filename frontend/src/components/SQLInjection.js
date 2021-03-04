import React, {useRef} from 'react';
import {Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function SQLInjection() {
    return (
        <div>
            <Form onSubmit={(e) => inject(e)}>
                <Form.Group>
                    <Form.Control id="eid" placeholder="EID"></Form.Control>
                    <Form.Control id="firstname" placeholder="firstname"></Form.Control>
                    <Form.Control id="middlename" placeholder="middlename"></Form.Control>
                    <Form.Control id="lastname" placeholder="lastname"></Form.Control>
                    <Form.Control id="position" placeholder="position"></Form.Control>
                    <Form.Control id="salary" placeholder="salary"></Form.Control>
                    <Form.Control id="dno" placeholder="dno"></Form.Control>
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
        firstname: document.getElementById('firstname').value,
        middlename: document.getElementById('middlename').value,
        lastname: document.getElementById('lastname').value,
        position: document.getElementById('position').value,
        salary: document.getElementById('salary').value,
        dno: document.getElementById('dno').value,
        password: document.getElementById('password1').value
    }
    axios.post('/sqlInjection',request).then(res =>{
        alert(res.data);
    }).catch(err => {
        console.log(err);
    });
}

export default SQLInjection;
