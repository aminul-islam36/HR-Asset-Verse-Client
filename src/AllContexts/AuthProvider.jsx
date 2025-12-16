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
import PageLoader from "../Components/PageLoader";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  // user Register login logOut Function

  const registerUser = (email, password) => {
    setisLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setisLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (updateProfileId) => {
    return updateProfile(auth.currentUser, updateProfileId);
  };
  const logOutUser = () => {
    setisLoading(true);
    return signOut(auth);
  };

  // User state Observer

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setisLoading(false);
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
    setUser,
    isLoading,
    setisLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
