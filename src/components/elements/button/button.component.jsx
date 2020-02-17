import React from 'react';

import './button.styles.css';

import { ReactComponent as GoogleIcon } from '../../../assets/social/google.svg';

const ButtonComp = ({ type, className, loading, children, googleSignIn, ...rest }) => {
    console.log(children)
    return (
        <button type={type} disabled={loading} className={`${className}`} {...rest}>{googleSignIn ? <div className="frow"><GoogleIcon className="google-icon" /><div>{children}</div></div> : children}</button>
    );
};

export default ButtonComp;