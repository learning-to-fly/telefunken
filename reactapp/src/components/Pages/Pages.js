import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Pages extends Component{
    state = {
        activePage: null,
        pages: []
    }
    componentDidMount(){
        axios.get('http://localhost:3000/all')
              .then(response => {
                this.setState({pages: response.data});
                console.log(response.data);
              });
    
      }
    render(){
        const pages = this.state.pages.map(page => {
            return (
              <li key={page._id}>
                <NavLink to={'/page/'+page._id}>{page.title}</NavLink>
              </li>
              );
          });
        return(
            <ul>{ pages }</ul>
        );
    }
}
export default Pages;