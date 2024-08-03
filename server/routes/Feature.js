import express from 'express';
import featureController from '../controllers/Feature.js';
import authenticateToken from '../middleware.js'; 

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Feature Suggestions
 *   description: Feature suggestion related endpoints
 */

/**
 * @swagger
 * /api/feature/feature-suggestions:
 *   post:
 *     tags: [Feature Suggestions]
 *     summary: Create a new feature suggestion
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               featureTitle:
 *                 type: string
 *               featureDescription:
 *                 type: string
 *     responses:
 *       201:
 *         description: Suggestion created successfully
 *       400:
 *         description: Error message
 */
router.post('/feature-suggestions', authenticateToken, featureController.createSuggestion);

/**
 * @swagger
 * /api/feature/feature-suggestions:
 *   get:
 *     tags: [Feature Suggestions]
 *     summary: Get all feature suggestions by user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Suggestions fetched successfully
 *       400:
 *         description: Error message
 */
router.get('/feature-suggestions', authenticateToken, featureController.getSuggestionsByUserId);

/**
 * @swagger
 * /api/feature/feature-suggestions/status:
 *   patch:
 *     tags: [Feature Suggestions]
 *     summary: Update the status of a feature suggestion
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               suggestionId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *               comments:
 *                 type: string
 *     responses:
 *       200:
 *         description: Suggestion status updated successfully
 *       400:
 *         description: Error message
 */
router.patch('/feature-suggestions/status', authenticateToken, featureController.updateSuggestionStatus);

export default router;
