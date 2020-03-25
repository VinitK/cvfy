import React, { useState } from 'react';
import { connect } from 'react-redux';

import './view.work.experience.styles.css';
import { deleteUserWork } from '../../../../../../firebase/auth.util';
import { addWork } from '../../../../../../redux/work/work.actions';
import { ReactComponent as DeleteComp } from '../../../../../../assets/resume-form/delete.svg'
import { ReactComponent as EditComp } from '../../../../../../assets/resume-form/edit.svg'

import ButtonComp from '../../../../../elements/button/button.component';
import EditWorkExpComp from '../../edit-experience/edit.work.experience.component';

const ViewWorkExpComp = ({ currentUser, work, addWork, experience }) => {

    const [edit, setEdit] = useState(false);
    const [state, setState] = useState({
        id: experience.id,
        startDate: experience.startDate,
        endDate: experience.endDate,
        company: experience.company,
        designation: experience.designation,
        description: experience.description,
        currentlyWorking: false,
        displayName: currentUser.displayName,
        introduction: currentUser.introduction,
        photoURL: currentUser.photoURL
    });

    const deleteWork = (work, state) => {
        deleteUserWork(currentUser.id, state); // db
        const filteredWork = work.filter(exp => exp.id !== state.id); // clone array minus current exp
        addWork(filteredWork); // redux
    };

    if (edit) {
        return <EditWorkExpComp setEdit={setEdit} experience={state} setExperience={setState} />
    } else {
        return (
            <div className="View-work-exp neu-up card mtm pm frow">
                <div className="content fcol">
                    <div className="frow">
                        <h5><span className="ch4">{state.designation}</span> at <span className="ch3">{state.company}</span></h5>
                    </div>
                    <div className="frow start-end-date-group mts">
                        <h6><span className="ch2">{state.startDate && state.startDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span> to <span className="ch2">{state.currentlyWorking ? "Present" : state.endDate && state.endDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span></h6>
                    </div>
                    <p className="description mts">{state.description}</p>
                </div>
                <div className="fcol update-delete">
                    <ButtonComp onClick={() => setEdit(true)} className="button-icon edit-icon"><EditComp className="icon" /></ButtonComp>
                    <ButtonComp onClick={() => deleteWork(work, state)} className="button-icon delete-icon mtxs"><DeleteComp className="icon" /></ButtonComp>
                </div>
            </div>
        );
    }
};

const mapStateToProps = ({ user, work }) => (
    {
        currentUser: user.currentUser,
        work: work.work
    }
);

const mapDispatchToProps = dispatch => (
    {
        addWork: (work) => dispatch(addWork(work))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(ViewWorkExpComp);