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
                    <div className="card-body fcol">
                        <div className="intro frow">
                            {
                                contact.photoURL &&
                                <div className="image ms">
                                    <img src={contact.photoURL} alt={contact.displayName} className="profile-pic" />
                                </div>
                            }
                            <div className="text fcol ps">
                                <h3>{contact.displayName}</h3>
                                <h6>{contact.introduction}</h6>
                            </div>
                        </div>

                        <div className="contact frow ps">
                            {
                                contact.email &&
                                (
                                    <div className="cell frow">
                                        <img src={EmailSvg} alt="email icon" className="icon" />
                                        <p>{contact.email}</p>
                                    </div>
                                )
                            }
                            {
                                contact.linkedin &&
                                (
                                    <div className="cell frow">
                                        <img src={LinkedinSvg} alt="email icon" className="icon" />
                                        <p>{contact.linkedin}</p>
                                    </div>
                                )
                            }
                            {
                                contact.phone &&
                                (
                                    <div className="cell frow">
                                        <img src={PhoneSvg} alt="email icon" className="icon" />
                                        <p>{contact.phone}</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    :
                    <LoadingComp />
            }
        </div>
    );
};

export default ResumeContactComp;