import resumeService from '../services/Resume.js';

const createResume = async (req, res) => {
    try {
        const userId = req.params.userId;  
        const resumeData = req.body;
        const newResume = await resumeService.createResume(userId, resumeData);
        res.status(201).json(newResume);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllResumesByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;  
        const resumes = await resumeService.getResumesByUserId(userId);
        res.json(resumes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getResumeById = async (req, res) => {
    try {
        const resumeId = req.params.resumeId;  
        const resume = await resumeService.getResumeById(resumeId);
        res.json(resume);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateResume = async (req, res) => {
    try {
        const resumeId = req.params.resumeId;  
        const updatedData = req.body;
        const updatedResume = await resumeService.updateResume(resumeId, updatedData);
        res.json(updatedResume);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteResume = async (req, res) => {
    try {
        const resumeId = req.params.resumeId;  
        await resumeService.deleteResume(resumeId);
        res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addSectionToResume = async (req, res) => {
    try {
        const resumeId = req.params.resumeId;  
        const { sectionName, sectionData } = req.body;
        const updatedResume = await resumeService.addSectionToResume(resumeId, sectionName, sectionData);
        res.json(updatedResume);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteSectionFromResume = async (req, res) => {
    try {
        const resumeId = req.params.resumeId; 
        const { sectionName, sectionId } = req.body;
        const updatedResume = await resumeService.deleteSectionFromResume(resumeId, sectionName, sectionId);
        res.json(updatedResume);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    createResume,
    getAllResumesByUserId,
    getResumeById,
    updateResume,
    deleteResume,
    addSectionToResume,
    deleteSectionFromResume
};
