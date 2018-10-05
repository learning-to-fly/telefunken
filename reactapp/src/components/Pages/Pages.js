import React, { Component } from 'react';
//import axios from 'axios';
//import { NavLink } from 'react-router-dom';
import NavMenu from '../NavMenu/NavMenu';
import Page from '../Page/Page';
import axios from 'axios';

class Pages extends Component{
    state = {
        activePage: null,
        pages: []
    }
    componentDidMount(){
       axios.get('/all')
              .then(response => {
                this.setState({pages: response.data});
                console.log('[Pages componentDidMount()]' + response.data);
              });
              
           
      }
      openPageHandler = (id, title, content) => {
        this.setState({activePage: [id, title, content]});
        //this.props.history.push({pathname: '/page/' + id});
        
        console.log('clicked : !!!!!!   ' + id);
        console.log('[openPageHandler] state.activePage : !!!!!!   ' + this.state.activePage);
      };

    render(){

        return( 
            <div>
            <NavMenu 
                pages = {this.state.pages} 
                openPage = {this.openPageHandler} />
               
            </div>
            
        );
    }
}
export default Pages;