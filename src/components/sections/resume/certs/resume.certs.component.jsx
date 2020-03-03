import React from 'react';

import './resume.certs.styles.css';

import ResumeCertComp from './cert/resume.cert.component';

const ResumeCertsComp = ({ certs }) => { // COMPONENT
    return (
        certs.length > 0 &&
        <div className="Certs card neu-up">
            <div className="card-header">
                <h5>Certificates</h5>
            </div>
            <div className="card-body">
                {certs.map(cert => <ResumeCertComp key={cert.id} cert={cert} />)}
            </div>
        </div>
    );
};

export default ResumeCertsComp;