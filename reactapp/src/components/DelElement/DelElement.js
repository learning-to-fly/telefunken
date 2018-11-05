import React from 'react';
import classes from './delElement.css';

const delElement = (props) => {
    return(
        <div className={classes.DelElement} onClick = {() => props.click(props.pageId, props.title, props.num)}></div>
    );
}
export default delElement;