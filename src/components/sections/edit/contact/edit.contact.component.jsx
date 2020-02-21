import React from 'react';

import './edit.contact.styles.css';

import { ReactComponent as ContactIcon } from '../../../../assets/resume-form/contact.svg';
import InputComp from '../../../elements/input/input.component';


const EditContactComp = ({ state, setState }) => {

    const { displayName, email, introduction, linkedin, phone } = state;

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <div className="Edit-contact card neu-up" id="Edit-contact__id">
            <div className="card-header">
                <h5>Contact</h5>
            </div>
            <div className="card-body">
                <div className="text">
                    <form onSubmit={handleSubmit}>
                        <InputComp type="text" id="editContactName" name="displayName" value={displayName} onChange={handleChange}>Display Name</InputComp>
                        <InputComp type="text" id="editIntro" name="introduction" value={introduction} onChange={handleChange}>One Line Introduction</InputComp>
                        <InputComp type="email" id="editContactEmail" name="email" value={email} onChange={handleChange}>Contact Email</InputComp>
                        <InputComp type="tel" id="editContactPhone" name="phone" value={phone} onChange={handleChange}>Contact Phone</InputComp>
                        <InputComp type="url" id="editLinkedinUrl" name="linkedin" value={linkedin} onChange={handleChange}>Linkedin Profile URL</InputComp>
                    </form>
                </div>
                <div className="image">
                    <ContactIcon className="contact-icon" />
                </div>
            </div>
        </div>
    );
};

export default EditContactComp;