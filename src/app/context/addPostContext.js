"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { db } from "@/app/firebase/firebse";
import { collection, query, onSnapshot } from "firebase/firestore";

export const AddPostContext = createContext(null);

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "ADDPOST":
      return { ...state, post: [...state.post, action.payload] };
    case "SET_POSTS":
      return { ...state, post: action.payload };
    default:
      return state;
  }
};
// Provider component
const AddPostProvider = ({ children }) => {
  const initialState = { post: [] };

  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch posts from Firebase
  useEffect(() => {
    const getPosts = async () => {
      const q = query(collection(db, "PostUserId"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const postsList = [];
        querySnapshot.forEach((doc) => {
          postsList.push({ id: doc.id, ...doc.data() });
        });
        dispatch({ type: "SET_POSTS", payload: postsList });
      });
      return () => unsubscribe();
    };
    getPosts();
  }, []);

  return (
    <AddPostContext value={{ state, dispatch }}>{children}</AddPostContext>
  );
};

export const useAddPost = () => useContext(AddPostContext);

export default AddPostProvider;
