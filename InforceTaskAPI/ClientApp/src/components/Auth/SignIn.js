import React, { Component } from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';
import { hostLink } from './../../HostLink';
import axios from 'axios';
import { navigate } from "@reach/router"

export class SignIn extends Component {
    static displayName = SignIn.name;

    constructor(props) {
        super(props);
        this.state = {
            Login: '',
            Password: '',
            ConfPassword: ''
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleConfirmPassChange = this.handleConfirmPassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        localStorage.clear()
    }

    handleEmailChange(event) {
        this.setState({ Login: event.target.value,
                        Password: this.state.Password,
                        ConfPassword: this.state.ConfPassword});
    }

    handlePassChange(event) {
        this.setState({ Login: this.state.Login,
                        Password: event.target.value,
                        ConfPassword: this.state.ConfPassword });
    }

    handleConfirmPassChange(event) {
        this.setState({ Login: this.state.Login,
                        Password: this.state.Password, 
                        ConfPassword: event.target.value });
    }

    handleSubmit(event) {
        if (this.state.Password === this.state.ConfPassword) {

            axios.post(hostLink + `api/users`, {
                Login: this.state.Login,
                Password: this.state.Password,
                Admin: false
            }).then(response =>
                {
                    axios.post(hostLink + `api/users/validate`, {
                        Login: this.state.Login,
                        Password: this.state.Password,
                        Admin: false
                    }).then(response =>
                    {
                        localStorage.clear()

                        localStorage.setItem("ID", response.data.id)
                        localStorage.setItem("Login", response.data.login) 
                        localStorage.setItem("Password", response.data.password)
                        localStorage.setItem("Admin", response.data.admin)

                        navigate('home');
                        window.location.reload()                    })

                })
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
                        <div className="form-group mt-3">
                            <label>Confirm password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Confirm password"
                                value={this.state.ConfPassword}
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
