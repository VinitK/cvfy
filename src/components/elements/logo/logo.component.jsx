import React from 'react';

import './logo.styles.css';
import { Link } from 'react-router-dom';

const LogoComp = ({ className, ...rest }) => {
    return (
        <Link to="/" className={`Logo ${className ? className : ""}`} {...rest}>cvfy</Link>
    );
};

export default LogoComp;