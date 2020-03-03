import React from 'react';

import './resume.skills.styles.css';

import ResumeSkillComp from './skill/resume.skill.component';

const ResumeSkillsComp = ({ skills }) => { // COMPONENT
    return (
        skills.length > 0 &&
        <div className="Skills card neu-up">
            <div className="card-header">
                <h5>Skills</h5>
            </div>
            <div className="card-body">
                {skills.map(skill => <ResumeSkillComp key={skill.id} skill={skill} />)}
            </div>
        </div>
    );
};

export default ResumeSkillsComp;