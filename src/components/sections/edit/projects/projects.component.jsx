import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './projects.styles.css';
import { ReactComponent as ProjectIcon } from '../../../../assets/resume-form/project.svg';
import { addProjects } from '../../../../redux/projects/projects.actions';
import { getUserProjects } from '../../../../firebase/auth.util';

import ViewProjectsComp from './view-projects/view.projects.component';
import EditProjectComp from './edit-project/edit.project.component';

const ProjectsComp = ({ userId, addProjects }) => {

    useEffect(() => {
        (async function asyncFunction() {
            const projectsRef = await getUserProjects(userId);
            console.log(projectsRef);
            const projects = await projectsRef.get();
            const projectworks = projects.docs.map(projectSnap => {
                const projectwork = projectSnap.data();
                return {
                    id: projectSnap.id,
                    title: projectwork.title,
                    comapny: projectwork.company,
                    description: projectwork.description
                }
            });
            addProjects(projectworks); // redux
        })();
    }, [addProjects, userId]);


    return (
        <div className="Projects card neu-up" id="Edit-Projects__id">
            <div className="card-header">
                <h5>Projects</h5>
            </div>
            <div className="card-body">
                <div className="frow">
                    <div className="text">
                        <EditProjectComp />
                        <ViewProjectsComp />
                    </div>
                    <div className="image">
                        <ProjectIcon className="work-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user }) => (
    {
        userId: user.currentUser.id
    }
);

const mapDispatchToProps = dispatch => (
    {
        addProjects: (projectworks) => dispatch(addProjects(projectworks))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsComp);