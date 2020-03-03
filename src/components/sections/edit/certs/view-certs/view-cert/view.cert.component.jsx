import React from 'react';
import { connect } from 'react-redux';

import './view.cert.styles.css';
import { deleteUserCert } from '../../../../../../firebase/auth.util';
import { ReactComponent as DeleteComp } from '../../../../../../assets/resume-form/delete.svg'

import ButtonComp from '../../../../../elements/button/button.component';
import { addCerts } from '../../../../../../redux/certs/certs.actions';

const ViewCertComp = ({ userId, certs, addCerts, cert, ...rest }) => {

    const { title, noExpiry, issuedBy } = cert;
    const issueDate = cert.issueDate && cert.issueDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
    const validDate = cert.validDate && cert.validDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });

    const deleteCert = (certs, cert, userId) => {
        deleteUserCert(userId, cert.id); // db
        const filteredCerts = certs.filter(certificate => cert.id !== certificate.id);
        console.log(filteredCerts)
        addCerts(filteredCerts); // redux
    };

    return (
        <div className="View-cert neu-up card mtm pm">
            <div className="frow">
                <div className="fcol">
                    <div className="frow">
                        <h5 className="ch4">{title}</h5>
                    </div>
                    <div className="frow issue-valid-date-group mts">
                        <h6><span className="ch2">{issueDate}</span> to <span className="ch2">{noExpiry ? "lifetime validity" : validDate}</span></h6>
                    </div>
                    <p className="mts">Issued by {issuedBy}</p>
                </div>
                <div className="fcol update-delete">
                    {/* <ButtonComp className="button-icon edit-icon"><EditComp className="icon" /></ButtonComp> */}
                    <ButtonComp onClick={() => deleteCert(certs, cert, userId)} className="button-icon delete-icon"><DeleteComp className="icon" /></ButtonComp>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user, certs }) => (
    {
        userId: user.currentUser.id,
        certs: certs.certs
    }
);

const mapDispatchToProps = dispatch => (
    {
        addCerts: (certs) => dispatch(addCerts(certs))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(ViewCertComp);