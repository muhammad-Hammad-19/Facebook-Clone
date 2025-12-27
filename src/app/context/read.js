"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
import { useAddFriendFuc } from "./addFriend";
import { getAuth } from "firebase/auth";

export const ReadContextFuc = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "READ_DATA":
      return action.payload;
    default:
      return state;
  }
};
const ReadProvider = ({ children }) => {
  const initialState = [];
  const [state, dispatch] = useReducer(reducer, initialState); // <-- move BEFORE useEffect

  const { state: main } = useAddFriendFuc();

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user || !main || main.length === 0) return;

    const filer = main.filter((u) => u.UserId === user.uid);

    const [fill = { comments: [], likes: [], usersFriend: [] }] = filer;
    const { comments, likes, usersFriend } = fill;
    if (!fill) return;

    const filterComments = comments.filter((c) => c.userId !== user.uid);
    const filterLike = likes.filter((l) => l.userId !== user.uid);
    const filterUserFriend = usersFriend.filter(
      (u) => u.receiverId === user.uid
    );

    const show_Length_Notification = [
      filterComments,
      filterLike,
      filterUserFriend,
    ];

    dispatch({ type: "READ_DATA", payload: show_Length_Notification });
  }, [main, user]);

  return (
    <ReadContextFuc.Provider value={{ state, dispatch }}>
      {children}
    </ReadContextFuc.Provider>
  );
};

export const useReadFuc = () => useContext(ReadContextFuc);

export default ReadProvider;
