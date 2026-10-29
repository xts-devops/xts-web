import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getStorage, Storage } from "firebase-admin/storage";
import { isLocalPreview } from "@/lib/local-preview";
import { localDb, localStorage } from "./local-db";

let adminApp: App | undefined;
let adminDb: Firestore;
let adminStorage: Storage;

if (isLocalPreview()) {
  // Sample data on localhost, no Firebase credentials (see lib/firebase/local-db.ts).
  adminDb = localDb as unknown as Firestore;
  adminStorage = localStorage as unknown as Storage;
} else {
  const serviceAccount = {
    project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    client_email: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  if (!getApps().length) {
    adminApp = initializeApp({
      credential: cert(serviceAccount as any),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } else {
    adminApp = getApps()[0];
  }

  adminDb = getFirestore(adminApp);
  // Firestore rejects undefined values by default. Opt-in to silently dropping
  // them so optional fields (productRef, pickupRef, pickupPointId, etc.) don't
  // blow up .add()/.set() calls when left off a payload. settings() must run
  // before the first read/write, and can only be called once per instance — the
  // try/catch keeps hot-reload re-imports from throwing.
  try {
    adminDb.settings({ ignoreUndefinedProperties: true });
  } catch {}
  adminStorage = getStorage(adminApp);
}

export { adminApp, adminDb, adminStorage };
