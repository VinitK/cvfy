import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavbarComp from '../../sections/navbar/navbar.component';
import HeaderComp from '../../sections/header/header.component';
import EditContactComp from '../../sections/edit/contact/edit.contact.component';
import EditWorkComp from '../../sections/edit/work/edit.work.component';
import NotFoundPage from '../notfound/notfound.component';
import LoadingComp from '../../sections/loading/loading.component';

const HomePage = ({ match }) => {
    return (
        <div className="Home">
            <NavbarComp />
            <Switch>
                <Route exact path={`${match.url}`} component={HeaderComp} />
                <Route exact path={`${match.url}edit-contact`} component={EditContactComp} />
                <Route exact path={`${match.url}edit-work`} component={EditWorkComp} />
                <Route exact path={`${match.url}loading`} component={LoadingComp} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    );
};

export default HomePage;