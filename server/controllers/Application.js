import applicationService from '../services/Application.js';

// Create a new job application
const createJobApplication = async (req, res) => {
    try {
        const { jobId, resumeId, comments } = req.body;
        const application = await applicationService.createJobApplication(req.user.id, jobId, resumeId, comments);
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get applications by user ID (from the token)
const getApplicationsByUserId = async (req, res) => {
    try {
        const applications = await applicationService.getApplicationsByUserId(req.user.id);
        res.json({ data: applications });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get applications by job ID
const getApplicationsByJobId = async (req, res) => {
    try {
        const applications = await applicationService.getApplicationsByJobId(req.params.jobId);
        res.json({ data: applications });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update the status of a job application
const updateApplicationStatus = async (req, res) => {
    try {

        const applicationId = req.params.applicationId;

        const {  newStatus, comments } = req.body;
        const changedBy = req.user.id;
        
        const application = await applicationService.updateApplicationStatus(applicationId, newStatus, comments, req.user.id);
        res.json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Assign a reviewer to a job application
const assignReviewerToApplication = async (req, res) => {
    try {
        const { applicationId, reviewerId } = req.body;
        const application = await applicationService.assignReviewerToApplication(applicationId, reviewerId);
        res.json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Add an interview to a job application
const addInterviewToApplication = async (req, res) => {
    try {
        const appplicationid = req.params.applicationId;

        const {  interviewDetails } = req.body;

        const application = await applicationService.addInterviewToApplication(appplicationid, interviewDetails);
        res.json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Add an assessment to a job application
const addAssessmentToApplication = async (req, res) => {
    try {

        const appplicationid = req.params.applicationId;
        const {  assessmentResult } = req.body;
        const application = await applicationService.addAssessmentToCurrentStatus(appplicationid, assessmentResult);
        res.json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a specific job application by its ID
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