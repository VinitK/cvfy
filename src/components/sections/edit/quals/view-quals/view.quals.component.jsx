import React from 'react';
import { connect } from 'react-redux';

import './view.quals.styles.css';

import ViewQualComp from './view-qual/view.qual.component';

const ViewQualsComp = ({ quals }) => (
    <div>
        {quals.map((qual, index) => <ViewQualComp key={index} qual={qual} />)}
    </div>
);

const mapStateToProps = ({ quals }) => (
    {
        quals: quals.quals
    }
);

export default connect(mapStateToProps)(ViewQualsComp);