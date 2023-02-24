import React, { Component } from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';
import { hostLink } from './../../HostLink';
import axios from 'axios';
import { navigate } from "@reach/router"
import { Navigate } from "react-router-dom";

export class SignIn extends Component {
    static displayName = SignIn.name;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            confirmPass: ''
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleConfirmPassChange = this.handleConfirmPassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handlePassChange(event) {
        this.setState({ pass: event.target.value });
    }

    handleConfirmPassChange(event) {
        this.setState({ confirmPass: event.target.value });
    }

    handleSubmit(event) {
        if (this.state.pass === this.state.confirmPass) {

            axios.post(hostLink + `api/users`, {
                Login: this.state.email,
                Password: this.state.pass,
                Admin: false
            })

            navigate('home', {
                state: {
                    Login: this.state.email,
                    Password: this.state.pass,
                    Admin: false
                }
            }
            );
            window.location.reload()
            debugger
        }
        else
        {
            alert("Passwords are different")
        }


        event.preventDefault();
    }

    render() {
        return (
            <div className="Login-Form Auth-form-container">
                <form className="Auth-form"
                    onSubmit={this.handleSubmit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="text-center">
                            Already have account?{" "}
                            <Link to="/">
                                Login
                            </Link>
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                value={this.state.pass}
                                onChange={this.handlePassChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Confirm password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Confirm password"
                                value={this.state.confirmPass}
                                onChange={this.handleConfirmPassChange}
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
