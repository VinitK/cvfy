import React from 'react';

import './edit.contact.styles.css';
import { ReactComponent as ContactIcon } from '../../../../assets/resume-form/contact.svg';

import InputComp from '../../../elements/input/input.component';
import ButtonComp from '../../../elements/button/button.component';


const EditContactComp = () => { // COMPONENT

    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div className="Edit-contact card neu-up">
            <div className="card-header">
                <h4>Contact</h4>
            </div>
            <div className="card-body">
                <div className="text">
                    <form onSubmit={submitHandler}>
                        <InputComp type="text" id="editContactName">Display Name</InputComp>
                        <InputComp type="text" id="editIntro">Introduction</InputComp>
                        <InputComp type="email" id="editContactEmail">Contact Email</InputComp>
                        <InputComp type="tel" id="editContactPhone">Contact Phone</InputComp>
                        <InputComp type="url" id="editLinkedinUrl">Linkedin Profile URL</InputComp>
                        <ButtonComp type="submit" className="stdButton mtl bgcd">SAVE</ButtonComp>
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