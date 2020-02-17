import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import './edit-resume.styles.css';

import EditContactComp from './contact/edit.contact.component';
import EditWorkComp from './work/edit.work.component';

const EditResumeComp = () => {
    const match = useRouteMatch();

    return (
        <div className="Edit-resume">
            <Switch>
                <Route path={`${match.url}/contact`}>
                    <EditContactComp />
                </Route>
                <Route path={`${match.url}/work`}>
                    <EditWorkComp />
                </Route>
            </Switch>
        </div>
    );
};

export default EditResumeComp;