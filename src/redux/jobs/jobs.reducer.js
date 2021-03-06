import JobsActionTypes from './jobs.types';

const INITIAL_STATE = {
    jobs: []
}

const jobsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case JobsActionTypes.ADD_JOBS:
            return {
                jobs: action.payload
            }
        case JobsActionTypes.ADD_JOB:
            return {
                ...state,
                jobs: [...state.jobs, action.payload]
            }
        default:
            return state;
    }
}

export default jobsReducer;