import React from 'react';

import { ReactComponent as ContactIcon } from '../../../assets/resume-tab/contact.svg';
import { ReactComponent as WorkIcon } from '../../../assets/resume-tab/work.svg';
import { ReactComponent as CertificationsIcon } from '../../../assets/resume-tab/certificate.svg';
import { ReactComponent as QualificationIcon } from '../../../assets/resume-tab/qualification.svg';
import { ReactComponent as SkillsIcon } from '../../../assets/resume-tab/skill.svg';
// import { ReactComponent as ProjectsIcon } from '../../../assets/resume-tab/project.svg';
import './edit-resume.styles.css';

import EditContactComp from './contact/edit.contact.component';
import EditWorkComp from './work/edit.work.component';
import CertsComp from './certs/certs.component';
import QualsComp from './quals/quals.component';
import SkillsComp from './skills/skills.component';

const EditResumeComp = () => {

    const tabs = [
        { name: <div className="mls">Contact</div>, icon: <ContactIcon className="icon" />, id: "#Edit-Contact__id", },
        { name: <div className="mls">Work</div>, icon: <WorkIcon className="icon" />, id: "#Edit-Work__id", },
        { name: <div className="mls">Certifications</div>, icon: <CertificationsIcon className="icon" />, id: "#Edit-Certs__id", },
        { name: <div className="mls">Qualification</div>, icon: <QualificationIcon className="icon" />, id: "#Edit-Quals__id", },
        { name: <div className="mls">Skills</div>, icon: <SkillsIcon className="icon" />, id: "#Edit-Skills__id", }];
    // { name: <div className="mls">Projects</div>, icon: <ProjectsIcon className="icon" />, id: "#EditProjects__id" }];

    return (
        <div className="Edit-resume frow">
            <div className="sidebar">
                <div className="options fcol">
                    {tabs.map((tab, i) => <a href={tab.id} className="frow h6 button option" key={i}>{tab.icon}{tab.name}</a>)}
                </div>
            </div>
            <div className="midbody fcol">
                <EditContactComp />
                <EditWorkComp />
                <CertsComp />
                <QualsComp />
                <SkillsComp />
            </div>
        </div >
    );
};

export default EditResumeComp;