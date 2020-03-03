import QualsActionTypes from './quals.types';

const INITIAL_STATE = {
    quals: []
}

const qualsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case QualsActionTypes.ADD_QUALS:
            return {
                ...state,
                quals: action.payload
            }
        case QualsActionTypes.ADD_QUAL:
            return {
                ...state,
                quals: [...state.quals, action.payload]
            }
        default:
            return state;
    }
}

export default qualsReducer;