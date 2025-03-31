import React from "react";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Function to handle scroll to another section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      id="hero"
      className="relative h-screen flex items-center justify-center px-4 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <div className="absolute inset-0 bg-black z-0 overflow-hidden">
        {/* Background with parallax effect */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            y: 0,
          }}
          transition={{ type: "tween", ease: "easeOut", duration: 1 }}
        ></motion.div>

        {/* Animated overlay gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-transparent to-stone-900/90 z-1"
          animate={{
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Animated grid pattern */}
        <motion.div
          className="absolute inset-0 z-2 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          animate={{
            y: [0, -40],
            x: [0, -40],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 text-center max-w-4xl"
        variants={staggerChildren}
      >
        <motion.div
          className="mb-8 inline-block"
          variants={fadeInUp}
          initial={{ rotate: -5 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <motion.div
            className="px-6 py-2 bg-stone-900 text-white text-sm tracking-wider uppercase font-bold"
            whileHover={{ scale: 1.05 }}
          >
            Professional Trading Platform
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-6xl md:text-7xl font-bold mb-6 text-white"
          variants={fadeInUp}
        >
          <span className="block">Master Your</span>
          <span className="relative inline-block">
            Trading
            <motion.span
              className="absolute -bottom-2 left-0 h-1 bg-white"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 1 }}
            />
          </span>
          <span className=""> Strategy</span>
        </motion.h1>

        <motion.p
          className="text-xl text-stone-100 mb-12 max-w-2xl mx-auto"
          variants={fadeInUp}
        >
          Develop, test, and optimize with professional-grade tools designed for
          serious traders who demand excellence
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-6"
          variants={fadeInUp}
        >
          <motion.button
            className="px-8 py-4 bg-stone-900 text-white text-lg font-semibold border-2 border-stone-900 hover:bg-transparent hover:text-white transition-all duration-300 shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Begin Your Journey
          </motion.button>
          <motion.button
            className="px-8 py-4 bg-transparent text-white text-lg font-semibold border-2 border-white hover:bg-white hover:text-stone-900 transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            View Demonstrations
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Enhanced scroll down indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => scrollToSection("journey")}
          whileHover={{ scale: 1.1 }}
        >
          <motion.span
            className="text-white text-sm mb-2 tracking-wider uppercase"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Discover More
          </motion.span>
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
