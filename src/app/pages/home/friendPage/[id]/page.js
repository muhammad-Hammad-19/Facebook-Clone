"use client";

import { useAddFriendFuc } from "@/app/context/addFriend";
import { useParams } from "next/navigation";

export default function FriendPage() {
  const { id } = useParams();
  const { state } = useAddFriendFuc();

  const friend = state.find((data) => data.id === id);

  if (!friend) {
    return (
      <div className="flex justify-center items-center h-screen text-blue-600">
        Loading...
      </div>
    );
  }

  const {
    Post = [],
    likes = [],
    comments = [],
    Friends = [],
    userDetails = [],
  } = friend;

  const friendName = userDetails[0]?.name || "User";

  // 📸 Images from posts (Facebook style)
  const photos = Post.filter((p) => p.File);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* ================= COVER ================= */}
      <div className="relative bg-white shadow">
        <img
          src="https://images.unsplash.com/photo-1495562569060-2eec283d3391"
          className="w-full h-56 sm:h-72 object-cover"
        />

        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16 sm:-mt-20">
            <img
              src="https://i.pravatar.cc/300"
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-white object-cover"
            />

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-4xl font-bold">{friendName}</h1>
              <p className="text-gray-600">{Friends.length} Friends</p>
            </div>

            <div className="flex gap-2 pb-4 sm:pb-6">
              <button className="bg-gray-200 px-4 py-2 rounded-lg font-medium">
                ✓ Friends
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {/* ========== LEFT ========== */}
        <div className="space-y-6">
          {/* INTRO */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold text-lg mb-2">Intro</h2>
            <p className="text-gray-600">💻 Software Developer</p>
            <p className="text-gray-600">📍 Lives in California</p>
            <p className="text-gray-600">🏠 From New York</p>
          </div>

          {/* PHOTOS */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-lg">Photos</h2>
              {photos.length > 0 && (
                <span className="text-blue-600 text-sm cursor-pointer">
                  See all
                </span>
              )}
            </div>

            {photos.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {photos.slice(0, 9).map((photo, i) => (
                  <img
                    key={i}
                    src={photo.File}
                    className="aspect-square object-cover rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                <span className="text-4xl">📷</span>
                <p className="mt-2 text-sm font-medium">No photos to show</p>
                <p className="text-xs text-gray-400">
                  When photos are added, they’ll appear here
                </p>
              </div>
            )}
          </div>

          {/* FRIENDS */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold text-lg mb-3">
              Friends · {Friends.length}
            </h2>

            <div className="grid grid-cols-3 gap-3">
              {Friends.slice(0, 6).map((f, i) => (
                <div key={i} className="text-center">
                  <img src="https://i.pravatar.cc/150" className="rounded-lg" />
                  <p className="text-sm font-medium mt-1">{f.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========== RIGHT (POSTS) ========== */}
        <div className="md:col-span-2 space-y-6">
          {Post.length > 0 ? (
            Post.map((post, index) => {
              const postLikes = likes.filter(
                (l) => l.checkMassage === post.massage
              );
              const postComments = comments.filter(
                (c) => c.checkMassage === post.massage
              );

              return (
                <div key={index} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="https://i.pravatar.cc/50"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{friendName}</h3>
                      <p className="text-sm text-gray-500">Just now</p>
                    </div>
                  </div>

                  <p className="mb-3">{post.massage}</p>

                  {post.File && (
                    <img src={post.File} className="w-full rounded-lg mb-3" />
                  )}

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>👍 {postLikes.length}</span>
                    <span>{postComments.length} Comments</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              <span className="text-4xl">📝</span>
              <p className="mt-2 font-medium">No posts yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
