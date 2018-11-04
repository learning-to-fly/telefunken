import React from 'react';
import classes from './Layout.css';

const Layout = (props) => {
    return(
        <div className='Layout'>
            {props.children}
        </div>
    );
}
export default Layout;