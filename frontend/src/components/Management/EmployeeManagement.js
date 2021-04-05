import axios from 'axios'
import React, { Component } from 'react'
import { Container, Table, Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FaUserPlus } from 'react-icons/fa'
import withReactContent from 'sweetalert2-react-content'
import AddEmployee from './employee/AddEmployee'

const ReactSwal = withReactContent(Swal)

export class EmployeeManagement extends Component {

    constructor(props) {
        super(props)

        this.state = {
            employeeInfo: [],
            visible: false,
            dno: null,
            eid: null,
            addEmployee: [],
            positionInfo: [],
        }

        axios.get('/login').then(res => {
            if (res.data.session?.user) {
                if (res.data.session.user.condition == 1)
                    if (res.data.session.user.position?.includes("Manager")) {
                        this.setState({ visible: true, dno: res.data.session.user.dno, eid: res.data.session.user.eid })
                        this.setEmployee()
                        axios.get('/employee/getPosition', { params: { dno: this.state.dno } }).then(res => {
                            let data = {
                                'Position': {
                                }
                            }
                            res.data.map(el => {
                                data.Position[el.Position] = el.Position
                            })
                            this.setState({ positionInfo: data })
                        })
                    }
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.addEmployee != prevState.addEmployee) {

        }
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
                            <Button variant="info" style={{ width: "100%" }} onClick={() => this.updateEmployeeInfo(el.EID, "Position")}>
                                {el.Position}
                            </Button>
                        </td>
                        <td>
                            <Button variant="success" style={{ width: "100%" }} onClick={() => this.updateEmployeeInfo(el.EID, "Salary")}>
                                {el.Salary}
                            </Button>
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

    updateEmployeeInfo(eid, type) {

        if (type == "Position") {
            Swal.fire({
                title: 'Enter new value',
                input: 'select',
                inputOptions: this.state.positionInfo,
                showCancelButton: true,
                showLoaderOnConfirm: true,
                preConfirm: (value) => {
                    axios.post('/employee/editEmployeeInfo', {
                        value, eid, type
                    }).then(res => {
                        Swal.fire({
                            title: res.data.status.toUpperCase(),
                            text: res.data.message,
                            icon: res.data.status,
                        })
                        this.setEmployee()
                    })
                }
            })
        } else {
            Swal.fire({
                title: 'Enter new value',
                input: 'text',
                showCancelButton: true,
                showLoaderOnConfirm: true,
                preConfirm: (value) => {
                    axios.post('/employee/editEmployeeInfo', {
                        value, eid, type
                    }).then(res => {
                        Swal.fire({
                            title: res.data.status.toUpperCase(),
                            text: res.data.message,
                            icon: res.data.status,
                        })
                        this.setEmployee()
                    })
                }
            })
        }
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

    Search = (e) => {

        axios.get('/employee', { params: { dno: this.state.dno } }).then(res => {
            let keyword = e.target.value;

            this.setState({
                employeeInfo: res.data
            });

            let regx = new RegExp(keyword, 'i')
            let productspecified = [];

            this.state.employeeInfo.map((item) => {
                if (regx.test(item.Name)) {
                    productspecified.push(item)
                }
            })

            this.setState({
                employeeInfo: productspecified,

            })

        })
        if (e.target.value == "") {
            this.setEmployee()
        }
    }

    addEmployee() {
        ReactSwal.fire({
            title: 'ADD EMPLOYEE',
            html: <AddEmployee onChangeValue={(value) => this.setState({ addEmployee: value })}></AddEmployee>,
            icon: 'info',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                axios.post('/employee/addEmployee', {
                    data: this.state.addEmployee
                }).then(res => {
                    Swal.fire({
                        title: res.data.status.toUpperCase(),
                        text: res.data.message,
                        icon: res.data.status,
                    })
                    this.setEmployee()
                })
            }
        })
    }

    render() {
        if (this.state.visible == true) {
            return (
                <Container style={{ marginTop: "20px" }}>
                    <Row>

                        <Col sm={8}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>SEARCH FOR</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl autoComplete="off" onChange={(e) => this.Search(e)} placeholder="Type Employee Name here"></FormControl>
                            </InputGroup>
                        </Col>
                        <Col sm={4}>
                            <Button variant="success" style={{ width: "100%" }} onClick={() => this.addEmployee()}>
                                ADD EMPLOYEE <FaUserPlus style={{ color: "white" }} /></Button>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                        <Table striped bordered hover responsive>
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
                    </Row>
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
