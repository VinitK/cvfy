import React, { useState } from 'react';

import './auth.login.styles.css';

import { signInWithGoogle, auth } from '../../../../firebase/auth.util';

import ButtonComp from '../../../elements/button/button.component';
import InputComp from '../../../elements/input/input.component';

const AuthLoginComp = () => {
    const [state, setState] = useState({ email: "", password: "" });

    const { email, password } = state;

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setState({ email: "", password: "" });
        } catch (err) {
            console.error(err);
        }
    }

    const handleChange = event => {
        const { value, name } = event.target;
        setState({ ...state, [name]: value });
    }

    return (
        <div className="Auth-login fcol">
            <ButtonComp className="google-signin-btn mtm" onClick={signInWithGoogle} googleSignIn>Signin with Google</ButtonComp>
            <div className="card mtm neu-up">
                <div className="card-header">
                    Login with Email and Password
                </div>
                <div className="card-body">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <InputComp onChange={handleChange} type="email" name="email" value={email} id="email__id">Email *</InputComp>
                        <InputComp onChange={handleChange} type="password" name="password" value={password} id="password__id">Password *</InputComp>
                        <ButtonComp className="stdButton bgch4 mtm">Login</ButtonComp>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthLoginComp;