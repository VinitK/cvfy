import React from 'react';

import ResumeContactComp from '../contact/resume.contact.component';
import STORE_DATA from '../../../../redux/data';

import './view-resume.styles.css';
import ResumeWorkComp from '../work/resume.work.component';

const ViewResumeComp = () => { // COMPONENT

    const { contact, work } = STORE_DATA;

    return (
        <div className="View-resume">
            <ResumeContactComp contact={contact} />
            <ResumeWorkComp experiences={work.experiences} />
        </div>
    );
};

export default ViewResumeComp;