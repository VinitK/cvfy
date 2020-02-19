import React from 'react';

import EmailSvg from '../../../../assets/cv/email.svg';
import PhoneSvg from '../../../../assets/cv/phone.svg';
import LinkedinSvg from '../../../../assets/cv/linkedin.svg';

import './resume.contact.styles.css';

const ResumeContactComp = ({ contact, ...rest }) => { // COMPONENT
    const { displayName, bio, primaryContactEmail, primaryContactPhone, linkedinProfileUrl, profilePhotoUrl } = contact;
    return (
        <div className="Resume-contact card neu-up">
            <div className="card-body">
                <div className="image">
                    <img src={profilePhotoUrl} alt={displayName} className="profile-pic" />
                </div>
                <div className="text">
                    <h2>{displayName}</h2>
                    <h6>{bio}</h6>
                </div>
                <div className="contact">
                    <div className="cell">
                        <img src={EmailSvg} alt="email icon" className="icon" />
                        <p>{primaryContactEmail}</p>
                    </div>
                    <div className="cell">
                        <img src={PhoneSvg} alt="email icon" className="icon" />
                        <p>{primaryContactPhone}</p>
                    </div>
                    <div className="cell">
                        <img src={LinkedinSvg} alt="email icon" className="icon" />
                        <p>{linkedinProfileUrl}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeContactComp;