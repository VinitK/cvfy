import React from 'react';
import NotfoundSectionComp from '../../sections/notfound/notfound.component';

const NotFoundPage = ({ match }) => {
    return (
        <div className="Notfound">
            <NotfoundSectionComp />
        </div>
    );
}

export default NotFoundPage;