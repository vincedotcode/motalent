import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    feedback: {
        type: String,
        trim: true,
    },
}, { timestamps: true });

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    website: {
        type: String,
        trim: true,
        match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, 'Please fill a valid URL'],
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
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    postalCode: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    logo: {
        type: String,
        trim: true,
    },
    bannerImage: {
        type: String,
        trim: true,
    },
    foundedDate: {
        type: Date,
        required: true,
    },
    numberOfEmployees: {
        type: Number,
        required: true,
    },
    industry: {
        type: String,
        required: true,
        trim: true,
    },
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    affiliatedRecruiters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    ratings: [ratingSchema],
}, { timestamps: true });

companySchema.virtual('averageRating').get(function() {
    if (this.ratings.length === 0) {
        return 0;
    }
    const sum = this.ratings.reduce((total, rating) => total + rating.rating, 0);
    return sum / this.ratings.length;
});

companySchema.set('toJSON', { virtuals: true });
companySchema.set('toObject', { virtuals: true });

export default mongoose.model('Company', companySchema);
