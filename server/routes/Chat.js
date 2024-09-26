import express from 'express';
import aiChatController from '../controllers/Chat.js'; // Assuming you have the AI chat controller
import authenticateToken from '../middleware.js'; // Middleware for authentication

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AI Chat
 *   description: AI-based resume building and analysis endpoints
 */

/**
 * @swagger
 * /api/ai/chat:
 *   post:
 *     tags: [AI Chat]
 *     summary: Interact with AI for resume creation or analysis
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *                 description: The query for the AI service (e.g., "Create resume", "Check my resume status")
 *     responses:
 *       200:
 *         description: AI response returned successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Error processing AI chat request
 */
router.post('/chat', authenticateToken, aiChatController.processChat);

export default router;
