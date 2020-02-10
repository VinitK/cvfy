import React from 'react';

import './h2.styles.css';

const H2Comp = ({ className, children, ...rest }) => {
    return (
        <div className="H2">
            <h2 className={`${className}`} {...rest}>{children}</h2>
        </div >

    );
};

export default H2Comp;