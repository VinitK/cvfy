import React from 'react';
import { connect } from 'react-redux';

import './view.qual.styles.css';
import { deleteUserQual } from '../../../../../../firebase/auth.util';
import { ReactComponent as DeleteComp } from '../../../../../../assets/resume-form/delete.svg'

import ButtonComp from '../../../../../elements/button/button.component';
import { addQuals } from '../../../../../../redux/quals/quals.actions';

const ViewQualComp = ({ userId, quals, addQuals, qual, ...rest }) => {

    const { course, institute, university, score, pursuing } = qual;
    const startDate = qual.startDate && qual.startDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
    const endDate = qual.endDate && qual.endDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });

    const deleteQual = (quals, qual, userId) => {
        deleteUserQual(userId, qual.id); // db
        const filteredQuals = quals.filter(qualification => qual.id !== qualification.id);
        console.log(filteredQuals)
        addQuals(filteredQuals); // redux
    };

    return (
        <div className="View-qual neu-up card mtm pm">
            <div className="frow">
                <div className="fcol info">
                    <h5 className="ch4">{course}</h5>
                    <p>from {institute}</p>
                    <p>{university}</p>
                    <div className="frow issue-valid-date-group mts">
                        <h5 className="score ch3">{score}</h5>
                        <h6 className="duration self-mid"><span className="ch2">{startDate}</span> to <span className="ch2">{pursuing ? "pursuing" : endDate}</span></h6>
                    </div>
                </div>
                <div className="fcol update-delete">
                    {/* <ButtonComp className="button-icon edit-icon"><EditComp className="icon" /></ButtonComp> */}
                    <ButtonComp onClick={() => deleteQual(quals, qual, userId)} className="button-icon delete-icon"><DeleteComp className="icon" /></ButtonComp>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ user, quals }) => (
    {
        userId: user.currentUser.id,
        quals: quals.quals
    }
);

const mapDispatchToProps = dispatch => (
    {
        addQuals: (quals) => dispatch(addQuals(quals))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(ViewQualComp);