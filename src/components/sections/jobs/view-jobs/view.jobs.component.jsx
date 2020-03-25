import React, { useEffect, useState } from 'react';

import './view.jobs.styles.css';
import { getJobs, getAppliedList } from '../../../../firebase/auth.util';

import ViewJobComp from './view-job/view.job.component';
import ButtonComp from '../../../elements/button/button.component';

const ViewJobsComp = ({ jobs, setJobs }) => {

    const [state, setState] = useState({});
    const pageSize = 20;

    useEffect(() => { // gets jobs and applied and sets JobsArr (reduc sort) and other indicators in state
        (async function asyncFunction() {
            const jobsRef = getJobs();
            const tempState = { jobsRef, seeMore: false };
            jobsRef.orderBy('updatedOn', 'desc').limit(pageSize).get().then(jobs => {
                if (jobs.docs.length > 0) {
                    tempState.last = jobs.docs[jobs.docs.length - 1];
                    tempState.seeMore = true;
                    const jobsArr = jobs.docs.map(jobSnap => {
                        const job = jobSnap.data();
                        return {
                            id: jobSnap.id,
                            ...job,
                        }
                    });
                    setJobs(jobsArr); // redux sort
                }
                setState(tempState); // state
            });
        })();
    }, [setJobs]);

    const handleNext = () => {
        state.jobsRef.orderBy("updatedOn", "desc").startAfter(state.last).limit(pageSize).get().then(jobs => {
            if (jobs.docs.length > 0) {
                const jobsArr = jobs.docs.map(async jobSnap => {
                    const job = jobSnap.data();
                    // Applied
                    const appliedRef = await getAppliedList(jobSnap.id);
                    const appliedList = await appliedRef.get();
                    const appliedArr = appliedList.docs.map(appliedSnap => appliedSnap.data());
                    return {
                        id: jobSnap.id,
                        ...job,
                        appliedArr
                    }
                });
                setJobs(prevJobs => ([...prevJobs, ...jobsArr]));
                setState(prevState => ({ ...prevState, last: jobs.docs[jobs.docs.length - 1] }));
            } else {
                setState(prevState => ({ ...prevState, seeMore: false }));
            }
        });
    }

    return (
        <div className="ViewJobs fcol">
            <div className="card-header brs frow fjcc mtm"><h5>Latest Jobs</h5></div>
            {jobs.map((job) => <ViewJobComp key={job.id} job={job} setJobs={setJobs} />)}
            {state.seeMore && <ButtonComp onClick={handleNext} type="button" className="button pm bgcl mm">See More</ButtonComp>}
        </div>
    )
}

export default ViewJobsComp;