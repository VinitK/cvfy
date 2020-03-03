import SkillsActionTypes from './skills.types';

const INITIAL_STATE = {
    skills: []
}

const skillsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SkillsActionTypes.ADD_SKILLS:
            return {
                ...state,
                skills: action.payload
            }
        case SkillsActionTypes.ADD_SKILL:
            return {
                ...state,
                skills: [...state.skills, action.payload]
            }
        default:
            return state;
    }
}

export default skillsReducer;