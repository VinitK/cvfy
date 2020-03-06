import React, { useState } from 'react';
import { connect } from 'react-redux';

import './edit.contact.styles.css';
import { ReactComponent as ContactIcon } from '../../../../assets/resume-form/contact.svg';
import { updateUser } from '../../../../firebase/auth.util';

import InputComp from '../../../elements/input/input.component';
import ButtonComp from '../../../elements/button/button.component';
import SpinnerComp from '../../../elements/spinner/spinner.component';


const EditContactComp = ({ currentUser, updateCurrentUser }) => {

    const [state, setState] = useState(currentUser);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        await updateUser(state.id, state); // db
        setLoading(false);
        // no need for redux update, since its getting updated by invocation of SET_CURRENT_USER
    }

    const handleChange = e => {
        const { value, name } = e.target;
        let maxLength = undefined;
        switch (name) {
            case "displayName":
                maxLength = 50;
                break;
            case "introduction":
                maxLength = 250;
                break;
            case "email":
                maxLength = 50;
                break;
            case "phone":
                maxLength = 13;
                break;
            case "linkedin":
                maxLength = 100;
                break;
            default:
                maxLength = undefined;
                break;
        }
        setState({ ...state, [name]: value.substr(0, maxLength) })
    }

    return (
        <div className="Edit-contact card neu-up" id="Edit-Contact__id">

            <div className="card-header">
                <h5>Contact</h5>
            </div>
            <div className="card-body">
                <div className="frow">
                    <div className="text">
                        <div className="neu-dn card mtm pm">
                            <form onSubmit={handleSubmit}>
                                <InputComp type="text" id="editContactName" name="displayName" value={state.displayName} onChange={handleChange}>Display Name *</InputComp>
                                <InputComp type="text" id="editIntro" name="introduction" value={state.introduction} onChange={handleChange}>One Line Introduction</InputComp>
                                <InputComp type="email" id="editContactEmail" name="email" value={state.email} onChange={handleChange}>Contact Email *</InputComp>
                                <InputComp type="tel" id="editContactPhone" name="phone" value={state.phone} onChange={handleChange}>Contact Phone</InputComp>
                                <InputComp type="url" id="editLinkedinUrl" name="linkedin" value={state.linkedin} onChange={handleChange}>Linkedin Profile URL</InputComp>
                                <div className="frow-mid mtm">
                                    <ButtonComp btnType="SAVE_FORM" className="button">Save</ButtonComp>
                                    {loading && <SpinnerComp className="mlm" />}
                                </div>
                            </form >
                        </div >
                    </div >
                    <div className="image">
                        <ContactIcon className="contact-icon" />
                    </div>
                </div >
            </div >
        </div >
    );
};

const mapStateToProps = ({ user: { currentUser } }) => (
    {
        currentUser
    }
);

export default connect(mapStateToProps)(EditContactComp);