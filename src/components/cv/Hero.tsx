"use client";

import { motion } from "framer-motion";
import { cvData } from "@/data/cv-data";

const Hero = () => {
  const { personalInfo, profileSummary } = cvData;

  return (
    <section
      id="about"
      className="relative h-[90vh] py-4 flex items-center justify-center overflow-hidden"
    >
      {/* Background with tech pattern */}
      <div className="absolute inset-0 z-0 bg-background-dark">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-blue"></div>
      </div>

      {/* Animated particles - reduced number for better performance */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 10 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 rounded-full bg-primary-light"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [Math.random() * 0.5 + 0.1, Math.random() * 0.3 + 0.05],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
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
            <div className="flex flex-col items-center mb-4">
              <span
                className="inline-flex items-center bg-primary-DEFAULT text-white shadow-lg rounded-full text-sm font-semibold mb-4"
                style={{ padding: "0.75rem 2.5rem" }}
              >
                Lead Developer / DevOps Automation Engineer
              </span>
              <span
                className="inline-flex items-center glass-effect text-text-gray hover:bg-primary-DEFAULT/20 rounded-full text-sm font-semibold mb-4"
                style={{ padding: "0.75rem 2.5rem" }}
              >
                {personalInfo.location}
              </span>
              <span
                className="inline-flex items-center bg-primary-DEFAULT text-white shadow-lg rounded-full text-sm font-semibold"
                style={{ padding: "0.75rem 2.5rem" }}
              >
                AI Advocate & LLM Enthusiast
              </span>
            </div>
          </motion.div>

          <motion.p
            className="text-lg text-text-gray leading-relaxed mb-10 glass-effect p-6 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {profileSummary.replace(
              "Programming languages - Bash, Python, PowerShell and Terraform IAC. Comfortable with Javascript, and Golang.",
              ""
            )}{" "}
            Currently lead developer in a team of 8 DevOps Engineers at HSBC.
            Experienced with Frontier and Private LLM Models. Programming
            languages include Bash, Python, PowerShell, Terraform IAC,
            JavaScript, Golang, and Jenkins Groovy.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <a href="#experience" className="btn-primary group">
              <span className="flex items-center">
                View Experience
                <svg
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
            </a>
            <a href="#chat" className="btn-outline group">
              <span className="flex items-center">
                Chat with CV
                <svg
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
              </span>
            </a>
          </motion.div>
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
