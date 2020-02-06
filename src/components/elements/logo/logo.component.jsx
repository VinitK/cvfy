import React from 'react';

import './logo.styles.css';

const LogoComp = (props) => {
    return (
        <span className={`Logo ${props.customClass}`}>cvfy</span>
    );
};

export default LogoComp;