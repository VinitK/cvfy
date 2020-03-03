import WorkActionTypes from "./work.types";

export const addWork = work => (
    {
        type: WorkActionTypes.ADD_WORK,
        payload: work
    }
);

export const addExperience = experience => (
    {
        type: WorkActionTypes.ADD_EXPERIENCE,
        payload: experience
    }
);