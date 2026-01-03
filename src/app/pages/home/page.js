"use client";
import React, { useState } from "react";
import FacebookModalUI from "../../components/FacebookModalUI";
import RecipeReviewCard from "../../components/PostCard";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { Avatar, CardHeader } from "@mui/material";

const HomePage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar />
      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto mt-6 px-3 gap-6">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-1/4 space-y-4 order-2 lg:order-1">
          <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <h2 className="font-semibold mb-3 text-gray-800">Menu</h2>
            <ul className="space-y-2 text-gray-600">
              {["News Feed", "Friends", "Groups", "Marketplace", "Watch"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-blue-600 transition">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <h2 className="font-semibold mb-3 text-gray-800">Shortcuts</h2>
            <ul className="space-y-2 text-gray-600">
              {["Coding Group", "Travel Buddies", "Music Lovers"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-blue-600 transition">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </aside>

        {/* Center Content */}
        <main className="w-full lg:w-2/4 space-y-6 order-1 lg:order-2">
          {/* Post Input */}
          <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <div className="flex items-center mb-3 space-x-2">
              <Avatar className="w-10 h-10 bg-gray-300" />
              <input
                type="text"
                onClick={() => setOpen(true)}
                placeholder="What's on your mind?"
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="flex justify-around text-gray-600 text-sm border-t pt-2">
              <button className="flex items-center space-x-1 hover:text-blue-600 transition">
                <span>🎥</span>
                <span>Live Video</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-600 transition">
                <span>📷</span>
                <span>Photo/Video</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-600 transition">
                <span>😊</span>
                <span>Feeling</span>
              </button>
            </div>
          </div>

          {/* Posts */}
          <RecipeReviewCard />
        </main>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-1/4 space-y-4 order-3">
          {/* Contacts */}
          <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <h2 className="font-semibold mb-3 text-gray-800">Contacts</h2>
            <ul className="space-y-2 text-gray-600">
              {["Alice", "Bob", "Charlie", "David"].map((name) => (
                <li key={name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <a href="#" className="hover:text-blue-600 transition">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sponsored */}
          <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <h2 className="font-semibold mb-3 text-gray-800">Sponsored</h2>
            <p className="text-sm text-gray-500">Ad content goes here</p>
          </div>

          {/* Meta Section */}
          <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center">
            <h2 className="font-semibold mb-3 text-gray-800">Meta</h2>
            <svg
              width="70"
              height="40"
              viewBox="0 0 120 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-2"
            >
              <path
                d="M27 10C14 10 5 26 5 40C5 54 14 60 23 60C35 60 45 40 60 22C75 40 85 60 97 60C108 60 115 50 115 40C115 25 105 10 92 10C80 10 70 25 60 38C50 25 40 10 27 10Z"
                stroke="#0064E0"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Link
              href="home/homeMeta"
              className="text-blue-600 hover:underline text-sm"
            >
              Visit Meta →
            </Link>
          </div>
        </aside>
      </div>

      {open && <FacebookModalUI setOpen={setOpen} open={open} />}
    </>
  );
};

export default HomePage;
