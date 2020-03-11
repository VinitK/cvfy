import React from 'react';

import './input.styles.css';

const InputComp = ({ type, className, id, children, value, onChange, resumeUrl, ...rest }) => {

    switch (type) { // returns based on type
        case "textarea":
            return (
                <div className={`Input ptxl ${className}`}>
                    <textarea id={id} placeholder=" " value={value} onChange={onChange} {...rest} className="style textarea" />
                    <label htmlFor={id} className="float-label opacity-half">{children}</label>
                </div>
            )
        case "file":
            return (
                <div className={`Input mtxl mbxl ${className}`}>
                    <input type={type} id={id} placeholder=" " value={value} onChange={onChange} {...rest} className="style inputfile" />
                    <label htmlFor={id} className="bgcl ps brs">{children}</label>
                    {
                        resumeUrl && <a href={resumeUrl} className="mlm" target="_blank" rel="noopener noreferrer">View</a>
                    }
                </div>
            )
        default:
            return (
                <div className={`Input ptxl ${className}`}>
                    <input type={type} id={id} placeholder=" " value={value} onChange={onChange} {...rest} className="style input" />
                    <label htmlFor={id} className="float-label opacity-half">{children}</label>
                </div>
            )
    }
};

export default InputComp;