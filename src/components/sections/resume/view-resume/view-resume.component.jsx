import React from 'react';

import ResumeContactComp from '../contact/resume.contact.component';
import ResumeWorkComp from '../work/resume.work.component';
import LogoComp from '../../../elements/logo/logo.component';

import STORE_DATA from '../../../../redux/data';

import './view-resume.styles.css';

const ViewResumeComp = () => { // COMPONENT

    const { contact, work } = STORE_DATA;

    return (
        <div className="View-resume">
            <LogoComp className='logo h3 fcol' />
            <ResumeContactComp contact={contact} />
            <ResumeWorkComp experiences={work.experiences} />
        </div>
    );
};

export default ViewResumeComp;