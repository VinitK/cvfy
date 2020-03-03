import React from 'react';
import { connect } from 'react-redux';

import './view.work.experience.styles.css';
import { deleteUserWork } from '../../../../../../firebase/auth.util';
import { ReactComponent as DeleteComp } from '../../../../../../assets/resume-form/delete.svg'

import ButtonComp from '../../../../../elements/button/button.component';
import { addWork } from '../../../../../../redux/work/work.actions';

const ViewWorkExpComp = ({ userId, work, addWork, experience, ...rest }) => {

    const { company, designation, description, currentlyWorking } = experience;
    const startDate = experience.startDate && experience.startDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
    const endDate = experience.endDate && experience.endDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });

    const deleteWork = (work, experience) => {
        deleteUserWork(userId, experience.id); // db
        const filteredWork = work.filter(exp => exp.id !== experience.id);
        addWork(filteredWork); // redux
    };

    return (
        <div className="View-work-exp neu-up card mtm pm">
            <div className="frow">
                <div className="fcol">
                    <div className="frow">
                        <h5><span className="ch4">{designation}</span> at <span className="ch3">{company}</span></h5>
                    </div>
                    <div className="frow start-end-date-group mts">
                        <h6><span className="ch2">{startDate}</span> to <span className="ch2">{currentlyWorking ? "Present" : endDate}</span></h6>
                    </div>
                    <p className="mts">{description}</p>
                </div>
                <div className="fcol update-delete">
                    {/* <ButtonComp className="button-icon edit-icon"><EditComp className="icon" /></ButtonComp> */}
                    <ButtonComp onClick={() => deleteWork(work, experience)} className="button-icon delete-icon"><DeleteComp className="icon" /></ButtonComp>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user, work }) => (
    {
        userId: user.currentUser.id,
        work: work.work
    }
);

const mapDispatchToProps = dispatch => (
    {
        addWork: (work) => dispatch(addWork(work))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(ViewWorkExpComp);