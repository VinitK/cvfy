import React, { useState } from 'react';
import { connect } from 'react-redux';

import { ReactComponent as ContactIcon } from '../../../assets/resume-tab/contact.svg';
import { ReactComponent as WorkIcon } from '../../../assets/resume-tab/work.svg';
import { ReactComponent as CertificateIcon } from '../../../assets/resume-tab/certificate.svg';
import { ReactComponent as QualificationIcon } from '../../../assets/resume-tab/qualification.svg';
import { ReactComponent as SkillIcon } from '../../../assets/resume-tab/skill.svg';
import { ReactComponent as ProjectIcon } from '../../../assets/resume-tab/project.svg';
import './edit-resume.styles.css';

import EditContactComp from './contact/edit.contact.component';
import EditWorkComp from './work/edit.work.component';

const EditResumeComp = ({ currentUser }) => {

    const [state, setState] = useState(currentUser);
    console.log(state)
    console.log(currentUser)

    const [tabSelected, setTabSelected] = useState("Contact"); // defining variables to highlight the tab selected
    const handleSelect = ({ target }) => { // action to highlight tab selected
        setTabSelected(target.value);
    }

    return (
        <div className="Edit-resume frow">
            <div className="sidebar">
                <div className="options card fcol">
                    <a href="#Edit-contact__id"><button className={tabSelected === "Contact" ? "selected option frow h6" : "option frow h6"} onClick={handleSelect} value="Contact" ><ContactIcon className="icon" />Contact</button></a> {/* added value property to set selected button's background*/}
                    <a href="#Edit-work__id"><button className={tabSelected === "Work" ? "selected option frow h6" : "option frow h6"} onClick={handleSelect} value="Work"><WorkIcon className="icon" />Work</button></a>
                    <a href="#Edit-certifications__id"><button className={tabSelected === "Certifications" ? "selected option frow h6" : "option frow h6"}><CertificateIcon className="icon" />Certifications</button></a>
                    <a href="#Edit-qualifications__id"><button className={tabSelected === "Qualifications" ? "selected option frow h6" : "option frow h6"}><QualificationIcon className="icon" />Qualifications</button></a>
                    <a href="#Edit-skills__id"><button className={tabSelected === "Skills" ? "selected option frow h6" : "option frow h6"}><SkillIcon className="icon" />Skills</button></a>
                    <a href="#Edit-projects__id"><button className={tabSelected === "Projects" ? "selected option frow h6" : "option frow h6"}><ProjectIcon className="icon" />Projects</button></a >
                </div>
            </div>
            <div className="midbody fcol">
                <EditContactComp state={state} setState={setState} />
                <EditWorkComp />
            </div>
        </div >
    );
};

const mapStateToProps = ({ user: { currentUser } }) => (
    {
        currentUser
    }
);

export default connect(mapStateToProps)(EditResumeComp);