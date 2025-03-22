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

        // Wait for door animation to complete before calling onCodeVerified
        setTimeout(() => {
          onCodeVerified();
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Door animation container */}
      {showDoorAnimation && (
        <div className="absolute inset-0 z-10">
          <div className="door-left"></div>
          <div className="door-right"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 w-full max-w-sm p-8 card animate-fade-in shadow-glow backdrop-blur-sm bg-background-card/80">
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
        ) : (
          <div className="text-center py-8">
            <h1 className="text-3xl font-bold text-gradient-blue mb-2">
              Access Granted :)
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecretCodeEntry;
