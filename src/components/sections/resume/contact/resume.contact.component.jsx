import React from 'react';

import './resume.contact.styles.css';
import EmailSvg from '../../../../assets/cv/email.svg';
import PhoneSvg from '../../../../assets/cv/phone.svg';
import WebSvg from '../../../../assets/cv/web.svg';
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
                                <p className="mts">{contact.introduction}</p>
                                {
                                    contact.resumeUrl && <a href={contact.resumeUrl} target="_blank" rel="noopener noreferrer" className="button bgch3 mts ps">Download Resume</a>
                                }

                            </div>
                        </div>

                        <div className="contact frow ps">
                            {
                                contact.email &&
                                (
                                    <div className="cell frow">
                                        <img src={EmailSvg} alt="email icon" className="icon" />
                                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                                    </div>
                                )
                            }
                            {
                                contact.linkedin &&
                                (
                                    <div className="cell frow">
                                        <img src={LinkedinSvg} alt="linkedin icon" className="icon" />
                                        <a href={contact.linkedin}>{contact.linkedin}</a>
                                    </div>
                                )
                            }
                            {
                                contact.phone &&
                                (
                                    <div className="cell frow">
                                        <img src={PhoneSvg} alt="phone icon" className="icon" />
                                        <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                                    </div>
                                )
                            }
                            {
                                contact.website &&
                                (
                                    <div className="cell frow">
                                        <img src={WebSvg} alt="website icon" className="icon" />
                                        <a href={contact.website}>{contact.website}</a>
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