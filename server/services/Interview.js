import Interview from '../models/Interview.js';
import User from '../models/User.js';

// Get all interviews
const getAllInterviews = async () => {
    return await Interview.find().populate('applicantId');
};

// Get interviews by applicant ID
const getInterviewsByApplicantId = async (applicantId) => {
    return await Interview.find({ applicantId }).populate('applicantId');
};

// Update an interview
const updateInterviewStatus = async (interviewId, newStatus) => {
    const interview = await Interview.findById(interviewId);
    if (!interview) {
        throw new Error('Interview not found');
    }

    // Validate the new status
    const allowedStatuses = ['Scheduled', 'Completed', 'Cancelled'];
    if (!allowedStatuses.includes(newStatus)) {
        throw new Error('Invalid status');
    }

    interview.status = newStatus;

    // Save the updated interview
    await interview.save();
    return interview;
};

export default {
    getAllInterviews,
    getInterviewsByApplicantId,
    updateInterviewStatus,
};
