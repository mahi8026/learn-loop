import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null); // Stores MongoDB User data (role, status)
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // 1. Google Login
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // 2. Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        const userInfo = {
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL,
        };

        try {
          // Sync user with MongoDB (Upsert)
          await axios.put(`${import.meta.env.VITE_API_URL}/users`, userInfo);
          
          // Fetch the full user object (with role) from MongoDB
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/${currentUser.email}`);
          setDbUser(res.data);
        } catch (err) {
          console.error("Error syncing user to DB:", err);
        }
      } else {
        setDbUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    dbUser, // Use this for role-based logic (dbUser.role)
    loading,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);