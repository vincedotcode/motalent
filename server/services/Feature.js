import FeatureSuggestion from '../models/Feature.js';

const createSuggestion = async (userId, suggestionData) => {
    const suggestion = new FeatureSuggestion({
        userId,
        ...suggestionData
    });
    await suggestion.save();
    return suggestion;
};

const getSuggestionsByUserId = async (userId) => {
    return FeatureSuggestion.find({ userId });
};

const updateSuggestionStatus = async (suggestionId, status, comments) => {
    const suggestion = await FeatureSuggestion.findById(suggestionId);
    if (!suggestion) {
        throw new Error('Suggestion not found');
    }
    suggestion.status = status;
    suggestion.comments = comments || suggestion.comments;
    await suggestion.save();
    return suggestion;
};

export default {
    createSuggestion,
    getSuggestionsByUserId,
    updateSuggestionStatus
};
