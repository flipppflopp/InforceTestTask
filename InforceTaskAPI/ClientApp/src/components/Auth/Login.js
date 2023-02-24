import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';
import { hostLink } from './../../HostLink';
import axios from 'axios';
import { navigate } from "@reach/router"
import { Navigate } from "react-router-dom";

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = {
            Login: '',
            Password: '',
            Admin: false
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({
            Login: event.target.value,
            Password: this.state.Password
        });
    }

    handlePassChange(event) {
        var login = this.state.Login

        this.setState({
            Login: login,
            Password: event.target.value
        });

        var result = this.state;

        debugger
    }

    handleSubmit() {
        axios.post(hostLink + `api/users/validate`, {
            Login: this.state.Login,
            Password: this.state.Password,
            Admin: false
        }).then(response =>
            this.setState({
            Login: response.data.login,
            Password: response.data.password,
            Admin: response.data.admin
            })
        )

        
    }




    render() {
        return (
            <div className="Login-Form Auth-form-container">
                <form className="Auth-form">
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
                            <Link className="btn btn-primary" to="/home" onClick={this.handleSubmit()} state={this.state}>
                                Submit 
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
