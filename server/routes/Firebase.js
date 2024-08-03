// routes/notificationRoutes.js
import express from 'express';
import notificationController from '../controllers/Firebase.js';
import authenticateToken from '../middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification related endpoints
 */

/**
 * @swagger
 * /api/notifications/send:
 *   post:
 *     tags: [Notifications]
 *     summary: Send a push notification
 *     description: Allows sending a push notification to a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification sent successfully
 *       500:
 *         description: Error sending notification
 */
router.post('/send', authenticateToken, notificationController.sendNotification);

/**
 * @swagger
 * /api/notifications/token:
 *   post:
 *     tags: [Notifications]
 *     summary: Save a new FCM token
 *     description: Receives and saves a new FCM token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The FCM token to be saved
 *                 example: "some_fcm_token"
 *     responses:
 *       201:
 *         description: Token saved successfully
 *       400:
 *         description: Token is required
 *       500:
 *         description: Internal server error
 */
router.post('/tokens', notificationController.saveToken);


/**
 * @swagger
 * /api/notifications/sendall:
 *   post:
 *     tags: [Notifications]
 *     summary: Send notification to all tokens
 *     description: Sends a notification to all saved FCM tokens.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the notification
 *                 example: "New Feature Available"
 *               body:
 *                 type: string
 *                 description: The body content of the notification
 *                 example: "Check out the new feature we just launched!"
 *     responses:
 *       200:
 *         description: Notifications sent successfully
 *       400:
 *         description: Title and body are required
 *       500:
 *         description: Internal server error
 */
router.post('/sendall', notificationController.sendNotificationToAll);



export default router;
