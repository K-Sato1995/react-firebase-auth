import React, { useEffect, useState } from "react";
import { app, checkUser } from "../base.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (email, password, history) => {
    try {
      const result = await checkUser({ email: email });

      if (result.data.isTrusted) {
        await app.auth().signInWithEmailAndPassword(email, password);
        history.push("/");
      } else {
        alert("YOU ARE NOT A TRUSTED USER");
      }
    } catch (error) {
      alert(error);
    }
  };

  const signup = async (email, password, history) => {
    try {
      await app.auth().createUserWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login: login,
        signup: signup,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
