import express from 'express';
import jobController from '../controllers/Job.js';
import authenticateToken from '../middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management related endpoints
 */


/**
 * @swagger
 * /api/jobs:
 *   post:
 *     tags: [Jobs]
 *     summary: Create a new job
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               company:
 *                 type: string
 *               category:
 *                 type: string
 *               location:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [Full-time, Part-time, Contract, Temporary, Internship]
 *               closingDate:
 *                 type: string
 *               offeredSalary:
 *                 type: string
 *               experienceLevel:
 *                 type: string
 *                 enum: [Junior, Middle, Senior]
 *               experience:
 *                 type: string
 *               remoteWorkOption:
 *                 type: boolean
 *               expatriateEligibility:
 *                 type: boolean
 *               keyResponsibilities:
 *                 type: string
 *               hardSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *               softSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *               goalsAndPerformanceMetrics:
 *                 type: string
 *               managementStyle:
 *                 type: string
 *               careerProgression:
 *                 type: string
 *               benefitsAndCulture:
 *                 type: string
 *               candidateSelectionCriteria:
 *                 type: string
 *               workCondition:
 *                 type: string
 *               workArrangement:
 *                 type: string
 *                 enum: [On-site, Remote, Hybrid]
 *               industry:
 *                 type: string
 *                 enum: [
 *                   'Accountancy, banking and finance',
 *                   'Business, consulting and management',
 *                   'Charity and voluntary work',
 *                   'Creative arts and design',
 *                   'Energy and utilities',
 *                   'Engineering and manufacturing',
 *                   'Environment and agriculture',
 *                   'Healthcare',
 *                   'Hospitality and events management',
 *                   'Information technology',
 *                   'Law',
 *                   'Law enforcement and security',
 *                   'Leisure, sport and tourism',
 *                   'Marketing, advertising and PR',
 *                   'Media and internet',
 *                   'Property and construction',
 *                   'Public services and administration',
 *                   'Recruitment and HR',
 *                   'Retail',
 *                   'Sales',
 *                   'Science and pharmaceuticals',
 *                   'Social care',
 *                   'Teacher training and education',
 *                   'Transport and logistics'
 *                 ]
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Error message
 */

router.post('/', authenticateToken, jobController.createJob);


/**
 * @swagger
 * /api/jobs:
 *   get:
 *     tags: [Jobs]
 *     summary: Get all jobs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Jobs fetched successfully
 *       400:
 *         description: Error message
 */
router.get('/', authenticateToken, jobController.getAllJobs);

/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     tags: [Jobs]
 *     summary: Get a job by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job fetched successfully
 *       400:
 *         description: Error message
 */
router.get('/:id', authenticateToken, jobController.getJobById);

/**
 * @swagger
 * /api/jobs/{id}/view:
 *   post:
 *     tags: [Jobs]
 *     summary: View a job
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job viewed successfully
 *       400:
 *         description: Error message
 */
router.post('/:id/view', authenticateToken, jobController.viewJob);

/**
 * @swagger
 * /api/jobs/{id}/apply:
 *   post:
 *     tags: [Jobs]
 *     summary: Apply for a job
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Application successful
 *       400:
 *         description: Error message
 */
router.post('/:id/apply', authenticateToken, jobController.applyForJob);

/**
 * @swagger
 * /api/jobs/companies/{companyId}/jobs:
 *   get:
 *     tags: [Jobs]
 *     summary: Get jobs by company ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jobs fetched successfully
 *       400:
 *         description: Error message
 */
router.get('/companies/:companyId/jobs', authenticateToken, jobController.getJobsByCompanyId);

/**
 * @swagger
 * /api/jobs/{id}/status:
 *   put:
 *     tags: [Jobs]
 *     summary: Update job status
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               status:
 *                 type: string
 *                 enum: [Active, Ending Soon, Closed]
 *     responses:
 *       200:
 *         description: Job status updated successfully
 *       400:
 *         description: Error message
 */
router.put('/:id/status', authenticateToken, jobController.updateJobStatus);

/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     tags: [Jobs]
 *     summary: Delete a job
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       400:
 *         description: Error message
 */
router.delete('/:id', authenticateToken, jobController.deleteJob);

export default router;
