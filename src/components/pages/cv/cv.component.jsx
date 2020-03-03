import React, { Suspense, lazy } from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';

import LoadingComp from '../../sections/loading/loading.component';
const ViewResumeComp = lazy(() => import('../../sections/resume/view-resume.component'));
const NotFoundPage = lazy(() => import('../notfound/notfound.component'));

const CvPage = () => {
    const match = useRouteMatch();
    return (
        <div className="CvPage bgch4">
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
        </div >
    );
}

export default CvPage;