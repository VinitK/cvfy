import React from 'react';

import './header.styles.css';

import H2Comp from '../../elements/h2/h2.component';
import H3Comp from '../../elements/h3/h3.component';
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
                    <H2Comp customClass='fontSizeXXL bold ch3'>Global Standard Resume</H2Comp>
                    <H3Comp customClass='fontSizeL ptm'>Google, Facebook, Apple, Amazon, Netflix, Uber, and every other Fortune 500 company accepts <LogoComp>cvfy</LogoComp> resume</H3Comp>
                    <ButtonLinkComp href='/edit-contact' customClass='roundEdge onHoverHighLight3'>CVFY MY RESUME</ButtonLinkComp>
                </div>
            </div>
        </div >
    );
};

export default HeaderComp;