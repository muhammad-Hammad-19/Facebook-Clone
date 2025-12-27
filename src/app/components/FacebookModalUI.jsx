"use client";
import * as React from "react";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { Modal } from "antd";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { db } from "../firebase/firebse";
import { getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
const FacebookModalUI = ({ setOpen, open }) => {
  const [File, sateFile] = useState(null);
  const [massage, sateMassage] = useState(null);
  const [error, setError] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!File && !massage) {
      setError("Please write something or add a photo.");
      return;
    }

    setError(""); // error clear

    if (!user) {
      console.error("User not logged in!");
      return;
    }
    
    const save = {
      massage,
      File,
    };

    const postRef = doc(db, "SignupUsers", user.uid);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      console.error("Post not found");
      return;
    }
    await updateDoc(postRef, {
      Post: arrayUnion(save),
    });

    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        centered
        width={500}
        styles={{
          body: {
            borderRadius: "12px",
            padding: "0",
            overflow: "hidden",
            backgroundColor: "white",
          },
        }}
      >
        <form onSubmit={onSubmit} className="p-5 bg-gray-50">
          {/* User Info */}
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
            <div>
              <p className="font-medium text-gray-800">John Doe</p>
              <p className="text-xs text-gray-500">🌍 Public</p>
            </div>
          </div>

          {/* Text */}
          <textarea
            placeholder="What's on your mind, John?"
            onChange={(e) => sateMassage(e.target.value)}
            className="w-full bg-transparent resize-none text-gray-800 text-lg focus:outline-none placeholder-gray-500"
            rows={3}
          />

          {error && (
            <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>
          )}

          {/* ✅ PHOTO PREVIEW UI */}
          {File && (
            <div className="mt-4 relative rounded-xl overflow-hidden border bg-white">
              <img
                src={File}
                alt="Preview"
                className="w-full h-60 object-cover"
              />

              {/* Remove Photo UI */}
              <button
                type="button"
                onClick={() => sateFile(null)}
                className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full"
              >
                ✕
              </button>
            </div>
          )}

          {/* Add to Post */}
          <div className="mt-4 border border-gray-300 rounded-xl p-3 bg-white">
            <p className="text-gray-600 text-sm font-medium mb-2">
              Add to your post
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3 text-2xl">
                <Button
                  component="label"
                  role={undefined}
                  tabIndex={-1}
                  startIcon={<CameraAltIcon />}
                >
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        sateFile(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </Button>
                <span className="cursor-pointer">🎥</span>
                <span className="cursor-pointer">😊</span>
                <span className="cursor-pointer">📍</span>
                <span className="cursor-pointer">🎵</span>
              </div>
              <span className="text-gray-400 text-sm">...</span>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-white">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-semibold text-sm"
            >
              Post
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default FacebookModalUI;
