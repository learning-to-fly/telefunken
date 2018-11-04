import React, {Component} from 'react';
import EditButton from '../EditButton/EditButton';
import axios from 'axios';

class Page extends Component{
    state = {
        activePage: {},
        editMode: false
    }
    componentDidMount () {
        // /page/ID 
        
        axios.get('/v1/page/'+this.props.match.params.id)
        .then(response => {
            this.setState({activePage: response.data});
            console.log('[page componentDidMount]' + this.state.activePage);
        });
     
        
    }
    render(){
        return(
            <div>
                <EditButton page_id={this.state.activePage._id} />
                <h1>Page</h1>
                <h5>{this.state.activePage.title}</h5>
                <div>{this.state.activePage.text}</div>
            </div>
        );
    }

    

}
export default Page;