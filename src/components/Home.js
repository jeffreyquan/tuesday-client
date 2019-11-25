import React, {Component, useState, useEffect} from 'react'
import {BrowserRouter, Switch, Route, Redirect, Link} from 'react-router-dom';

import Registration from './auth/Registration'
import Login from './auth/Login'
import axios from 'axios'

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            signUpBox: false
        }

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(data){
        this.props.handleLogin(data);
        this.props.history.push("/dashboard")
    }


    render(){
        return(
            <div>
                <h1>Tuesday</h1>
                <p>Status: {this.props.loggedInStatus}</p>
                <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
                <p> Don't have an account? <Link to="/signup"> Sign Up!</Link> </p>

            </div>
        )
    }
}
