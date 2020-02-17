import React from 'react';

import AuthSignupComp from './signup/auth.signup.component';
import AuthLoginComp from './login/auth.login.component';

import './auth.styles.css';


const AuthComp = () => {
    return (
        <div className="Auth frow">
            <AuthLoginComp />
            <AuthSignupComp />
        </div>
    );
};

export default AuthComp;