import React, { useState } from 'react';
import { connect } from 'react-redux';

import './edit.cert.styles.css';
import "react-datepicker/dist/react-datepicker.css";
import { addUserCert } from '../../../../../firebase/auth.util';
import { addCert } from '../../../../../redux/certs/certs.actions';

import ReactDatePicker from 'react-datepicker';
import InputComp from '../../../../elements/input/input.component';
import ButtonComp from '../../../../elements/button/button.component';
import SpinnerComp from '../../../../elements/spinner/spinner.component';


const EditCertComp = ({ userId, addCert }) => {

    const [state, setState] = useState(
        {
            title: "",
            issuedBy: "",
            issueDate: null,
            validDate: null,
            noExpiry: true
        }
    );

    const [loading, setLoading] = useState(false);

    const resetState = () => {
        setState({
            ...state,
            title: "",
            issuedBy: "",
            issueDate: null,
            validDate: null,
            noExpiry: false
        });

    }

    const handleNoExpiryChange = e => {
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
        const certId = await addUserCert(userId, state); // db
        addCert({ ...state, id: certId }); // redux
        resetState();
        setLoading(false);
    }

    return (
        <div className="Edit-cert neu-dn card mtm pm">
            <form onSubmit={handleSubmit} className="form">
                <div className="frow issue-valid-date-group">
                    <div className="issue-date-group fcol">
                        <ReactDatePicker
                            selected={state.issueDate}
                            name="issueDate"
                            onChange={date => setState({ ...state, issueDate: date })}
                            maxDate={new Date()}
                            dateFormat="MMM yyyy"
                            placeholderText="Issued On"
                            className="date-picker"
                            showMonthYearPicker
                        />
                    </div>
                    <div className="valid-date-group fcol">
                        <ReactDatePicker
                            selected={state.validDate}
                            name="validDate"
                            onChange={date => setState({ ...state, validDate: date })}
                            minDate={new Date()}
                            dateFormat="MMM yyyy"
                            placeholderText="Valid Till"
                            className="date-picker"
                            disabled={state.noExpiry}
                            showMonthYearPicker
                        />
                        <div className="frow no-expiry-group ps">
                            <input
                                type="checkbox"
                                className="checkbox"
                                onChange={handleNoExpiryChange}
                                id="noExpiry__id"
                                name="noExpiry"
                                checked={state.noExpiry}
                            />
                            <label htmlFor="noExpiry__id" className="mls">No Expiry</label>
                        </div>
                    </div>
                </div>
                <InputComp type="text" id="editCertTitle" name="title" value={state.title} onChange={handleChange}>Title</InputComp>
                <InputComp type="text" id="editCertIssuedBy" name="issuedBy" value={state.issuedBy} onChange={handleChange}>Issued By</InputComp>
                <div className="frow-mid mtm">
                    <ButtonComp btnType="SAVE_FORM" className="button" loading={loading}>Add</ButtonComp>
                    {loading && <SpinnerComp className="mlm" />}
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
        addCert: certificate => dispatch(addCert(certificate))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(EditCertComp);