import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './home.styles.css';
import LoadingComp from '../../sections/loading/loading.component';
import NavbarComp from '../../sections/navbar/navbar.component';
import FooterComp from '../../sections/footer/footer.component';
import JobsComp from '../../sections/jobs/jobs.component';
import JobsLandComp from '../../sections/jobs-land/jobs-land.component';

const AuthComp = lazy(() => import('../../sections/auth/auth.component'));
const HomeLandComp = lazy(() => import('../../sections/home-land/home-land.component'));
const NotFoundPage = lazy(() => import('../notfound/notfound.component'));
const EditResumeComp = lazy(() => import('../../sections/edit/edit-resume.component'));
const ResumesComp = lazy(() => import('../../sections/resumes/resumes.component'));

const HomePage = ({ currentUser }) => {
    const match = useRouteMatch();
    return (
        <div className="HomePage">
            <Helmet>
                <title>CVfy - Global Standard Resume</title>
                <meta name="title" content="CVfy - Global Standard Resume" />
                <meta name="description"
                    content="With CVfy create a Global Standard Resume accepted by fortune 500 companies. Share your dynamic digital resume with just a link." />
                <meta property="og:title" content="CVfy - Global Standard Resume" />
                <meta property="og:url" content="https://cvfy.in/" />
                <meta property="og:description"
                    content="With CVfy create a Global Standard Resume accepted by fortune 500 companies. Share your dynamic digital resume with just a link." />
                <meta property="og:image" content="https://www.cvwriting.ae/wp-content/uploads/2017/02/CV18.jpg" />
                <meta property="og:type" content="WebSite" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="CVfy - Global Standard Resume" />
                <meta name="twitter:url" content="https://cvfy.in/" />
                <meta name="twitter:description"
                    content="With CVfy create a Global Standard Resume accepted by fortune 500 companies. Share your dynamic digital resume with just a link." />
                <meta name="twitter:image" content="https://www.cvwriting.ae/wp-content/uploads/2017/02/CV18.jpg" />
                <meta itemprop="name" content="CVfy - Global Standard Resume" />
                <meta itemprop="description"
                    content="With CVfy create a Global Standard Resume accepted by fortune 500 companies. Share your dynamic digital resume with just a link." />
                <meta itemprop="image" content="https://www.cvwriting.ae/wp-content/uploads/2017/02/CV18.jpg" />
            </Helmet>
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
                    <Route path={`${match.url}jobs`}>
                        {
                            currentUser
                                ?
                                <JobsComp />
                                :
                                <JobsLandComp />
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
                                <HomeLandComp />
                        }
                    </Route>
                    <Route>
                        <NotFoundPage />
                    </Route>
                </Switch>
            </Suspense>
            <FooterComp />
        </div>
    );
};

const mapStateToProps = ({ user }) => (
    {
        currentUser: user.currentUser
    }
);

export default connect(mapStateToProps)(HomePage);