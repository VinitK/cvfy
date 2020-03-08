import React, { Suspense, lazy } from 'react';
import { Route, Switch, useRouteMatch, Redirect, useLocation } from 'react-router-dom';

import './cv.styles.css';

import LoadingComp from '../../sections/loading/loading.component';
import LogoComp from '../../elements/logo/logo.component';
const ViewResumeComp = lazy(() => import('../../sections/resume/view-resume.component'));
const NotFoundPage = lazy(() => import('../notfound/notfound.component'));

const CvPage = () => {
    const match = useRouteMatch();
    const location = useLocation();
    return (
        <div className="CvPage bgch4 pm">
            <div className="breadcrump frow">
                <LogoComp className='logo-hover-light onHover-brighter h4 fcol' />
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
        </div>
    );
}

export default CvPage;