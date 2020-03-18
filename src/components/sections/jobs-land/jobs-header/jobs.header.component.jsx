import React from 'react';

import './jobs.header.styles.css';
import { ReactComponent as LogoIcon } from '../../../../assets/logo.svg';
import { signInWithGoogle } from '../../../../firebase/auth.util';

import LogoComp from '../../../elements/logo/logo.component';
import ButtonComp from '../../../elements/button/button.component';

const JobsHeaderComp = () => {
    return (
        <div className="JobsHeader">
            <div className="content">
                <div className="image">
                    <LogoIcon className="resume-icon" />
                </div>
                <div className="text">
                    <h1 className="title b">Post a job, get an employee. Simple!</h1>
                    <h4 className="sub-title"><LogoComp>cvfy</LogoComp> is focussed on getting you an employee. Sign in and post your first job!</h4>
                    <ButtonComp className="button mtm" onClick={signInWithGoogle} btnType="GOOGLE_SIGN_IN">Signin with Google</ButtonComp>
                </div>
            </div>
        </div>
    );
};

export default JobsHeaderComp;