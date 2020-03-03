import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './certs.styles.css';
import { ReactComponent as CertIcon } from '../../../../assets/resume-form/cert.svg';
import { addCerts } from '../../../../redux/certs/certs.actions';
import { getUserCerts } from '../../../../firebase/auth.util';

import ViewCertsComp from './view-certs/view.certs.component';
import EditCertComp from './edit-cert/edit.cert.component';

const CertsComp = ({ userId, addCerts }) => {

    useEffect(() => {
        (async function asyncFunction() {
            const certsRef = await getUserCerts(userId);
            certsRef.get().then(certs => {
                const certificates = certs.docs.map(certSnap => {
                    const certificate = certSnap.data();
                    console.log(certificate)
                    return {
                        id: certSnap.id,
                        title: certificate.title,
                        issuedBy: certificate.issuedBy,
                        issueDate: certificate.issueDate && certificate.issueDate.toDate(),
                        expiryDate: certificate.expiryDate && certificate.expiryDate.toDate()
                    }
                });
                addCerts(certificates); // redux
            });
        })();
    }, [addCerts, userId]);


    return (
        <div className="Certs card neu-up" id="Edit-Certs__id">
            <div className="card-header">
                <h5>Certificates</h5>
            </div>
            <div className="card-body">
                <div className="frow">
                    <div className="text">
                        <EditCertComp />
                        <ViewCertsComp />
                    </div>
                    <div className="image">
                        <CertIcon className="work-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user }) => (
    {
        userId: user.currentUser.id
    }
);

const mapDispatchToProps = dispatch => (
    {
        addCerts: (certs) => dispatch(addCerts(certs))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(CertsComp);