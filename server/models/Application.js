import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

const assessmentResultSchema = new mongoose.Schema({
    testName: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    takenAt: {
        type: Date,
        default: Date.now,
    },
    comments: {
        type: String,
        trim: true,
    },
});

const interviewSchema = new mongoose.Schema({
    interviewDate: {
        type: Date,
        required: true,
    },
    interviewTime: {
        type: String,
        required: true,
    },
    interviewLocation: {
        type: String,
        trim: true,
    },
    interviewLink: {
        type: String,
        trim: true,
        match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, 'Please fill a valid URL'],
    },
    interviewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    feedback: {
        type: String,
        trim: true,
    },
    interviewResult: {
        type: String,
        enum: ['Passed', 'Failed', 'Pending'],
        default: 'Pending',
    },
});

const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    sentAt: {
        type: Date,
        default: Date.now,
    },
    method: {
        type: String,
        enum: ['Email', 'In-App'],
        default: 'In-App',
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
});

const applicationStatusSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['Submitted', 'Under Review', 'Interview Scheduled', 'Offer Extended', 'Rejected', 'Withdrawn', 'Background Check', 'Offer Negotiation'],
        required: true,
    },
    changedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    comments: {
        type: String,
        trim: true,
    },
    changedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const jobApplicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
        required: true,
    },
    coverLetter: {
        type: String,
        trim: true,
    },
    additionalDocuments: [documentSchema],
    currentStatus: {
        type: String,
        enum: ['Submitted', 'Under Review', 'Interview Scheduled', 'Offer Extended', 'Rejected', 'Withdrawn', 'Background Check', 'Offer Negotiation'],
        default: 'Submitted',
        required: true,
    },
    statusHistory: [applicationStatusSchema],
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    assessments: [assessmentResultSchema],
    interviews: [interviewSchema],
    notifications: [notificationSchema],
    scoring: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
}, { timestamps: true });

jobApplicationSchema.methods.updateStatus = function(newStatus, comments, changedBy) {
    const statusUpdate = {
        status: newStatus,
        comments: comments || '',
        changedBy: changedBy._id,
    };
    this.statusHistory.push(statusUpdate);
    this.currentStatus = newStatus;
    this.updatedAt = new Date();
    return this.save();
};

jobApplicationSchema.methods.assignReviewer = function(reviewer) {
    this.reviewer = reviewer._id;
    this.updatedAt = new Date();
    return this.save();
};

jobApplicationSchema.methods.addInterview = function(interviewDetails) {
    this.interviews.push(interviewDetails);
    this.updatedAt = new Date();
    return this.save();
};

jobApplicationSchema.methods.addAssessment = function(assessmentResult) {
    this.assessments.push(assessmentResult);
    this.updatedAt = new Date();
    return this.save();
};

jobApplicationSchema.methods.sendNotification = function(notificationDetails) {
    this.notifications.push(notificationDetails);
    return this.save();
};

export default mongoose.model('JobApplication', jobApplicationSchema);
