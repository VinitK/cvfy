import React, { useState } from 'react';
import { connect } from 'react-redux';

import './jobs.styles.css';

import AddJobComp from './add-job/add.job.component';
import ButtonComp from '../../elements/button/button.component';
import ViewJobsComp from './view-jobs/view.jobs.component';

const JobsComp = ({ userId }) => {

    const [edit, setEdit] = useState(true);
    const [jobs, setJobs] = useState([]);

    return (
        <div className="Jobs fcol facc">
            {
                userId && (
                    edit
                        ?
                        <AddJobComp setEdit={setEdit} setJobs={setJobs} />
                        :
                        <ButtonComp className="button bgch3 pm mm" type="button" onClick={() => setEdit(true)}>Add New Job</ButtonComp>
                )
            }
            <ViewJobsComp jobs={jobs} setJobs={setJobs} />
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser: { id } } }) => (
    {
        userId: id
    }
);

export default connect(mapStateToProps)(JobsComp);