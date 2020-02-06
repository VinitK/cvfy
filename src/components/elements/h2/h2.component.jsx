import React from 'react';

import './h2.styles.css';

const H2Comp = (props) => {
    return (
        <div className="H2">
            <h2 className={`${props.customClass}`}>{props.children}</h2>
        </div >

    );
};

export default H2Comp;