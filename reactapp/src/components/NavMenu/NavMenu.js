import React from 'react';
import Item from './Item/Item';
import { Link } from 'react-router-dom';
import DelElement from '../DelElement/DelElement';

const navMenu = (props) => {
   return( 
   props.pages.map((page,i) => {
        return( 
            <li>
                <Link to={'/v1/page/'+ page._id} key = {page._id}>
                    <Item  title = {page.title} />
                </Link> 
                <DelElement pageId = {page._id} click={props.delPage} title = {page.title} num = {i} />
            </li>
        );
        
      })
   );
};

export default navMenu;