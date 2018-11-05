import React, { Component } from 'react';
import classes from './App.css';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import Form from './components/Form/Form';
import Pages from './components/Pages/Pages';
import Page from './components/Page/Page';
import EditPage from './components/EditPage/EditPage';
import Layout from './components/Layout/Layout';

class App extends Component {
  render() {

    return (
        <BrowserRouter>
            <div className={classes.App}>
                <Layout>
                    <nav>
                        <NavLink to='/' className={classes.addArticle}>Add article</NavLink>
                        <NavLink to='/v1/pages'>All articles</NavLink>
                    </nav>
                    <Route path="/v1/pages" component = { Pages } />
                    <Route path="/" exact component = { Form } />
                    <Route path="/v1/page/:id" component = { Page } />
                    <Route path="/v1/edit/:id" component = { EditPage } />
                </Layout>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
