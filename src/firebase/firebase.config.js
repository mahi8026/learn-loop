import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_apiKey,
  authDomain:import.meta.env.VITE_authDomain,
  projectId:import.meta.env.VITE_projectId,
  storageBucket:import.meta.env.VITE_storageBucket,
  messagingSenderId:import.meta.env.VITE_messagingSenderId,
  appId:import.meta.env.VITE_appId,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Create Auth instance and Google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Default export (optional, for other uses)
export default app;