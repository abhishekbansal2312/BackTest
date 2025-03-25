import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from "framer-motion";

const Header = () => {
  const { scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Transform values based on scroll position
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      style={{ opacity: headerOpacity }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center">
          <div className="text-2xl font-bold">
            BackTesting{" "}
            <span className="inline-flex items-center justify-center w-6 h-6 bg-black bg-opacity-20 rounded-full">
              <span className="text-sm">®</span>
            </span>{" "}
            Engine
          </div>
        </div>

        <nav className="hidden md:flex space-x-8">
          <a href="#about" className="hover:text-gray-300 transition-colors">
            About
          </a>
          <a href="#features" className="hover:text-gray-300 transition-colors">
            Features
          </a>
          <a
            href="#testimonials"
            className="hover:text-gray-300 transition-colors"
          >
            Testimonials
          </a>
          <a
            href="#membership"
            className="hover:text-gray-300 transition-colors"
          >
            Membership
          </a>
        </nav>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-black text-black font-medium py-2 px-6 rounded hover:bg-gray-200 transition-colors"
        >
          GET STARTED →
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
