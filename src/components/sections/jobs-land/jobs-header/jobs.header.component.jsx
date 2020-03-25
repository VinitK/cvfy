import React from 'react';
import Helmet from 'react-helmet';

import './jobs.header.styles.css';
import { ReactComponent as LogoIcon } from '../../../../assets/logo.svg';
import { signInWithGoogle } from '../../../../firebase/auth.util';

import LogoComp from '../../../elements/logo/logo.component';
import ButtonComp from '../../../elements/button/button.component';

const JobsHeaderComp = () => {
    return (
        <div className="JobsHeader">
            <Helmet>
                <title>CVfy - Jobs and Hire</title>
                <meta name="title" content="CVfy - Jobs and Hire" />
                <meta name="description"
                    content="On CVfy helping you hire and find jobs is a serious business. Premium tech talent register on CVfy. Hire from globally top professionals." />
                <meta property="og:title" content="CVfy - Jobs and Hire" />
                <meta property="og:url" content="https://cvfy.in/" />
                <meta property="og:description"
                    content="On CVfy helping you hire and find jobs is a serious business. Premium tech talent register on CVfy. Hire from globally top professionals." />
                <meta property="og:image" content="https://www.cvwriting.ae/wp-content/uploads/2017/02/CV18.jpg" />
                <meta property="og:type" content="WebSite" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="CVfy - Jobs and Hire" />
                <meta name="twitter:url" content="https://cvfy.in/" />
                <meta name="twitter:description"
                    content="On CVfy helping you hire and find jobs is a serious business. Premium tech talent register on CVfy. Hire from globally top professionals." />
                <meta name="twitter:image" content="https://www.cvwriting.ae/wp-content/uploads/2017/02/CV18.jpg" />
                <meta itemprop="name" content="CVfy - Jobs and Hire" />
                <meta itemprop="description"
                    content="On CVfy helping you hire and find jobs is a serious business. Premium tech talent register on CVfy. Hire from globally top professionals." />
                <meta itemprop="image" content="https://www.cvwriting.ae/wp-content/uploads/2017/02/CV18.jpg" />
            </Helmet>
            <div className="content">
                <div className="image">
                    <LogoIcon className="resume-icon" />
                </div>
                <div className="text">
                    <h1 className="title b">Post a job, get an employee. Simple!</h1>
                    <h4 className="sub-title"><LogoComp>cvfy</LogoComp> is focussed on getting you an employee. Sign in and post your first job!</h4>
                    <ButtonComp className="button mtm" onClick={signInWithGoogle} btnType="GOOGLE_SIGN_IN">Signin with Google</ButtonComp>
                </div>
            </div>
        </div>
    );
};

export default JobsHeaderComp;