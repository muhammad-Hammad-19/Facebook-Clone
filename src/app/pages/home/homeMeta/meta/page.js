"use client";
import { GoogleGenAI } from "@google/genai";
import { useState } from "react";

export default function AIChatPage() {
  const [content, setContent] = useState(""); // input value
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! 👋 How can I help you today?" },
  ]); // chat history

  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_SOME_KEY,
  });

  async function main() {
    if (!content.trim()) return; // ignore empty messages

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: content }]);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: content,
      });

      // Add AI response
      setMessages((prev) => [...prev, { sender: "ai", text: response.text }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Oops! Something went wrong." },
      ]);
    }

    setContent(""); // clear input
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      {/* HEADER */}
      <header className="p-4 shadow bg-white/70 backdrop-blur-md flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Meta AI Chat
        </h1>
        <div className="text-gray-600 font-medium">Online</div>
      </header>

      {/* CHAT BODY */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {messages.map((msg, index) => (
          <div
            key={index + msg.sender}
            className={`flex items-start space-x-3 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "ai" && (
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full font-bold">
                A
              </div>
            )}

            <div
              className={`p-4 rounded-xl shadow max-w-lg ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              {msg.text}
            </div>

            {msg.sender === "user" && (
              <div className="w-10 h-10 bg-gray-400 text-white flex items-center justify-center rounded-full font-bold">
                U
              </div>
            )}
          </div>
        ))}
      </div>

      {/* INPUT AREA */}
      <div className="p-4 bg-white shadow-lg">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Send a message..."
            className="flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === "Enter" && main()} // send on Enter
          />
          <button
            onClick={main}
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
