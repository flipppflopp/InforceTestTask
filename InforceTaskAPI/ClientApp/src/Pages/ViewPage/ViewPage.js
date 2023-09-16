import axios from 'axios';
import React, { Component } from 'react';
import { Layout } from '../../Layout/Layout';
import { hostLink } from '../../constants/HostLink';

export default class ViewPage extends Component {
  static displayName = ViewPage.name;
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount()
    {
      
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
