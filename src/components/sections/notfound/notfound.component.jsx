import React from 'react';
import { useHistory } from 'react-router-dom';

import './notfound.styles.css';

import { ReactComponent as NotfoundIcon } from '../../../assets/landing/notfound.svg';
import LogoComp from '../../elements/logo/logo.component';
import ButtonComp from '../../elements/button/button.component';

const NotfoundSectionComp = () => {
    const history = useHistory();
    return (
        <div className="Notfound">
            <div className="content">
                <div className="image">
                    <NotfoundIcon className="resume-icon" />
                </div>
                <div className="text">
                    <h1 className="title b ch3">404 Page Not Found</h1>
                    <h4 className="sub-title">This page does not exist. To browse <LogoComp>cvfy</LogoComp> go to Home page</h4>
                    <ButtonComp className="button bgch3 pm mtm" onClick={() => history.push("/")}>Home</ButtonComp>
                </div>
            </div>
        </div>
    );
};

export default NotfoundSectionComp;