import React, {Component} from 'react';
import axios from 'axios';

class Page extends Component{
    state = {
        activePage: null
    }
    componentDidMount () {
        // /page/ID 
        
        axios.get('http://localhost:3000/page/'+this.props.match.params.id)
        .then(response => {
          this.setState({activePage: response.data});
          console.log(response.data);
        });
     
        
    }
    render(){
        return(
            <div>
                <h5>{this.state.activePage.title}</h5>
                <div>{this.state.activePage.content}</div>
            </div>
        );
    }

    

}
export default Page;