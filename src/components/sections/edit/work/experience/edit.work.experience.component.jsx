import React from 'react';

import './edit.work.experience.styles.css';

import InputComp from '../../../../elements/input/input.component';

const EditWorkExpComp = ({ count, ...rest }) => {
    return (
        <div className="Edit-work-exp">
            <InputComp type="text" id={`editExpCompany${count}`} {...rest}>Company Name</InputComp>
            <InputComp type="text" id={`editExpDesignation${count}`} {...rest}>Designation</InputComp>
            <InputComp type="text" id={`editExpDescription${count}`} {...rest}>Key Activities Carried Out</InputComp>
        </div>
    );
};

export default EditWorkExpComp;