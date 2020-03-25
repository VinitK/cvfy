import React from 'react';
import { connect } from 'react-redux';

import './view.skill.styles.css';
import { deleteUserSkill } from '../../../../../../firebase/auth.util';
import { ReactComponent as DeleteComp } from '../../../../../../assets/resume-form/delete.svg'

import ButtonComp from '../../../../../elements/button/button.component';
import { addSkills } from '../../../../../../redux/skills/skills.actions';

const ViewSkillComp = ({ userId, skills, addSkills, skill }) => {

    const { skillName, stars } = skill;

    const deleteSkill = (skills, skill, userId) => {
        deleteUserSkill(userId, skill); // db
        const filteredSkills = skills.filter(eachSkill => skill.id !== eachSkill.id);
        addSkills(filteredSkills); // redux
    };

    return (
        <div className="View-skill neu-up card mtm pxs">
            <div className="content frow">
                <div className="info">
                    <h5 className="ch4">{skillName}</h5>
                </div>
                <div className="frow star-delete">
                    <div className="stars frow">
                        {[...Array(Number(stars))].map((e, i) => <span key={i} role="img" aria-label="sheep">⭐</span>)}
                    </div>
                    <ButtonComp onClick={() => deleteSkill(skills, skill, userId)} className="button-icon delete-icon"><DeleteComp className="icon" /></ButtonComp>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user, skills }) => (
    {
        userId: user.currentUser.id,
        skills: skills.skills
    }
);

const mapDispatchToProps = dispatch => (
    {
        addSkills: (skills) => dispatch(addSkills(skills))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(ViewSkillComp);