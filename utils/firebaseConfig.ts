// src/firebase.ts
import Constants from "expo-constants";
import { getApp, getApps, initializeApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";
import { Firestore, getFirestore } from "firebase/firestore";

// cast to any so .extra is available
const manifestAny = Constants.manifest as any;
const extras = manifestAny?.extra ?? (Constants.expoConfig as any)?.extra ?? {};

console.log("📱 Expo Constants:", Constants);
console.log("🔑 Firebase Config Extras:", extras);

const {
  firebaseApiKey,
  firebaseProjectId,
  firebaseMessagingSenderId: messagingSenderId,
  firebaseAppId,
  firebaseDatabaseURL,
} = extras as {
  firebaseApiKey?: string;
  firebaseProjectId?: string;
  firebaseMessagingSenderId?: string;
  firebaseAppId?: string;
  firebaseDatabaseURL?: string;
};

if (
  !firebaseApiKey ||
  !firebaseProjectId ||
  !firebaseAppId ||
  !firebaseDatabaseURL
) {
  console.error("❌ Firebase config values missing:", {
    hasApiKey: !!firebaseApiKey,
    hasProjectId: !!firebaseProjectId,
    hasAppId: !!firebaseAppId,
    hasDatabaseURL: !!firebaseDatabaseURL,
  });
}

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: `${firebaseProjectId}.firebaseapp.com`,
  projectId: firebaseProjectId,
  databaseURL: firebaseDatabaseURL,
  storageBucket: `${firebaseProjectId}.appspot.com`,
  appId: firebaseAppId,
  messagingSenderId,
};

console.log("🔥 Initializing Firebase with config:", firebaseConfig);

let app;
let firestore: Firestore;
let realtimeDb: Database;

try {
  // Check if Firebase is already initialized
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    console.log("✅ Firebase initialized successfully");
  } else {
    app = getApp();
    console.log("✅ Using existing Firebase app");
  }

  firestore = getFirestore(app);
  realtimeDb = getDatabase(app);
} catch (error) {
  console.error("❌ Failed to initialize Firebase:", error);
  throw error;
}

export { firestore, realtimeDb };
