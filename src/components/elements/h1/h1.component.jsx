import React from 'react';

import './h1.styles.css';

const H1Comp = ({ className, children, ...rest }) => {
    return (
        <div className="H1">
            <h1 className={`${className}`} {...rest}>{children}</h1>
        </div >

    );
};

export default H1Comp;