import React from 'react';

import './three-card.styles.css';

import { ReactComponent as UpdatedIcon } from '../../../../assets/landing/updated.svg';
import { ReactComponent as ChillIcon } from '../../../../assets/landing/chill.svg';
import { ReactComponent as TopIcon } from '../../../../assets/landing/top.svg';

const ThreeCardComp = () => {
    return (
        <div className="ThreeCard">
            <div className="content frow">
                <div className="card mm">
                    <div className="image">
                        <UpdatedIcon />
                    </div>
                    <div className="text">
                        <h4 className="title mm">Stay Updated... Always!</h4>
                        <div className="card bgch1 pm">
                            <h5 className="sub-title fos">Often you give your CV to recruiters and later you need to update it with your newly acquired skills? With CVfy they will have an updated resume always.</h5>
                        </div>
                        <button className="button b mm pm bgch3">Get CVfy</button>
                    </div>
                </div>
                <div className="card mm">
                    <div className="image">
                        <TopIcon />
                    </div>
                    <div className="text">
                        <h4 className="title mm">Build Resume... Carefree!</h4>
                        <div className="card bgch1 pm">
                            <h5 className="sub-title fos">We have studied what companies globally look for in a resume and created a format desired by top organizations, so that you stay ahead of the curve.</h5>
                        </div>
                        <button className="button b mm pm bgch3">Get CVfy</button>
                    </div>
                </div>
                <div className="card mm">
                    <div className="image">
                        <ChillIcon />
                    </div>
                    <div className="text">
                        <h4 className="title mm">Your Next Job... Done!</h4>
                        <div className="card bgch1 pm">
                            <h5 className="sub-title fos">No need to run after applying to jobs anymore. Simply create your resume. All employers will be able to see your resume and contact you for interview.</h5>
                        </div>
                        <button className="button b mm pm bgch3">Get CVfy</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThreeCardComp;