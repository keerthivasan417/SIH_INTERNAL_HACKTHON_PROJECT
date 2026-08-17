import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get path to service account json
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH 
  ? path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH)
  : path.join(__dirname, '../../firebase-key.json');

let db;
let app;

try {
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    app = initializeApp({
      credential: cert(serviceAccount)
    });
    db = getFirestore();
    console.log('[Firebase Admin SDK] Initialized successfully with project:', serviceAccount.project_id);
  } else {
    console.warn(`[Firebase Admin SDK] Warning: Service account file not found at ${serviceAccountPath}`);
  }
} catch (error) {
  console.error('[Firebase Admin SDK] Initialization failed:', error);
}

export { app, db };
