import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

let serviceAccount;

if (process.env.NODE_ENV === 'production') {
  serviceAccount = require('/etc/secrets/servicekey.json');
} else {
  serviceAccount = require(process.env.FIREBASE_SERVICE_KEY_PATH);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();

export { messaging };
