import React from 'react';

import './resume.qual.styles.css';

const ResumeQualComp = (qual) => { // COMPONENT
    const { course, institute, university, score, startDate, endDate, pursuing } = qual.qual;
    return (
        <div className="Qual card-row">
            <div className="content frow">
                <div className="fcol">
                    <p className="ch3">{course}</p>
                    <p className="mtxs">{institute}</p>
                    <p className="mtxs">{university}</p>
                </div>
                <div className="fcol">
                    <p className="mtxs">{startDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })} - {pursuing ? "Pursuing" : endDate && endDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}</p>
                    <p className="mtxs ch3">{score}</p>
                </div>
            </div>
        </div>
    );
};

export default ResumeQualComp;