import React from 'react';

import './h4.styles.css';

const H4Comp = (props) => {
    return (
        <div className="H4">
            <h4 className={`${props.customClass}`}>{props.children}</h4>
        </div >

    );
};

export default H4Comp;