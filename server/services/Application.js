import JobApplication from '../models/Application.js';
import Job from '../models/Job.js';


const createJobApplication = async (userId, jobId, resumeId, comments) => {
    // Check if the user has already applied for this job
    const existingApplication = await JobApplication.findOne({ applicant: userId, job: jobId });
    
    if (existingApplication) {
        throw new Error('You have already applied for this job.');
    }

    // Create a new job application
    const application = new JobApplication({
        applicant: userId,
        job: jobId,
        resume: resumeId,
        coverLetter: comments || '',
    });

    // Save the application
    await application.save();

    const job = await Job.findById(jobId);
    if (!job) {
        throw new Error('Job not found');
    }

    job.applicants.push(userId);
    await job.incrementApplicationCount();

    return application;
};


const getApplicationsByUserId = async (userId) => {
    return JobApplication.find({ applicant: userId }).populate('job resume');
};

const getApplicationsByJobId = async (jobId) => {
    return JobApplication.find({ job: jobId }).populate('applicant resume');
};

const updateApplicationStatus = async (applicationId, newStatus, comments, changedBy) => {
    const application = await JobApplication.findById(applicationId);
    if (!application) {
        throw new Error('Application not found');
    }
    await application.updateStatus(newStatus, comments, changedBy);
    return application;
};

const assignReviewerToApplication = async (applicationId, reviewerId) => {
    const application = await JobApplication.findById(applicationId);
    if (!application) {
        throw new Error('Application not found');
    }
    await application.assignReviewer(reviewerId);
    return application;
};

const addInterviewToApplication = async (applicationId, interviewDetails) => {
    const application = await JobApplication.findById(applicationId);
    if (!application) {
        throw new Error('Application not found');
    }
    await application.addInterview(interviewDetails);
    return application;
};

const addAssessmentToApplication = async (applicationId, assessmentResult) => {
    const application = await JobApplication.findById(applicationId);
    if (!application) {
        throw new Error('Application not found');
    }
    await application.addAssessment(assessmentResult);
    return application;
};

export default {
    createJobApplication,
    getApplicationsByUserId,
    getApplicationsByJobId,
    updateApplicationStatus,
    assignReviewerToApplication,
    addInterviewToApplication,
    addAssessmentToApplication,
};
