import React from 'react';

import './resume.contact.styles.css';
import EmailSvg from '../../../../assets/cv/email.svg';
import PhoneSvg from '../../../../assets/cv/phone.svg';
import LinkedinSvg from '../../../../assets/cv/linkedin.svg';
import LoadingComp from '../../loading/loading.component';


const ResumeContactComp = ({ contact }) => { // COMPONENT

    return (
        <div className="Resume-contact card neu-up bgcul">
            {
                contact.displayName
                    ?
                    <div className="card-body">
                        {
                            contact.phone &&
                            <div className="image">
                                <img src={contact.photo} alt={contact.displayName} className="profile-pic" />
                            </div>
                        }
                        <div className="text">
                            <h3>{contact.displayName}</h3>
                            <h6>{contact.introduction}</h6>
                        </div>
                        <div className="contact">
                            <div className="cell">
                                <img src={EmailSvg} alt="email icon" className="icon" />
                                <p>{contact.email}</p>
                            </div>
                            <div className="cell">
                                <img src={PhoneSvg} alt="email icon" className="icon" />
                                <p>{contact.phone}</p>
                            </div>
                            <div className="cell">
                                <img src={LinkedinSvg} alt="email icon" className="icon" />
                                <p>{contact.linkedin}</p>
                            </div>
                        </div>
                    </div>
                    :
                    <LoadingComp />
            }
        </div>
    );
};

export default ResumeContactComp;