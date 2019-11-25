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
        this.toggleSignUpBox = this.toggleSignUpBox.bind(this)
    }

    handleSuccessfulAuth(data){
        this.props.handleLogin(data);
        this.props.history.push("/dashboard")
    }

    toggleSignUpBox(){
        this.state.signUpBox ? this.setState({signUpBox: false}) : this.setState( {signUpBox: true});
        this.forceUpdate()
    }

    render(){
        let entryBox
        if (this.state.signUpBox) {
            entryBox =
            <div>
                <h1>Tuesday</h1>
                <p>Status: {this.props.loggedInStatus}</p>
                <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
                <p>Back to <button className="btn btn-primary p-3" onClick= {() => this.toggleSignUpBox()}> Log In!</button></p>
            </div>
        } else {
            entryBox =
            <div>
                <h1>Tuesday</h1>
                <p>Status: {this.props.loggedInStatus}</p>
                <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                <p> Don't have an account? <button className="btn btn-primary pl-3" onClick= {() => this.toggleSignUpBox()}> Sign Up!</button> </p>
            </div>
        }

        return(
            <div>
                {entryBox}
            </div>
        )
    }
}
