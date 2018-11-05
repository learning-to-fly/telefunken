import React, { Component } from 'react';
import axios from 'axios';
import classes from '../../App.css';

class Form extends Component {

  state = {
    formStore: {
      title: '',
      text: ''
    }
  };

handlerChange = (event) => {
  const updatedFormStore = {
    ...this.state.formStore
  };
  updatedFormStore[event.target.name] = event.target.value;
  
  this.setState({ formStore : updatedFormStore  });
};
handlerPostData = (event) => {
  event.preventDefault();

  axios.post( '/v1/page', this.state.formStore )
  .then( response => {
      //this.setState( { loading: false } );
      this.props.history.push( '/v1/pages' );
  } )
  .catch( error => {
      //this.setState( { loading: false } );
  } );
}

  render(){
    return( <div className={classes.first_form}>
    <form id="first_form">
      <div className={classes.form_line}>
        <label>Enter title</label>
        <div className={classes.input}>
          <input type="text" onChange={this.handlerChange} name="title" />
        </div>
      </div>
      <div className={classes.form_line}>
        <label>Enter text</label>
        <div className={classes.textarea}>
          <textarea name="text" onChange={this.handlerChange}></textarea>
        </div>
        </div>
        <div className={classes.form_line}>
          <div className={classes.submit}>
            <button type="submit" form="first_form" onClick = {this.handlerPostData}>Submit</button>
          </div>
        </div>           
    </form>
  </div> 
   );
  }
}
export default Form;