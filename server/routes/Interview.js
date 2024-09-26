import express from 'express';
import interviewController from '../controllers/Interview.js';
import authenticateToken from '../middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Interviews
 *   description: Interview management related endpoints
 */

/**
 * @swagger
 * /api/interviews:
 *   get:
 *     tags: [Interviews]
 *     summary: Get all interviews
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Interviews fetched successfully
 *       400:
 *         description: Error message
 */
router.get('/', authenticateToken, interviewController.getAllInterviews);

/**
 * @swagger
 * /api/interviews/applicant/{applicantId}:
 *   get:
 *     tags: [Interviews]
 *     summary: Get interviews by applicant ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: applicantId
 *         required: false
 *         schema:
 *           type: string
 *         description: The ID of the applicant. If not provided, defaults to the authenticated user's ID.
 *     responses:
 *       200:
 *         description: Interviews fetched successfully
 *       400:
 *         description: Error message
 */
router.get('/applicant/:applicantId?', authenticateToken, interviewController.getInterviewsByApplicantId);

/**
 * @swagger
 * /api/interviews/{interviewId}/status:
 *   put:
 *     tags: [Interviews]
 *     summary: Update the status of an interview
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: interviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the interview
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newStatus:
 *                 type: string
 *                 description: The new status of the interview
 *             required:
 *               - newStatus
 *     responses:
 *       200:
 *         description: Interview status updated successfully
 *       400:
 *         description: Error message
 */
router.put('/:interviewId/status', authenticateToken, interviewController.updateInterviewStatus);

export default router;
