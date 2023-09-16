import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';
import { hostLink } from './../../constants/HostLink';
import { connect } from 'react-redux';
import userActions from "./../../store/actions/userActions";

function SignIn(props) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    Login: '',
    Password: '',
    ConfPassword: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formState.Password === formState.ConfPassword) {
      try {
        await axios.post(hostLink + `api/users`, {
          Login: formState.Login,
          Password: formState.Password,
          Admin: false
        });

        const response = await axios.post(hostLink + `api/users/validate`, {
          Login: formState.Login,
          Password: formState.Password,
          Admin: false
        });

        const data = response.data;
        props.setUser(data);

        navigate("/home");
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Passwords are different");
    }
  };

  return (
    <div className="Login-Form Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already have an account?{" "}
            <Link to="/">Login</Link>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              name="Login"
              value={formState.Login}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              name="Password"
              value={formState.Password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Confirm password"
              name="ConfPassword"
              value={formState.ConfPassword}
              onChange={handleInputChange}
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

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch({ type: userActions.setUser, payload: user }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
