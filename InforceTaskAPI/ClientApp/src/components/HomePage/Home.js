import React, { Component } from 'react';
import { Layout } from '../Layout/Layout';

export class Home extends Component {
  static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount()
    {
        alert(this.props)
        debugger
        console.log(this.props)
    }




    render() {
        return (
        <Layout>
        
            <h1>Home page </h1>
                </Layout>
    );
  }
}
