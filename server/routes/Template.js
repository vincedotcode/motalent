import express from 'express';
import templateController from '../controllers/Template.js';
import authenticateToken from '../middleware.js';

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Templates
 *   description: Template management related endpoints
 */

/**
 * @swagger
 * /api/templates:
 *   post:
 *     tags: [Templates]
 *     summary: Create a new template
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the template
 *                 example: "Professional Resume"
 *               description:
 *                 type: string
 *                 description: Description of the template
 *                 example: "A clean and professional resume template."
 *               thumbnail:
 *                 type: string
 *                 description: URL to the thumbnail image of the template
 *                 example: "https://example.com/thumbnail.png"
 *               templateFile:
 *                 type: string
 *                 description: URL to the template file
 *                 example: "https://example.com/template.docx"
 *               isDefault:
 *                 type: boolean
 *                 description: Whether this template is a default template
 *                 example: false
 *     responses:
 *       201:
 *         description: Template created successfully
 *       400:
 *         description: Error message
 */
router.post('/', authenticateToken, templateController.createTemplate);


/**
 * @swagger
 * /api/templates:
 *   get:
 *     tags: [Templates]
 *     summary: Get all templates
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Templates fetched successfully
 *       400:
 *         description: Error message
 */
router.get('/', authenticateToken, templateController.getAllTemplates);

/**
 * @swagger
 * /api/templates/{id}:
 *   get:
 *     tags: [Templates]
 *     summary: Get a template by ID
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
 *         description: Template fetched successfully
 *       400:
 *         description: Error message
 */
router.get('/:id', authenticateToken, templateController.getTemplateById);

/**
 * @swagger
 * /api/templates/{id}:
 *   put:
 *     tags: [Templates]
 *     summary: Update a template
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the template to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the template
 *                 example: "Professional Resume"
 *               description:
 *                 type: string
 *                 description: Description of the template
 *                 example: "A clean and professional resume template."
 *               thumbnail:
 *                 type: string
 *                 description: URL to the thumbnail image of the template
 *                 example: "https://example.com/thumbnail.png"
 *               templateFile:
 *                 type: string
 *                 description: URL to the template file
 *                 example: "https://example.com/template.docx"
 *               isDefault:
 *                 type: boolean
 *                 description: Whether this template is a default template
 *                 example: false
 *     responses:
 *       200:
 *         description: Template updated successfully
 *       400:
 *         description: Error message
 */
router.put('/:id', authenticateToken, templateController.updateTemplate);

/**
 * @swagger
 * /api/templates/{id}:
 *   delete:
 *     tags: [Templates]
 *     summary: Delete a template
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
 *         description: Template deleted successfully
 *       400:
 *         description: Error message
 */
router.delete('/:id', authenticateToken, templateController.deleteTemplate);

export default router;
