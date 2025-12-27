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
      <div className="flex max-w-6xl mx-auto mt-6 space-x-6 px-3">
        {/* Left Sidebar */}
        <aside className="w-1/4 hidden lg:block space-y-4">
          <div className="bg-white p-4 rounded-md shadow">
            <h2 className="font-semibold mb-3">Menu</h2>
            <ul className="space-y-2 text-gray-600">
              {["News Feed", "Friends", "Groups", "Marketplace", "Watch"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-blue-600">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="bg-white p-4 rounded-md shadow">
            <h2 className="font-semibold mb-3">Shortcuts</h2>
            <ul className="space-y-2 text-gray-600">
              {["Coding Group", "Travel Buddies", "Music Lovers"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-blue-600">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </aside>

        {/* Center Content */}
        <main className="w-full lg:w-2/4 space-y-6">
          {/* Post Input */}
          <div className="bg-white p-4 rounded-md shadow">
            <div className="flex items-center  mb-3">
              <CardHeader
                avatar={
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <Avatar />
                  </div>
                }
              />
              {/* <CardHeader avatar={<Avatar />} /> */}
              <input
                type="text"
                onClick={() => setOpen(true)}
                placeholder="What's on your mind?"
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-around text-gray-600 text-sm border-t pt-2">
              <button className="flex items-center space-x-1 hover:text-blue-600">
                <span>🎥</span>
                <span>Live Video</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-600">
                <span>📷</span>
                <span>Photo/Video</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-600">
                <span>😊</span>
                <span>Feeling</span>
              </button>
            </div>
          </div>

          <RecipeReviewCard />
        </main>

        {/* Right Sidebar */}
        <aside className="w-1/4 hidden lg:block space-y-4">
          {/* Contacts */}
          <div className="bg-white p-4 rounded-md shadow">
            <h2 className="font-semibold mb-3">Contacts</h2>
            <ul className="space-y-2 text-gray-600">
              {["Alice", "Bob", "Charlie", "David"].map((name) => (
                <li key={name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <a href="#" className="hover:text-blue-600">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sponsored */}
          <div className="bg-white p-4 rounded-md shadow">
            <h2 className="font-semibold mb-3">Sponsored</h2>
            <p className="text-sm text-gray-500">Ad content goes here</p>
          </div>

          {/* META LOGO SECTION */}
          {/* META LOGO SECTION */}
          <div className="bg-white p-4 rounded-md shadow flex flex-col items-center">
            <h2 className="font-semibold mb-3 text-gray-800">Meta</h2>

            {/* BEAUTIFUL META LOGO */}
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
