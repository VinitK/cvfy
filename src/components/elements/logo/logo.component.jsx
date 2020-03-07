import React from 'react';

import './logo.styles.css';
import { Link } from 'react-router-dom';

const LogoComp = ({ className, ...rest }) => {
    return (
        <Link to="/" className={`Logo ${className ? className : ""}`} {...rest}>cvfy.in</Link>
    );
};

export default LogoComp;