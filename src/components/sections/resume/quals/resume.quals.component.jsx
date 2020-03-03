import React from 'react';

import './resume.quals.styles.css';

import ResumeQualComp from './qual/resume.qual.component';

const ResumeQualsComp = ({ quals }) => { // COMPONENT
    return (
        quals.length > 0 &&
        < div className="Quals card neu-up" >
            <div className="card-header">
                <h5>Qualification</h5>
            </div>
            <div className="card-body">
                {quals.map(qual => <ResumeQualComp key={qual.id} qual={qual} />)}
            </div>
        </div >
    );
};

export default ResumeQualsComp;