import React from 'react';

import './logo.styles.css';
import { Link } from 'react-router-dom';

const LogoComp = ({ className, children, ...rest }) => {
    return (
        <Link to="/" className={`Logo ${className ? className : ""}`} {...rest}>{children}</Link>
    );
};

export default LogoComp;