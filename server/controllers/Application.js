import applicationService from '../services/Application.js';

const createJobApplication = async (req, res) => {
    try {
        const { jobId, resumeId, comments } = req.body;
        const application = await applicationService.createJobApplication(req.user.id, jobId, resumeId, comments);
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getApplicationsByUserId = async (req, res) => {
    try {
        const applications = await applicationService.getApplicationsByUserId(req.user.id);
        res.json({ data: applications });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getApplicationsByJobId = async (req, res) => {
    try {
        const applications = await applicationService.getApplicationsByJobId(req.params.jobId);
        res.json({ data: applications });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId, newStatus, comments, changedBy } = req.body;
        const application = await applicationService.updateApplicationStatus(applicationId, newStatus, comments, changedBy);
        res.json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const assignReviewerToApplication = async (req, res) => {
    try {
        const { applicationId, reviewerId } = req.body;
        const application = await applicationService.assignReviewerToApplication(applicationId, reviewerId);
        res.json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addInterviewToApplication = async (req, res) => {
    try {
        const { applicationId, interviewDetails } = req.body;
        const application = await applicationService.addInterviewToApplication(applicationId, interviewDetails);
        res.json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addAssessmentToApplication = async (req, res) => {
    try {
        const { applicationId, assessmentResult } = req.body;
        const application = await applicationService.addAssessmentToApplication(applicationId, assessmentResult);
        res.json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getApplicationById = async (req, res) => {
    try {
        const application = await applicationService.getApplicationById(req.params.applicationId);
        res.json({ data: application });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



export default {
    createJobApplication,
    getApplicationsByUserId,
    getApplicationsByJobId,
    updateApplicationStatus,
    assignReviewerToApplication,
    addInterviewToApplication,
    addAssessmentToApplication,
    getApplicationById,
};
