import React, { Suspense, lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import LoadingComp from '../../sections/loading/loading.component';
import NavbarComp from '../../sections/navbar/navbar.component';

const AuthComp = lazy(() => import('../../sections/auth/auth.component'));
const HeaderComp = lazy(() => import('../../sections/header/header.component'));
const NotFoundPage = lazy(() => import('../notfound/notfound.component'));
const EditResumeComp = lazy(() => import('../../sections/edit/edit-resume.component'));

const HomePage = () => {
    const match = useRouteMatch()
    return (
        <div className="HomePage">
            <NavbarComp />
            <Suspense fallback={<LoadingComp />}>
                <Switch>
                    <Route path={`${match.url}edit`} component={EditResumeComp} />
                    <Route path={`${match.url}loading`} component={LoadingComp} />
                    <Route path={`${match.url}auth`} component={AuthComp} />
                    <Route exact path={`${match.url}`} component={HeaderComp} />
                    <Route component={NotFoundPage} />
                </Switch>
            </Suspense>
        </div>
    );
};

export default HomePage;