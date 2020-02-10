import React from 'react';

import './h3.styles.css';

const H3Comp = ({ className, children, ...rest }) => {
    return (
        <div className="H3">
            <h3 className={`${className}`} {...rest}>{children}</h3>
        </div >

    );
};

export default H3Comp;