"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { buttonVariants } from "../components/ui/button";
import BookConsultationButton from "./BookConsultationButton";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// Theme interface for defining different navbar themes
interface NavbarTheme {
  background: string;
  textColor: string;
  buttonBg: string;
  buttonText: string;
  borderColor: string;
  hamburgerColor: string;
  hasBorder: boolean;
}

// Available themes
const themes: Record<string, NavbarTheme> = {
  light: {
    background: "bg-[var(--background-color-plain)]",
    textColor: "text-[var(--text-color-dark)]",
    buttonBg: "bg-[var(--background-color-dark)]",
    buttonText: "text-[var(--text-color-plain)]",
    borderColor: "border-[#dedede]",
    hamburgerColor: "bg-[#024027]",
    hasBorder: true
  },
  dark: {
    background: "bg-[var(--background-color-dark)]",
    textColor: "text-white",
    buttonBg: "bg-[var(--background-color-light)]",
    buttonText: "text-[var(--text-color-dark)]",
    borderColor: "border-[#3c5951]",
    hamburgerColor: "bg-white",
    hasBorder: false
  }
};

interface NavbarProps {
  theme?: string; // Theme name: 'light' or 'dark'
}

const Navbar: React.FC<NavbarProps> = ({
  theme = "light", // Default to light theme
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Get the current theme settings
  const currentTheme = themes[theme] || themes.light;

  // Helper function to get the underline color class based on theme
  const getUnderlineClass = () => {
    return theme === 'dark' ? 'after:bg-white' : 'after:bg-[var(--text-color-dark)]';
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav 
        className={`fixed ${currentTheme.background} h-[12.5%] left-0 w-full z-50 ${currentTheme.hasBorder ? `border-b ${currentTheme.borderColor}` : ''} py-6 px-6`}
      >
        <div className="max-w-7xl w-full h-full mx-auto flex items-center justify-between sm:px-8">
          {/* Logo */}
          <Link href="/" className="">
            <div className="w-60 h-60 pt-8  ">
              {/* SVG Logo */}
              <img src="/images/rem_nutri_logo_.png" alt="RemDi Logo" />
            </div>
          </Link>

          {/* Navigation Links & Button - Desktop */}
          <div className="hidden md:flex items-center space-x-15">
            <div className="flex items-center space-x-9">
              <Link
                href="/about"
                className={`${currentTheme.textColor} text-[16px] font-['DM_Sans', 'sans-serif'] font-normal transition-colors hover:opacity-80 ${
                  pathname === "/about" 
                    ? `relative after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] ${getUnderlineClass()}`
                    : ""
                }`}
              >
                About
              </Link>
              <Link
                href="/services"
                className={`${currentTheme.textColor} text-[16px] font-['DM_Sans', 'sans-serif'] font-normal transition-colors hover:opacity-80 ${
                  pathname === "/services" 
                    ? `relative after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] ${getUnderlineClass()}`
                    : ""
                }`}
              >
                Programs & Services
              </Link>
              <Link
                href="/blog"
                className={`${currentTheme.textColor} text-[16px] font-['DM_Sans', 'sans-serif'] font-normal transition-colors hover:opacity-80 ${
                  pathname === "/blog" 
                    ? `relative after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] ${getUnderlineClass()}`
                    : ""
                }`}
              >
                Blog
              </Link>
              <Link
                href="/careers"
                className={`${currentTheme.textColor} text-[16px] font-['DM_Sans', 'sans-serif'] font-normal transition-colors hover:opacity-80 ${
                  pathname === "/careers" 
                    ? `relative after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] ${getUnderlineClass()}`
                    : ""
                }`}
              >
                Careers
              </Link>
              <Link
                href="/contact"
                className={`${currentTheme.textColor} text-[16px] font-['DM_Sans', 'sans-serif'] font-normal transition-colors hover:opacity-80 ${
                  pathname === "/contact" 
                    ? `relative after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] ${getUnderlineClass()}`
                    : ""
                }`}
              >
                Contact
              </Link>
            </div>
            <BookConsultationButton
              className={cn(
                buttonVariants(),
                `${currentTheme.buttonBg} hover:opacity-80 ${currentTheme.buttonText} text-[16px] font-semibold px-[24px] py-[24px] rounded-lg shadow-md cursor-pointer`
              )}
            >
              Book an appointment
            </BookConsultationButton>
          </div>

          {/* Hamburger Menu Button - Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden z-50 relative w-10 h-10 flex items-center justify-center -top-2 right-4"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative">
              <motion.span
                initial={{ rotate: 0, y: 0 }}
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.6, 0.05, 0.01, 0.9] }}
                className={`absolute w-8 h-0.5 ${currentTheme.hamburgerColor} transform`}
              ></motion.span>
              <motion.span
                initial={{ opacity: 1 }}
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={`absolute w-8 h-0.5 ${currentTheme.hamburgerColor} transform`}
                style={{ top: "8px" }}
              ></motion.span>
              <motion.span
                initial={{ rotate: 0, y: 8 }}
                animate={isOpen ? { rotate: -45, y: 8 } : { rotate: 0, y: 16 }}
                transition={{ duration: 0.3, ease: [0.6, 0.05, 0.01, 0.9] }}
                className={`absolute w-8 h-0.5 ${currentTheme.hamburgerColor} transform`}
              ></motion.span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 1, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: "-100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              duration: 0.5,
            }}
            className={`fixed inset-0 ${currentTheme.background} z-25 md:hidden overflow-hidden shadow-lg`}
            style={{
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
              top: "-1px", // Ensure no gap at the top
            }}
          >
            <motion.div
              className="flex flex-col h-full space-y-8 pt-32 px-6 font-['DM_Sans', 'sans-serif'] text-2xl"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.07,
                    delayChildren: 0.2,
                    when: "beforeChildren",
                  },
                },
                exit: {
                  opacity: 0,
                  transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1,
                    when: "afterChildren",
                  },
                },
              }}
            >
              <motion.div
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 300, damping: 24 },
                  },
                  exit: { y: 20, opacity: 0 },
                }}
              >
                <Link
                  href="/about"
                  className={`${currentTheme.textColor} text-[24px] font-normal ${
                    pathname === "/about" 
                      ? `relative after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] ${getUnderlineClass()}`
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 300, damping: 24 },
                  },
                  exit: { y: 20, opacity: 0 },
                }}
              >
                <Link
                  href="/services"
                  className={`${currentTheme.textColor} text-[24px] font-normal ${
                    pathname === "/services" 
                      ? `relative after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] ${getUnderlineClass()}`
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 300, damping: 24 },
                  },
                  exit: { y: 20, opacity: 0 },
                }}
              >
                <Link
                  href="/blog"
                  className={`${currentTheme.textColor} text-[24px] font-normal ${
                    pathname === "/blog" 
                      ? `relative after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] ${getUnderlineClass()}`
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 300, damping: 24 },
                  },
                  exit: { y: 20, opacity: 0 },
                }}
              >
                <Link
                  href="/careers"
                  className={`${currentTheme.textColor} text-[24px] font-normal ${
                    pathname === "/careers" 
                      ? `relative after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] ${getUnderlineClass()}`
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Careers
                </Link>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 300, damping: 24 },
                  },
                  exit: { y: 20, opacity: 0 },
                }}
              >
                <Link
                  href="/contact"
                  className={`${currentTheme.textColor} text-[24px] font-normal ${
                    pathname === "/contact" 
                      ? `relative after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] ${getUnderlineClass()}`
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                      delay: 0.2,
                    },
                  },
                  exit: { y: 20, opacity: 0 },
                }}
              >
                {/*
                  Note: this must not close the mobile menu on open. The button
                  lives inside the menu's AnimatePresence subtree, so closing the
                  menu unmounts the button and the dialog portal it owns. The
                  dialog sits above the menu (z-9999 vs z-25) instead.
                */}
                <BookConsultationButton
                  className={cn(
                    buttonVariants(),
                    `${currentTheme.buttonBg} hover:opacity-80 ${currentTheme.buttonText} text-[16px] font-semibold px-[24px] py-[24px] rounded-lg shadow-md mt-8 w-full`
                  )}
                >
                  Book an appointment
                </BookConsultationButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;