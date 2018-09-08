import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="first_form">
          <form id="first_form">
            <div className="form_line">
              <label>Enter title</label>
              <div className="input">
                <input type="text" />
              </div>
            </div>
            <div className="form_line">
              <label>Enter text</label>
              <div className="textarea">
                <textarea></textarea>
              </div>
              </div>
              <div className="form_line">
                <div className="submit">
                  <button type="submit" form="first_form">Submit</button>
                </div>
              </div>           
          </form>
        </div>  
      </div>
    );
  }
}

export default App;
