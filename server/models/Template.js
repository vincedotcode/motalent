import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    templateFile: {
        type: String, 
        required: true,
    },
    isDefault: {
        type: Boolean,
        default: false,
    }
});

export default mongoose.model('Template', templateSchema);
