import React from 'react';

import './resume.project.styles.css';

const ResumeProjectComp = ({ project }) => { // COMPONENT
    const { title, company, description } = project;
    return (
        <div className="Resume-Project card-row">
            <div className="content fcol">
                <p className="title">{title}</p>
                <p className="company mtxs">{company}</p>
                <p className="description mtxs">{description}</p>
            </div>
        </div>
    );
};

export default ResumeProjectComp;