import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

let serviceAccount;

if (process.env.NODE_ENV === 'production') {
  const { readFileSync } = await import('fs');
  const { join } = await import('path');
  serviceAccount = JSON.parse(readFileSync('/etc/secrets/servicekey.json', 'utf8'));
} else {
  const { readFileSync } = await import('fs');
  serviceAccount = JSON.parse(readFileSync(process.env.FIREBASE_SERVICE_KEY_PATH, 'utf8'));
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();

export { messaging };
