"use client";

import {
  filter_for_UserProfile_page,
  friendNameFuc,
  nameUpperCase,
} from "../../../../../utils";
import { useCurrUserFuc } from "@/app/context/currentUserContext";
import { useAddFriendFuc } from "@/app/context/addFriend";

export default function UserProfile() {
  const { state: user } = useCurrUserFuc();
  const { state } = useAddFriendFuc();

  const admin_Array = filter_for_UserProfile_page(state, user) || [];
  const {
    Post = [],
    likes = [],
    comments = [],
    Friends = [],
    userDetails = [],
  } = admin_Array || {};

  if (admin_Array.length === 0)
    return (
      <div className="flex justify-center h-screen w-screen items-center  text-blue-600">
        Loading....
      </div>
    );

  const adminName = nameUpperCase(userDetails[0].name);
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* ================= PROFILE HEADER ================= */}
      <div className="w-full bg-white shadow">
        <div
          className="h-60 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1495562569060-2eec283d3391')",
          }}
        />

        <div className="max-w-5xl mx-auto px-4 pb-4 relative">
          <div className="flex items-end gap-4 -mt-16">
            <img
              src="https://i.pravatar.cc/300"
              className="w-40 h-40 rounded-full border-4 border-white object-cover"
            />

            <div className="flex-1">
              <h1 className="text-3xl font-bold">{adminName}</h1>
              <p className="text-gray-500">{Friends.length} Friends</p>
            </div>

            <div className="flex gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Add to Story
              </button>
              <button className="bg-gray-200 px-4 py-2 rounded-lg">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {/* LEFT */}
        <div className="space-y-4">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-2">Intro</h2>
            <p className="text-gray-600">Software Developer</p>
            <p className="text-gray-600 mt-2">Lives in California</p>
            <p className="text-gray-600">From New York</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:col-span-2 space-y-6">
          {/* CREATE POST UI */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/50"
                className="w-10 h-10 rounded-full"
              />
              <input
                placeholder="What's on your mind?"
                className="flex-1 bg-gray-100 px-4 py-2 rounded-full outline-none"
              />
            </div>
          </div>

          {/* ================= POSTS ================= */}
          {Post.map((post, index) => {
            const postLikes = likes.filter(
              (l) => l.checkMassage === post.massage
            );

            const postComments = comments.filter(
              (c) => c.checkMassage === post.massage
            );

            return (
              <div key={index} className="bg-white rounded-lg shadow p-4">
                {/* Post Header */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="https://i.pravatar.cc/50?img=0"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">
                      {likes[0]?.user_Name || "User"}
                    </h3>
                    <p className="text-sm text-gray-500">Just now</p>
                  </div>
                </div>

                {/* Post Text */}
                <p className="mb-3 text-gray-800">{post.massage}</p>

                {/* Post Image */}
                {post.File && (
                  <img src={post.File} className="w-full rounded-lg mb-3" />
                )}

                {/* Like / Comment Count */}
                <div className="flex justify-between text-gray-600 text-sm pb-2 border-b">
                  <span>👍 {postLikes.length}</span>
                  <span>{postComments.length} Comments</span>
                </div>

                {/* Actions */}
                <div className="flex justify-between mt-2 text-gray-600">
                  <button className="hover:bg-gray-100 px-4 py-2 rounded-lg">
                    👍 Like
                  </button>
                  <button className="hover:bg-gray-100 px-4 py-2 rounded-lg">
                    💬 Comment
                  </button>
                  <button className="hover:bg-gray-100 px-4 py-2 rounded-lg">
                    🔄 Share
                  </button>
                </div>

                {/* COMMENTS */}
                <div className="mt-4 space-y-4">
                  {postComments.map((c, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <img
                        src="https://i.pravatar.cc/150?img=32"
                        className="w-8 h-8 rounded-full"
                      />

                      <div className="bg-gray-100 rounded-2xl px-4 py-2 max-w-lg">
                        <p className="text-sm font-semibold">
                          {c.userNameComment}
                        </p>
                        <p className="text-sm text-gray-700">{c.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* ================= FRIENDS ================= */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-3">Friends</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Friends.map((friend, index) => (
                <div
                  key={index}
                  className="bg-gray-50 shadow-sm rounded-lg p-2 text-center"
                >
                  <img
                    src="https://i.pravatar.cc/150"
                    className="w-full rounded-lg"
                  />
                  <p className="font-semibold mt-2">{friend.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ABOUT */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p>💼 Works at Tech Company</p>
            <p>🎓 Studied at University</p>
            <p>📍 Lives in New York</p>
            <p>📅 Joined 2018</p>
          </div>
        </div>
      </div>
    </div>
  );
}
