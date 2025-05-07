import { initializeApp } from "firebase/app";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.manifest.extra.firebaseApiKey,
  authDomain: `${Constants.manifest.extra.firebaseProjectId}.firebaseapp.com`,
  projectId: Constants.manifest.extra.firebaseProjectId,
  storageBucket: `${Constants.manifest.extra.firebaseProjectId}.appspot.com`,
  messagingSenderId: Constants.manifest.extra.firebaseMessagingSenderId,
  appId: Constants.manifest.extra.firebaseAppId,
};

export const firebaseApp = initializeApp(firebaseConfig);
