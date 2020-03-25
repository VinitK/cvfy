import React, { useState } from 'react';
import { connect } from 'react-redux';

import './view.job.styles.css';
import { ReactComponent as DeleteComp } from '../../../../../assets/resume-form/delete.svg'
import { ReactComponent as EditComp } from '../../../../../assets/resume-form/edit.svg'
import { ReactComponent as LocationComp } from '../../../../../assets/resume-form/location.svg'
import { deleteUserJob, applyToJob } from '../../../../../firebase/auth.util'; // db

import ButtonComp from '../../../../elements/button/button.component';
import AddJobComp from '../../add-job/add.job.component';
import SpinnerComp from '../../../../elements/spinner/spinner.component';

const ViewJobComp = ({ currentUser, job, setJobs }) => {

    const [edit, setEdit] = useState(false);
    const [state, setState] = useState({ ...job });
    const [applied, setApplied] = useState(currentUser.applied && currentUser.applied.some(doc => doc.jobId === job.id))
    const [loading, setLoading] = useState(false);

    const handleApply = async (currentUser, state, applyToJob) => {
        setLoading(true);
        await applyToJob(currentUser, state);
        setLoading(false);
        setApplied(true);
    }

    const handleDelete = async (currentUser, state, setJobs, deleteUserJob) => {
        await deleteUserJob(currentUser.id, state.id);
        setJobs(prevState => prevState.filter(job => job.id !== state.id)); // redux-sort
        // add currentUser with applied to job on redux state
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
                            <h5><span className="ch3">{state.designationObj && state.designationObj.designation}</span> {state.companyObj && <span>at <span className="ch4">{state.companyObj.company}</span></span>}</h5>
                            <p className="frow fwrap mtxs"><LocationComp className="icon mtxs mrxs" />{state.locationsArrRefs && state.locationsArrRefs.map((location, index) => <span key={index} className="badge bgcl mtxs mrxs fss">{location.location}</span>)}</p>
                            <p className="frow fwrap mtxs">{state.skillsArrRefs && state.skillsArrRefs.map((skill, index) => <span key={index} className="badge bgch4 mtxs mrxs fss">{skill.skill}</span>)}</p>
                            <p className="mtm">{state.description}</p>
                        </div>
                        <div className="fcol fjcsb face update-delete">
                            {
                                state.created && state.created.some(obj => currentUser.id === obj.createdById)
                                    ?
                                    <>
                                        <ButtonComp onClick={() => setEdit(true)} className="button-icon edit-icon"><EditComp className="icon" /></ButtonComp>
                                        <ButtonComp onClick={() => handleDelete(currentUser, state, setJobs, deleteUserJob)} className="button-icon delete-icon mtxs"><DeleteComp className="icon" /></ButtonComp>
                                    </>
                                    :
                                    <>
                                        <ButtonComp btnType="SAVE_FORM" onClick={() => handleApply(currentUser, state, applyToJob)} disabled={applied} className="button pm">{applied ? "Applied" : "Apply"}</ButtonComp>
                                        {loading && <SpinnerComp className="mtm" />}
                                    </>
                            }
                        </div>
                    </div>
            }
        </div >
    );
}

const mapStateToProps = ({ user: { currentUser } }) => (
    {
        currentUser
    }
)

export default connect(mapStateToProps)(ViewJobComp);