import UserActionTypes from "./user.types";

export const setCurrentUser = user => (
    {
        type: UserActionTypes.SET_CURRENT_USER,
        payload: user
    }
);

export const updateCurrentUser = user => (
    {
        type: UserActionTypes.UPDATE_USER,
        payload: user
    }
);