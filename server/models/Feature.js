import mongoose from 'mongoose';

const featureSuggestionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    featureTitle: {
        type: String,
        required: true,
        trim: true,
    },
    featureDescription: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
        required: true,
    },
    comments: {
        type: String,
        trim: true,
    }
}, { timestamps: true });

export default mongoose.model('FeatureSuggestion', featureSuggestionSchema);
