import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'],
    },
    datePosted: {
        type: Date,
        default: Date.now,
    },
    closingDate: {
        type: Date,
        required: true,
    },
    offeredSalary: {
        type: String,
        required: true,
    },
    experienceLevel: {
        type: String,
        required: true,
        enum: ['Junior', 'Middle', 'Senior'],
    },
    experience: {
        type: String,
        required: true,
    },
    remoteWorkOption: {
        type: Boolean,
        default: false,
    },
    expatriateEligibility: {
        type: Boolean,
        default: false,
    },
    keyResponsibilities: {
        type: String,
        required: true,
    },
    hardSkills: {
        type: [String],
        required: true,
    },
    softSkills: {
        type: [String],
        required: true,
    },
    goalsAndPerformanceMetrics: {
        type: String,
        required: true,
    },
    managementStyle: {
        type: String,
        required: true,
    },
    careerProgression: {
        type: String,
        required: true,
    },
    benefitsAndCulture: {
        type: String,
        required: true,
    },
    candidateSelectionCriteria: {
        type: String,
        required: true,
    },
    qualifications: {
        type: [String],
        required: true,
    },
    workCondition: {
        type: String,
        required: true,
    },
    workArrangement: {
        type: String,
        required: true,
        enum: ['On-site', 'Remote', 'Hybrid'],
    },
    applicationCount: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Ending Soon', 'Closed'],
        default: 'Active',
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    industry: {
        type: String,
        required: true,
        enum: [
            'Accountancy, banking and finance',
            'Business, consulting and management',
            'Charity and voluntary work',
            'Creative arts and design',
            'Energy and utilities',
            'Engineering and manufacturing',
            'Environment and agriculture',
            'Healthcare',
            'Hospitality and events management',
            'Information technology',
            'Law',
            'Law enforcement and security',
            'Leisure, sport and tourism',
            'Marketing, advertising and PR',
            'Media and internet',
            'Property and construction',
            'Public services and administration',
            'Recruitment and HR',
            'Retail',
            'Sales',
            'Science and pharmaceuticals',
            'Social care',
            'Teacher training and education',
            'Transport and logistics'
        ],
    }
}, { timestamps: true });

jobSchema.methods.incrementApplicationCount = function() {
    this.applicationCount += 1;
    return this.save();
};

export default mongoose.model('Job', jobSchema);
