import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect, Link} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios'
/////////////////////////////////////////////////////////
    const Title = styled.h1`
        color: black;
        text-align: center;
        font-size: 40px;
        font-weight: 100;
        line-height: 1.1;
        margin: .67em 0;
        `;

    const SignUpForm = styled.form`
        font-size: 1.5em;
        text-align: center;
        transform: translate(-100px, 0)

        `;

    const InputBox = styled.div`
        height: 40px;
        margin: 0;
    `;
    const Input = styled.input`
        border: 1px solid lightgrey;
        background-color: white;
        width: 350px;
        height:100%;
        margin: 0;
        padding: 6px 12px;
        color: black;
        font-size: 0.8em;
        font-family: "Abel";

        &:focus {
        border: 1px solid #0086C0;
        }
        `;

    const Label = styled.label`
        color: gray;
        width: 200px;
        font-size: 0.8em;
        font-family: "Abel";
        padding: 0.5em;
        text-align: right;
    `;

    const BlueP = styled.p`
        color: #0086C0;
        font-size: 0.8em;
        font-family: "Abel";
        display: inline-block;
        width: 350px;
        text-align: left;


        &:hover{
            color: #0F91CA
        }
    `;

    const Button = styled.button`
        width: 350px;
        height: 48px;
        font-size: 18px;
        font-weight: 700;
        border-radius: 15rem;
        line-height: 28px;
        border: none;
        border-bottom: 2px solid #0d91ca;
        background: #0fa2e2;
        color: white;

        &:hover{
            background-color: #0F91CA
        }
    `;

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
                <SignUpForm onSubmit= {this.handleSubmit}>
                <Title><span style={{fontWeight: "700", paddingLeft: "200px"}}>Sign</span> Up</Title>
                <InputBox>
                <Label>Email</Label>
                <Input
                    type='email'
                    name='email'
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                />
                </InputBox>
                <InputBox>
                <Label>Password</Label>
                <Input
                    type='password'
                    name='password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                />
                </InputBox>
                <InputBox>
                <Label>Password Confirmation</Label>
                <Input
                    type='password'
                    name='password_confirmation'
                    value={this.state.password_confirmation}
                    onChange={this.handleChange}
                    required
                />
                </InputBox>

                <div style={{marginTop: "30px", padding: "0"}}>
                <Label></Label>
                <Button type='submit'> Sign Up </Button>
                </div>
                </SignUpForm>


            </div>
        )
    }
}
