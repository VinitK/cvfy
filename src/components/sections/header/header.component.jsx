import React from 'react';

import './header.styles.css';

import H1Comp from '../../elements/h1/h1.component';
import H4Comp from '../../elements/h4/h4.component';
import LogoComp from '../../elements/logo/logo.component';
import ResumeIcon from '../../../assets/landing/landingresume.svg';
import ButtonLinkComp from '../../elements/button-link/button-link.component';

const HeaderComp = () => {
    return (
        <div className="Header">
            <div className="content row">
                <div className="image col">
                    <img src={ResumeIcon} alt="resume icon" className="col" />
                </div>
                <div className='text col'>
                    <H1Comp className='bold ch3'>Global Standard Resume</H1Comp>
                    <H4Comp>Google, Facebook, Apple, Amazon, Netflix, Uber, and every other Fortune 500 company accepts <LogoComp>cvfy</LogoComp> resume</H4Comp>
                    <ButtonLinkComp href="/edit-contact" className='standard-button char-space bold'>CVFY MY RESUME</ButtonLinkComp>
                </div>
            </div>
        </div >
    );
};

export default HeaderComp;