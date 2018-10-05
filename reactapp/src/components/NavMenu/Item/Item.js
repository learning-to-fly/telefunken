import React from 'react';

const item = (props) => {
        return (
        <div 
            onClick = {props.clicked}>
            {props.title}
        </div>
        );
}

export default item;