import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getResume } from '../../../redux/resume/resume.actions';

import { ReactComponent as ContactIcon } from '../../../assets/resume-tab/contact.svg';
import { ReactComponent as WorkIcon } from '../../../assets/resume-tab/work.svg';
import { ReactComponent as CertificateIcon } from '../../../assets/resume-tab/certificate.svg';
import { ReactComponent as QualificationIcon } from '../../../assets/resume-tab/qualification.svg';
import { ReactComponent as SkillIcon } from '../../../assets/resume-tab/skill.svg';
import { ReactComponent as ProjectIcon } from '../../../assets/resume-tab/project.svg';
import './edit-resume.styles.css';

import EditContactComp from './contact/edit.contact.component';
import EditWorkComp from './work/edit.work.component';

const EditResumeComp = () => {

    const [tabSelected, setTabSelected] = useState("Contact");

    const handleSelect = ({ target }) => {
        setTabSelected(target.value);
    }

    return (
        <div className="Edit-resume frow">
            <div className="sidebar">
                <div className="options card fcol">
                    <button className={tabSelected === "Contact" ? "selected option frow h6" : "option frow h6"} onClick={handleSelect} value="Contact" ><ContactIcon className="icon" />Contact</button>
                    <button className={tabSelected === "Work" ? "selected option frow h6" : "option frow h6"} onClick={handleSelect} value="Work"><WorkIcon className="icon" />Work</button>
                    <button className={tabSelected === "Certifications" ? "selected option frow h6" : "option frow h6"}><CertificateIcon className="icon" />Certifications</button>
                    <button className={tabSelected === "Qualifications" ? "selected option frow h6" : "option frow h6"}><QualificationIcon className="icon" />Qualifications</button>
                    <button className={tabSelected === "Skills" ? "selected option frow h6" : "option frow h6"}><SkillIcon className="icon" />Skills</button>
                    <button className={tabSelected === "Projects" ? "selected option frow h6" : "option frow h6"}><ProjectIcon className="icon" />Projects</button>
                </div>
            </div>
            <div className="midbody fcol">
                <EditContactComp />
                <EditWorkComp />
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => (
    {
        getResume: () => dispatch(getResume())
    }
);

export default connect(null, mapDispatchToProps)(EditResumeComp);