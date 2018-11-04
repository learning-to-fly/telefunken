import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import Form from './components/Form/Form';
import Pages from './components/Pages/Pages';
import Page from './components/Page/Page';
import EditPage from './components/EditPage/EditPage';

class App extends Component {
  render() {

    return (
        <BrowserRouter>
            <div className="App">
                <nav>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/v1/pages'>All pages</NavLink>
                </nav>
                <Route path="/v1/pages" component = { Pages } />
                <Route path="/" exact component = { Form } />
                <Route path="/v1/page/:id" component = { Page } />
                <Route path="/v1/edit/:id" component = { EditPage } />
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
