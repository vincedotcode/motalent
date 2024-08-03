import { messaging } from '../config/firebase.js';
import Token from '../models/Token.js';
import { Mutex } from 'async-mutex';
import dotenv from 'dotenv';

dotenv.config();
const mutex = new Mutex();

const sendNotification = async (token, title, body) => {
  const message = {
    notification: {
      title,
      body,
    },
    token,
    data: {
        link:  'https://motalentmu.vercel.app/', // Default link if not provided
      },
    webpush: {
      headers: {
        Authorization: `Bearer ${process.env.FIREBASE_VAPID_PRIVATE_KEY}`,
      },
    },
  };

  try {
    const response = await messaging.send(message);
    console.log('Successfully sent message:', response);
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Error sending notification');
  }
};

const saveToken = async (token) => {
  return mutex.runExclusive(async () => {
    try {
      // Try to find the token first
      const existingToken = await Token.findOne({ token });
      if (existingToken) {
        return existingToken; // If the token already exists, return it
      }

      // If not found, create a new token entry
      const newToken = new Token({ token });
      await newToken.save();
      return newToken;
    } catch (error) {
      // Handle duplication error specifically
      if (error.code === 11000) {
        throw new Error('Token already exists');
      }
      console.error('Error saving token:', error);
      throw new Error('Error saving token');
    }
  });
};

const sendNotificationToAll = async (title, body) => {
  try {
    const tokens = await Token.find({});
    const promises = tokens.map(token => sendNotification(token.token, title, body));
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Error sending notifications to all tokens:', error);
    throw new Error('Error sending notifications to all tokens');
  }
};

export default {
  sendNotification,
  saveToken,
  sendNotificationToAll,
};
