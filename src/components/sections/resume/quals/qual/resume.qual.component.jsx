import React from 'react';

import './resume.qual.styles.css';

const ResumeQualComp = (qual) => { // COMPONENT
    const { course, institute, university, score, startDate, endDate, pursuing } = qual.qual;
    return (
        <div className="Qual card-row">
            <div className="content frow">
                <div className="fcol">
                    <h5 className="ch3">{course}</h5>
                    <p className="mts">{institute}</p>
                    <p className="mts">{university}</p>
                </div>
                <div className="fcol">
                    <p>{startDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })} - {pursuing ? "Pursuing" : endDate && endDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}</p>
                    <h5 className="mts ch3">{score}</h5>
                </div>
            </div>
        </div>
    );
};

export default ResumeQualComp;