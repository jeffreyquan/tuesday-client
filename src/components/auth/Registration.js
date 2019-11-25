import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect, Link} from 'react-router-dom';

import axios from 'axios'

export default class Registration extends Component {
    constructor(props){
        super(props);

        this.state={
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors:""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }
    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })

    }

    handleSubmit(event){
        event.preventDefault();
        const {
            email,
            password,
            password_confirmation
        } = this.state;

        axios.post('http://localhost:3000/registrations', {
            user: {
                email: email,
                password: password,
                password_confirmation: password_confirmation
                }
            },
            {withCredentials: true}
        ).then(response => {
            if (response.data.status === 'created'){
                axios.post('http://localhost:3000/session', {
                    user: {
                        email: email,
                        password: password,
                    },
                    },
                    {withCredentials: true}
                ).then(response => {
                    if (response.data.logged_in){
                    localStorage.setItem('jwt', response.data.jwt);
                    this.props.handleSuccessfulAuth(response.data);
                }
                }).catch(error => {
                    console.log('Login error', error);
                })
        }
        }).catch(error => {
            console.log('Registration error', error);
        })
    }

    render(){
        return(
            <div>
                <form onSubmit= {this.handleSubmit}>
                <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                />
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                />
                <input
                    type='password'
                    name='password_confirmation'
                    placeholder='Password_confirmation'
                    value={this.state.password_confirmation}
                    onChange={this.handleChange}
                    required
                />
                <button type='submit'> Registration </button>
                </form>

                
            </div>
        )
    }
}
