import React, { useState } from 'react';
import { connect } from 'react-redux';

import './edit.skill.styles.css';
import "react-datepicker/dist/react-datepicker.css";
import { addUserSkill } from '../../../../../firebase/auth.util';
import { addSkill } from '../../../../../redux/skills/skills.actions';

import InputComp from '../../../../elements/input/input.component';
import ButtonComp from '../../../../elements/button/button.component';
import SpinnerComp from '../../../../elements/spinner/spinner.component';
import { useEffect } from 'react';


const EditSkillComp = ({ currentUser, addSkill }) => {

    const [state, setState] = useState(
        {
            displayName: "",
            photoURL: null,
            introduction: "",
            skillName: "",
            stars: 1
        }
    );
    const [loading, setLoading] = useState(false);

    const resetState = () => {
        setState(prevState => (
            {
                ...prevState,
                skillName: "",
                stars: 1
            }
        ));
    }

    const handleChange = ({ target }) => {
        const { value, name } = target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        const skillId = await addUserSkill(currentUser.id, state); // db
        addSkill({ ...state, id: skillId }); // redux
        resetState();
        setLoading(false);
    }

    useEffect(() => {
        console.log("CURRENT USER", currentUser)
        setState(prevState => (
            {
                ...prevState,
                displayName: currentUser.displayName,
                introduction: currentUser.introduction,
                photoURL: currentUser.photoURL
            }
        ));
    }, [currentUser]);

    return (
        <div className="Edit-skill neu-dn card mtm pm">
            <form onSubmit={handleSubmit} className="form">
                <InputComp className="skill-name" type="text" id="editSkillCourse" name="skillName" value={state.skillName} onChange={handleChange}>Skill</InputComp>
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
                            checked={state.stars === "1"}
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
                            checked={state.stars === "2"}
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
                            checked={state.stars === "3"}
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
                            checked={state.stars === "4"}
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
                            checked={state.stars === "5"}
                        />
                    </div>
                    <label>Expert</label>
                </div>
                <div className="frow facc mtm">
                    <ButtonComp btnType="ADD_FORM" className="button" loading={loading}>Add</ButtonComp>
                    {loading && <SpinnerComp className="mlm" />}
                </div>
            </form >
        </div >
    );
};

const mapStateToProps = ({ user }) => (
    {
        currentUser: user.currentUser
    }
);

const mapDispatchToProps = dispatch => (
    {
        addSkill: skill => dispatch(addSkill(skill))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(EditSkillComp);