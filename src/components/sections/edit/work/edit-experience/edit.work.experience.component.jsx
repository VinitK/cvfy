import React, { useState } from 'react';
import { connect } from 'react-redux';

import "react-datepicker/dist/react-datepicker.css";
import './edit.work.experience.styles.css';

import { addUserWork, updateUserExperience } from '../../../../../firebase/auth.util';
import { addExperience } from '../../../../../redux/work/work.actions';

import InputComp from '../../../../elements/input/input.component';
import ReactDatePicker from 'react-datepicker';
import ButtonComp from '../../../../elements/button/button.component';
import SpinnerComp from '../../../../elements/spinner/spinner.component';
import { useEffect } from 'react';


const EditWorkExpComp = ({ userId, addExperience, experience, setEdit, setExperience, editId }) => {

    const [state, setState] = useState(
        {
            id: "",
            startDate: null,
            endDate: null,
            company: "",
            designation: "",
            description: "",
            currentlyWorking: false
        }
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (experience) {
            const { id, startDate, endDate, company, designation, description, currentlyWorking } = experience;
            setState(
                {
                    id,
                    startDate,
                    endDate,
                    company,
                    designation,
                    description,
                    currentlyWorking
                }
            );
        }
    }, [experience]);

    const resetState = () => {
        setState({
            ...state,
            startDate: null,
            endDate: null,
            company: "",
            designation: "",
            description: "",
            currentlyWorking: false
        });

    }

    const handleCurrentlyWorkingChange = e => {
        const { checked, name } = e.target;
        setState({ ...state, [name]: checked });
    }

    const handleChange = e => {
        const { value, name } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        if (experience) {
            await updateUserExperience(userId, state, experience.id); // db
            setExperience({ ...state, id: experience.id }) // view experience setState
            // const workList = work.filter(exp => exp.id === experience.id);
            // addWork(workList); // redux
            // addExperience({ ...state, id: experience.id }); // redux
            setEdit(false);
        } else {
            const expId = await addUserWork(userId, state); // db
            addExperience({ ...state, id: expId }); // redux
            resetState();
            setLoading(false);
        }
    }

    return (
        <div className="Edit-work-exp neu-dn card mtm pm">
            <form onSubmit={handleSubmit} className="form">
                <div className="start-end-date-group frow">
                    <div className="start-date-group">
                        <ReactDatePicker
                            selected={state.startDate}
                            name="startDate"
                            onChange={date => setState({ ...state, startDate: date })}
                            maxDate={new Date()}
                            dateFormat="MMM yyyy"
                            placeholderText="Start Date"
                            className="date-picker"
                            showMonthYearPicker
                        />
                    </div>
                    <div className="end-date-group fcol">
                        <ReactDatePicker
                            selected={state.endDate}
                            name="endDate"
                            onChange={date => setState({ ...state, endDate: date })}
                            minDate={state.startDate}
                            maxDate={new Date()}
                            dateFormat="MMM yyyy"
                            placeholderText="End Date"
                            className="date-picker"
                            disabled={state.currentlyWorking}
                            showMonthYearPicker
                        />
                        <div className="frow currently-working-group ps">
                            <input
                                type="checkbox"
                                className="checkbox"
                                onChange={handleCurrentlyWorkingChange}
                                id={`currently-working${editId}`}
                                name="currentlyWorking"
                                checked={state.currentlyWorking}
                            />
                            <label htmlFor={`currently-working${editId}`} className="mls">Currently Working</label>
                        </div>
                    </div>
                </div>
                <InputComp type="text" id={`editExpCompany${editId}`} name="company" value={state.company} onChange={handleChange}>Company Name</InputComp>
                <InputComp type="text" id={`editExpDesignation${editId}`} name="designation" value={state.designation} onChange={handleChange}>Designation</InputComp>
                <InputComp type="textarea" id={`editExpDescription${editId}`} rows="4" name="description" value={state.description} onChange={handleChange} >Key Activities Carried Out</InputComp>
                <div className="frow fjcsb facc form-btns mtm">
                    <ButtonComp type="submit" btnType="ADD_FORM" className="button" loading={loading}>{experience ? "Update" : "Add"}</ButtonComp>
                    {
                        loading && <SpinnerComp className="mlm" />
                    }
                    {
                        experience && <ButtonComp type="button" btnType="CANCEL_FORM" className="button" onClick={() => setEdit(false)} >Cancel</ButtonComp>
                    }
                </div>
            </form>
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
        addExperience: experience => dispatch(addExperience(experience))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(EditWorkExpComp);