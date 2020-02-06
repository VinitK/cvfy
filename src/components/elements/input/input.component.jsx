import React from 'react';

import './input.styles.css';

const InputComp = (props) => {
    return (
        <div className="Input">
            <input type={props.type} className={props.customClass} id={props.id} placeholder=" " />
            <label htmlFor={props.id} className={`float-label ${props.customClass}`}>{props.children}</label>
        </div>

    );
};

export default InputComp;

// takes following props:
// inputType: text/textbox/password
// customClass: for classes
// id: an id for the input element
// children: for label