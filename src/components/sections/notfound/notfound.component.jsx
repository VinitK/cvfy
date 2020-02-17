import React from 'react';

import './notfound.styles.css';

import LogoComp from '../../elements/logo/logo.component';

import NotfoundIcon from '../../../assets/landing/notfound.svg';

const NotfoundSectionComp = () => {
    return (
        <div className="Notfound">
            <div className="content">
                <div className="image">
                    <img src={NotfoundIcon} alt="resume icon" />
                </div>
                <div className='text'>
                    <h1 className='title'>404 Page Not Found</h1>
                    <h4 className="sub-title">This page does not exist. Go to Home page to browse <LogoComp>cvfy</LogoComp></h4>
                    <a href="/" className='standard-button btn'>HOME</a>
                </div>
            </div>
        </div >
    );
};

export default NotfoundSectionComp;