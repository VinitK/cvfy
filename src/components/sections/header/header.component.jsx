import React from 'react';

import './header.styles.css';

import LogoComp from '../../elements/logo/logo.component';
import { ReactComponent as ResumeIcon } from '../../../assets/landing/landingresume.svg';
import ButtonComp from '../../elements/button/button.component';
import { signInWithGoogle } from '../../../firebase/auth.util';

const HeaderComp = () => {
    return (
        <div className="Header">
            <div className="content">
                <div className="image">
                    <ResumeIcon className="resume-icon" />
                </div>
                <div className="text">
                    <h1 className="title b ch3">Global Standard Resume</h1>
                    <h4 className="sub-title">Google, Facebook, Apple, Amazon, Netflix, Uber, and every other Fortune 500 company accepts <LogoComp>cvfy</LogoComp> resume</h4>
                    <ButtonComp className="button mtm" onClick={signInWithGoogle} btnType="GOOGLE_SIGN_IN">Signin with Google</ButtonComp>
                </div>
            </div>
        </div>
    );
};

export default HeaderComp;