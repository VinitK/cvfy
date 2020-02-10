import React from 'react';

import InputComp from '../../../../elements/input/input.component';

const ExpComp = ({ count, ...rest }) => {
    return (
        <div>
            <InputComp type="text" id={`editExpCompany${count}`} {...rest}>Company Name</InputComp>
            <InputComp type="text" id={`editExpDesignation${count}`} {...rest}>Designation</InputComp>
            <InputComp type="text" id={`editExpDescription${count}`} {...rest}>Key Activities Carried Out</InputComp>
        </div>
    );
};

export default ExpComp;