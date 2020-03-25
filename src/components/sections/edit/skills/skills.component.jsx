import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './skills.styles.css';
import { ReactComponent as SkillIcon } from '../../../../assets/resume-form/skill.svg';
import { addSkills } from '../../../../redux/skills/skills.actions';
import { getUserSkills } from '../../../../firebase/auth.util';

import ViewSkillsComp from './view-skills/view.skills.component';
import EditSkillComp from './edit-skill/edit.skill.component';

const SkillsComp = ({ userId, addSkills }) => {

    useEffect(() => {
        (async function asyncFunction() {
            const skillsRef = await getUserSkills(userId);
            skillsRef.orderBy("stars", "desc").get().then(skillset => {
                const skills = skillset.docs.map(skillSnap => {
                    const skill = skillSnap.data();
                    return {
                        id: skillSnap.id,
                        skillName: skill.skillName,
                        stars: skill.stars
                    }
                });
                addSkills(skills); // redux
            });
        })();
    }, [addSkills, userId]);


    return (
        <div className="Skills card neu-up" id="Edit-Skills__id">
            <div className="card-header bgch4">
                <h5>Skills</h5>
            </div>
            <div className="card-body">
                <div className="frow">
                    <div className="text">
                        <EditSkillComp />
                        <ViewSkillsComp />
                    </div>
                    <div className="image">
                        <SkillIcon className="work-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user }) => (
    {
        userId: user.currentUser.id
    }
);

const mapDispatchToProps = dispatch => (
    {
        addSkills: (skills) => dispatch(addSkills(skills))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(SkillsComp);