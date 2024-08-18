import mongoose from 'mongoose';

const customSectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        trim: true,
    },
});

const websiteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
        match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, 'Please fill a valid URL'],
    },
});

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    resumeName: {
        type: String,
        required: true,
        trim: true,
    },
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template',
        required: true,
    },
    personalInfo: {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        },
        addressLine1: {
            type: String,
            required: true,
            trim: true,
        },
        addressLine2: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            required: true,
            trim: true,
        },
    },
    education: [
        {
            institution: {
                type: String,
                required: true,
            },
            degree: {
                type: String,
                required: true,
            },
            fieldOfStudy: {
                type: String,
                required: true,
            },
            startDate: {
                type: Date,
                required: true,
            },
            endDate: {
                type: Date,
            },
            grade: {
                type: String,
            },
        },
    ],
    experience: [
        {
            jobTitle: {
                type: String,
                required: true,
            },
            companyName: {
                type: String,
                required: true,
            },
            startDate: {
                type: Date,
                required: true,
            },
            endDate: {
                type: Date,
            },
            responsibilities: {
                type: String,
            },
        },
    ],
    skills: {
        type: [String],
        required: true,
    },
    languages: {
        type: [String],
    },
    hobbies: {
        type: [String],
    },
    customSections: [customSectionSchema], 
    websites: [websiteSchema], 
    completionPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});



export default mongoose.model('Resume', resumeSchema);
