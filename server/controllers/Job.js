import jobService from '../services/Job.js';



const createJob = async (req, res) => {
    try {
        const job = await jobService.createJob(req.body);
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobService.getAllJobs();
        res.json({data: jobs});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getJobById = async (req, res) => {
    try {
        const job = await jobService.getJobById(req.params.id);
        res.json({data: job});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const viewJob = async (req, res) => {
    try {
        const job = await jobService.viewJob(req.params.id);
        res.json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const applyForJob = async (req, res) => {
    try {
        const job = await jobService.applyForJob(req.params.id, req.user.id);
        res.json({ message: 'Application successful', job });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getJobsByCompanyId = async (req, res) => {
    try {
        const jobs = await jobService.getJobsByCompanyId(req.params.companyId);
        res.json(jobs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateJobStatus = async (req, res) => {
    try {
        const job = await jobService.updateJobStatus(req.params.id, req.body.status);
        res.json({job});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteJob = async (req, res) => {
    try {
        const job = await jobService.deleteJob(req.params.id);
        res.json({ message: 'Job deleted successfully', job });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    getAllJobs,
    getJobById,
    viewJob,
    applyForJob,
    getJobsByCompanyId,
    updateJobStatus,
    deleteJob,
    createJob,
};
