import mongoose from 'mongoose';

// Mongoose Schema for the Interview model
const interviewSchema = new mongoose.Schema(
  {
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the applicant
    applicationName: { type: String, required: true },  // Job name or application name
    interviewDate: { type: String, required: true },  // Date of the interview
    interviewTime: { type: String, required: true },  // Time of the interview
    interviewLocation: { type: String, required: true, default: 'N/A' },  // Location of the interview
    isInterviewOnline: { type: Boolean, required: true, default: false },  // Is interview online
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled'],
      default: 'Scheduled',
      required: true,
    },
    interviewId: { type: String, unique: true, required: true, default: () => new mongoose.Types.ObjectId().toString() },  // Unique Interview ID
  },
  {
    timestamps: true,  // Automatically create `createdAt` and `updatedAt` fields
  }
);

export default mongoose.model('Interview', interviewSchema);
