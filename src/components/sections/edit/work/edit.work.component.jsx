import React from 'react';

import './edit.work.styles.css';

import ButtonComp from '../../../elements/button/button.component';
import { ReactComponent as WorkIcon } from '../../../../assets/resume-form/work.svg';
import EditWorkExpComp from './experience/edit.work.experience.component';

const EditWorkComp = () => {
    return (
        <div className="Edit-work card neu-up" id="Edit-work__id">
            <div className="card-header">
                <h5>Work Experience</h5>
            </div>
            <div className="card-body">
                <div className="text">
                    <EditWorkExpComp count="1" />
                    <ButtonComp href='/edit' type="submit" className='stdButton bgch4 mtl'>ADD ANOTHER</ButtonComp>
                </div>
                <div className="image">
                    <WorkIcon className="work-icon" />
                </div>
            </div>
        </div>
    );
};

export default EditWorkComp;