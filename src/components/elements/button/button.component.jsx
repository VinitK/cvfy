import React from 'react';

import './button.styles.css';

import { ReactComponent as GoogleIcon } from '../../../assets/social/google.svg';

const ButtonComp = ({ type, className, loading, disabled, children, btnType, ...rest }) => {
    switch (btnType) {
        case 'GOOGLE_SIGN_IN':
            return (
                <button className={className ? `google-signin-btn ${className}` : "google-signin-btn"} disabled={loading} {...rest} >
                    <div className="frow">
                        <GoogleIcon className="google-icon" />
                        {children}
                    </div>
                </button>
            );
        case 'SAVE_FORM':
            return (
                <button type={type} className={`save-form-btn ${className}`} disabled={loading || disabled} {...rest} >
                    {children}
                </button>
            );
        case 'ADD_FORM':
            return (
                <button type={type} className={`add-form-btn ${className}`} disabled={loading || disabled} {...rest} >
                    {children}
                </button>
            )
        case 'CANCEL_FORM':
            return (
                <button type={type} className={`cancel-form-btn ${className}`} disabled={loading || disabled} {...rest} >
                    {children}
                </button>
            )
        default:
            return (
                <button type={type} disabled={loading || disabled} className={className} {...rest}>
                    {children}
                </button>
            )
    }
};

export default ButtonComp;