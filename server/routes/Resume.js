import express from 'express';
import resumeController from '../controllers/Resume.js';
import authenticateToken from '../middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Resumes
 *   description: Resume management related endpoints
 */

/**
 * @swagger
 * /api/resumes/{userId}/resume:
 *   post:
 *     tags: [Resumes]
 *     summary: Create a new resume
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
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
 *               template:
 *                 type: string
 *               personalInfo:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                   email:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   addressLine1:
 *                     type: string
 *                   addressLine2:
 *                     type: string
 *                   country:
 *                     type: string
 *               education:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     institution:
 *                       type: string
 *                     degree:
 *                       type: string
 *                     fieldOfStudy:
 *                       type: string
 *                     startDate:
 *                       type: string
 *                       format: date
 *                     endDate:
 *                       type: string
 *                       format: date
 *                     grade:
 *                       type: string
 *               experience:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     jobTitle:
 *                       type: string
 *                     companyName:
 *                       type: string
 *                     startDate:
 *                       type: string
 *                       format: date
 *                     endDate:
 *                       type: string
 *                       format: date
 *                     responsibilities:
 *                       type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               languages:
 *                 type: array
 *                 items:
 *                   type: string
 *               hobbies:
 *                 type: array
 *                 items:
 *                   type: string
 *               customSections:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *               websites:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     url:
 *                       type: string
 *                       format: uri
 *               completionPercentage:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *     responses:
 *       201:
 *         description: Resume created successfully
 *       400:
 *         description: Error message
 */
router.post('/:userId/resume', authenticateToken, resumeController.createResume);

/**
 * @swagger
 * /api/resumes/{userId}/resumes:
 *   get:
 *     tags: [Resumes]
 *     summary: Get all resumes by user ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resumes fetched successfully
 *       400:
 *         description: Error message
 */
router.get('/:userId/resumes', authenticateToken, resumeController.getAllResumesByUserId);

/**
 * @swagger
 * /api/resumes/{resumeId}:
 *   get:
 *     tags: [Resumes]
 *     summary: Get a resume by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resumeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resume fetched successfully
 *       400:
 *         description: Error message
 */
router.get('/:resumeId', authenticateToken, resumeController.getResumeById);

/**
 * @swagger
 * /api/resumes/{resumeId}:
 *   put:
 *     tags: [Resumes]
 *     summary: Update a resume
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resumeId
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
 *               template:
 *                 type: string
 *               personalInfo:
 *                 type: object
 *               education:
 *                 type: array
 *               experience:
 *                 type: array
 *               skills:
 *                 type: array
 *               languages:
 *                 type: array
 *               hobbies:
 *                 type: array
 *               customSections:
 *                 type: array
 *               websites:
 *                 type: array
 *               completionPercentage:
 *                 type: number
 *     responses:
 *       200:
 *         description: Resume updated successfully
 *       400:
 *         description: Error message
 */
router.put('/:resumeId', authenticateToken, resumeController.updateResume);

/**
 * @swagger
 * /api/resumes/{resumeId}:
 *   delete:
 *     tags: [Resumes]
 *     summary: Delete a resume
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resumeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resume deleted successfully
 *       400:
 *         description: Error message
 */
router.delete('/:resumeId', authenticateToken, resumeController.deleteResume);

/**
 * @swagger
 * /api/resumes/{resumeId}/section:
 *   put:
 *     tags: [Resumes]
 *     summary: Add a section to a resume
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resumeId
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
 *               sectionName:
 *                 type: string
 *               sectionData:
 *                 type: object
 *     responses:
 *       200:
 *         description: Section added successfully
 *       400:
 *         description: Error message
 */
router.put('/:resumeId/section', authenticateToken, resumeController.addSectionToResume);

/**
 * @swagger
 * /api/resumes/{resumeId}/section:
 *   delete:
 *     tags: [Resumes]
 *     summary: Delete a section from a resume
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resumeId
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
 *               sectionName:
 *                 type: string
 *               sectionId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Section deleted successfully
 *       400:
 *         description: Error message
 */
router.delete('/:resumeId/section', authenticateToken, resumeController.deleteSectionFromResume);

export default router;
