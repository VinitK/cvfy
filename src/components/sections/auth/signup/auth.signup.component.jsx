import React from 'react';

import ButtonComp from '../../../elements/button/button.component';

import './auth.signup.styles.css';
import InputComp from '../../../elements/input/input.component';

const AuthSignupComp = () => {
    return (
        <div className="Auth-signup fcol">
            <div className="card mtm">
                <div className="card-header">
                    New user? Let's sign up
                </div>
                <div className="card-body">
                    <form className="login-form">
                        <InputComp type="text" id="display-name__id">Display Name</InputComp>
                        <InputComp type="email" id="new-email__id">Email *</InputComp>
                        <InputComp type="password" id="new-password__id">Set Password *</InputComp>
                        <InputComp type="password" id="confirm-password__id">Confirm Password *</InputComp>
                        <ButtonComp className="stdButton bgch3 mtm">Signup</ButtonComp>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthSignupComp;