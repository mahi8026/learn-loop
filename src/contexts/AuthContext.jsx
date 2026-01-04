import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";

// 1. Create Context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // Register
  const register = async (name, email, password, photo) => {
  setLoading(true);
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, {
      displayName: name,
      photoURL: photo,
    });
    const userData = {
      name: name,
      email: email,
      photo: photo,
      role: "student",
      status: "active"
    };
    await axios.put("https://learnloop-server.vercel.app/api/users", userData);

    return result;
  } finally {
    setLoading(false);
  }
};

  // Login
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      localStorage.removeItem("access-token"); 
      return await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  // Update Profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
    
    if (currentUser?.email) {
      const userInfo = { email: currentUser.email };
      
      // CHANGE: Added "/api" to the URL to match your backend router
      axios.post("https://learnloop-server.vercel.app/api/jwt", userInfo)
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        })
        .catch(err => {
          console.error("JWT Error:", err);
          setLoading(false);
        });
        
      // Also sync user role for the UI
      try {
        const res = await axios.get(`https://learnloop-server.vercel.app/api/users/role/${currentUser.email}`);
        setDbUser(res.data);
      } catch (err) {
        console.error("Role fetch error:", err);
      }
      
    } else {
      localStorage.removeItem("access-token");
      setDbUser(null);
      setLoading(false);
    }
  });
  return () => unsubscribe();
}, []);

  const authInfo = {
    user,
    dbUser,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

// 2. Export Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
