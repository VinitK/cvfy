import ResumeActionTypes from './resume.types';

export const getResume = ({ id }) => ({
    type: ResumeActionTypes.GET_RESUME,
    payload: id
})