import React, { Component, useState  } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';
import { hostLink } from './../../constants/HostLink';
import { connect } from 'react-redux';
import userActions from "./../../store/actions/userActions"
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const navigate = useNavigate(); // Отримати об'єкт history для переходу
  
    const [Login, setLogin] = useState('');
    const [Password, setPassword] = useState('');
  
    const handleEmailChange = (event) => {
      setLogin(event.target.value);
    }
  
    const handlePassChange = (event) => {
      setPassword(event.target.value);
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      await axios.post(hostLink + `api/users/validate`, {
        Login,
        Password
      }).then(response => {
        let data = response.data
        props.setUser(data)
      })
  
      navigate("home");
    }
        return (
            <div className='Login-Form'>
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
                                value={Login}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                value={Password}
                                onChange={handlePassChange}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch) => {
    return {
      setUser: (user) => dispatch({ type: userActions.setUser, payload: user }),
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);