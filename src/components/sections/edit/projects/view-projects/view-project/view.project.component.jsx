import React from 'react';
import { connect } from 'react-redux';

import './view.project.styles.css';
import { deleteUserProject } from '../../../../../../firebase/auth.util';
import { ReactComponent as DeleteComp } from '../../../../../../assets/resume-form/delete.svg'
// import { ReactComponent as EditComp } from '../../../../../../assets/resume-form/edit.svg'

import ButtonComp from '../../../../../elements/button/button.component';
import { addProjects } from '../../../../../../redux/projects/projects.actions';

const ViewProjectComp = ({ userId, projects, addProjects, project, ...rest }) => {

    const { title, company, description } = project;

    const deleteProject = (projects, project, userId) => {
        deleteUserProject(userId, project.id); // db
        const filteredProjects = projects.filter(projectwork => project.id !== projectwork.id);
        console.log(filteredProjects)
        addProjects(filteredProjects); // redux
    };

    return (
        <div className="View-project neu-up card mtm pm">
            <div className="frow">
                <div className="content fcol">
                    <h5 className="title ch4">{title}</h5>
                    <p className="company mts">Company: {company}</p>
                    <p className="description mts">Description: {description}</p>
                </div>
                <div className="fcol update-delete">
                    {/* <ButtonComp className="button-icon edit-icon"><EditComp className="icon" /></ButtonComp> */}
                    <ButtonComp onClick={() => deleteProject(projects, project, userId)} className="button-icon delete-icon"><DeleteComp className="icon" /></ButtonComp>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user, projects }) => (
    {
        userId: user.currentUser.id,
        projects: projects.projects
    }
);

const mapDispatchToProps = dispatch => (
    {
        addProjects: (projects) => dispatch(addProjects(projects))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(ViewProjectComp);