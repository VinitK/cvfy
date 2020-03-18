import React from 'react';

import './jobs.three-card.styles.css';
import { ReactComponent as UpdatedIcon } from '../../../../assets/landing/updated.svg';
import { ReactComponent as ChillIcon } from '../../../../assets/landing/chill.svg';
import { ReactComponent as TopIcon } from '../../../../assets/landing/top.svg';
import { signInWithGoogle } from '../../../../firebase/auth.util';

import ButtonComp from '../../../elements/button/button.component';
import LogoComp from '../../../elements/logo/logo.component';

const JobsThreeCardComp = () => {
    return (
        <div className="JobsThreeCard">
            <div className="content fcol">
                <div className="cards frow">
                    <div className="card mm">
                        <div className="image">
                            <UpdatedIcon />
                        </div>
                        <div className="text">
                            <h4 className="title mm tac">Global Reach</h4>
                            <div className="card one pm">
                                <h5 className="sub-title fos"><LogoComp>cvfy</LogoComp> has a global reach. Top talent from across the globe apply to jobs.</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card mm">
                        <div className="image">
                            <TopIcon />
                        </div>
                        <div className="text">
                            <h4 className="title mm tac">Top Tech Talent</h4>
                            <div className="card two pm">
                                <h5 className="sub-title fos">Top technology talent is the forte of <LogoComp>cvfy</LogoComp>. Over years we have connected with highly skilled professionals.</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card mm">
                        <div className="image">
                            <ChillIcon />
                        </div>
                        <div className="text">
                            <h4 className="title mm tac">Post &amp; Chill</h4>
                            <div className="card three pm">
                                <h5 className="sub-title fos">Let us do the work. On <LogoComp>cvfy</LogoComp> all you have to do is post your job requirement.</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <ButtonComp className="button" onClick={signInWithGoogle} btnType="GOOGLE_SIGN_IN">Signin with Google</ButtonComp>
            </div>
        </div>
    );
};

export default JobsThreeCardComp;