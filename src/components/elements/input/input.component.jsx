import React from 'react';

import './input.styles.css';

const InputComp = ({ type, className, id, children, ...rest }) => {
    return (
        <div className="Input">
            <input type={type} className={className} id={id} placeholder=" " {...rest} />
            <label htmlFor={id} className="float-label">{children}</label>
        </div>
    );
};

export default InputComp;

// takes following props:
// inputType: text/textbox/password
// customClass: for classes
// id: an id for the input element
// children: for label