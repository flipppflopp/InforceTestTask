import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout/Layout';
import { Login } from './components/Auth/Login';
import { SignIn } from './components/Auth/SignIn';
import { Home } from './components/HomePage/Home';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
      return (
              <Routes>
                  <Route index element={<Login />} />
                  <Route path="sign-in" element={<SignIn />} />
                  <Route path="home" element={<Home />} />
              </Routes>
            
    );
  }
}
