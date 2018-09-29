import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Route, NavLink } from 'react-router-dom';
import Form from './components/Form/Form';
import Pages from './components/Pages/Pages';
import Page from './components/Page/Page';

class App extends Component {
  render() {

    return (
      <BrowserRouter>
      <div className="App">
        <nav>
            <NavLink to='/pages'>All pages</NavLink>
        </nav>
        <Route path="/pages" component = { Pages } />
        <Route path="/" exact component = { Form } />
        <Route path="/page/:id" component = { Page } />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
