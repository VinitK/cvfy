import React from 'react';

import './jobs-land.styles.css';

import JobsHeaderComp from './jobs-header/jobs.header.component';
import JobsThreeCardComp from './jobs-three-card/jobs.three-card.component';

const JobsLandComp = () => {
    return (
        <div className="HomeLand">
            <JobsHeaderComp />
            <JobsThreeCardComp />
        </div>
    );
};

export default JobsLandComp;