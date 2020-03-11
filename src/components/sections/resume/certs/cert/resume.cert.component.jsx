import React from 'react';

import './resume.cert.styles.css';

const ResumeCertComp = (cert) => { // COMPONENT
    const { title, issuedBy, issueDate, validDate, noExpiry } = cert.cert;
    return (
        <div className="Cert card-row">
            <div className="content frow">
                <div className="fcol">
                    <p className="ch3">{title}</p>
                    <p className="mtxs">Issued by {issuedBy}</p>
                </div>
                <div className="fcol">
                    <p className="mtxs">Completed on {issueDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}</p>
                    <p className="mtxs">{noExpiry ? "No expiry" : `Valid till ${validDate && validDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}`}</p>
                </div>
            </div>
        </div>
    );
};

export default ResumeCertComp;