"use client";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const UserContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_USER":
      return action.payload;
    default:
      return state;
  }
};

const CurrentUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({
        type: "GET_USER",
        payload: user ? user.uid : null,
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useCurrUserFuc = () => {
  return useContext(UserContext);
};

export default CurrentUserProvider;
