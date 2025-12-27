"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { db } from "@/app/firebase/firebse";
import { collection, query, onSnapshot } from "firebase/firestore";

export const AddFriendContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FRIENDS":
      return action.payload;
    default:
      return state;
  }
};
const AddFriendProvider = ({ children }) => {
  const initialState = [];
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    const q = query(collection(db, "SignupUsers"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsList = [];
      querySnapshot.forEach((doc) => {
        postsList.push({ id: doc.id, ...doc.data() });
      });
      dispatch({ type: "SET_FRIENDS", payload: postsList });
    });

    return () => unsubscribe(); // cleanup
  }, []);

  return (
    <AddFriendContext.Provider value={{ state, dispatch }}>
      {children}
    </AddFriendContext.Provider>
  );
};

export const useAddFriendFuc = () => {
  return useContext(AddFriendContext);
};

export default AddFriendProvider;
