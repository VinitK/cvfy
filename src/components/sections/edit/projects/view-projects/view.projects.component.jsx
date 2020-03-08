import React from 'react';
import { connect } from 'react-redux';

import './view.projects.styles.css';

import ViewProjectComp from './view-project/view.project.component';

const ViewProjectsComp = ({ projects }) => (
    <div>
        {projects.map((project, index) => <ViewProjectComp key={index} project={project} />)}
    </div>
);

const mapStateToProps = ({ projects }) => (
    {
        projects: projects.projects
    }
);

export default connect(mapStateToProps)(ViewProjectsComp);