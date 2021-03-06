import React, { useState } from 'react';
import { connect } from 'react-redux';

import './edit.qual.styles.css';
import "react-datepicker/dist/react-datepicker.css";
import { addUserQual } from '../../../../../firebase/auth.util';
import { addQual } from '../../../../../redux/quals/quals.actions';

import ReactDatePicker from 'react-datepicker';
import InputComp from '../../../../elements/input/input.component';
import ButtonComp from '../../../../elements/button/button.component';
import SpinnerComp from '../../../../elements/spinner/spinner.component';


const EditQualComp = ({ currentUser, addQual }) => {

    const [state, setState] = useState(
        {
            course: "",
            institute: "",
            university: "",
            score: "",
            startDate: null,
            endDate: null,
            pursuing: false,
            displayName: currentUser.displayName,
            introduction: currentUser.introduction,
            photoURL: currentUser.photoURL

        }
    );

    const [loading, setLoading] = useState(false);

    const resetState = () => {
        setState({
            ...state,
            course: "",
            institute: "",
            university: "",
            score: "",
            startDate: null,
            endDate: null,
            pursuing: false
        });
    }

    const handlePursuingChange = e => {
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
        const qualId = await addUserQual(currentUser.id, state); // db
        addQual({ ...state, id: qualId }); // redux
        resetState();
        setLoading(false);
    }

    return (
        <div className="Edit-qual neu-dn card mtm pm">
            <form onSubmit={handleSubmit} className="form">
                <InputComp type="text" id="editQualCourse" name="course" value={state.course} onChange={handleChange}>Course</InputComp>
                <InputComp type="text" id="editQualInstitute" name="institute" value={state.institute} onChange={handleChange}>Institute</InputComp>
                <InputComp type="text" id="editQualUniversity" name="university" value={state.university} onChange={handleChange}>University</InputComp>
                <InputComp type="text" id="editQualScore" name="score" value={state.score} onChange={handleChange}>Score</InputComp>
                <div className="frow start-end-date-group mtm">
                    <div className="start-date-group fcol">
                        <ReactDatePicker
                            selected={state.startDate}
                            name="startDate"
                            onChange={date => setState({ ...state, startDate: date })}
                            maxDate={new Date()}
                            dateFormat="MMM yyyy"
                            placeholderText="From"
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
                            placeholderText="To"
                            className="date-picker"
                            disabled={state.pursuing}
                            showMonthYearPicker
                        />
                        <div className="frow pursuing-group ps">
                            <input
                                type="checkbox"
                                className="checkbox"
                                onChange={handlePursuingChange}
                                id="pursuing__id"
                                name="pursuing"
                                checked={state.pursuing}
                            />
                            <label htmlFor="pursuing__id" className="mls">Pursuing</label>
                        </div>
                    </div>
                </div>
                <div className="frow facc mtm">
                    <ButtonComp btnType="ADD_FORM" className="button" loading={loading}>Add</ButtonComp>
                    {loading && <SpinnerComp className="mlm" />}
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = ({ user }) => (
    {
        currentUser: user.currentUser
    }
);

const mapDispatchToProps = dispatch => (
    {
        addQual: qualification => dispatch(addQual(qualification))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(EditQualComp);