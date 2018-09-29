import React, { Component } from 'react';
import axios from 'axios';

class Page extends Component{
    state = {
        loadedPage: null,
        pages: []
    }
    componentDidMount(){
        console.log(this.props);
      axios.get('/all')
              .then(response => {
                this.setState({pages: response.data});
                });
               
              
             
                let loadedPage = this.state.pages.filter(function( el ) {
                  return el._id == this.props.match.params.id;
                  
                });
                this.setState({loadedPage: loadedPage[0]});
      }
      render(){
          return(
              <h1>{this.state.loadedPage.title}</h1>
          );
      }
}
export default Page;