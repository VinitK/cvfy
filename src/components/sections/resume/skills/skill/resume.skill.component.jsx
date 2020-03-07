import React from 'react';

import './resume.skill.styles.css';

const ResumeSkillComp = (skill) => {
    const { skillName, stars } = skill.skill;
    return (
        <div className="Skill card-row">
            <div className="content frow">
                <div className="fcol">
                    <h6 className="ch3">{skillName}</h6>
                </div>
                <div className="fcol">
                    <p>{[...Array(Number(stars))].map((e, i) => <span key={i} role="img" aria-label="star">⭐</span>)}</p>
                </div>
            </div>
        </div>
    );
};

export default ResumeSkillComp;