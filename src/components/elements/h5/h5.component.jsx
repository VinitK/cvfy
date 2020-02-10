import React from 'react';

import './h5.styles.css';

const H5Comp = ({ className, children, ...rest }) => {
    return (
        <div className="H5">
            <h5 className={`${className}`} {...rest}>{children}</h5>
        </div >

    );
};

export default H5Comp;