import interviewService from '../services/Interview.js';

// Get all interviews
const getAllInterviews = async (req, res) => {
    try {
        const interviews = await interviewService.getAllInterviews();
        res.json({ data: interviews });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get interviews by applicant ID
const getInterviewsByApplicantId = async (req, res) => {
    try {
        // If applicantId is not provided in params, use the ID from the authenticated user
        const applicantId = req.params.applicantId || req.user.id;
        const interviews = await interviewService.getInterviewsByApplicantId(applicantId);
        res.json({ data: interviews });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update the status of an interview
const updateInterviewStatus = async (req, res) => {
    try {
        const interviewId = req.params.interviewId;
        const { newStatus } = req.body;

        const interview = await interviewService.updateInterviewStatus(interviewId, newStatus);
        res.json(interview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    getAllInterviews,
    getInterviewsByApplicantId,
    updateInterviewStatus,
};
