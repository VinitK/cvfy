import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './quals.styles.css';
import { ReactComponent as QualIcon } from '../../../../assets/resume-form/qual.svg';
import { addQuals } from '../../../../redux/quals/quals.actions';
import { getUserQuals } from '../../../../firebase/auth.util';

import ViewQualsComp from './view-quals/view.quals.component';
import EditQualComp from './edit-qual/edit.qual.component';

const QualsComp = ({ userId, addQuals }) => {

    useEffect(() => {
        (async function asyncFunction() {
            const qualsRef = await getUserQuals(userId);
            qualsRef.get().then(quals => {
                const qualifications = quals.docs.map(qualSnap => {
                    const qualification = qualSnap.data();
                    console.log(qualification)
                    return {
                        id: qualSnap.id,
                        course: qualification.course,
                        institute: qualification.institute,
                        university: qualification.university,
                        score: qualification.score,
                        startDate: qualification.startDate && qualification.startDate.toDate(),
                        endDate: qualification.endDate && qualification.endDate.toDate(),
                        pursuing: qualification.pursuing
                    }
                });
                addQuals(qualifications); // redux
            });
        })();
    }, [addQuals, userId]);


    return (
        <div className="Quals card neu-up" id="Edit-Quals__id">
            <div className="card-header">
                <h5>Qualifications</h5>
            </div>
            <div className="card-body">
                <div className="frow">
                    <div className="text">
                        <EditQualComp />
                        <ViewQualsComp />
                    </div>
                    <div className="image">
                        <QualIcon className="work-icon" />
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
        addQuals: (quals) => dispatch(addQuals(quals))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(QualsComp);