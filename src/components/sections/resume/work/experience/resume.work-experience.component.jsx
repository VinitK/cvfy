import React from 'react';

import './resume.work-experience.styles.css';

const ResumeWorkExperienceComp = (experience) => { // COMPONENT
    const { company, designation, startDate, endDate, description } = experience.experience;
    return (
        <div className="Work-experience card-row">
            <div className="content fcol">
                <p className="company-name">{company}</p>
                <div className="designation-duration frow">
                    <p className="mtxs">{designation}</p>
                    <p className="mtxs">{startDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })} to {endDate ? endDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'short' }) : "Present"}</p>
                </div>
                <p className="description mtxs">{description}</p>
            </div>
        </div>
    );
};

export default ResumeWorkExperienceComp;