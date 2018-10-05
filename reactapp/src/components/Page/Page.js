import React, {Component} from 'react';
import axios from 'axios';

class Page extends Component{
    state = {
        activePage: {}
    }
    componentDidMount () {
        // /page/ID 
        
        axios.get('/page/'+this.props.match.params.id)
        .then(response => {
            this.setState({activePage: response.data});
            console.log('[page componentDidMount]' + this.state.activePage);
        });
     
        
    }
    render(){
        return(
            <div>
                <h1>Page</h1>
                <h5>{this.state.activePage.title}</h5>
                <div>{this.state.activePage.text}</div>
            </div>
        );
    }

    

}
export default Page;