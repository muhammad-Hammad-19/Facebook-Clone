"use client";
import Navbar from "@/app/components/Navbar";
import { useAddFriendFuc } from "@/app/context/addFriend";
import { filter } from "../../../../../utils";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { db } from "@/app/firebase/firebse";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
export default function AddFriendPageUI() {
  const { state: allUsersState } = useAddFriendFuc();
  
  const [currentUser, setCurrentUser] = useState(null);

  const [currentUsersName, setcurrentUsersName] = useState(null);

  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user.uid);
      const onlyName = user?.email.split("@")[0];
      const cleanName = onlyName?.replace(/[0-9]/g, "");
      setcurrentUsersName(cleanName);
    });
    return () => unsubscribe();
  }, []);

  const friend_Request_Send = async (
    usersFriend,
    UserId,
    Username,
    nameRecever
  ) => {
    console.log("currentUser:", usersFriend);
    console.log("UserId:", UserId);
    console.log("Username:", Username);

    if (!usersFriend || !UserId || !Username) {
      console.error("One of the required values is undefined!");
      return;
    }

    if (!currentUser) return;
    const exists = usersFriend.some(
      (req) => req.senderId === currentUser && req.receiverId === UserId
    );

    if (exists) {
      console.log("Request already sent!");
    } else {
      const friendRequest = {
        senderId: currentUser, // hammad (sender)
        receiverId: UserId, // hassan (receiver)
        Username: Username,
        role: "sender",
        read: false,
        accept: false,
        receverName: nameRecever,
      };

      const receiverFriendRequest = {
        senderId: currentUser, // original sender — hammad
        receiverId: UserId, // receiver — hassan
        Username: Username,
        role: "receiver",
        read: false,
        accept: false,
        receverName: nameRecever,
      };

      try {
        const receiverRef = doc(db, "SignupUsers", currentUser);
        const receiverSnap = await getDoc(receiverRef);

        if (!receiverSnap.exists()) {
          console.error("User not found");
          return;
        }

        await updateDoc(receiverRef, {
          usersFriend: arrayUnion(receiverFriendRequest),
        });

        const postRef = doc(db, "SignupUsers", UserId);
        const postSnap = await getDoc(postRef);

        if (!postSnap.exists()) {
          console.error("User not found");
          return;
        }

        console.log(friendRequest);

        await updateDoc(postRef, {
          usersFriend: arrayUnion(friendRequest),
        });

        console.log("Friend request sent successfully");
        return true;
      } catch (error) {
        console.log("Error:", error);
        return false;
      }
    }
  };

  useEffect(() => {
    if (!allUsersState || !currentUser) return;
    const result = filter(allUsersState, currentUser);
    setFilteredUsers(result);
  }, [allUsersState, currentUser]);

  const filteredUserss = allUsersState
    .flatMap((user) => user.usersFriend || [])
    .filter(
      (req) =>
        req.accept === false &&
        req.role === "receiver" &&
        req.receiverId === currentUser
    );
  const Accept = async (
    Users_Data,
    receiverId,
    senderId,
    indexId,
    senderName,
    receverName
  ) => {
    const post = [Users_Data];

    try {
      const Accept_Friend_Request = post.map((request, index) =>
        index === indexId ? { ...request, accept: true } : request
      );

      const receiverRef = doc(db, "SignupUsers", receiverId);
      const senderRef = doc(db, "SignupUsers", senderId);

      const [receiverSnap, senderSnap] = await Promise.all([
        getDoc(receiverRef),
        getDoc(senderRef),
      ]);

      if (!receiverSnap.exists()) {
        console.error("Receiver not found");
        return false;
      }
      if (!senderSnap.exists()) {
        console.error("Sender not found");
        return false;
      }

      const friendObjectForReceiver = { id: senderId, name: senderName };
      const friendObjectForSender = { id: receiverId, name: receverName };

      // --- Update both documents at once for consistency ---

      await Promise.all([
        updateDoc(receiverRef, {
          usersFriend: Accept_Friend_Request,
          Friends: arrayUnion(friendObjectForReceiver),
        }),

        updateDoc(senderRef, {
          usersFriend: Accept_Friend_Request,
          Friends: arrayUnion(friendObjectForSender),
        }),
      ]);

      console.log("Friend request accepted successfully");
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  return (
    <>
      <Navbar />
      {/* Friend Requests Section */}
      <div className="min-h-screen bg-gray-50 p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Friend Requests</h1>
          <p className="text-gray-500 mt-1">People who sent you requests</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUserss
            .flat()
            // .filter((friend) => friend.senderId !== currentUser)
            .map((friend, index) => (
              <div
                key={friend.receiverId + index}
                className="w-full flex justify-center"
              >
                <div className="w-full max-w-xs bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition-shadow duration-300">
                  {/* Cover Photo */}
                  <div className="h-28 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

                  {/* Profile Image */}
                  <div className="flex justify-center -mt-12">
                    <img
                      src={
                        friend.profileImage ||
                        "https://i.pravatar.cc/150?img=12"
                      }
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-4 border-white shadow"
                    />
                  </div>

                  {/* User Info */}
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold">
                      {friend.Username || friend.receiverId}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {friend.mutualFriends || 0} mutual friends
                    </p>
                    <button
                      onClick={() =>
                        Accept(
                          friend,
                          friend.receiverId,
                          friend.senderId,
                          index,
                          friend.Username,
                          friend.receverName
                        )
                      }
                      className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                      Confirm
                    </button>
                    {/* Delete Button */}
                    <button className="w-full mt-2 py-2 text-gray-700 font-medium bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {/* Agar koi request nahi hai */}
          {filteredUserss
            .flat()
            .filter((friend) => friend.recevice_User_Id === currentUser)
            .length === 0 && (
            <p className="text-gray-500 text-center col-span-full">
              No friend requests
            </p>
          )}
        </div>
      </div>

      {/* People You May Know / Add Friends */}
      <div className="min-h-screen bg-gray-50 p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Add Friends</h1>
          <p className="text-gray-500 mt-1">People you may know</p>
        </header>

        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((userGroup) =>
              userGroup.userDetails.map((friend, index) => (
                <div
                  key={friend.name + index}
                  className="w-full max-w-xs bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition-shadow duration-300 mx-auto"
                >
                  {/* Cover Photo */}
                  <div className="h-28 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

                  {/* Profile Image */}
                  <div className="flex justify-center -mt-12">
                    <img
                      src={
                        friend.profileImage ||
                        "https://i.pravatar.cc/150?img=12"
                      }
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-4 border-white shadow"
                    />
                  </div>

                  {/* User Info */}
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold">{friend.name}</h3>
                    <strong className="text-sm text-gray-500">
                      {`${userGroup.Friends.length}  mutual friends`}
                    </strong>
                    {/* Add Friend Button */}
                    {userGroup.usersFriend.length === 0 ? (
                      // No friend requests yet
                      <div key="no-data">
                        <button
                          onClick={() =>
                            friend_Request_Send(
                              userGroup?.usersFriend,
                              userGroup?.UserId,
                              currentUsersName, // ye jo reqest send ker raha hi
                              friend?.name // or ye who hai jis ko bhje ja rahi hai
                            )
                          }
                          className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                          Add Friend
                        </button>

                        <button className="w-full mt-2 py-2 text-gray-700 font-medium bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                          Remove
                        </button>
                      </div>
                    ) : (
                      // Check if current user already sent request
                      (() => {
                        const isSender = userGroup.usersFriend.some(
                          (item) => item.senderId === currentUser
                        );
                        const checkReadReq =
                          userGroup.usersFriend[0].read === true;
                        return (
                          <div>
                            {isSender ? (
                              <button className="w-full mt-2 py-2 text-gray-700 font-medium bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                                {checkReadReq
                                  ? "Accept Request"
                                  : "Request Sent"}
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={() =>
                                    friend_Request_Send(
                                      userGroup.usersFriend,
                                      userGroup.UserId,
                                      currentUsersName,
                                      friend?.name
                                    )
                                  }
                                  className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                                >
                                  Add Friend
                                </button>

                                <button className="w-full mt-2 py-2 text-gray-700 font-medium bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                                  Remove
                                </button>
                              </>
                            )}
                          </div>
                        );
                      })()
                    )}
                  </div>
                </div>
                //
              ))
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No people to add</p>
        )}
      </div>
    </>
  );
}
