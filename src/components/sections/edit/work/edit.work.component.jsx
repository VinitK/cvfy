import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './edit.work.styles.css';
import { ReactComponent as WorkIcon } from '../../../../assets/resume-form/work.svg';
import { getUserWork } from '../../../../firebase/auth.util';
import { addWork } from '../../../../redux/work/work.actions';

import ViewWorkComp from './view-work/view.work.component';
import EditWorkExpComp from './edit-experience/edit.work.experience.component';

const EditWorkComp = ({ userId, addWork }) => {

    useEffect(() => {
        (async function asyncFunction() {
            const workRef = await getUserWork(userId);
            workRef.get().then(work => {
                const experiences = work.docs.map(experienceSnap => {
                    const experience = experienceSnap.data();
                    return {
                        id: experienceSnap.id,
                        company: experience.company,
                        description: experience.description,
                        designation: experience.designation,
                        startDate: experience.startDate && experience.startDate.toDate(),
                        endDate: experience.endDate && experience.endDate.toDate(),
                        currentlyWorking: experience.currentlyWorking
                    }
                });
                addWork(experiences);
                console.log("DB");
            });
        })();
    }, [addWork, userId]);


    return (
        <div className="Edit-work card neu-up" id="Edit-Work__id">
            <div className="card-header">
                <h5>Work Experience</h5>
            </div>
            <div className="card-body">
                <div className="frow">
                    <div className="text">
                        <EditWorkExpComp />
                        <ViewWorkComp />
                    </div>
                    <div className="image">
                        <WorkIcon className="work-icon" />
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
        addWork: (work) => dispatch(addWork(work))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(EditWorkComp);