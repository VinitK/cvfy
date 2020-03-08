import ProjectsActionTypes from './projects.types';

const INITIAL_STATE = {
    projects: []
}

const projectsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case ProjectsActionTypes.ADD_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case ProjectsActionTypes.ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload]
            }
        default:
            return state;
    }
}

export default projectsReducer;