import React from 'react';

import './resume.work.styles.css';

import ResumeWorkExperienceComp from './experience/resume.work-experience.component';

const ResumeWorkComp = ({ experiences }) => { // COMPONENT
    return (

        experiences.length > 0 &&
        <div className="Work card neu-up mts">
            <div className="card-header">
                <h6>Work Experience</h6>
            </div>
            <div className="card-body">
                {experiences.map(experience => <ResumeWorkExperienceComp key={experience.id} experience={experience} />)}
            </div>
        </div>

    );
};

export default ResumeWorkComp;