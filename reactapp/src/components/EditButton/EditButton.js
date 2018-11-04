import React from 'react';
import { Link } from 'react-router-dom';
import classes from './EditButton.css';

const editButton = (props) => {
    return(<Link to={'/v1/edit/'+ props.page_id}  className={classes.EditButton}>Edit Page</Link>);
    
};
export default editButton;