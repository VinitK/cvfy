import React from 'react';

import './resume.work-experience.styles.css';

const ResumeWorkExperienceComp = (experience) => { // COMPONENT
    const { companyName, designation, startDate, endDate, workDescription } = experience.experience;
    return (
        <div className="Work-experience card-row">
            <div className="content">
                <h5 className="company-name">{companyName}</h5>
                <div className="designation-duration frow">
                    <p>{designation}</p>
                    <p>{startDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short' })} to {endDate ? endDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : "Present"}</p>
                </div>
                <p>{workDescription}</p>
            </div>
        </div>
    );
};

export default ResumeWorkExperienceComp;