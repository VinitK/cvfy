import React from 'react';

import './resume.cert.styles.css';

const ResumeCertComp = (cert) => { // COMPONENT
    const { title, issuedBy, issueDate, validDate, noExpiry } = cert.cert;
    return (
        <div className="Cert card-row">
            <div className="content frow">
                <div className="fcol">
                    <p className="ch3">{title}</p>
                    <p className="mts">Issued by {issuedBy}</p>
                </div>
                <div className="fcol">
                    <p className="mts">Completed on {issueDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}</p>
                    <p className="mts">{noExpiry ? "No expiry" : `Valid till ${validDate && validDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}`}</p>
                </div>
            </div>
        </div>
    );
};

export default ResumeCertComp;