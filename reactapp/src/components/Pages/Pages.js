import React, { Component } from 'react';
//import axios from 'axios';
//import { NavLink } from 'react-router-dom';
import NavMenu from '../NavMenu/NavMenu';
import Page from '../Page/Page';
import axios from 'axios';
import classes from './Pages.css';
import Modal from '../UI/Modal/Modal';
import Aux from '../../hoc/Auxx';

class Pages extends Component{
    state = {
        pages: [],
        showModalConfirmDel: false,
        pageForDel: null,
        pageNum: null
    }
    componentDidMount(){
       axios.get('/v1/all')
              .then(response => {
                this.setState({pages: response.data});
                console.log('[Pages componentDidMount()]' + response.data);
              });
                
      }
      confirmDelPage = (pageId, title, num) => {
        this.setState({
            showModalConfirmDel: true,
            pageForDel: title,
            pageIdForDel: pageId,
            pageNum: num
        });
      }
      backdropClickHandler = () => {
        this.setState({
            showModalConfirmDel: false,
            pageForDel: '',
            pageIdForDel: null,
            pageNum: null

        });        
      }

      delPageHandler = () => {
        axios.delete( '/v1/page/'+this.state.pageIdForDel)
        .then( response => {
            //this.setState( { loading: false } );
            let pp = [...this.state.pages];
            delete pp[this.state.pageNum];
            this.setState({
                pages: pp,
                showModalConfirmDel: false,
                pageForDel: '',
                pageIdForDel: null,
                pageNum: null                
            });
            
        } )
        .catch( error => {
            //this.setState( { loading: false } );
        } );
        //show modal
        //by click 'ok' -> delete
      }

    render(){

        return( 
            <Aux>
                <Modal show = {this.state.showModalConfirmDel} backdropClicked={this.backdropClickHandler}>
                    <p>Are you sure? You are about deleting the article {this.state.pageForDel}</p>
                    <div class="btn_line">
                        <button>Cancel</button>
                        <button onClick={this.delPageHandler}>OK</button>
                    </div>
                </Modal>
                <ul className={classes.Pages}>
                    <NavMenu  pages = {this.state.pages} delPage = {this.confirmDelPage} />
                </ul>
            </Aux>
            
        );
    }
}
export default Pages;