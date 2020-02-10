import React from 'react';

import './edit.work.styles.css';

import ButtonComp from '../../../elements/button/button.component';
import ExpComp from './experience/experience.component';

const EditWorkComp = () => {
    return (
        <div className="Edit-work">
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <h4>Work Experience</h4>
                    </div>
                    <div className="card-body">
                        <ExpComp count="1" />
                        <ButtonComp href='/edit' type="submit" className='char-space bold h6 mtxl'>SAVE</ButtonComp>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditWorkComp;