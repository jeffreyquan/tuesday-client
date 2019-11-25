import React, {Component} from 'react';
import axios from 'axios'

export default class Login extends Component {
    constructor(props){
        super(props);

        this.state={
            email: "",
            password: "",
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

    render(){
        return(
            <div>
                <form onSubmit= {this.handleSubmit} className="col-md-9 form-inline" >
                <input className="form-control ml-3"
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                />
                
                <input className="form-control ml-3"
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                />

                <button className="btn btn-secondary ml-3" type='submit'> Login </button>
                </form>
            </div>
        )
    }
}
