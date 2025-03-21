"use client";

import { motion, useAnimation } from "framer-motion";
import { cvData } from "@/data/cv-data";
import { useEffect, useRef, useState } from "react";

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match the window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix characters (using a mix of letters, numbers, and symbols)
    const matrix =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()+~{}[]|:;<>,.?/";
    const characters = matrix.split("");

    // Increase font size to create less dense matrix effect
    const fontSize = 18;
    // Reduce column density by multiplying by a factor less than 1
    const columns = Math.floor((canvas.width / fontSize) * 0.7);

    // Array to track the y position of each drop
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      // More negative starting positions to create more space between initial drops
      drops[i] = Math.random() * -canvas.height * 2;
    }

    // Function to draw the matrix rain
    const draw = () => {
      // Create a more opaque black rect for faster fading of characters
      ctx.fillStyle = "rgba(15, 23, 42, 0.15)"; // Increased opacity for faster fading
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set color and font for the matrix characters with reduced opacity
      ctx.fillStyle = "rgba(59, 130, 246, 0.4)"; // Primary light color with reduced opacity
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Only draw every other column to create more space
        if (i % 2 === 0) {
          // Choose a random character to print
          const text =
            characters[Math.floor(Math.random() * characters.length)];

          // Draw the character
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        }

        // Move the drop down more slowly
        drops[i] += 0.5; // Reduced from 1 to 0.5 for slower movement

        // Increase random chance to reset to create fewer continuous streams
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
    };

    // Animation loop with reduced frame rate for less intensity
    const interval = setInterval(draw, 60); // Increased interval from 40 to 60ms for slower animation

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(interval);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" />; // Added opacity to canvas
};

const TerminalText = ({ text }: { text: string }) => {
  const [displayState, setDisplayState] = useState<
    "typing" | "command" | "output" | "prompt"
  >("typing");
  const [displayCommand, setDisplayCommand] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const controls = useAnimation();

  const command = "cat profile_information.txt";

  // Simplified approach with fewer timers
  useEffect(() => {
    // Type out the command first
    let typingTimer: number;
    let cursorTimer: number;

    // Start cursor blinking
    cursorTimer = window.setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    if (displayState === "typing") {
      let index = 0;
      typingTimer = window.setInterval(() => {
        if (index <= command.length) {
          setDisplayCommand(command.slice(0, index));
          index++;
        } else {
          clearInterval(typingTimer);
          // Wait a bit then show output
          setTimeout(() => {
            setDisplayState("command");
            // Then after a pause show the output
            setTimeout(() => {
              setDisplayState("output");
              // Wait before showing prompt (reduced delay)
              setTimeout(() => {
                setDisplayState("prompt");
              }, 300); // Reduced from 800ms to 300ms
            }, 300);
          }, 200);
        }
      }, 100);
    }

    // Cleanup function
    return () => {
      clearInterval(typingTimer);
      clearInterval(cursorTimer);
    };
  }, [displayState]);

  useEffect(() => {
    controls.start({ opacity: 1 });
  }, [controls]);

  return (
    <motion.div
      className="font-mono text-lg leading-relaxed mb-10 rounded-lg overflow-hidden shadow-2xl"
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.5, delay: 0.6 }}
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.8)",
      }}
    >
      {/* Realistic iTerm-style window header */}
      <div
        className="px-4 py-3 flex items-center justify-center relative border-b border-gray-700"
        style={{
          background: "linear-gradient(to bottom, #3c3f41 0%, #2d2d2d 100%)",
        }}
      >
        {/* Traffic lights positioned left */}
        <div className="absolute left-4 flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-0.5 bg-red-800 opacity-0 group-hover:opacity-100"></div>
          </div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
        </div>

        {/* Window title in center */}
        <div className="text-xs text-gray-300 font-medium">
          paul@macbook-pro — bash — 80×24
        </div>
      </div>

      {/* iTerm-style terminal content with solid background */}
      <div
        className="bg-[#1a1b26] p-6 text-text-light"
        style={{
          backgroundImage:
            "radial-gradient(rgba(59, 130, 246, 0.03) 1px, #1a1b26 0)",
          backgroundSize: "15px 15px",
        }}
      >
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-green-400 font-semibold">➜</span>
          <span className="text-cyan-400">~/profile</span>
          <span className="text-primary-light font-bold">(main)</span>
          <span className="text-text-light">$</span>
          <span className="text-text-light">{displayCommand}</span>
          {displayState === "typing" && cursorVisible && (
            <span className="text-primary-light">|</span>
          )}
        </div>

        {(displayState === "output" || displayState === "prompt") && (
          <div className="text-text-gray pl-0 py-2 mt-3">{text}</div>
        )}

        {displayState === "prompt" && (
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-green-400 font-semibold">➜</span>
            <span className="text-cyan-400">~/profile</span>
            <span className="text-primary-light font-bold">(main)</span>
            <span className="text-text-light">$</span>
            {cursorVisible && <span className="text-primary-light">|</span>}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const { personalInfo, profileSummary } = cvData;

  return (
    <section
      id="about"
      className="relative h-[90vh] py-4 flex items-center justify-center overflow-hidden"
    >
      {/* Matrix-style background */}
      <div className="absolute inset-0 z-0 bg-background-dark">
        <MatrixRain />
        <div className="absolute inset-0 bg-gradient-blue opacity-10"></div>
      </div>

      <div className="container z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-5xl font-bold mb-2 text-text-light">
              <span className="text-gradient">
                {personalInfo.name.split(" ")[0]}
              </span>{" "}
              <span>{personalInfo.name.split(" ").slice(1).join(" ")}</span>
            </h1>
            <div className="h-1 w-24 bg-primary-light mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            className="text-xl mb-8 text-text-gray"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-center space-x-4 mb-3">
              <span className="bg-primary-DEFAULT text-white px-4 py-1.5 rounded text-sm font-medium">
                Lead Developer / DevOps
              </span>
              <span className="glass-effect text-text-gray px-4 py-1.5 rounded text-sm">
                {personalInfo.location}
              </span>
              <span className="bg-primary-DEFAULT text-white px-4 py-1.5 rounded text-sm font-medium">
                AI & LLM Enthusiast
              </span>
            </div>
          </motion.div>

          <TerminalText
            text={`${profileSummary.replace(
              "Programming languages - Bash, Python, PowerShell and Terraform IAC. Comfortable with Javascript, and Golang.",
              ""
            )} Currently lead developer in a team of 8 DevOps Engineers at HSBC. Experienced with Frontier and Private LLM Models. Programming languages include Bash, Python, PowerShell, Terraform IAC, JavaScript, Golang, and Jenkins Groovy.`}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-primary-light"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
