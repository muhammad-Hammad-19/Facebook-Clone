"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase/firebse";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import Navbar from "@/app/components/Navbar";
import { useAddFriendFuc } from "@/app/context/addFriend";
import { filter_User_For_Notification } from "../../../../../utils";

export default function NotificationPage() {
  const { state } = useAddFriendFuc();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading user...
      </div>
    );
  }
  const change = filter_User_For_Notification(state, user.uid);

  const [Post = { comments: [], likes: [], usersFriend: [] }] = change;
  const { comments, likes, usersFriend } = Post;

  const washingtonRef = doc(db, "SignupUsers", user.uid);
  const markCommentRead = async (isReadComment) => {
    try {
      if (!comments.length) return console.log("No comments found");

      const updatedComments = comments.map((item) =>
        item.comment === isReadComment ? { ...item, read: true } : item
      );

      await updateDoc(washingtonRef, { comments: updatedComments });
    } catch (error) {
      console.log("Error updating comments:", error);
    }
  };
  const markLikeRead = async (isReadlikes) => {
    try {
      if (!likes.length) return console.log("No likes found");

      const updatedLikes = likes.map((item) =>
        item.checkMassage === isReadlikes ? { ...item, read: true } : item
      );

      await updateDoc(washingtonRef, { likes: updatedLikes });
    } catch (error) {
      console.log("Error updating likes:", error);
    }
  };
  const markFriendRequestRead = async (isReadReq) => {
    try {
      if (!usersFriend.length) return console.log("No friend requests found");

      const updatedFriends = usersFriend.map((item) =>
        item.receiverId === isReadReq ? { ...item, read: true } : item
      );

      await updateDoc(washingtonRef, { usersFriend: updatedFriends });
    } catch (error) {
      console.log("Error updating friend requests:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gray-100 p-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-4">Notifications</h1>

        {/* Container */}
        <div className="space-y-6">
          {/* -------- COMMENTS -------- */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3">Comments</h2>

            {comments.length === 0 && (
              <p className="p-2 bg-gray-100 text-sm rounded">No comments</p>
            )}

            {comments
              .filter((c) => c.userId !== user.uid)
              .map((c, index) => {
                const isUnread = c.read === false;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    {isUnread && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}

                    <img
                      className="w-12 h-12 rounded-full"
                      src="https://via.placeholder.com/50"
                    />

                    <div
                      onClick={() => markCommentRead(c.comment)}
                      className="flex-1"
                    >
                      <p className="text-sm font-bold">
                        <span className="font-semibold">
                          {c?.userNameComment || c?.userId}
                        </span>{" "}
                        {c.comment}
                      </p>
                      <p className="text-xs text-gray-500">10 minutes ago</p>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* -------- LIKES -------- */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3">Likes</h2>

            {likes.length === 0 && (
              <p className="p-2 bg-gray-100 text-sm rounded">No likes</p>
            )}

            {likes
              .filter((l) => l.userId !== user.uid)
              .map((l, index) => {
                const isUnread = l.read !== true;
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer
              ${isUnread ? "bg-blue-50" : "bg-white"}
              hover:bg-gray-50`}
                  >
                    {isUnread && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}

                    <img
                      className="w-12 h-12 rounded-full"
                      src="https://via.placeholder.com/50"
                    />

                    <div
                      onClick={() => markLikeRead(l.checkMassage)}
                      className="flex-1"
                    >
                      <p className={`text-sm ${isUnread ? "font-bold" : ""}`}>
                        <span className="font-semibold">
                          {l?.userNameLike || l?.userId}
                        </span>{" "}
                        liked your post
                      </p>
                      <p className="text-xs text-gray-500">10 minutes ago</p>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* -------- FRIEND REQUESTS -------- */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3">Friend Requests</h2>

            {usersFriend.length === 0 && (
              <p className="p-2 bg-gray-100 text-sm rounded">
                No friend requests
              </p>
            )}

            {usersFriend
              .filter((u) => u?.receiverId === user.uid)
              .map((u) => {
                const isUnread = u?.read === false;

                return (
                  <div
                    key={u.senderId}
                    onClick={() => markFriendRequestRead(u.receiverId)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer
                       ${isUnread ? "bg-blue-50" : "bg-white"}
                       hover:bg-gray-50`}
                  >
                    {isUnread && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}

                    <img
                      className="w-12 h-12 rounded-full"
                      src="https://via.placeholder.com/50"
                      alt="profile"
                    />

                    <div>
                      <p
                        className={`text-sm ${
                          isUnread ? "font-bold" : "font-semibold"
                        }`}
                      >
                        {u?.Username}
                      </p>
                      <p className="text-xs text-gray-600">
                        sent you a friend request
                      </p>
                      <p className="text-[10px] text-gray-400">5 minutes ago</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
