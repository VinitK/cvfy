import React from 'react';

import './spinner.styles.css';

const SpinnerComp = ({ className }) => {
    console.log(className)
    return (
        <div className={`Spinner ${className}`} >
        </div >
    );
};

export default SpinnerComp;