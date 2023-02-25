import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';
import { navigate } from "@reach/router"
import axios from 'axios';
import { hostLink } from './../../HostLink';

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = {
            Login: '',
            Password: ''
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
    }

    handleEmailChange(event) {
        this.setState({
            Login: event.target.value,
            Password: this.state.Password
        });        
    }

    handlePassChange(event) {
        this.setState({
            Login: this.state.Login,
            Password: event.target.value
        });        
    }

    handleSubmit(event) {
        axios.post(hostLink + `api/users/validate`, {
            Login: event.target[0].value,
            Password: event.target[1].value,
            Admin: false
        }).then(response =>
        {
            localStorage.clear()

            localStorage.setItem("ID", response.data.id)
            localStorage.setItem("Login", response.data.login) 
            localStorage.setItem("Password", response.data.password)
            localStorage.setItem("Admin", response.data.admin)

            navigate('home');
            window.location.reload()
        }
        )
        
        
  
    }

    render() {
        return (
            <div className='Login-Form'>
                <form className="Auth-form"
                    onSubmit={this.handleSubmit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Login</h3>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <Link to="/sign-in">
                                Sign Up
                            </Link>
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                value={this.state.Login}
                                onChange={this.handleEmailChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                value={this.state.Password}
                                onChange={this.handlePassChange}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" value="Submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}