import React from 'react';
import Item from './Item/Item';
import { Link } from 'react-router-dom';

const navMenu = (props) => {
   return( 
   props.pages.map(page => {
        return( 
            <Link to={'/page/'+ page._id} key = {page._id}>
             <Item 
                
                clicked = {() => props.openPage(page._id,page.title, page.content)}
                title = {page.title}
                />
            </Link>    
        );
        
      })
   );
};

export default navMenu;