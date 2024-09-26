import aiChatService from '../services/Chat.js';

const processChat = async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ message: 'Query is required.' });
    }

    try {
        // Get user ID from middleware
        const userId = req.user.id;

        // Pass the userId and query to the AI chat service
        const aiResponse = await aiChatService(userId, query);

        // Send the AI service response back to the client
        res.json({data: aiResponse});

    } catch (error) {
        res.status(500).json({ message: 'Error processing AI request', error: error.message });
    }
};

export default {
    processChat,
};
