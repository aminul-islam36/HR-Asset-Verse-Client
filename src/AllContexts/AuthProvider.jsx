import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/fitebase.config";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // user Register login logOut Function

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (updateProfileId) => {
    return updateProfile(auth.currentUser, updateProfileId);
  };
  const logOutUser = () => {
    localStorage.removeItem("token");
    return signOut(auth);
  };

  // User state Observer

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const email = { email: currentUser?.email };
        const res = await axios.post("http://localhost:5000/jwt", email);

        localStorage.setItem("token", res.data.token);
      }
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authInfo = {
    registerUser,
    loginUser,
    updateUserProfile,
    logOutUser,
    user,
    isLoading,
    setIsLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
