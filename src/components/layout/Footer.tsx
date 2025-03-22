"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-dark text-text-light py-8 border-t border-gray-800">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Main footer content in a horizontal layout */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Location */}
          <p className="text-sm text-text-muted flex items-center">
            Essex, United Kingdom
          </p>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-6">
            {[
              { href: "#about", label: "About" },
              { href: "#experience", label: "Experience" },
              { href: "#skills", label: "Skills" },
              { href: "#chat", label: "Chat With My CV" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-gray hover:text-primary-light transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact Info */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:dawsonpaul@gmail.com"
              className="text-sm text-text-gray hover:text-primary-light transition-colors duration-300"
            >
              dawsonpaul@gmail.com
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {["LinkedIn", "GitHub"].map((platform) => (
              <a
                key={platform}
                href="#"
                className="text-sm text-text-gray hover:text-primary-light transition-colors duration-300"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          className="text-center text-sm text-text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p>
            &copy; {currentYear} Paul Anthony Dawson. All rights reserved. Built
            with Next.js and SCSS
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
