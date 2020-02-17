import React, { useState } from 'react';

import './auth.login.styles.css';

import ButtonComp from '../../../elements/button/button.component';
import InputComp from '../../../elements/input/input.component';

const AuthLoginComp = () => {
    const [state, setState] = useState({ email: "", password: "" });

    const handleSubmit = event => {
        event.preventDefault();
        setState({ email: "", password: "" });
    }

    const handleChange = event => {
        const { value, name } = event.target;
        setState({ [name]: value });
    }

    return (
        <div className="Auth-login fcol">
            <ButtonComp className="google-signin-btn mtm" googleSignIn>Signin with Google</ButtonComp>
            <div className="card mtm">
                <div className="card-header">
                    Login with Email and Password
                </div>
                <div className="card-body">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <InputComp onChange={handleChange} type="email" name="email" id="email__id">Email *</InputComp>
                        <InputComp type="password" name="password" id="password__id">Password *</InputComp>
                        <ButtonComp className="stdButton bgch4 mtm">Login</ButtonComp>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthLoginComp;