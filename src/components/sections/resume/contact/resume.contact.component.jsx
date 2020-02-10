import React from 'react';

import EmailSvg from '../../../../assets/cv/email.svg';
import PhoneSvg from '../../../../assets/cv/phone.svg';
import LinkedinSvg from '../../../../assets/cv/linkedin.svg';

import './resume.contact.styles.css';

const ResumeContactComp = ({ contact, ...rest }) => { // COMPONENT
    const { displayName, bio, primaryContactEmail, primaryContactPhone, linkedinProfileUrl, profilePhotoUrl } = contact;
    return (
        <div className="Resume-contact">
            <div className="area">
                <div className="card">
                    <div className="card-body">
                        <div className="content row">
                            <div className="image col">
                                <img src={profilePhotoUrl} alt={displayName} className="profile-pic" />
                            </div>
                            <div className="text col">
                                <h2 className="ch3">{displayName}</h2>
                                <h6 className="mtm">{bio}</h6>
                            </div>
                            <div className="contact col">
                                <div className="box row">
                                    <img src={EmailSvg} alt="email icon" className="icon" />
                                    <p className="text">{primaryContactEmail}</p>
                                </div>
                                <div className="box row">
                                    <img src={PhoneSvg} alt="email icon" className="icon" />
                                    <h6 className="text">{primaryContactPhone}</h6>
                                </div>
                                <div className="box row">
                                    <img src={LinkedinSvg} alt="email icon" className="icon" />
                                    <h6 className="text">{linkedinProfileUrl}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeContactComp;