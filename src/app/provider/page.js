"use client";
import AddPostProvider from "../context/addPostContext";
import AddFriendProvider from "../context/addFriend";
import ReadProvider from "../context/read";
import CurrentUserProvider from "../context/currentUserContext";

const Providers = ({ children }) => {
  return (
    <AddPostProvider>
      <AddFriendProvider>
        <ReadProvider>
          <CurrentUserProvider>{children}</CurrentUserProvider>
        </ReadProvider>
      </AddFriendProvider>
    </AddPostProvider>
  );
};

export default Providers;
