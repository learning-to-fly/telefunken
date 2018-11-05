import React, {Component} from 'react';
import axios from 'axios';

class Page extends Component{
    state = {
        updatedFormStore: {},

    }
    componentDidMount () {
        // /page/ID 
        
        axios.get('/v1/page/'+this.props.match.params.id)
        .then(response => {
            this.setState({updatedFormStore: response.data});
        });
     
        
    }
    handlerChange = (event) => {
        const updatedFormStore = {
          ...this.state.updatedFormStore
        };
        updatedFormStore[event.target.name] = event.target.value;
        
        this.setState({ updatedFormStore : updatedFormStore  });
      };
      handlerPostData = (event) => {
        event.preventDefault();
        let id = this.state.updatedFormStore._id;
        delete this.state.updatedFormStore._id;
        axios.put( '/v1/page/'+id, this.state.updatedFormStore )
        .then( response => {
            //this.setState( { loading: false } );
            this.props.history.push( '/v1/pages' );
        } )
        .catch( error => {
            //this.setState( { loading: false } );
        } );
      }    
    render(){
        return(
            <div>
                <h1>EditPage</h1>

                <div className="first_form">
                    <form id="first_form">
                    <div className="form_line">
                        <label>Enter title</label>
                        <div className="input">
                        <input type="text" onChange={this.handlerChange} name="title"  value={this.state.updatedFormStore.title} />
                        </div>
                    </div>
                    <div className="form_line">
                        <label>Enter text</label>
                        <div className="textarea">
                        <textarea name="text" onChange={this.handlerChange}  value={this.state.updatedFormStore.text} ></textarea>
                        </div>
                        </div>
                        <div className="form_line">
                        <div className="submit">
                            <button type="submit" form="first_form" onClick = {this.handlerPostData}>Update</button>
                        </div>
                        </div>           
                    </form>
                </div>                
            </div>
        );
    }

    

}
export default Page;