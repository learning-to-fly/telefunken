import React from 'react';
import Item from './Item/Item';
import { Link } from 'react-router-dom';

const navMenu = (props) => {
   return( 
   props.pages.map(page => {
        return( 
            <li>
                <Link to={'/v1/page/'+ page._id} key = {page._id}>
                <Item 
                    
                    clicked = {() => props.openPage(page._id,page.title, page.text)}
                    title = {page.title}
                    />
                </Link>    
            </li>
        );
        
      })
   );
};

export default navMenu;