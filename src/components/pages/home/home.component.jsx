import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import NavbarComp from '../../sections/navbar/navbar.component';
import HeaderComp from '../../sections/header/header.component';
import FooterComp from '../../sections/footer/footer.component';
import EditContactComp from '../../sections/edit/contact/edit.contact.component';
import EditWorkComp from '../../sections/edit/work/edit.work.component';

const HomePage = () => {
    return (
        <div className="Home">
            <NavbarComp />
            <BrowserRouter>
                <Route exact path='/' component={HeaderComp} />
                <Route exact path='/edit-contact' component={EditContactComp} />
                <Route exact path='/edit-work' component={EditWorkComp} />
            </BrowserRouter>
            <FooterComp />
        </div>
    );
};

export default HomePage;