import React from 'react';

import './edit.work.styles.css';

import ButtonComp from '../../../elements/button/button.component';
import { ReactComponent as WorkIcon } from '../../../../assets/resume-form/work.svg';
import EditWorkExpComp from './experience/edit.work.experience.component';

const EditWorkComp = () => {
    return (
        <div className="Edit-work card neu-up">
            <div className="card-header">
                <h4>Work Experience</h4>
            </div>
            <div className="card-body">
                <div className="text">
                    <EditWorkExpComp count="1" />
                    <ButtonComp href='/edit' type="submit" className='stdButton mtl'>SAVE</ButtonComp>
                </div>
                <div className="image">
                    <WorkIcon className="work-icon" />
                </div>
            </div>
        </div>
    );
};

export default EditWorkComp;