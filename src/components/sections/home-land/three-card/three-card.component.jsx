import React from 'react';

import './three-card.styles.css';

import { ReactComponent as UpdatedIcon } from '../../../../assets/landing/updated.svg';
import { ReactComponent as ChillIcon } from '../../../../assets/landing/chill.svg';
import { ReactComponent as TopIcon } from '../../../../assets/landing/top.svg';
import { signInWithGoogle } from '../../../../firebase/auth.util';
import ButtonComp from '../../../elements/button/button.component';
import LogoComp from '../../../elements/logo/logo.component';

const ThreeCardComp = () => {
    return (
        <div className="ThreeCard">
            <div className="content fcol">
                <div className="cards frow">
                    <div className="card mm">
                        <div className="image">
                            <UpdatedIcon />
                        </div>
                        <div className="text">
                            <h4 className="title mm">Stay Updated... Always!</h4>
                            <div className="card one pm">
                                <h5 className="sub-title fos">No need to share your updated resume again and again. People now have access to your latest resume all the time with <LogoComp>cvfy</LogoComp>.</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card mm">
                        <div className="image">
                            <TopIcon />
                        </div>
                        <div className="text">
                            <h4 className="title mm">Build Resume... Carefree!</h4>
                            <div className="card two pm">
                                <h5 className="sub-title fos">No designing needed. No confusion regarding what information to put and how to put. <LogoComp>cvfy</LogoComp> guides you with standard resume practice.</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card mm">
                        <div className="image">
                            <ChillIcon />
                        </div>
                        <div className="text">
                            <h4 className="title mm">Your Next Job... Done!</h4>
                            <div className="card three pm">
                                <h5 className="sub-title fos">Everywhere else you are required to run after job listings. On <LogoComp>cvfy</LogoComp>, employers go through resumes and contact you for interviews.</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <ButtonComp className="button" onClick={signInWithGoogle} btnType="GOOGLE_SIGN_IN">Signin with Google</ButtonComp>
            </div>
        </div>
    );
};

export default ThreeCardComp;