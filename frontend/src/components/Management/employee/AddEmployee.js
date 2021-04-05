import React, { Component } from 'react'
import { Container, FormControl, FormGroup, Form } from 'react-bootstrap'

export class AddEmployee extends Component {

    constructor(props) {
        super(props)

        this.state = {
            info: {},
        }
    }

    setInfo() {
        this.setState({
            info: {
                eid: document.getElementById('form-eid').value,
                firstname: document.getElementById('form-firstname').value,
                middlename: document.getElementById('form-middlename').value,
                lastname: document.getElementById('form-lastname').value,
                position: document.getElementById('form-position').value,
                salary: document.getElementById('form-salary').value,
                dno: document.getElementById('form-dno').value,
            }
        })
    }

    render() {
        return (
            <Container>
                <Form>
                    <FormGroup controlId="form-eid">
                        <FormControl onBlur={() => this.setInfo()}></FormControl>
                    </FormGroup>
                    <FormGroup controlId="form-firstname">
                        <FormControl onBlur={() => this.setInfo()}></FormControl>
                    </FormGroup>
                    <FormGroup controlId="form-middlename">
                        <FormControl onBlur={() => this.setInfo()}></FormControl>
                    </FormGroup>
                    <FormGroup controlId="form-lastname">
                        <FormControl onBlur={() => this.setInfo()}></FormControl>
                    </FormGroup>
                    <FormGroup controlId="form-position">
                        <FormControl onBlur={() => this.setInfo()}></FormControl>
                    </FormGroup>
                    <FormGroup controlId="form-salary">
                        <FormControl onBlur={() => this.setInfo()}></FormControl>
                    </FormGroup>
                    <FormGroup controlId="form-dno">
                        <FormControl onBlur={() => this.setInfo()}></FormControl>
                    </FormGroup>
                </Form>
            </Container>
        )
    }
}

export default AddEmployee
