import React, { useState, useEffect } from 'react';

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

    const [editCard, setEditCard] = useState("Contact");
    let focusOnEle;

    const handleSelect = ({ target }) => {
        setEditCard(target.value);
    }

    useEffect(() => {
        focusOnEle.focus();
    }, [focusOnEle]);

    return (
        <div className="Edit-resume frow">
            <div className="sidebar card fcol">
                <button className="option frow h6" onClick={handleSelect} value="Contact" ref={(ele) => { focusOnEle = ele }} ><ContactIcon className="icon" />Contact</button>
                <button className="option frow h6" onClick={handleSelect} value="Work"><WorkIcon className="icon" />Work Experience</button>
                <button className="option frow h6"><CertificateIcon className="icon" />Certifications</button>
                <button className="option frow h6"><QualificationIcon className="icon" />Qualifications</button>
                <button className="option frow h6"><SkillIcon className="icon" />Skills</button>
                <button className="option frow h6"><ProjectIcon className="icon" />Projects</button>
            </div>
            {
                {
                    "Contact": <EditContactComp />,
                    "Work": <EditWorkComp />
                }[editCard]
            }
        </div>
    );
};

export default EditResumeComp;