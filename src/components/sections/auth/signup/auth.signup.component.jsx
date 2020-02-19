import React, { useState } from 'react';

import ButtonComp from '../../../elements/button/button.component';

import './auth.signup.styles.css';

import { auth, createUserProfileDoc } from '../../../../firebase/auth.util';

import InputComp from '../../../elements/input/input.component';

const AuthSignupComp = () => {

    const [state, setState] = useState(
        {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    )

    const { displayName, email, password, confirmPassword } = state;

    const handleSubmit = async event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Confirm password doesn't match with password.");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDoc(user, { displayName });
            setState(
                {
                    displayName: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                }
            )
        } catch (err) {
            console.error(err);
        }
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    }

    return (
        <div className="Auth-signup fcol">
            <div className="card mtm neu-up">
                <div className="card-header bgch3">
                    New user? Let's sign up
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="login-form">
                        <InputComp onChange={handleChange} type="text" name="displayName" value={displayName} id="display-name__id">Display Name</InputComp>
                        <InputComp onChange={handleChange} type="email" name="email" value={email} id="new-email__id">Email *</InputComp>
                        <InputComp onChange={handleChange} type="password" name="password" value={password} id="new-password__id">Set Password *</InputComp>
                        <InputComp onChange={handleChange} type="password" name="confirmPassword" value={confirmPassword} id="confirm-password__id">Confirm Password *</InputComp>
                        <ButtonComp className="stdButton bgch3 mtm">Signup</ButtonComp>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthSignupComp;