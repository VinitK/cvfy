import React from 'react';

import './input.styles.css';

const InputComp = ({ type, className, id, children, value, ...rest }) => {
    return (
        <div className={className ? `Input ${className}` : "Input"}>
            {
                type === "textarea"
                    ?
                    <textarea id={id} placeholder=" " value={value} {...rest} className="style textarea" />
                    :
                    <input type={type} id={id} placeholder=" " value={value} {...rest} className="style input" />

            }
            <label htmlFor={id} className="float-label">{children}</label>
        </div>
    );
};

export default InputComp;