import React from 'react';
import { connect } from 'react-redux';

import './header.styles.css';

import LogoComp from '../../elements/logo/logo.component';
import { ReactComponent as ResumeIcon } from '../../../assets/landing/landingresume.svg';
import ButtonComp from '../../elements/button/button.component';
import { useHistory } from 'react-router-dom';
import { signInWithGoogle } from '../../../firebase/auth.util';

const HeaderComp = ({ currentUser }) => {
    const history = useHistory();
    return (
        <div className="Header">
            <div className="content">
                <div className="image">
                    <ResumeIcon className="resume-icon" />
                </div>
                <div className="text">
                    <h1 className="title b ch3">Global Standard Resume</h1>
                    <h4 className="sub-title">Google, Facebook, Apple, Amazon, Netflix, Uber, and every other Fortune 500 company accepts <LogoComp>cvfy</LogoComp> resume</h4>
                    {
                        currentUser
                            ?
                            <ButtonComp className="stdButton mtm bgch3" onClick={() => history.push("edit/contact")}>CVFY MY RESUME</ButtonComp>
                            :
                            <ButtonComp className="google-signin-btn mtm" onClick={signInWithGoogle} googleSignIn>Signin with Google</ButtonComp>
                    }
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => (
    {
        currentUser: state.user.currentUser
    }
);

export default connect(mapStateToProps)(HeaderComp);