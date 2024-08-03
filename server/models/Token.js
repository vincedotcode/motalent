import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
}, { timestamps: true });

export default mongoose.model('Token', tokenSchema);
