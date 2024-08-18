import Template from '../models/Template.js';

const createTemplate = async (templateData) => {
    const template = new Template(templateData);
    await template.save();
    return template;
};

const updateTemplate = async (templateId, updateData) => {
    const template = await Template.findById(templateId);
    if (!template) {
        throw new Error('Template not found');
    }
    Object.assign(template, updateData);
    await template.save();
    return template;
};

const getAllTemplates = async () => {
    return Template.find();
};

const getTemplateById = async (templateId) => {
    const template = await Template.findById(templateId);
    if (!template) {
        throw new Error('Template not found');
    }
    return template;
};

const deleteTemplate = async (templateId) => {
    const template = await Template.findByIdAndDelete(templateId);
    if (!template) {
        throw new Error('Template not found');
    }
    return template;
};

export default {
    createTemplate,
    updateTemplate,
    getAllTemplates,
    getTemplateById,
    deleteTemplate,
};
