import WorkActionTypes from './work.types';

const INITIAL_STATE = {
    work: []
}
const workReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case WorkActionTypes.ADD_WORK:
            return {
                ...state,
                work: action.payload
            }
        case WorkActionTypes.ADD_EXPERIENCE:
            return {
                ...state,
                work: [...state.work, action.payload]
            }
        default:
            return state;
    }
}

export default workReducer;