import templateService from '../services/Template.js';

const createTemplate = async (req, res) => {
    try {
        const templateData = req.body;
        const newTemplate = await templateService.createTemplate(templateData);
        res.status(201).json(newTemplate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllTemplates = async (req, res) => {
    try {
        const templates = await templateService.getAllTemplates();
        res.status(200).json({data: templates});


    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getTemplateById = async (req, res) => {
    try {
        const { id } = req.params;
        const template = await templateService.getTemplateById(id);
        res.status(200).json(template);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedTemplate = await templateService.updateTemplate(id, updatedData);
        res.status(200).json(updatedTemplate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        await templateService.deleteTemplate(id);
        res.status(200).json({ message: 'Template deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    createTemplate,
    getAllTemplates,
    getTemplateById,  // Added this line
    updateTemplate,
    deleteTemplate,
};
