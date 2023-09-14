import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Auth/Login';
import { SignIn } from './Pages/Auth/SignIn';
import { Home } from './Pages/HomePage/Home';
import {ViewPage} from './Pages/ViewPage/ViewPage'
import './assets/custom.css';

export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
      return (
        <main className='App'>
          <Routes>
                  <Route exact index element={<Login setAppState={this.setProps}/>} />
                  <Route exact path="sign-in" element={<SignIn setAppState={this.setProps}/>} />
                  <Route exact path="home"  element={ <Home />} />
                  <Route exact path="home/view-url/:id"  element={ <ViewPage />} />
          </Routes>
        </main>
    );
  }
}
