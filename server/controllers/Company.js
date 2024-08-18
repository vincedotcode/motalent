import companyService from '../services/Company.js';

const createCompany = async (req, res) => {
    try {
        const company = await companyService.createCompany(req.user.id, req.body);
        res.status(201).json(company);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCompany = async (req, res) => {
    try {
        const company = await companyService.updateCompany(req.params.id, req.body);
        res.json(company);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllCompanies = async (req, res) => {
    try {
        const companies = await companyService.getAllCompanies();
        res.json({data: companies});

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCompanyById = async (req, res) => {
    try {
        const company = await companyService.getCompanyById(req.params.id);
        res.json(company);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCompany = async (req, res) => {
    try {
        const company = await companyService.deleteCompany(req.params.id);
        res.json({ message: 'Company deleted successfully', company });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    createCompany,
    updateCompany,
    getAllCompanies,
    getCompanyById,
    deleteCompany
};
