"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cvData } from "@/data/cv-data"; // Import CV data
import dynamic from "next/dynamic";

// Dynamically import the LLMDebugWindow with no SSR
const LLMDebugWindow = dynamic(() => import("../LLMDebugWindow"), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-4 right-4 z-[9999] bg-black/90 p-4 rounded-lg text-white">
      Loading debug window...
    </div>
  ),
});

type Message = {
  role: "user" | "assistant";
  content: string;
  model?: string;
};

type LLMModel = "claude" | "openai" | "gemini";

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hello! I'm an AI assistant for ${cvData.personalInfo.name}'s CV. Ask me anything about his professional experience and skills.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<LLMModel>("claude");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [debugMessages, setDebugMessages] = useState<
    Array<{
      role: "user" | "assistant" | "system";
      content: string;
      timestamp: string;
    }>
  >([
    {
      role: "system",
      content: "Debug window initialized",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [showDebugWindow, setShowDebugWindow] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [debugWindow, setDebugWindow] = useState<Window | null>(null);

  useEffect(() => {
    setIsMounted(true);
    // Initialize debug messages after component mounts
    setDebugMessages([
      {
        role: "system",
        content: "Debug console initialized",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      const messagesContainer = messagesEndRef.current.parentElement;
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  }, [messages]);

  useEffect(() => {
    console.log("Debug window state:", {
      showDebugWindow,
      messageCount: debugMessages.length,
    });
  }, [showDebugWindow, debugMessages]);

  // Add test message every 5 seconds to verify it's working
  useEffect(() => {
    const interval = setInterval(() => {
      setDebugMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "Test message: " + new Date().toISOString(),
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Function to open debug window
  const openDebugWindow = () => {
    const debug = window.open(
      "/debug",
      "debug_window",
      "width=800,height=800,right=0,top=0"
    );
    setDebugWindow(debug);
  };

  // Function to send message to debug window
  const sendToDebugWindow = (message: any) => {
    if (debugWindow && !debugWindow.closed) {
      debugWindow.postMessage(
        {
          type: "DEBUG_MESSAGE",
          message: message,
        },
        "*"
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const timestamp = new Date().toLocaleTimeString();

    // Send user message to debug window
    sendToDebugWindow({
      role: "user",
      content: input.trim(),
      timestamp,
    });

    // Add input validation
    const sanitizedInput = input.trim();

    // Check for potential harmful or off-topic queries
    const forbiddenPatterns = [
      /hack/i,
      /exploit/i,
      /ignore previous/i,
      /system prompt/i,
      /contact information/i,
      // Add more patterns as needed
    ];

    if (forbiddenPatterns.some((pattern) => pattern.test(sanitizedInput))) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I can only provide information about ${cvData.personalInfo.name}'s professional experience and career history.`,
          model: selectedModel,
        },
      ]);
      setInput("");
      return;
    }

    const userMessage: Message = { role: "user", content: sanitizedInput };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Send to debug window with technical details
      sendToDebugWindow({
        role: "assistant",
        content: data.content,
        timestamp: new Date().toLocaleTimeString(),
        model: data.model,
        debug: data.debug,
      });

      const assistantResponse: Message = {
        role: "assistant",
        content:
          data.content || "I apologize, but I couldn't generate a response.",
        model: data.model,
      };

      setMessages((prev) => [...prev, assistantResponse]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching response:", error);
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error processing your request. Please try again.",
          model: selectedModel,
        },
      ]);
    }
  };

  if (!isMounted) {
    return null; // or a loading placeholder
  }

  return (
    <section id="chat" className="py-20 bg-background-dark relative">
      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-text-light mb-4">
            Chat With My CV
          </h2>
          <div className="h-1 w-20 bg-primary-light mx-auto rounded-full mb-6"></div>
          <p className="text-text-gray max-w-2xl mx-auto">
            Ask questions and get AI-powered responses.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="card overflow-hidden shadow-card">
            <div className="flex border-b border-gray-800 p-4 bg-background-card justify-between items-center">
              <div className="flex space-x-2">
                <ModelButton
                  model="claude"
                  selectedModel={selectedModel}
                  setSelectedModel={setSelectedModel}
                  label="Claude"
                  icon={
                    <img
                      src="/logos/claude-logo.png"
                      alt="Claude logo"
                      style={{ width: "33px", height: "33px" }}
                      className="mr-2 object-contain"
                    />
                  }
                />
                <ModelButton
                  model="openai"
                  selectedModel={selectedModel}
                  setSelectedModel={setSelectedModel}
                  label="GPT-4"
                  icon={
                    <img
                      src="/logos/openai-logo.png"
                      alt="GPT-4 logo"
                      style={{ width: "33px", height: "33px" }}
                      className="mr-2 object-contain"
                    />
                  }
                />
                <ModelButton
                  model="gemini"
                  selectedModel={selectedModel}
                  setSelectedModel={setSelectedModel}
                  label="Gemini"
                  icon={
                    <img
                      src="/logos/gemini-logo.png"
                      alt="Gemini logo"
                      style={{ width: "33px", height: "33px" }}
                      className="mr-2 object-contain"
                    />
                  }
                />
              </div>

              <motion.button
                onClick={openDebugWindow}
                className="text-xs px-6 py-1.5 bg-primary-DEFAULT/20 hover:bg-primary-DEFAULT/30 text-primary-light rounded-md flex items-center gap-3 transition-colors whitespace-nowrap min-w-[120px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-3 h-3 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                Technical Info
              </motion.button>
            </div>

            <div
              className="overflow-y-auto p-4 space-y-4 bg-gradient-dark px-8 custom-scrollbar"
              style={{
                maxHeight: "500px",
              }}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-6 py-4 shadow-soft ${
                      message.role === "user"
                        ? "bg-primary-DEFAULT text-white w-full"
                        : "glass-effect text-text-light"
                    }`}
                  >
                    <div className="text-sm leading-relaxed">
                      {message.content}
                    </div>
                    {message.model && (
                      <div
                        className="text-xs mt-2 opacity-70 flex items-center"
                        style={{
                          justifyContent: "flex-start",
                          textAlign: "left",
                          marginLeft: "0",
                        }}
                      >
                        <img
                          src={`/logos/${message.model}-logo.png`}
                          alt={`${message.model} logo`}
                          style={{ width: "20px", height: "20px" }}
                          className="mr-2 object-contain"
                        />
                        <span className="flex-grow text-left">
                          {getModelDisplayName(message.model)}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="glass-effect text-text-light max-w-[80%] rounded-xl px-5 py-4 shadow-soft">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary-light animate-bounce"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-primary-light animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-primary-light animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-gray-800 p-4 bg-background-card"
            >
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="chat-input flex-1"
                  disabled={isLoading}
                />
                <motion.button
                  type="submit"
                  className="flex items-center justify-center w-[78px] h-12 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={isLoading || !input.trim()}
                  style={{ backgroundColor: "#1a1a1a", width: "78px" }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.05, backgroundColor: "#262626" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent" />
                  ) : (
                    <motion.img
                      src={`/logos/${selectedModel}-logo.png`}
                      alt={`${selectedModel} logo`}
                      style={{ width: "27px", height: "27px" }}
                      className="object-contain"
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Debug Panel - Now with very visible styling */}
      <div
        className="fixed right-4 top-24 w-96 z-[9999]"
        style={{ backgroundColor: "red" }}
      >
        <div className="bg-black border-4 border-red-500 rounded-lg shadow-2xl">
          {/* Debug Header */}
          <div className="bg-red-500 p-4 flex items-center justify-between">
            <h3 className="text-white font-bold text-lg">DEBUG CONSOLE</h3>
            <button
              onClick={() => setShowDebugWindow(!showDebugWindow)}
              className="bg-white text-red-500 px-4 py-2 rounded-lg font-bold"
            >
              {showDebugWindow ? "HIDE" : "SHOW"}
            </button>
          </div>

          {/* Debug Content */}
          {showDebugWindow && (
            <div className="max-h-[600px] overflow-y-auto p-4">
              {debugMessages.map((message, index) => (
                <div key={index} className="mb-4 border-b border-red-500 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold">
                      {message.role}:
                    </span>
                    <span className="text-white">{message.timestamp}</span>
                  </div>
                  <pre className="text-white mt-1 pl-4">{message.content}</pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Additional Debug Button - Positioned differently */}
      <button
        className="fixed left-4 top-24 z-[9999] bg-red-500 text-white px-6 py-3 rounded-lg font-bold shadow-2xl"
        onClick={() => setShowDebugWindow(!showDebugWindow)}
      >
        {showDebugWindow ? "Hide Debug" : "Show Debug"}
      </button>
    </section>
  );
};

interface ModelButtonProps {
  model: LLMModel;
  selectedModel: LLMModel;
  setSelectedModel: (model: LLMModel) => void;
  label: string;
  icon: React.ReactNode;
}

const ModelButton = ({
  model,
  selectedModel,
  setSelectedModel,
  label,
  icon,
}: ModelButtonProps) => {
  return (
    <motion.button
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
        selectedModel === model
          ? "bg-primary-DEFAULT text-white shadow-glow"
          : "glass-effect text-text-gray hover:bg-primary-DEFAULT/20"
      }`}
      onClick={() => setSelectedModel(model)}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      {label}
    </motion.button>
  );
};

const getModelDisplayName = (model: string): string => {
  switch (model) {
    case "claude":
      return "Anthropic Claude";
    case "openai":
      return "OpenAI GPT-4";
    case "gemini":
      return "Google Gemini";
    default:
      return model;
  }
};

export default ChatInterface;
