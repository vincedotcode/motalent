import Job from '../models/Job.js';

const getAllJobs = async () => {
    return Job.find().populate('company applicants');
};

const getJobById = async (jobId) => {
    const job = await Job.findById(jobId).populate('company applicants');
    if (!job) {
        throw new Error('Job not found');
    }
    return job;
};

const viewJob = async (jobId) => {
    const job = await Job.findById(jobId);
    if (!job) {
        throw new Error('Job not found');
    }
    job.views += 1;
    await job.save();
    return job;
};

const applyForJob = async (jobId, userId) => {
    const job = await Job.findById(jobId);
    if (!job) {
        throw new Error('Job not found');
    }
    job.incrementApplicationCount();
    job.applicants.push(userId);
    await job.save();
    return job;
};

const getJobsByCompanyId = async (companyId) => {
    return Job.find({ company: companyId }).populate('company applicants');
};

const updateJobStatus = async (jobId, status) => {
    const job = await Job.findById(jobId);
    if (!job) {
        throw new Error('Job not found');
    }
    job.status = status;
    await job.save();
    return job;
};

const deleteJob = async (jobId) => {
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) {
        throw new Error('Job not found');
    }
    return job;
};

const createJob = async (jobData) => {
    const job = new Job(jobData);
    await job.save();
    return job.populate('company applicants');
};

export default {
    getAllJobs,
    getJobById,
    viewJob,
    applyForJob,
    getJobsByCompanyId,
    updateJobStatus,
    deleteJob,
    createJob
};
