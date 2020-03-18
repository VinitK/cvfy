import JobsActionTypes from "./jobs.types";

export const addJobs = jobs => (
    {
        type: JobsActionTypes.ADD_JOBS,
        payload: jobs
    }
);

export const addJob = job => (
    {
        type: JobsActionTypes.ADD_JOB,
        payload: job
    }
);