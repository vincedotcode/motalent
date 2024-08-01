import express from 'express';
import authController from '../controllers/Auth.js';
import authenticateToken from '../middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication related endpoints
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     description: Can register a new user with a first name, last name, email, password, phone number, address line 1, address line 2, date of birth, country, and role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               addressLine1:
 *                 type: string
 *               addressLine2:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               country:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin, super admin, recruiter, tenant]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Error message
 */
router.post('/signup', authController.registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Login a user
 *     description: Log in with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid email or password
 */
router.post('/login', authController.loginUser);

/**
 * @swagger
 * /api/auth/user/{id}:
 *   get:
 *     tags: [Authentication]
 *     summary: Get user by ID
 *     description: Get user information by user ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       400:
 *         description: Error message
 */
router.get('/user/:id', authenticateToken, authController.getUserById);


/**
 * @swagger
 * /api/auth/verify-email:
 *   get:
 *     tags: [Authentication]
 *     summary: Verify a user's email
 *     description: Verify the user's email using a token sent to their email address.
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Verification token
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired token
 */
router.get('/verify-email', authController.verifyEmail);


/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     tags: [Authentication]
 *     summary: Request a password reset
 *     description: Sends a password reset email to the user's email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset password email sent successfully
 *       400:
 *         description: Error message
 */
router.post('/forgot-password', authController.forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     tags: [Authentication]
 *     summary: Reset the user's password
 *     description: Resets the user's password using the token sent to their email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Error message
 */
router.post('/reset-password', authController.resetPassword);


export default router;
