import Resume from '../models/Resume.js';

const calculateCompletionPercentage = (resume) => {
    const fieldsToCheck = [
        'personalInfo.firstName',
        'personalInfo.lastName',
        'personalInfo.dateOfBirth',
        'personalInfo.email',
        'personalInfo.phoneNumber',
        'personalInfo.addressLine1',
        'personalInfo.country',
        'education',
        'experience',
        'skills',
        'languages',
        'hobbies',
        'customSections',
        'websites'
    ];

    const totalFields = fieldsToCheck.length;
    let completedFields = 0;

    fieldsToCheck.forEach(field => {
        const value = field.split('.').reduce((o, k) => (o || {})[k], resume);
        if (Array.isArray(value)) {
            if (value.length > 0) completedFields++;
        } else if (value) {
            completedFields++;
        }
    });

    return Math.floor((completedFields / totalFields) * 100);
};

const createResume = async (userId, resumeData) => {
    // Find the total number of resumes already created by the user
    const existingResumesCount = await Resume.countDocuments({ userId });

    // Generate a resume name based on the user's first name and append the count + 1
    const resumeName = `${resumeData.personalInfo.firstName}'s Resume ${existingResumesCount + 1}`;

    // Create the new resume with the generated name
    const resume = new Resume({
        userId,
        ...resumeData,
        resumeName: resumeName,
    });

    // Calculate the completion percentage and set it
    resume.completionPercentage = calculateCompletionPercentage(resume);

    // Save the resume to the database
    await resume.save();
    return resume;
};

const updateResume = async (resumeId, updateData) => {
    const resume = await Resume.findById(resumeId);
    if (!resume) {
        throw new Error('Resume not found');
    }

    Object.assign(resume, updateData);
    resume.completionPercentage = calculateCompletionPercentage(resume);
    resume.updatedAt = Date.now();
    await resume.save();
    return resume;
};

const deleteResume = async (resumeId) => {
    const resume = await Resume.findByIdAndDelete(resumeId);
    if (!resume) {
        throw new Error('Resume not found');
    }
    return resume;
};

const getResumesByUserId = async (userId) => {
    return Resume.find({ userId });
};

const getResumeById = async (resumeId) => {
    const resume = await Resume.findById(resumeId).populate('userId');
    if (!resume) {
        throw new Error('Resume not found');
    }
    return resume;
};

const addSectionToResume = async (resumeId, sectionName, sectionData) => {
    const resume = await Resume.findById(resumeId);
    if (!resume) {
        throw new Error('Resume not found');
    }

    resume[sectionName].push(sectionData);
    resume.completionPercentage = calculateCompletionPercentage(resume);
    resume.updatedAt = Date.now();
    await resume.save();
    return resume;
};

const deleteSectionFromResume = async (resumeId, sectionName, sectionId) => {
    const resume = await Resume.findById(resumeId);
    if (!resume) {
        throw new Error('Resume not found');
    }

    resume[sectionName] = resume[sectionName].filter(section => section._id.toString() !== sectionId);
    resume.completionPercentage = calculateCompletionPercentage(resume);
    resume.updatedAt = Date.now();
    await resume.save();
    return resume;
};

export default {
    createResume,
    updateResume,
    deleteResume,
    getResumesByUserId,
    getResumeById,
    addSectionToResume,
    deleteSectionFromResume
};
