import React from 'react';

import './h5.styles.css';

const H5Comp = (props) => {
    return (
        <div className="H5">
            <h5 className={`${props.customClass}`}>{props.children}</h5>
        </div >

    );
};

export default H5Comp;