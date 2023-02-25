import axios from 'axios';
import React, { Component } from 'react';
import { Layout } from '../Layout/Layout';
import { hostLink } from './../../HostLink';
import "./Home.css"
import { Link } from "react-router-dom";

export class Home extends Component {
  static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = {
          URLs: [],
          newURL: '',
          deleteID: 0
        }

        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
      axios.get(hostLink + "api/urls")
        .then(response => {
          this.setState({ URLs: response.data });
      })
    }

    handleUrlChange(event) {
      this.setState({
          URLs: this.state.URLs,
          newURL: event.target.value
      });        
    }

    handleSubmit(event) {
      axios.post(hostLink + `api/urls`, {
        DefaultURL: event.target[0].value,
        ShourtedURL: "",
        CreatorID: localStorage.getItem("ID")
    }).then(response =>
    {
      console.log(response)
      debugger
    })
    
    
    }


    renderAddSection()
    {
      if(localStorage.getItem("ID") != null && 
                   localStorage.getItem("Login") != null && 
                   localStorage.getItem("Password") != null ){
                    
                      return (
                      <form className="Auth-form"
                        onSubmit={this.handleSubmit}>
                        <div>
                          <h4>Add URL</h4>
                          <div className="form-group mt-3">
                            <label>Enter URL:</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                value={this.state.newURL}
                                onChange={this.handleUrlChange}
                            />
                          </div>
                          <div className="d-grid gap-2 mt-3">
                            <button type="submit" value="Submit" className="btn btn-primary">
                                Submit
                            </button>
                          </div>
                        </div>
                      </form>
                )}}

    renderViewButton(id){
      if(localStorage.getItem("ID") != null && 
         localStorage.getItem("Login") != null && 
         localStorage.getItem("Password") != null ){
        return(
          <td><Link to={{pathname:"view-url/" + id}}>View</Link></td>
      )}
    }




    deleteRequest(){
      axios.delete(hostLink + `api/urls`, {
        id: this.state.deleteID
    }).then(response =>
    {

    })
    }


    renderDeleteButton(creatorID, urlID){
      if((localStorage.getItem("ID") == creatorID || localStorage.getItem("Admin") === 'true') && 
         localStorage.getItem("Login") != null && 
         localStorage.getItem("Password") != null){

          this.setState({
            URLs: this.state.URLs,
            newURL: this.state.newURL,
            deleteID: urlID})
        return(
          <td><button onClick={this.deleteRequest}>Delete</button></td>
      )}
    }

    render() {
        return (
        <Layout>
            {this.renderAddSection()}
            <table>
              <thead>
              <tr>
                <th>ID</th>
                <th>DefaultURL</th>
                <th>ShourtURl</th>
                <th>Creator ID</th>
              </tr>
              </thead>
              <tbody>
              {this.state.URLs.map((url) =>(
                 <tr>
                  <td>{url.id}</td>
                  <td>{url.defaultURL}</td>
                  <td>{url.shourtedURL}</td>
                  <td>{url.creatorID}</td>
                  
                  {this.renderViewButton(url.id)}

                  {this.renderDeleteButton(url.creatorID, url.id)}
                  

                 </tr>
                 
                 ))}
              </tbody>
            </table>

        </Layout>
    );
  }
}
