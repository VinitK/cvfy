import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import workReducer from './work/work.reducer';
import certsReducer from './certs/certs.reducer';
import qualsReducer from './quals/quals.reducer';
import skillsReducer from './skills/skills.reducer';

export default combineReducers(
    {
        user: userReducer,
        work: workReducer,
        certs: certsReducer,
        quals: qualsReducer,
        skills: skillsReducer
    }
)