// contactRoutes.ts
import express from 'express';
import sendContactEmail from '../services/Contact.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact form management endpoints
 */

/**
 * @swagger
 * /api/contact:
 *   post:
 *     tags: [Contact]
 *     summary: Send a contact form submission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Internal Server Error
 */
router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const result = await sendContactEmail({ name, email, subject, message });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

export default router;
