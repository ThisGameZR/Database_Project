import axios from 'axios'
import React, { Component } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export class EmployeeManagement extends Component {

    constructor(props) {
        super(props)

        this.state = {
            employeeInfo: [],
            visible: false,
            dno: null,
            eid: null,
        }

        axios.get('/login').then(res => {
            if (res.data.session?.user) {
                if (res.data.session.user.position == "Manager") {
                    this.setState({ visible: true, dno: res.data.session.user.dno, eid: res.data.session.user.eid })
                    this.setEmployee()
                }
            }
        })

    }

    setEmployee() {

        axios.get('/employee', { params: { dno: this.state.dno } }).then(res => {
            this.setState({ employeeInfo: res.data })
        })
    }

    renderEmployee() {

        return this.state.employeeInfo.map(el => {
            if (el.EID !== this.state.eid)
                return (
                    <tr key={el.EID}>
                        <td>
                            {el.EID}
                        </td>
                        <td>
                            {el.Name}
                        </td>
                        <td>
                            {el.Position}
                        </td>
                        <td>
                            {el.Salary}
                        </td>
                        <td>
                            <Button variant="danger" style={{ width: "100%" }} onClick={() => this.fireEmployee(el.EID)}>
                                FIRE
                        </Button>
                        </td>
                    </tr>
                )
        })
    }

    fireEmployee(eid) {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'question',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                axios.post('/employee/fireEmployee', { eid }).then(res => {
                    Swal.close()
                    Swal.fire({
                        title: res.data.status.toUpperCase(),
                        text: res.data.message,
                        icon: res.data.status,
                    })
                })
            }
        })
    }

    render() {
        if (this.state.visible == true) {
            return (
                <Container>
                    <Table>
                        <thead>
                            <tr>
                                <th>EID</th>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Salary</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderEmployee()}
                        </tbody>
                    </Table>
                </Container>
            )
        } else {
            return (
                <div style={{ margin: "20px" }}>
                    <h2>Sorry.. This page is only for Manager!</h2>
                    <Link to="/"><Button>GO BACK</Button></Link>
                </div>
            )
        }
    }
}

export default EmployeeManagement
