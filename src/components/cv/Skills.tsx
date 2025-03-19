"use client";

import React from "react";
import { motion } from "framer-motion";
import { cvData, Skill } from "@/data/cv-data";
import { useState } from "react";
import {
  FaLock, // security
  FaCloud, // cloud
  FaCogs, // devops
  FaCode, // programming
  FaServer, // infrastructure
  FaTools, // tools
  FaBrain, // professional
  FaChartLine, // planning
  FaBook, // documentation
  FaLightbulb, // problem solving
  FaUsers, // team player
  FaGraduationCap, // learning
  FaPencilRuler, // design
  FaSitemap, // architecture
  FaProjectDiagram, // diagramming
  FaChalkboardTeacher, // for presentations
  FaRobot, // AI category
  FaLink, // Langchain
  FaHubspot, // Hugging Face (using similar looking icon)
  FaTerminal, // Ollama
  FaKeyboard, // Prompt Engineering
  FaDatabase, // Vector DBs
  FaCube, // Embedding
  FaStar, // Frontier Models
} from "react-icons/fa";

const categoryColors: Record<string, string> = {
  security: "from-accent-red to-accent-orange",
  cloud: "from-accent-blue to-accent-cyan",
  devops: "from-accent-green to-accent-teal",
  programming: "from-accent-purple to-accent-indigo",
  infrastructure: "from-accent-yellow to-accent-orange",
  tools: "from-accent-indigo to-accent-blue",
  ai: "from-accent-violet to-accent-purple",
};

const skillIcons: Record<string, React.ElementType> = {
  security: FaLock,
  cloud: FaCloud,
  devops: FaCogs,
  programming: FaCode,
  infrastructure: FaServer,
  tools: FaTools,
  professional: FaBrain,
  ai: FaRobot,
};

// Additional mapping for specific skill names
const skillNameIcons: Record<string, React.ElementType> = {
  "Design & Architecture": FaPencilRuler,
  "Planning & Implementation": FaChartLine,
  "Technical Documentation": FaBook,
  "Problem Solving": FaLightbulb,
  "Team Leadership": FaUsers,
  "Technical Presentations": FaChalkboardTeacher,
  "System Architecture": FaSitemap,
  Diagramming: FaProjectDiagram,
  "Continuous Learning": FaGraduationCap,
  LLMs: FaBrain,
  "Frontier Models": FaStar,
  "Hosted Models": FaServer,
  Langchain: FaLink,
  "Hugging Face": FaHubspot,
  Ollama: FaTerminal,
  "Prompt Engineering": FaKeyboard,
  Embedding: FaCube,
  "Vector DBs": FaDatabase,
};

// Add this utility function at the top of the file
const capitalizeFirstLetter = (string: string) => {
  // Handle hyphenated words (e.g., "co-founder" -> "Co-Founder")
  return string
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("-");
};

const Skills = () => {
  const { skills } = cvData;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get all categories except 'professional'
  const technicalCategories = Array.from(
    new Set(skills.map((skill) => skill.category))
  ).filter((category) => category !== "professional");

  const filteredSkills = selectedCategory
    ? skills.filter((skill) => skill.category === selectedCategory)
    : skills;

  // Sort skills alphabetically by name
  const sortedSkills = [...filteredSkills].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <section id="skills" className="py-20 bg-background-dark relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold text-text-light mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <div className="h-1 w-24 bg-primary-light mx-auto rounded-full mb-6"></div>
          <p className="text-text-gray max-w-2xl mx-auto">
            A comprehensive set of skills acquired over 24 years in the security
            industry.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center ${
              selectedCategory === null
                ? "bg-primary-DEFAULT text-white shadow-lg"
                : "glass-effect text-text-gray hover:bg-primary-DEFAULT/20"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All Skills
          </button>

          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center ${
              selectedCategory === "professional"
                ? "bg-primary-DEFAULT text-white shadow-lg"
                : "glass-effect text-text-gray hover:bg-primary-DEFAULT/20"
            }`}
            onClick={() => setSelectedCategory("professional")}
          >
            Professional
          </button>

          {technicalCategories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center ${
                selectedCategory === category
                  ? "bg-primary-DEFAULT text-white shadow-lg"
                  : "glass-effect text-text-gray hover:bg-primary-DEFAULT/20"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {capitalizeFirstLetter(category)}
            </button>
          ))}
        </motion.div>

        <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sortedSkills.map((skill, index) => (
            <SkillCard
              key={index}
              skill={{
                ...skill,
                name: capitalizeFirstLetter(skill.name),
                category: capitalizeFirstLetter(skill.category),
              }}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard = ({ skill, index }: SkillCardProps) => {
  const IconComponent =
    skillNameIcons[skill.name] || skillIcons[skill.category] || FaCode;

  return (
    <motion.div
      className="skill-card p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      {/* Skill Name at Top */}
      <h3 className="text-sm font-bold text-text-dark text-center mb-4">
        {skill.name}
      </h3>

      {/* Icon Container in Middle */}
      <div className="flex flex-col items-center justify-center flex-grow mb-4">
        <div
          className={`icon-container !w-[60px] !h-[60px] rounded-full bg-gradient-to-r ${
            categoryColors[skill.category]
          } flex items-center justify-center`}
          style={{ width: "60px", height: "60px" }}
        >
          <IconComponent
            className="skill-icon !w-[40px] !h-[40px] text-white"
            style={{ width: "40px", height: "40px" }}
          />
        </div>
      </div>

      {/* Skill Level at Bottom */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto bg-gradient-to-r ${
          categoryColors[skill.category]
        }`}
      >
        <span className="text-white text-xs font-bold">{skill.level}/5</span>
      </div>
    </motion.div>
  );
};

export default Skills;
