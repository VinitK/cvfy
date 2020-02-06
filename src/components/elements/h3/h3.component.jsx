import React from 'react';

import './h3.styles.css';

const H3Comp = (props) => {
    return (
        <div className="H3">
            <h3 className={`${props.customClass}`}>{props.children}</h3>
        </div >

    );
};

export default H3Comp;