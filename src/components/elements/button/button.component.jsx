import React from 'react';

import './button.styles.css';

import { ReactComponent as GoogleIcon } from '../../../assets/social/google.svg';

const ButtonComp = ({ type, className, loading, children, btnType, ...rest }) => {
    switch (btnType) {
        case 'GOOGLE_SIGN_IN':
            return (
                <button className={className ? `google-signin-btn ${className}` : "google-signin-btn"} {...rest} >
                    <div className="frow">
                        <GoogleIcon className="google-icon" />
                        {children}
                    </div>
                </button>
            );
        case 'SAVE_FORM':
            return (
                <button className={className ? `save-form-btn ${className}` : "save-form-btn"} {...rest} >
                    {children}
                </button>
            );
        case 'ADD_FORM':
            return (
                <button className={className ? `add-form-btn ${className}` : "add-form-btn"} {...rest} >
                    {children}
                </button>
            )
        default:
            return (<button type={type} disabled={loading} className={className} {...rest}>{children}</button>)
    }
};

export default ButtonComp;