import QualsActionTypes from "./quals.types";

export const addQuals = quals => (
    {
        type: QualsActionTypes.ADD_QUALS,
        payload: quals
    }
);

export const addQual = qual => (
    {
        type: QualsActionTypes.ADD_QUAL,
        payload: qual
    }
);