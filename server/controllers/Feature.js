import featureService from '../services/Feature.js';

const createSuggestion = async (req, res) => {
    try {
        console.log(req.user);
        const userId = req.user.id;
        const suggestion = await featureService.createSuggestion(userId, req.body);
        res.status(201).json(suggestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getSuggestionsByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        const suggestions = await featureService.getSuggestionsByUserId(userId);
        res.json(suggestions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateSuggestionStatus = async (req, res) => {
    try {
        const { suggestionId, status, comments } = req.body;
        const updatedSuggestion = await featureService.updateSuggestionStatus(suggestionId, status, comments);
        res.json(updatedSuggestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    createSuggestion,
    getSuggestionsByUserId,
    updateSuggestionStatus
};
