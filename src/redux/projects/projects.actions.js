import ProjectsActionTypes from "./projects.types";

export const addProjects = projects => (
    {
        type: ProjectsActionTypes.ADD_PROJECTS,
        payload: projects
    }
);

export const addProject = project => (
    {
        type: ProjectsActionTypes.ADD_PROJECT,
        payload: project
    }
);