import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import workReducer from './work/work.reducer';
import certsReducer from './certs/certs.reducer';
import qualsReducer from './quals/quals.reducer';
import projectsReducer from './projects/projects.reducer';
import skillsReducer from './skills/skills.reducer';
import jobsReducer from './jobs/jobs.reducer';

export default combineReducers(
    {
        user: userReducer,
        work: workReducer,
        certs: certsReducer,
        quals: qualsReducer,
        projects: projectsReducer,
        skills: skillsReducer,
        jobs: jobsReducer
    }
)