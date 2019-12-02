import React, {Component} from 'react'

import Registration from './auth/Registration'
import Login from './auth/Login'
import styled from 'styled-components';
import Logo2 from '../image/logo2.svg'
///////////////////////////////////////////////////////////////////////////////
const Header = styled.div`
    padding-left: 15px;
    border-bottom: 1px solid #e0e0e0;
    height: 70px;
    background: #f7f7f7;
    margin-bottom: 8em;
    `;

const Msg = styled.p`
    color: gray;
    font-size: 1.2em;
    font-family: "Abel";
    text-align: center;
    height: 30px;
`;

const Goto = styled.span`
    color: #0086C0;
    font-size: 1em;
    font-family: "Abel";
    background: white;
    border: none;
    outline: none;

    &:hover{
        color: #0186C0;
        background-color:transparent;
        border: none;
        text-decoration: underline;
    }

`;


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
                <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
                <Msg>Back to <Goto className="btn btn-primary p-3" onClick= {() => this.toggleSignUpBox()}> Log In!</Goto></Msg>
            </div>
        } else {
            entryBox =
            <div>
                <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                <Msg> Don't have an account? <Goto className="btn btn-primary pl-3" onClick= {() => this.toggleSignUpBox()}> Sign Up!</Goto> </Msg>
            </div>
        }

        return(
            <div style={{backgroundColor: 'white', minHeight: '100vh'}}>
                <Header><img alt="logo" src={Logo2} style={{height: "75px"}}/></Header>
                {entryBox}
                <></>
            </div>
        )
    }
}
