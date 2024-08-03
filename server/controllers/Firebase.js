// controllers/notificationController.js
import notificationService from '../services/Firebase.js';

const sendNotification = async (req, res) => {
  const { token, title, body } = req.body;

  try {
    const response = await notificationService.sendNotification(token, title, body);
    res.status(200).send('Notification sent successfully');
  } catch (error) {
    res.status(500).send('Error sending notification');
  }
};
export const saveToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
      return res.status(400).json({ message: 'Token is required' });
  }

  try {
      const savedToken = await notificationService.saveToken(token);
      return res.status(201).json(savedToken);
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};

export const sendNotificationToAll = async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ message: 'Title and body are required' });
  }

  try {
    const results = await notificationService.sendNotificationToAll(title, body);
    return res.status(200).json({ message: 'Notifications sent successfully', results });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export default {
  sendNotification,
  saveToken,
  sendNotificationToAll,
};
