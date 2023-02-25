import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Auth/Login';
import { SignIn } from './components/Auth/SignIn';
import { Home } from './components/HomePage/Home';
import {ViewPage} from './components/ViewPage/ViewPage'
import './custom.css';

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
