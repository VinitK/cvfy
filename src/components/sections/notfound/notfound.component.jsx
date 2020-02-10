import React from 'react';

import './notfound.styles.css';

import LogoComp from '../../elements/logo/logo.component';
import H1Comp from '../../elements/h1/h1.component';
import H4Comp from '../../elements/h4/h4.component';
import ButtonLinkComp from '../../elements/button-link/button-link.component';

import NotfoundIcon from '../../../assets/landing/notfound.svg';

const NotfoundSectionComp = () => {
    return (
        <div className="Header">
            <div className="content row">
                <div className="image col">
                    <img src={NotfoundIcon} alt="resume icon" className="col" />
                </div>
                <div className='text col'>
                    <H1Comp className='bold ch3'>404 Page Not Found</H1Comp>
                    <H4Comp className='fontSizeL ptm'>This page does not exist. Go to Home page to browse <LogoComp>cvfy</LogoComp></H4Comp>
                    <ButtonLinkComp href="/" className='standard-button char-space bold'>HOME</ButtonLinkComp>
                </div>
            </div>
        </div >
    );
};

export default NotfoundSectionComp;