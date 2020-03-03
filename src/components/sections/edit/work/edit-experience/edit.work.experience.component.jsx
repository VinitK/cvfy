import React, { useState } from 'react';
import { connect } from 'react-redux';

import "react-datepicker/dist/react-datepicker.css";
import './edit.work.experience.styles.css';

import { addUserWork } from '../../../../../firebase/auth.util';
import { addExperience } from '../../../../../redux/work/work.actions';

import InputComp from '../../../../elements/input/input.component';
import ReactDatePicker from 'react-datepicker';
import ButtonComp from '../../../../elements/button/button.component';


const EditWorkExpComp = ({ userId, addExperience }) => {

    const [state, setState] = useState(
        {
            startDate: null,
            endDate: null,
            company: "",
            designation: "",
            description: "",
            currentlyWorking: false
        }
    );

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
        const expId = await addUserWork(userId, state); // db
        addExperience({ ...state, id: expId }); // redux
        resetState();
    }

    return (
        <div className="Edit-work-exp neu-dn card mtm pm">
            <form onSubmit={handleSubmit} className="form">
                <div className="frow start-end-date-group">
                    <div className="start-date-group fcol">
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
                    <div className="end-date-group fcol mll">
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
                                id="currently-working__id"
                                name="currentlyWorking"
                                checked={state.currentlyWorking}
                            />
                            <label htmlFor="currently-working__id" className="mls">Currently Working</label>
                        </div>
                    </div>
                </div>
                <InputComp type="text" id="editExpCompany" name="company" value={state.company} onChange={handleChange}>Company Name</InputComp>
                <InputComp type="text" id="editExpDesignation" name="designation" value={state.designation} onChange={handleChange}>Designation</InputComp>
                <InputComp type="textarea" id="editExpDescription" rows="4" name="description" value={state.description} onChange={handleChange} >Key Activities Carried Out</InputComp>
                <ButtonComp btnType="SAVE_FORM" className="button mtm">Save</ButtonComp>
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