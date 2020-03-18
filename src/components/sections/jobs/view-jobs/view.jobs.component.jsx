import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './view.jobs.styles.css';
import { getJobs } from '../../../../firebase/auth.util';

import ViewJobComp from './view-job/view.job.component';
import ButtonComp from '../../../elements/button/button.component';

const ViewJobsComp = ({ userId, jobs, setJobs }) => {

    const [state, setState] = useState({});

    const pageSize = 2;

    useEffect(() => {
        (async function asyncFunction() {
            const jobsRef = await getJobs();
            const tempState = { jobsRef, seeMore: false };
            jobsRef.orderBy("createdAt").limit(pageSize).get().then(jobs => {
                if (jobs.docs.length > 0) {
                    tempState.last = jobs.docs[jobs.docs.length - 1];
                    tempState.seeMore = true;
                    const jobsArr = jobs.docs.map(jobSnap => {
                        const job = jobSnap.data();
                        return {
                            id: jobSnap.id,
                            ...job
                        }
                    });
                    setJobs(jobsArr);
                }
            });
            setState(tempState);
        })();
    }, [setJobs]);

    const handleNext = () => {
        state.jobsRef.orderBy("createdAt").startAfter(state.last).limit(pageSize).get().then(jobs => {
            if (jobs.docs.length > 0) {
                const jobsArr = jobs.docs.map(jobSnap => {
                    const job = jobSnap.data();
                    return {
                        id: jobSnap.id,
                        ...job
                    }
                });
                setJobs(prevJobs => ([...prevJobs, ...jobsArr]));
                setState(prevState => ({ ...prevState, last: jobs.docs[jobs.docs.length - 1] }));
            } else {
                setState(prevState => ({ ...prevState, seeMore: false }));
            }
        });
    }

    console.log(state.first ? state.first.id : state.first, state.last ? state.last.id : state.last);

    return (
        <div className="ViewJobs fcol facc">
            {jobs.map((job, index) => <ViewJobComp key={index} job={job} setJobs={setJobs} />)}
            {state.seeMore && <ButtonComp onClick={handleNext} type="button" className="button pm bgcl mm">See More</ButtonComp>}

        </div>
    )
}

const mapStateToProps = ({ user: { currentUser: { id } } }) => (
    {
        userId: id
    }
)

export default connect(mapStateToProps)(ViewJobsComp);