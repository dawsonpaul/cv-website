"use client";

import { useState, useEffect, useRef } from "react";

interface SecretCodeEntryProps {
  onCodeVerified: () => void;
}

const SecretCodeEntry = ({ onCodeVerified }: SecretCodeEntryProps) => {
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [showDoorAnimation, setShowDoorAnimation] = useState(false);
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError("");

    try {
      // Call the API endpoint to verify the code
      const response = await fetch("/api/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.success) {
        setShowDoorAnimation(true);

        // Wait for door animation to complete before showing success page
        setTimeout(() => {
          setShowSuccessPage(true);
        }, 2000); // Match this with the CSS animation duration
      } else {
        setError("Invalid code. Please try again.");
        setIsVerifying(false);
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setError("An error occurred. Please try again.");
      setIsVerifying(false);
    }
  };

  // Handle continue button click - using an explicit function to ensure it works
  const handleContinueClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Continue button clicked");
    // Add a small delay to ensure the click is registered
    setTimeout(() => {
      onCodeVerified();
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none"></div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      {/* Door animation container */}
      {showDoorAnimation && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="door-left"></div>
          <div className="door-right"></div>
        </div>
      )}

      {/* Content */}
      <div
        className={`relative z-30 w-full ${
          showSuccessPage ? "max-w-2xl" : "max-w-sm"
        } p-8 card animate-fade-in shadow-glow backdrop-blur-sm bg-background-card/90`}
      >
        {!showDoorAnimation ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gradient-blue mb-2">
                Secure Access
              </h1>
              <p className="text-text-gray">Enter the secret code to unlock</p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 flex flex-col items-center"
            >
              <div className="flex flex-col items-start">
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-text-gray mb-2"
                >
                  Secret Code
                </label>
                <input
                  ref={inputRef}
                  type="password"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-64 p-4 bg-white border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 font-bold placeholder-gray-500"
                  placeholder="Enter secret code"
                  disabled={isVerifying}
                  autoComplete="off"
                />
                {error && (
                  <p className="mt-2 text-accent-red text-sm">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-64 btn-primary py-3 transition-all rounded-lg shadow-glow hover:shadow-glow hover:bg-primary-dark"
                disabled={isVerifying || !code}
              >
                {isVerifying ? "Verifying..." : "Submit"}
              </button>
            </form>
          </>
        ) : showSuccessPage ? (
          <div className="py-6">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gradient-blue mb-2">
                Access Granted :)
              </h1>
              <h2 className="text-xl font-semibold text-primary mb-3">
                Welcome!
              </h2>

              <p className="text-lg text-text-primary mb-4">
                I built this site to demonstrate my keen knowledge and
                understanding of DevOps, LLMs and Web Interface components. This
                CV website combines modern web development practices with
                cutting-edge AI integration.
              </p>

              <p className="text-lg text-text-primary mb-8">
                The site features a responsive design, interactive UI
                animations, and an AI-powered chat interface that allows
                visitors to ask questions about my professional experience using
                multiple LLM providers. The architecture implements best
                practices for performance, security, and maintainability.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-primary mb-3">
                Key Features & Technologies:
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-text-primary">
                <li className="flex items-center">
                  <span className="mr-2 text-accent-blue">•</span>
                  <span>
                    <strong>Next.js & React</strong> - Server-side rendering
                    with React for optimal performance
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-accent-blue">•</span>
                  <span>
                    <strong>TypeScript</strong> - Type-safe code for robustness
                    and maintainability
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-accent-blue">•</span>
                  <span>
                    <strong>Tailwind CSS & Framer Motion</strong> - Modern
                    styling with fluid animations
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-accent-blue">•</span>
                  <span>
                    <strong>LangChain</strong> - Abstraction layer for seamless
                    LLM integration
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-accent-blue">•</span>
                  <span>
                    <strong>Multi-Model Support</strong> - Claude, GPT-4, and
                    Gemini with real-time switching
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-accent-blue">•</span>
                  <span>
                    <strong>Authentication</strong> - Secure access control with
                    API protection
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-accent-blue">•</span>
                  <span>
                    <strong>Vercel CI/CD</strong> - Automated deployment
                    pipeline with GitHub integration
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-accent-blue">•</span>
                  <span>
                    <strong>Debug Interface</strong> - Real-time metrics
                    dashboard for LLM interactions
                  </span>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-primary mb-3">
                Implementation Highlights:
              </h2>
              <ul className="space-y-2 text-text-primary">
                <li className="flex items-start">
                  <span className="mr-2 text-accent-blue mt-1">•</span>
                  <span>
                    Advanced prompt engineering techniques to ensure LLM
                    responses contain only CV-related information
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-accent-blue mt-1">•</span>
                  <span>
                    Optimized API routes with proper error handling and
                    environmental variable validation
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-accent-blue mt-1">•</span>
                  <span>
                    Responsive design that works flawlessly across desktop,
                    tablet, and mobile devices
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-accent-blue mt-1">•</span>
                  <span>
                    Context-aware LLM integration that maintains conversation
                    history while enforcing data boundaries
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={handleContinueClick}
                className="px-8 py-3 btn-primary transition-all rounded-lg shadow-glow hover:shadow-glow hover:bg-primary-dark cursor-pointer z-50 mb-6"
              >
                Continue to CV
              </button>

              <a
                href="https://github.com/dawsonpaul/cv-website"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(
                    "https://github.com/dawsonpaul/cv-website",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
                className="flex items-center text-text-primary hover:text-primary transition-colors group cursor-pointer z-50"
              >
                <div className="w-6 h-6 mr-2 flex items-center justify-center">
                  <img
                    src="/images/github.svg"
                    alt="GitHub"
                    className="max-w-full max-h-full"
                    width={24}
                    height={24}
                  />
                </div>
                <span className="font-medium">View on GitHub</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 animate-pulse">
            <h1 className="text-3xl font-bold text-gradient-blue">
              Unlocking...
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecretCodeEntry;
