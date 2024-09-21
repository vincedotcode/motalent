import JobApplication from '../models/Application.js';
import Job from '../models/Job.js';
import User from '../models/User.js';  // Import the User model

// Create a new job application
const createJobApplication = async (userId, jobId, resumeId, comments) => {
    // Check if the user has already applied for this job
    const existingApplication = await JobApplication.findOne({ applicant: userId, job: jobId });
    
    if (existingApplication) {
        throw new Error('You have already applied for this job.');
    }

    // Fetch user details to get the applicant's name
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
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

    // Update the job's application count and add application details
    const job = await Job.findById(jobId);
    if (!job) {
        throw new Error('Job not found');
    }

    // Add application details to the job, including applicant's name
    job.applicants.push({
        applicant: userId,
        applicationId: application._id,
        appliedAt: application.createdAt,
        applicantName: `${user.firstName} ${user.lastName}`,  // Add the applicant's name here
    });
    
    await job.incrementApplicationCount();

    return application;
};


// Update the status of the job application
const updateApplicationStatus = async (applicationId, newStatus, comments, changedBy) => {

   
    const application = await JobApplication.findById(applicationId);
    if (!application) {
        throw new Error('Application not found');
    }

    console.log('application', changedBy);
    // Update status and keep status history
    await application.updateStatus(newStatus, comments, changedBy);
    return application;
};

// Add or override an assessment for the current active status
const addAssessmentToCurrentStatus = async (applicationId, assessmentResult) => {
    const application = await JobApplication.findById(applicationId);
    if (!application) {
        throw new Error('Application not found');
    }

    // Add or override assessment for the current active status
    await application.addAssessmentToActiveStatus(assessmentResult);
    return application;
};

// Assign a reviewer to the application
const assignReviewerToApplication = async (applicationId, reviewerId) => {
    const application = await JobApplication.findById(applicationId);
    if (!application) {
        throw new Error('Application not found');
    }
    await application.assignReviewer(reviewerId);
    return application;
};

// Add an interview to the application
const addInterviewToApplication = async (applicationId, interviewDetails) => {
    const application = await JobApplication.findById(applicationId);
    if (!application) {
        throw new Error('Application not found');
    }
    await application.addInterview(interviewDetails);
    return application;
};

// Get applications by user
const getApplicationsByUserId = async (userId) => {
    return JobApplication.find({ applicant: userId }).populate('job resume');
};

// Get applications by job
const getApplicationsByJobId = async (jobId) => {
    return JobApplication.find({ job: jobId }).populate('applicant resume');
};

// Get a single application by its ID
const getApplicationById = async (applicationId) => {
    const application = await JobApplication.findById(applicationId)
        .populate('applicant')
        .populate('job')
        .populate('resume');

    if (!application) {
        throw new Error('Application not found');
    }
    return application;
};

export default {
    createJobApplication,
    updateApplicationStatus,
    addAssessmentToCurrentStatus,
    assignReviewerToApplication,
    addInterviewToApplication,
    getApplicationsByUserId,
    getApplicationsByJobId,
    getApplicationById,
};