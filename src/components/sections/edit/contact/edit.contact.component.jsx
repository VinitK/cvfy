import React, { useState, useEffect, useRef } from 'react';

import './edit.contact.styles.css';
import { ReactComponent as ContactIcon } from '../../../../assets/resume-form/contact.svg';
import firebase from '../../../../firebase/auth.util';

import InputComp from '../../../elements/input/input.component';
import ButtonComp from '../../../elements/button/button.component';


const EditContactComp = () => { // COMPONENT
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(
        {
            displayName: "",
            primaryContactEmail: "",
            primaryContactPhone: "",
            linkedinUrl: "",
            password: ""
        }
    );
    const isInitialMount = useRef(true);

    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        setUser(
            {
                displayName: e.target.editContactName.value,
                primaryContactEmail: e.target.editContactEmail.value,
                primaryContactPhone: e.target.editContactPhone.value,
                linkedinUrl: e.target.editLinkedinUrl.value,
                password: e.target.editPassword.value
            }
        );
    }

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(user.primaryContactEmail, user.password)
                .then(res => {
                    if (res.user) {
                        setLoggedIn(true);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user]);

    return (
        <div className="Edit-contact card">
            <div className="card-header">
                <h4>Contact Details</h4>
            </div>
            <div className="card-body">
                <div className="text">
                    <form onSubmit={submitHandler}>
                        <InputComp type="text" id="editContactName">Display Name</InputComp>
                        <InputComp type="email" id="editContactEmail">Contact Email</InputComp>
                        <InputComp type="tel" id="editContactPhone">Contact Phone</InputComp>
                        <InputComp type="url" id="editLinkedinUrl">Linkedin Profile URL</InputComp>
                        <InputComp type="password" id="editPassword">Password</InputComp>
                        <InputComp type="password" id="editConfirmPassword">Confirm Password</InputComp>
                        <ButtonComp type="submit" loading={loading} className="stdButton mtl">SAVE</ButtonComp>
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