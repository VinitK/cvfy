import React from 'react';

import ResumeContactComp from '../contact/resume.contact.component';
import USER_DATA from '../../../../redux/store';

import './view-resume.styles.css';

const ViewResumeComp = () => { // COMPONENT

    const { contact } = USER_DATA;

    return (
        <div className="View-resume">
            <ResumeContactComp contact={contact} />
        </div>
    );
};

export default ViewResumeComp;