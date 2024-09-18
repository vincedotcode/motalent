import express from 'express';
import matchingController from '../controllers/Matching.js';
import authenticateToken from '../middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Matching
 *   description: AI matching related endpoints
 */

/**
 * @swagger
 * /api/matching:
 *   post:
 *     tags: [Matching]
 *     summary: Perform AI matching of resume to jobs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resumeId:
 *                 type: string
 *                 description: The ID of the resume
 *                 example: 64bf00b8f8c8ec2a0c000001
 *     responses:
 *       201:
 *         description: Matching completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   match:
 *                     type: object
 *                     description: The matched job and details
 *                   explanation:
 *                     type: string
 *                     description: AI-generated explanation for the match
 *       400:
 *         description: Error message
 */
router.post('/', authenticateToken, matchingController.matchJobsForUser);

/**
 * @swagger
 * /api/matching/user:
 *   get:
 *     tags: [Matching]
 *     summary: Get all matches for a specific user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Matches fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   matchId:
 *                     type: string
 *                     description: The ID of the match
 *                   jobId:
 *                     type: string
 *                     description: The ID of the matched job
 *                   matchScore:
 *                     type: number
 *                     description: The AI-generated match score
 *                   status:
 *                     type: string
 *                     description: The status of the match (e.g., "pending", "reviewed", etc.)
 *       400:
 *         description: Error message
 */
router.get('/user', authenticateToken, matchingController.getMatchesByUserId);

/**
 * @swagger
 * /api/matching/status:
 *   put:
 *     tags: [Matching]
 *     summary: Update the status of a match
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matchId:
 *                 type: string
 *                 description: The ID of the match
 *                 example: 64bf00b8f8c8ec2a0c000001
 *               status:
 *                 type: string
 *                 description: The new status of the match
 *                 example: "reviewed"
 *               comments:
 *                 type: string
 *                 description: Additional comments for the match
 *     responses:
 *       200:
 *         description: Match status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 matchId:
 *                   type: string
 *                   description: The ID of the updated match
 *                 status:
 *                   type: string
 *                   description: The new status of the match
 *       400:
 *         description: Error message
 */
router.put('/status', authenticateToken, matchingController.updateMatchStatus);

export default router;