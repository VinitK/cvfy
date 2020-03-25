import React from 'react';
import { connect } from 'react-redux';

import './view.work.styles.css';

import ViewWorkExpComp from './view-experience/view.work.experience.component';

const ViewWorkComp = ({ work }) => (
    <div>
        {work.map((experience) => <ViewWorkExpComp key={experience.id} experience={experience} />)}
    </div>
);

const mapStateToProps = ({ work }) => (
    {
        work: work.work
    }
);

export default connect(mapStateToProps)(ViewWorkComp);