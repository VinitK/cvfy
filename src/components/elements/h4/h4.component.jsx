import React from 'react';

import './h4.styles.css';

const H4Comp = ({ className, children, ...rest }) => {
    return (
        <div className="H4">
            <h4 className={`${className}`} {...rest}>{children}</h4>
        </div >

    );
};

export default H4Comp;