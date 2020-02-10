import React from 'react';

import './logo.styles.css';

const LogoComp = ({ className, ...rest }) => {
    return (
        <a href="/" className={`Logo ${className}`} {...rest}>cvfy</a>
    );
};

export default LogoComp;