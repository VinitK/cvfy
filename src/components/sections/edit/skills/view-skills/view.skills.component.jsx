import React from 'react';
import { connect } from 'react-redux';

import './view.skills.styles.css';

import ViewSkillComp from './view-skill/view.skill.component';

const ViewSkillsComp = ({ skills }) => (
    <div>
        {skills.map((skill, index) => <ViewSkillComp key={index} skill={skill} />)}
    </div>
);

const mapStateToProps = ({ skills }) => (
    {
        skills: skills.skills
    }
);

export default connect(mapStateToProps)(ViewSkillsComp);