import axios from 'axios';
import React, { Component } from 'react';
import { Layout } from '../Layout/Layout';
import { hostLink } from './../../HostLink';

export class ViewPage extends Component {
  static displayName = ViewPage.name;
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount()
    {
      
      debugger
    }

    componentWillUnmount(){
    }

    render() {
        return (
        <Layout>
            <h1>View page</h1>
        </Layout>
    );
  }
}
