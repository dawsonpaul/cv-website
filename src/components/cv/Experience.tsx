"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cvData, WorkExperience } from "@/data/cv-data";

const Experience = () => {
  const { workExperience } = cvData;
  const [selectedExperience, setSelectedExperience] =
    useState<WorkExperience | null>(workExperience[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <section id="experience" className="py-12 bg-background-dark relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-10 z-0"></div>

      <div className="w-full mx-auto px-4 relative z-10 flex flex-col items-center">
        {/* Professional Experience Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-text-light mb-4">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <div className="h-1 w-20 bg-primary-light mx-auto rounded-full mb-6"></div>
          <p className="text-text-gray max-w-2xl mx-auto">
            Over 24 years of experience in the security industry, working with
            major firms across various sectors.
          </p>
        </motion.div>

        {/* Timeline and Information Sections */}
        <div className="w-full">
          <div
            className="flex flex-col md:flex-row gap-8"
            style={{ maxWidth: "1400px", margin: "0 auto", width: "100%" }}
          >
            {/* Timeline dropdown navigation */}
            <div style={{ flex: "0 0 30%" }} className="w-full">
              <motion.div
                className="relative z-40"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div
                  className="card p-5 cursor-pointer hover:bg-gray-900/70 transition-colors bg-gray-900/50"
                  onClick={toggleDropdown}
                >
                  <div className="flex flex-col p-2">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gradient mx-auto">
                        Career Timeline
                      </h3>
                      <span className="text-primary-light text-xs">
                        {isDropdownOpen ? "▲" : "▼"}
                      </span>
                    </div>

                    <div className="text-xs text-text-muted mb-4 text-center">
                      Click to {isDropdownOpen ? "hide" : "show"} all
                      experiences
                    </div>
                  </div>

                  {/* Selected experience preview */}
                  {selectedExperience && (
                    <div className="mt-4 p-4 bg-primary-DEFAULT/20 rounded-lg border border-primary-light/30 shadow-glow">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-[50px] h-[50px] mr-3 flex items-center justify-center">
                          {selectedExperience.companyInfo.logo && (
                            <img
                              src={selectedExperience.companyInfo.logo}
                              alt={`${selectedExperience.company} logo`}
                              className="max-w-full max-h-full object-contain"
                              width="50"
                              height="50"
                              onError={(e) => {
                                // Use a fallback color instead of hiding
                                e.currentTarget.style.backgroundColor =
                                  "#2563eb";
                                e.currentTarget.style.borderRadius = "4px";
                              }}
                            />
                          )}
                        </div>
                        <div className="text-left flex-1">
                          <div className="font-medium text-primary-light">
                            {selectedExperience.company}
                          </div>
                          <div className="text-sm text-text-gray">
                            {selectedExperience.role}
                          </div>
                          <div className="text-xs mt-1 text-text-muted flex items-center">
                            <span className="mr-1 text-xs">•</span>
                            {selectedExperience.startDate} -{" "}
                            {selectedExperience.endDate}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dropdown content - showing all jobs */}
                {isDropdownOpen && (
                  <motion.div
                    className="absolute left-0 right-0 z-50 mt-2 p-5 shadow-lg bg-black border border-gray-900 rounded-lg"
                    style={{
                      maxHeight: "60vh",
                      overflowY: "auto",
                      top: "100%",
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="space-y-3 bg-black">
                      {workExperience.map((exp, index) => (
                        <motion.button
                          key={index}
                          className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-start ${
                            selectedExperience?.company === exp.company
                              ? "bg-primary-DEFAULT/20 border border-primary-light/30 shadow-glow"
                              : "bg-background-card hover:bg-primary-DEFAULT/10 border border-gray-900"
                          }`}
                          onClick={() => {
                            setSelectedExperience(exp);
                            setIsDropdownOpen(false);
                          }}
                          whileHover={{ scale: 1.02 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.03 }}
                        >
                          <div className="flex-shrink-0 w-[50px] h-[50px] mr-3 flex items-center justify-center">
                            {exp.companyInfo.logo && (
                              <img
                                src={exp.companyInfo.logo}
                                alt={`${exp.company} logo`}
                                className="max-w-full max-h-full object-contain"
                                width="50"
                                height="50"
                                onError={(e) => {
                                  // Use a fallback color instead of hiding
                                  e.currentTarget.style.backgroundColor =
                                    "#2563eb";
                                  e.currentTarget.style.borderRadius = "4px";
                                }}
                              />
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <div
                              className={`font-medium ${
                                selectedExperience?.company === exp.company
                                  ? "text-primary-light"
                                  : "text-text-light"
                              }`}
                            >
                              {exp.company}
                            </div>
                            <div className="text-sm text-text-gray">
                              {exp.role}
                            </div>
                            <div className="text-xs mt-1 text-text-muted flex items-center">
                              <span className="mr-1 text-xs">•</span>
                              {exp.startDate} - {exp.endDate}
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Experience details */}
            <div style={{ flex: "0 0 70%" }} className="w-full">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {selectedExperience && (
                  <motion.div
                    key={selectedExperience.company}
                    className="card p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      className="flex flex-col items-center mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="text-center mt-4">
                        <motion.h3
                          className="text-2xl font-bold text-text-light mb-3"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {selectedExperience.role}
                        </motion.h3>
                        <motion.div
                          className="flex-shrink-0 w-[50px] h-[50px] mb-3 flex items-center justify-center mx-auto"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.4,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          {selectedExperience.companyInfo.logo && (
                            <img
                              src={selectedExperience.companyInfo.logo}
                              alt={`${selectedExperience.company} logo`}
                              className="max-w-full max-h-full object-contain"
                              width="50"
                              height="50"
                              onError={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "#2563eb";
                                e.currentTarget.style.borderRadius = "4px";
                              }}
                            />
                          )}
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="text-primary-light font-medium">
                            {selectedExperience.company}
                          </div>
                          <div className="text-sm text-text-gray">
                            {selectedExperience.startDate} -{" "}
                            {selectedExperience.endDate}
                          </div>
                        </motion.div>
                      </div>
                      {selectedExperience.isCurrentRole && (
                        <motion.div
                          className="mt-4"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          <span className="bg-primary-DEFAULT/20 text-primary-light px-6 py-2 rounded-full text-base font-medium border border-primary-light/30">
                            Current Role
                          </span>
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div
                      className="mb-8 glass-effect p-8 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <h4 className="text-lg font-medium text-gradient mb-3">
                        About the Company
                      </h4>
                      <p className="text-text-gray px-4">
                        {selectedExperience.companyInfo.description}
                      </p>
                    </motion.div>

                    <motion.div
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <h4 className="text-lg font-medium text-gradient mb-3">
                        Role Description
                      </h4>
                      <p className="text-text-gray px-4">
                        {selectedExperience.description}
                      </p>
                    </motion.div>

                    {selectedExperience.responsibilities.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <h4 className="text-lg font-medium text-gradient mb-3">
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-2 text-text-gray">
                          {selectedExperience.responsibilities.map(
                            (responsibility, index) => (
                              <motion.li
                                key={index}
                                className="flex items-start p-3 rounded-lg hover:bg-primary-DEFAULT/10 transition-colors"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: 1 + index * 0.05,
                                }}
                              >
                                <span className="text-primary-light mr-2 text-xs">
                                  •
                                </span>
                                <span className="px-4">{responsibility}</span>
                              </motion.li>
                            )
                          )}
                        </ul>
                      </motion.div>
                    )}

                    {selectedExperience.companyInfo.website && (
                      <motion.div
                        className="mt-8 pt-6 border-t border-gray-800"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                      >
                        <a
                          href={selectedExperience.companyInfo.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-light hover:text-primary-accent transition-colors"
                        >
                          Visit Company Website
                        </a>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
