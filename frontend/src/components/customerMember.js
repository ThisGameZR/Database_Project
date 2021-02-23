import React, { Component } from 'react'
import {} from 'react-bootstrap';
import {Link,} from 'react-router-dom';

export class customerMember extends Component {
    render() {

        const loginYet = localStorage.getItem('loginForm.loginyet');

        if(loginYet == "false"){
            return(
                <>
                    <h2>Sorry! This page is only for Employee</h2>
                    <Link to="/">GO BACK</Link>
                </>
            );
        }

        return (
            <div>
                
            </div>
        )
    }
}

export default customerMember
