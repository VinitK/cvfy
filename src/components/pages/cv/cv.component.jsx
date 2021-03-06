import React, { Suspense, lazy } from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';

import './cv.styles.css';

import LoadingComp from '../../sections/loading/loading.component';
import LogoComp from '../../elements/logo/logo.component';
const ViewResumeComp = lazy(() => import('../../sections/resume/view-resume.component'));
const NotFoundPage = lazy(() => import('../notfound/notfound.component'));

const CvPage = () => {
    const match = useRouteMatch();
    return (
        <div className="CvPage bgcd">
            <div className="breadcrump frow pbs">
                <LogoComp className='logo-light onHoverHighLight3 h4 fcol'>cvfy.in</LogoComp>
            </div>
            <Suspense fallback={<LoadingComp />}>
                <Switch>
                    <Route path={`${match.url}/:userId`}>
                        <ViewResumeComp />
                    </Route>
                    <Route exact path={`${match.url}`}>
                        <Redirect to="/" />
                    </Route>
                    <Route>
                        <NotFoundPage />
                    </Route>
                </Switch>
            </Suspense>
            {/* <div className="signinTestimonial frow">
                <ButtonComp className="button mm" onClick={signInWithGoogle} btnType="GOOGLE_SIGN_IN">Signin with Google</ButtonComp>
            </div> */}
        </div>
    );
}

export default CvPage;