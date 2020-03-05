import React, { useState } from 'react';
import { connect } from 'react-redux';

import './edit.skill.styles.css';
import "react-datepicker/dist/react-datepicker.css";
import { addUserSkill } from '../../../../../firebase/auth.util';
import { addSkill } from '../../../../../redux/skills/skills.actions';

import InputComp from '../../../../elements/input/input.component';
import ButtonComp from '../../../../elements/button/button.component';


const EditSkillComp = ({ userId, addSkill }) => {

    const [state, setState] = useState(
        {
            skilName: "",
            stars: 0
        }
    );

    const resetState = () => {
        setState({
            ...state,
            skill: "",
            stars: 0
        });
    }

    const handleChange = e => {
        const { value, name } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const skillId = await addUserSkill(userId, state); // db
        addSkill({ ...state, id: skillId }); // redux
        resetState();
    }

    return (
        <div className="Edit-skill neu-dn card mtm pm">
            <form onSubmit={handleSubmit} className="form">
                <InputComp className="skill-name" type="text" id="editSkillCourse" name="skillName" value={state.course} onChange={handleChange}>Skill</InputComp>
                <h6 className="proficiency opacity-half mtm">Proficiency Level</h6>
                <div className="stars frow mtm">
                    <label>Amateur</label>
                    <div className="rate fcol">
                        <label htmlFor="rating-1">1</label>
                        <input
                            type="radio"
                            className="checkbox"
                            onChange={handleChange}
                            id="rating-1"
                            name="stars"
                            value="1"
                        />
                    </div>
                    <div className="rate fcol">
                        <label htmlFor="rating-2">2</label>
                        <input
                            type="radio"
                            className="checkbox"
                            onChange={handleChange}
                            id="rating-2"
                            name="stars"
                            value="2"
                        />
                    </div>
                    <div className="rate fcol">
                        <label htmlFor="rating-3">3</label>
                        <input
                            type="radio"
                            className="checkbox"
                            onChange={handleChange}
                            id="rating-3"
                            name="stars"
                            value="3"
                        />
                    </div>
                    <div className="rate fcol">
                        <label htmlFor="rating-4">4</label>
                        <input
                            type="radio"
                            className="checkbox"
                            onChange={handleChange}
                            id="rating-4"
                            name="stars"
                            value="4"
                        />
                    </div>
                    <div className="rate fcol">
                        <label htmlFor="rating-5">5</label>
                        <input
                            type="radio"
                            className="checkbox"
                            onChange={handleChange}
                            id="rating-5"
                            name="stars"
                            value="5"
                        />
                    </div>
                    <label>Expert</label>
                </div>
                <ButtonComp btnType="SAVE_FORM" className="button mtm">Save</ButtonComp>
            </form >
        </div >
    );
};

const mapStateToProps = ({ user }) => (
    {
        userId: user.currentUser.id
    }
);

const mapDispatchToProps = dispatch => (
    {
        addSkill: skill => dispatch(addSkill(skill))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(EditSkillComp);