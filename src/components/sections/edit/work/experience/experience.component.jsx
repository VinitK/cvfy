import React from 'react';

import InputComp from '../../../../elements/input/input.component';

const ExpComp = (props) => {
    return (
        <div>
            <InputComp type="text" id={`editExpCompany${props.count}`}>Company Name</InputComp>
            <InputComp type="text" id={`editExpDesignation${props.count}`}>Designation</InputComp>
            <InputComp type="text" id={`editExpDescription${props.count}`}>Key Activities Carried Out</InputComp>
        </div>
    );
};

export default ExpComp;