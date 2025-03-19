"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

interface LLMDebugWindowProps {
  messages: Message[];
  isVisible: boolean;
}

const LLMDebugWindow = ({ messages, isVisible }: LLMDebugWindowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Combine the effects into one
  useEffect(() => {
    setIsMounted(true);
    console.log("LLMDebugWindow rendered:", {
      isVisible,
      messageCount: messages.length,
      mounted: true,
    });
  }, [isVisible, messages.length]);

  if (!isMounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
        height: isExpanded ? "400px" : "200px",
      }}
      className="fixed bottom-4 right-4 w-96 bg-black/90 backdrop-blur-md rounded-lg shadow-lg border-2 border-primary-light z-[9999] overflow-hidden"
    >
      {/* Header - slightly reduced padding */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b-2 border-primary-light bg-primary-DEFAULT">
        <h3 className="text-sm font-semibold text-white">LLM Debug Console</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white hover:text-primary-light"
          >
            {isExpanded ? "▼" : "▲"}
          </button>
        </div>
      </div>

      {/* Messages Container - adjusted spacing */}
      <div
        className="overflow-y-auto px-2 py-1.5 font-mono text-sm bg-black/90"
        style={{ height: "calc(100% - 32px)" }} // Adjusted for new header height
      >
        {messages.map((message, index) => (
          <div key={index} className="mb-1.5">
            {" "}
            {/* Reduced margin bottom */}
            <div className="flex items-center gap-1.5">
              {" "}
              {/* Reduced gap */}
              <span
                className={`text-xs ${
                  message.role === "user"
                    ? "text-blue-400"
                    : message.role === "assistant"
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {message.role}:
              </span>
              <span className="text-gray-400 text-xs">{message.timestamp}</span>
            </div>
            <pre className="whitespace-pre-wrap text-white text-xs mt-0.5">
              {" "}
              {/* Reduced margin top */}
              {message.content}
            </pre>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default LLMDebugWindow;
