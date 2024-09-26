import mongoose from 'mongoose';

// Document Schema for Additional Documents
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

// Assessment Result Schema
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


// Notification Schema
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

// Application Status Schema with Assessment
const applicationStatusSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: [
      'Submitted',
      'Under Review',
      'Interview Scheduled',
      'Offer Extended',
      'Rejected',
      'Withdrawn',
      'Background Check',
      'Offer Negotiation'
    ],
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
  assessment: {
    type: assessmentResultSchema,
    required: false,
  },
  changedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Job Application Schema
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
    enum: [
      'Submitted',
      'Under Review',
      'Interview Scheduled',
      'Offer Extended',
      'Rejected',
      'Withdrawn',
      'Background Check',
      'Offer Negotiation'
    ],
    default: 'Submitted',
    required: true,
  },
  statusHistory: [applicationStatusSchema], // Array of status changes with optional assessments
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  assessments: [assessmentResultSchema], // Global assessments for the application
  interviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: false,
  }], // Array of interviews with details
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

// Method to update the application status and track status history
jobApplicationSchema.methods.updateStatus = function (newStatus, comments, changedBy) {
  const existingStatus = this.statusHistory.find(status => status.status === newStatus);
  
  if (existingStatus) {
    // If the status already exists in history, update its details
    existingStatus.changedAt = new Date();
    existingStatus.comments = comments || existingStatus.comments;
    existingStatus.changedBy = changedBy;
  } else {
    // Add a new status to the history
    const statusUpdate = {
      status: newStatus,
      comments: comments || '',
      changedBy: changedBy,
    };
    this.statusHistory.push(statusUpdate);
  }

  // Update the current status of the application
  this.currentStatus = newStatus;
  this.updatedAt = new Date();
  return this.save();
};

// Method to add or override the assessment for the current active status
jobApplicationSchema.methods.addAssessmentToActiveStatus = function (assessmentResult) {
  const activeStatus = this.statusHistory.find(status => status.status === this.currentStatus);

  if (!activeStatus) {
    throw new Error('Active status not found.');
  }

  // Override the assessment for the current active status
  activeStatus.assessment = assessmentResult;
  this.updatedAt = new Date();
  return this.save();
};

// Method to assign a reviewer to the job application
jobApplicationSchema.methods.assignReviewer = function (reviewer) {
  this.reviewer = reviewer._id;
  this.updatedAt = new Date();
  return this.save();
};

// Method to add an interview to the application
jobApplicationSchema.methods.addInterview = function (interviewDetails) {
  this.interviews.push(interviewDetails);
  this.updatedAt = new Date();
  return this.save();
};

// Method to add a global assessment to the application
jobApplicationSchema.methods.addAssessment = function (assessmentResult) {
  this.assessments.push(assessmentResult);
  this.updatedAt = new Date();
  return this.save();
};

// Method to send notifications related to the application
jobApplicationSchema.methods.sendNotification = function (notificationDetails) {
  this.notifications.push(notificationDetails);
  return this.save();
};

// Method to get the application's full history, including statuses, assessments, and interviews
jobApplicationSchema.methods.getApplicationHistory = function () {
  return {
    statusHistory: this.statusHistory,
    assessments: this.assessments,
    interviews: this.interviews,
  };
};

export default mongoose.model('JobApplication', jobApplicationSchema);