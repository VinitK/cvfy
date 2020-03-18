import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './view.job.styles.css';
import { ReactComponent as DeleteComp } from '../../../../../assets/resume-form/delete.svg'
import { ReactComponent as EditComp } from '../../../../../assets/resume-form/edit.svg'
import { ReactComponent as LocationComp } from '../../../../../assets/resume-form/location.svg'
import { deleteUserJob, applyToJob } from '../../../../../firebase/auth.util'; // db

import ButtonComp from '../../../../elements/button/button.component';
import AddJobComp from '../../add-job/add.job.component';

const ViewJobComp = ({ userId, job, setJobs }) => {

    const [edit, setEdit] = useState(false);
    const [state, setState] = useState(
        {
            id: "",
            designation: "",
            company: "",
            locationsArr: [],
            skillsArr: [],
            description: "",
            createdAt: null,
            updatedOn: null,
            createdBy: null,
            updatedBy: null,
            applied: []
        }
    );

    useEffect(() => {
        setState(prevState => ({ ...prevState, ...job }));
    }, [job, setState]);

    const handleApply = async (userId, state, setState) => {
        await applyToJob(userId, state.id);
        setState(prevState => ({ ...prevState, applied: [{ id: userId }] }))
    }

    const handleDelete = async (userId, state) => {
        await deleteUserJob(userId, state.id);
        setJobs(prevState => prevState.filter(job => job.id !== state.id)); // redux-sort
    }

    return (
        <div className="ViewJob mtm" >
            {
                edit
                    ?
                    <AddJobComp setEdit={setEdit} job={state} setJob={setState} editId={state.id} />
                    :
                    <div className="content neu-up card pm frow fjcsb">
                        <div className="text fcol">
                            <h5><span className="ch3">{state.designation}</span> {state.company && <span>at <span className="ch4">{state.company}</span></span>}</h5>
                            <p className="frow fwrap mtxs"><LocationComp className="icon mtxs mrxs" />{state.locationsArr && state.locationsArr.map((location, index) => <span key={index} className="badge bgcl mtxs mrxs fss">{location}</span>)}</p>
                            <p className="frow fwrap mtxs">{state.skillsArr && state.skillsArr.map((skill, index) => <span key={index} className="badge bgch4 mtxs mrxs fss">{skill}</span>)}</p>
                            <p className="mtm">{state.description}</p>
                        </div>
                        <div className="fcol fjcsb update-delete">
                            {
                                (userId === state.createdBy || userId === state.updatedBy)
                                    ?
                                    <>
                                        <ButtonComp onClick={() => setEdit(true)} className="button-icon edit-icon"><EditComp className="icon" /></ButtonComp>
                                        <ButtonComp onClick={() => handleDelete(userId, state, setJobs)} className="button-icon delete-icon mtxs"><DeleteComp className="icon" /></ButtonComp>
                                    </>
                                    :
                                    state.applied && <ButtonComp btnType="SAVE_FORM" onClick={() => handleApply(userId, state, setState)} disabled={state.applied.some(doc => doc.id === userId)} className="button pm">{state.applied.some(doc => doc.id === userId) ? "Applied" : "Apply"}</ButtonComp>
                            }
                        </div>
                    </div>
            }
        </div >
    );
}

const mapStateToProps = ({ user: { currentUser: { id } } }) => (
    {
        userId: id
    }
)

export default connect(mapStateToProps)(ViewJobComp);