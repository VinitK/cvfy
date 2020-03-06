import React from 'react';

import './resume.work-experience.styles.css';

const ResumeWorkExperienceComp = (experience) => { // COMPONENT
    const { company, designation, startDate, endDate, description } = experience.experience;
    return (
        <div className="Work-experience card-row">
            <div className="content fcol">
                <h5 className="company-name">{company}</h5>
                <div className="designation-duration frow">
                    <p>{designation}</p>
                    <p>{startDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })} to {endDate ? endDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'short' }) : "Present"}</p>
                </div>
                <p className="description">{description}</p>
            </div>
        </div>
    );
};

export default ResumeWorkExperienceComp;