import ResumeActionTypes from './resume.actions.js';

const INITIAL_STATE = {

};

const resumeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ResumeActionTypes.GET_RESUME:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default resumeReducer;