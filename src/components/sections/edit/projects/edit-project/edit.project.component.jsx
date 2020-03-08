import React, { useState } from 'react';
import { connect } from 'react-redux';

import './edit.project.styles.css';
import "react-datepicker/dist/react-datepicker.css";
import { addUserProject } from '../../../../../firebase/auth.util';
import { addProject } from '../../../../../redux/projects/projects.actions';

import InputComp from '../../../../elements/input/input.component';
import ButtonComp from '../../../../elements/button/button.component';
import SpinnerComp from '../../../../elements/spinner/spinner.component';


const EditProjectComp = ({ userId, addProject }) => {

    const [state, setState] = useState(
        {
            title: "",
            company: "",
            description: ""
        }
    );

    const [loading, setLoading] = useState(false);

    const resetState = () => {
        setState({
            title: "",
            company: "",
            description: ""
        });

    }

    const handleChange = e => {
        const { value, name } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        const projectId = await addUserProject(userId, state); // db
        addProject({ ...state, id: projectId }); // redux
        resetState();
        setLoading(false);
    }

    return (
        <div className="Edit-project neu-dn card mtm pm">
            <form onSubmit={handleSubmit} className="form">
                <InputComp type="text" id="editProjectTitle" name="title" value={state.title} onChange={handleChange}>Project Name</InputComp>
                <InputComp type="text" id="editProjectConmpany" name="company" value={state.company} onChange={handleChange}>Company</InputComp>
                <InputComp type="textarea" id="editProjectDescription" rows="4" name="description" value={state.description} onChange={handleChange} >Key Activities Carried Out</InputComp>
                <div className="frow-mid mtm">
                    <ButtonComp btnType="SAVE_FORM" className="button" loading={loading}>Add</ButtonComp>
                    {loading && <SpinnerComp className="mlm" />}
                </div>
            </form>
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
        addProject: projectwork => dispatch(addProject(projectwork))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectComp);