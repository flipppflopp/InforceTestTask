import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';
import { hostLink } from './../../HostLink';
import axios from 'axios';
import { navigate } from "@reach/router"

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: ''
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handlePassChange(event) {
        this.setState({ pass: event.target.value });
    }

    handleSubmit(event) {
        if (this.state.pass === this.state.confirmPass) {

            axios.get(hostLink + `api/users/` + this.state.email)
            .then(function (response) {
                console.log(response);
            })

            navigate('/table/home', {
                state: {
                    Login: this.state.email,
                    Password: this.state.pass,
                    Admin: false
                }
            }
            );
            window.location.reload()
        }
        else {
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
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
