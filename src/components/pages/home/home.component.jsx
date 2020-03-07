import React, { Suspense, lazy } from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import LoadingComp from '../../sections/loading/loading.component';
import NavbarComp from '../../sections/navbar/navbar.component';
import ErrorComp from '../../sections/error/error.component';

const AuthComp = lazy(() => import('../../sections/auth/auth.component'));
const HeaderComp = lazy(() => import('../../sections/header/header.component'));
const NotFoundPage = lazy(() => import('../notfound/notfound.component'));
const EditResumeComp = lazy(() => import('../../sections/edit/edit-resume.component'));
const ResumesComp = lazy(() => import('../../sections/resumes/resumes.component'));

const HomePage = ({ currentUser }) => {
    const match = useRouteMatch();
    return (
        <div className="HomePage">
            <NavbarComp />
            <Suspense fallback={<LoadingComp />}>
                <Switch>
                    <Route path={`${match.url}edit`}>
                        {
                            currentUser
                                ?
                                <EditResumeComp />
                                :
                                <Redirect to={`${match.url}`} />
                        }
                    </Route>
                    <Route path={`${match.url}loading`}>
                        <LoadingComp />
                    </Route>
                    <Route path={`${match.url}resumes`}>
                        <ResumesComp />
                    </Route>
                    <Route path={`${match.url}auth`}>
                        {
                            currentUser
                                ?
                                <Redirect to={`${match.url}`} />
                                :
                                <AuthComp />
                        }
                    </Route>
                    <Route exact path={`${match.url}`}>
                        {
                            currentUser
                                ?
                                <Redirect to={`${match.url}edit`} />
                                :
                                <HeaderComp />
                        }
                    </Route>
                    <Route>
                        <NotFoundPage />
                    </Route>
                </Switch>
            </Suspense>
        </div>
    );
};

const mapStateToProps = ({ user }) => (
    {
        currentUser: user.currentUser
    }
);

export default connect(mapStateToProps)(HomePage);