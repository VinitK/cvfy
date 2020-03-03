import SkillsActionTypes from "./skills.types";

export const addSkills = skills => (
    {
        type: SkillsActionTypes.ADD_SKILLS,
        payload: skills
    }
);

export const addSkill = skill => (
    {
        type: SkillsActionTypes.ADD_SKILL,
        payload: skill
    }
);