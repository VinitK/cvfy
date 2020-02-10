import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ViewResumeComp from '../../sections/resume/view-resume/view-resume.component';
import NotFoundPage from '../notfound/notfound.component';

const CvPage = ({ match }) => {
    return (
        <div className="Cv">
            <Switch>
                <Route exact path={`${match.url}/:id`} component={ViewResumeComp} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    );
}

export default CvPage;