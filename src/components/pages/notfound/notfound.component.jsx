import React from 'react';
import NotfoundSectionComp from '../../sections/notfound/notfound.component';

const NotFoundPage = ({ match }) => {
    return (
        <div className="NotfoundPage">
            <NotfoundSectionComp />
        </div>
    );
}

export default NotFoundPage;