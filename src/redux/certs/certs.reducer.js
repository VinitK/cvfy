import CertsActionTypes from './certs.types';

const INITIAL_STATE = {
    certs: []
}
const certsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case CertsActionTypes.ADD_CERTS:
            return {
                ...state,
                certs: action.payload
            }
        case CertsActionTypes.ADD_CERT:
            return {
                ...state,
                certs: [...state.certs, action.payload]
            }
        default:
            return state;
    }
}

export default certsReducer;