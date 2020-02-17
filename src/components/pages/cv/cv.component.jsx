import React, { Suspense, lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import LoadingComp from '../../sections/loading/loading.component';
const ViewResumeComp = lazy(() => import('../../sections/resume/view-resume/view-resume.component'));
const NotFoundPage = lazy(() => import('../notfound/notfound.component'));

const CvPage = () => {
    const match = useRouteMatch();
    return (
        <div className="CvPage">
            <Suspense fallback={<LoadingComp />}>
                <Switch>
                    <Route path={`${match.url}/:id`}>
                        <ViewResumeComp />
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