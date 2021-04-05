import axios from 'axios'
import React, { Component } from 'react'
import { Container, FormControl, FormGroup, Form } from 'react-bootstrap'
import Select from 'react-select'

export class AddEmployee extends Component {

    constructor(props) {
        super(props)

        this.state = {
            info: {},
            dno: null,
            positionInfo: [],
            positionValue: null,
            password: '',
            eid: '',
            firstname: '',
            middlename: '',
            lastname: '',
            salary: '',
        }

        axios.get('/login').then(res => {
            this.setState({ dno: res.data.session.user.dno })
            document.getElementById('form-dno').value = this.state.dno
            axios.get('/employee/getPosition', { params: { dno: this.state.dno } }).then(res => {

                let position = []
                res.data.map((el, i) => {
                    position[i] = {
                        'value': el.Position,
                        'label': el.Position,
                    }
                })

                this.setState({ positionInfo: position, positionValue: position[0] })
            })
        })
    }

    async setInfo(e, type) {

        if (type == "eid")
            this.state.eid = e.target.value
        if (type == 'firstname')
            this.state.firstname = e.target.value
        if (type == 'middlename')
            this.state.middlename = e.target.value
        if (type == 'lastname')
            this.state.lastname = e.target.value
        if (type == 'position')
            this.setState({ positionValue: e })
        if (type == 'salary')
            this.state.salary = e.target.value
        if (type == 'password')
            this.state.password = e.target.value

        this.state.info =
        {
            eid: this.state.eid,
            password: this.state.password,
            firstname: this.state.firstname,
            middlename: this.state.middlename,
            lastname: this.state.lastname,
            position: this.state.positionValue.value,
            salary: this.state.salary,
            dno: this.state.dno,
        }

        this.props.onChangeValue(this.state.info)
    }

    render() {
        return (
            <Container>
                <Form>
                    <FormGroup>
                        <FormControl onInput={(e) => this.setInfo(e, "eid")} placeholder="Employee ID" autoComplete="off"></FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl onInput={(e) => this.setInfo(e, "password")} placeholder="Password" autoComplete="off" type="password"></FormControl>
                    </FormGroup>
                    <FormGroup controlId="form-firstname">
                        <FormControl onInput={(e) => this.setInfo(e, "firstname")} placeholder="First Name" autoComplete="off"></FormControl>
                    </FormGroup>
                    <FormGroup controlId="form-middlename">
                        <FormControl onInput={(e) => this.setInfo(e, "middlename")} placeholder="Middle Name" autoComplete="off"></FormControl>
                    </FormGroup>
                    <FormGroup controlId="form-lastname">
                        <FormControl onInput={(e) => this.setInfo(e, "lastname")} placeholder="Last Name" autoComplete="off"></FormControl>
                    </FormGroup>
                    <FormGroup controlId="form-position">
                        <Select
                            defaultValue={this.state.positionInfo[0]}
                            options={this.state.positionInfo}
                            isSearchable={true}
                            onChange={(e) => this.setInfo(e, "position")}
                        />
                    </FormGroup>
                    <FormGroup controlId="form-salary">
                        <FormControl onInput={(e) => this.setInfo(e, "salary")} placeholder="Salary" autoComplete="off"></FormControl>
                    </FormGroup>
                    <FormGroup controlId="form-dno">
                        <FormControl disabled></FormControl>
                    </FormGroup>
                </Form>
            </Container>
        )
    }
}

export default AddEmployee
