import React from 'react';

import './resume.projects.styles.css';

import ResumeProjectComp from './project/resume.project.component';

const ResumeProjectsComp = ({ projects }) => { // COMPONENT
    return (

        projects.length > 0 &&
        <div className="Projects card neu-up mts">
            <div className="card-header">
                <h6>Projects</h6>
            </div>
            <div className="card-body">
                {projects.map(project => <ResumeProjectComp key={project.id} project={project} />)}
            </div>
        </div>

    );
};

export default ResumeProjectsComp;