// src/firebase.ts
import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// cast to any so .extra is available
const manifestAny = Constants.manifest as any;
const extras = manifestAny?.extra ?? (Constants.expoConfig as any)?.extra ?? {};

const {
  firebaseApiKey,
  firebaseProjectId,
  firebaseMessagingSenderId: messagingSenderId, // ← alias here
  firebaseAppId,
} = extras as {
  firebaseApiKey?: string;
  firebaseProjectId?: string;
  firebaseMessagingSenderId?: string;
  firebaseAppId?: string;
};

if (!firebaseApiKey || !firebaseProjectId || !firebaseAppId) {
  console.warn(
    "⚠️ One or more Firebase config values are missing from expoConfig.extra"
  );
}

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: `${firebaseProjectId}.firebaseapp.com`,
  projectId: firebaseProjectId,
  storageBucket: `${firebaseProjectId}.appspot.com`,
  appId: firebaseAppId,
  // now messagingSenderId is defined because of the alias above
  messagingSenderId,
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const realtimeDb = getDatabase(app);
