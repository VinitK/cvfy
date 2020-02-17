import React from 'react';

import ResumeContactComp from '../contact/resume.contact.component';
import USER_DATA from '../../../../redux/store';

import './view-resume.styles.css';
import ResumeWorkComp from '../work/resume.work.component';

const ViewResumeComp = () => { // COMPONENT

    const { contact, work } = USER_DATA;

    return (
        <div className="View-resume">
            <ResumeContactComp contact={contact} />
            <ResumeWorkComp experiences={work.experiences} />
        </div>
    );
};

export default ViewResumeComp;