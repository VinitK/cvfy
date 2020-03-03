import React from 'react';
import { connect } from 'react-redux';

import './view.certs.styles.css';

import ViewCertComp from './view-cert/view.cert.component';

const ViewCertsComp = ({ certs }) => (
    <div>
        {certs.map((cert, index) => <ViewCertComp key={index} cert={cert} />)}
    </div>
);

const mapStateToProps = ({ certs }) => (
    {
        certs: certs.certs
    }
);

export default connect(mapStateToProps)(ViewCertsComp);