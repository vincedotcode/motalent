import express from 'express';
import applicationController from '../controllers/Application.js';
import authenticateToken from '../middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Job application management related endpoints
 */

/**
 * @swagger
 * /api/applications:
 *   post:
 *     tags: [Applications]
 *     summary: Create a new job application
 *     security:
 *       - bearerAuth: []
 *     description: Creates a new job application for the authenticated user. The user ID is derived from the authentication token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobId:
 *                 type: string
 *                 description: The ID of the job being applied to
 *               resumeId:
 *                 type: string
 *                 description: The ID of the resume to be submitted with the application
 *               comments:
 *                 type: string
 *                 description: Optional comments or cover letter for the application
 *             required:
 *               - jobId
 *               - resumeId
 *     responses:
 *       201:
 *         description: Application created successfully
 *       400:
 *         description: Error message
 */
router.post('/', authenticateToken, applicationController.createJobApplication);


/**
 * @swagger
 * /api/applications/user:
 *   get:
 *     tags: [Applications]
 *     summary: Get all applications by user ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Applications fetched successfully
 *       400:
 *         description: Error message
 */
router.get('/user', authenticateToken, applicationController.getApplicationsByUserId);

/**
 * @swagger
 * /api/applications/{applicationId}:
 *   get:
 *     tags: [Applications]
 *     summary: Get application by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Application fetched successfully
 *       400:
 *         description: Error message
 */
router.get('/:applicationId', authenticateToken, applicationController.getApplicationById);


/**
 * @swagger
 * /api/applications/job/{jobId}:
 *   get:
 *     tags: [Applications]
 *     summary: Get all applications by job ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Applications fetched successfully
 *       400:
 *         description: Error message
 */
router.get('/job/:jobId', authenticateToken, applicationController.getApplicationsByJobId);

/**
 * @swagger
 * /api/applications/{applicationId}/status:
 *   put:
 *     tags: [Applications]
 *     summary: Update the status of an application
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newStatus:
 *                 type: string
 *               comments:
 *                 type: string
 *               changedBy:
 *                 type: string
 *             required:
 *               - newStatus
 *               - changedBy
 *     responses:
 *       200:
 *         description: Application status updated successfully
 *       400:
 *         description: Error message
 */
router.put('/:applicationId/status', authenticateToken, applicationController.updateApplicationStatus);

/**
 * @swagger
 * /api/applications/{applicationId}/reviewer:
 *   put:
 *     tags: [Applications]
 *     summary: Assign a reviewer to an application
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewerId:
 *                 type: string
 *             required:
 *               - reviewerId
 *     responses:
 *       200:
 *         description: Reviewer assigned successfully
 *       400:
 *         description: Error message
 */
router.put('/:applicationId/reviewer', authenticateToken, applicationController.assignReviewerToApplication);

/**
 * @swagger
 * /api/applications/{applicationId}/interview:
 *   put:
 *     tags: [Applications]
 *     summary: Add an interview to an application
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               interviewDetails:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                   time:
 *                     type: string
 *                   location:
 *                     type: string
 *                   notes:
 *                     type: string
 *             required:
 *               - date
 *               - time
 *               - location
 *     responses:
 *       200:
 *         description: Interview added successfully
 *       400:
 *         description: Error message
 */
router.put('/:applicationId/interview', authenticateToken, applicationController.addInterviewToApplication);

/**
 * @swagger
 * /api/applications/{applicationId}/assessment:
 *   put:
 *     tags: [Applications]
 *     summary: Add an assessment result to an application
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assessmentResult:
 *                 type: object
 *                 properties:
 *                   score:
 *                     type: number
 *                   feedback:
 *                     type: string
 *             required:
 *               - score
 *               - feedback
 *     responses:
 *       200:
 *         description: Assessment result added successfully
 *       400:
 *         description: Error message
 */
router.put('/:applicationId/assessment', authenticateToken, applicationController.addAssessmentToApplication);

export default router;
