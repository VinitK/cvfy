import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './add.job.styles.css'
import { firestore, addUserJob, updateUserJob } from '../../../../firebase/auth.util';
import { ReactComponent as LocationComp } from '../../../../assets/resume-form/location.svg'

import InputComp from '../../../elements/input/input.component';
import ButtonComp from '../../../elements/button/button.component';
import SpinnerComp from '../../../elements/spinner/spinner.component';

const AddJobComp = ({ currentUser, setEdit, setJobs, job, setJob, editId }) => {

    const [state, setState] = useState({
        id: null,
        designation: "",
        company: "",
        locations: "",
        locationsArr: [],
        skills: "",
        description: "",
        skillsArr: []
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (job) {
            const locationsArr = job.locationsArrRefs.map(l => l.location);
            const skillsArr = job.skillsArrRefs.map(s => s.skill);
            setState(prevState => (
                {
                    ...prevState,
                    id: job.id,
                    designation: job.designationObj.designation,
                    company: job.companyObj.company,
                    locations: locationsArr.join(", "),
                    locationsArr,
                    skills: skillsArr.join(", "),
                    skillsArr,
                    description: job.description,
                }
            ));
        }
    }, [job]);

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setState(prevState => ({ ...prevState, [name]: value }));
        (name === "skills") && setState(prevState => ({ ...prevState, skillsArr: value.split(",").map(item => item.trim()) }));
        (name === "locations") && setState(prevState => ({ ...prevState, locationsArr: value.split(",").map(item => item.trim()) }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        if (job) { // to update
            const jobId = await updateUserJob(currentUser, state, job); // db
            setJob(prevJob => ({
                ...prevJob,
                companyObj: {
                    company: state.company,
                    companyRef: firestore.doc(`companies/${state.company}`)
                },
                created: [
                    {
                        createdBy: firestore.doc(`users/${currentUser.id}`),
                        createdAt: new Date(),
                        createdById: currentUser.id,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    }
                ], // [{createdBy, createdAt, userId, displayName, photoURL}]
                description: state.description,
                designationObj: {
                    designation: state.designation,
                    designationRef: firestore.doc(`designations/${state.designation}`),
                },
                locationsArrRefs: state.locationsArr.map(location => ({ location, locationRef: firestore.doc(`locations/${location}`) })), // [{location, locationRef}]
                skillsArrRefs: state.skillsArr.map(skill => ({ skill, locationRef: firestore.doc(`skills/${skill}`) })), // [{skill, skillRef}]
                updatedOn: new Date(),
            })) // redux-sort
        } else {
            const jobId = await addUserJob(currentUser, state); // db
            setJobs(prevJobs => [...prevJobs, {
                id: jobId,
                companyObj: {
                    company: state.company,
                    companyRef: firestore.doc(`companies/${state.company}`)
                },
                created: [
                    {
                        createdBy: firestore.doc(`users/${currentUser.id}`),
                        createdAt: new Date(),
                        createdById: currentUser.id,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    }
                ], // [{createdBy, createdAt, userId, displayName, photoURL}]
                description: state.description,
                designationObj: {
                    designation: state.designation,
                    designationRef: firestore.doc(`designations/${state.designation}`),
                },
                locationsArrRefs: state.locationsArr.map(location => ({ location, locationRef: firestore.doc(`locations/${location}`) })), // [{location, locationRef}]
                skillsArrRefs: state.skillsArr.map(skill => ({ skill, locationRef: firestore.doc(`skills/${skill}`) })), // [{skill, skillRef}]
            }]); // redux
        }
        setLoading(false);
        setEdit(false);
    }

    return (
        <div className="AddJob frow fjcsb facs">
            <div className="card neu-up mxs">
                <div className="card-header">
                    <h5>Add New Job</h5>
                </div>
                <div className="card-body pm">
                    <form onSubmit={handleSubmit} className="form">
                        <InputComp required id={`editdesignation${editId}`} name="designation" onChange={handleChange} value={state.designation}>Designation</InputComp>
                        <InputComp id={`editcompany${editId}`} name="company" onChange={handleChange} value={state.company}>Company</InputComp>
                        <InputComp id={`editlocations${editId}`} name="locations" onChange={handleChange} value={state.locations}>Cities (separated by comma)</InputComp>
                        <InputComp id={`editskills${editId}`} name="skills" onChange={handleChange} value={state.skills}>Key Skills (separated by comma)</InputComp>
                        <InputComp id={`editdescription${editId}`} type="textarea" rows='10' name="description" onChange={handleChange} value={state.description}>Description</InputComp>
                        <div className="frow fjcsb facc form-btns mtm">
                            <ButtonComp type="submit" btnType="SAVE_FORM" className="button" loading={loading}>{job ? "Update" : "Save"}</ButtonComp>
                            {
                                loading && <SpinnerComp className="mlm" />
                            }
                            <ButtonComp type="button" btnType="CANCEL_FORM" className="button" onClick={() => setEdit(false)} >Cancel</ButtonComp>
                        </div>
                    </form>
                </div>
            </div>
            <div className="preview card neu-up mxs">
                <div className="card-header">
                    <h5>Preview</h5>
                </div>
                <div className="card-body fcol facs pm">
                    <h5><span className="ch3">{state.designation}</span> {state.company && <span>at <span className="ch4">{state.company}</span></span>}</h5>
                    {state.locations && <p className="frow fwrap mtxs"><LocationComp className="icon mtxs mrxs" />{state.locationsArr.map((skill, index) => <span key={index} className="badge bgcl mtxs mrxs fss">{skill}</span>)}</p>}
                    <p className="frow fwrap mtxs">{state.skills && state.skillsArr.map((skill, index) => <span key={index} className="badge bgch4 mtxs mrxs fss">{skill}</span>)}</p>
                    <p className="mtm">{state.description}</p>
                    <ButtonComp btnType="SAVE_FORM" type="button" disabled={true} className="button pm mtm">Apply</ButtonComp>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user }) => (
    {
        currentUser: user.currentUser
    }
);

export default connect(mapStateToProps)(AddJobComp);