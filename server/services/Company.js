import Company from '../models/Company.js';

const createCompany = async (recruiterId, companyData) => {
    const company = new Company({
        recruiter: recruiterId,
        ...companyData
    });
    await company.save();
    return company;
};

const updateCompany = async (companyId, updateData) => {
    const company = await Company.findById(companyId);
    if (!company) {
        throw new Error('Company not found');
    }
    Object.assign(company, updateData);
    await company.save();
    return company;
};

const getAllCompanies = async () => {
    return Company.find().populate('recruiter affiliatedRecruiters ratings.user');
};

const getCompanyById = async (companyId) => {
    const company = await Company.findById(companyId).populate('recruiter affiliatedRecruiters ratings.user');
    if (!company) {
        throw new Error('Company not found');
    }
    return company;
};

const deleteCompany = async (companyId) => {
    const company = await Company.findByIdAndDelete(companyId);
    if (!company) {
        throw new Error('Company not found');
    }
    return company;
};

export default {
    createCompany,
    updateCompany,
    getAllCompanies,
    getCompanyById,
    deleteCompany
};
