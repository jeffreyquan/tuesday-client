import styled from 'styled-components';
import axios from 'axios'

import React, { Component } from 'react';

import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardOutlined';

/////////////////////////////////////////////////////////
    const Title = styled.h1`
        color: black;
        text-align: center;
        font-size: 40px;
        font-weight: 100;
        line-height: 1.1;
        `;

    const LoginForm = styled.form`
        font-size: 1.5em;
        text-align: center;
        transform: translate(-60px, 0)
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
        width: 120px;
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
        border: none;
        border-bottom: 2px solid #0d91ca;
        background: #0fa2e2;
        color: white;
        line-height: 0em;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        &:hover{
            background-color: #0F91CA

        }
    `;

export default class Login extends Component {
    constructor(props){
        super(props);

        this.state={
            email: "shaneen@ga.co",
            password: "chicken",
            loginErrors:""
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
        } = this.state;

        axios.post('https://tuesday-server.herokuapp.com/session', {
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

    render(){
        return(
            <div>
                <LoginForm onSubmit={this.handleSubmit}>

                <Title> <span style={{fontWeight: "700", paddingLeft: "120px"}}>Log</span> In</Title>
                <InputBox>
                <Label> Email </Label>
                <Input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                />
                </InputBox>
                <InputBox>
                <Label> Password </Label>
                <Input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                />
                </InputBox>
                <div style={{margin: "0", padding: "5px", height: "50px"}}>
                <Label></Label>
                <BlueP>Forget your password?</BlueP>
                </div>
                <div style={{margin: "0", padding: "0"}}>
                <Label></Label>
                <Button type='submit'> Log in <ArrowForwardRoundedIcon style={{fontSize:"25px", paddingLeft: '3px'}} /> </Button>
                </div>

                </LoginForm>
            </div>

        )
    }
}
