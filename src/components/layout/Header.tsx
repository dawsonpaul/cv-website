"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      const handleClickOutside = () => {
        setMobileMenuOpen(false);
      };

      // Add a slight delay to prevent immediate closing when opening
      const timer = setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timer);
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [mobileMenuOpen]);

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.header
      className={`header-fixed ${
        scrolled ? "header-scrolled backdrop-blur-md" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex justify-between items-center py-3 px-6">
        <motion.div
          className="font-bold text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-gradient">Paul</span>
            <span className="text-text-light">Dawson</span>
          </Link>
        </motion.div>

        <div className="flex items-center">
          <motion.nav
            className="hidden md:flex items-center space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <NavLink href="#about">About</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#chat">Chat With My CV</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </motion.nav>

          {/* GitHub Button with Image */}
          <a
            href="https://github.com/dawsonpaul/cv-website"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center bg-gray-800 hover:bg-gray-700 text-white font-bold text-sm px-4 py-2 rounded-md ml-6 transition-colors duration-300"
          >
            <img
              src="/images/github.svg"
              alt="GitHub"
              width={20}
              height={20}
              className="mr-2"
            />
            GitHub
          </a>

          <motion.div
            className="md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              className="text-text-light p-2 rounded-md"
              onClick={toggleMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 w-full glass-effect shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="py-4 px-6 space-y-4">
              <MobileNavLink
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </MobileNavLink>
              <MobileNavLink
                href="#experience"
                onClick={() => setMobileMenuOpen(false)}
              >
                Experience
              </MobileNavLink>
              <MobileNavLink
                href="#skills"
                onClick={() => setMobileMenuOpen(false)}
              >
                Skills
              </MobileNavLink>
              <MobileNavLink
                href="#chat"
                onClick={() => setMobileMenuOpen(false)}
              >
                Chat With My CV
              </MobileNavLink>
              <MobileNavLink
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </MobileNavLink>
              <MobileNavLink
                href="https://github.com/dawsonpaul/cv-website"
                onClick={() => setMobileMenuOpen(false)}
              >
                GitHub
              </MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="text-text-light hover:text-primary-light transition-colors duration-300 relative group font-medium px-4 py-1"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-light transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
};

const MobileNavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <Link
      href={href}
      className="block py-2 text-text-light hover:text-primary-light transition-colors duration-300"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Header;
