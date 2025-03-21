/* eslint-disable no-unused-vars */
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowDown, FaChartLine, FaShieldAlt, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { scrollYProgress } = useScroll();

  // Transform values based on scroll position
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const displayY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <motion.section
      style={{ scale: heroScale }}
      className="relative min-h-screen flex items-center overflow-hidden pt-24 bg-black"
    >
      <div className="container mx-auto px-6 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-7xl font-bold leading-tight text-white"
            >
              <span className="relative">
                TURBO
                <Badge
                  text="NO RISKING CAPITAL"
                  delay={0.5}
                  position="-top-8 -right-16"
                />
              </span>{" "}
              <br />
              <span className="relative">
                TRADE
                <Badge
                  text="NIFTY OPTIONS EXPERT"
                  delay={0.7}
                  position="top-16 left-10"
                />
              </span>{" "}
              <br />
              <span className="relative text-4xl md:text-5xl">
                Backtesting Engine
                <Badge
                  text="FULL STRATEGY CONTROL"
                  delay={0.9}
                  position="-bottom-8 left-20"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-12 text-lg text-gray-300 max-w-md"
            >
              Develop, test, and optimize option trading strategies on the NIFTY
              index with our professional-grade backtesting platform.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium py-4 px-8 rounded-full flex items-center space-x-2 hover:from-red-600 hover:to-orange-600 transition-all"
            >
              <FaArrowDown className="transform rotate-45" />{" "}
              <Link to="/main">
                <span>Get Started</span>
              </Link>
            </motion.button>
          </div>

          <motion.div
            style={{ y: displayY }}
            className="relative hidden md:block"
          >
            <TradingDisplays />
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute -bottom-40 -left-40 text-white text-[400px] font-bold"
      >
        *
      </motion.div>
    </motion.section>
  );
};

// Badge Component
const Badge = ({ text, delay, position }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: delay }}
    className={`absolute ${position} bg-black px-3 py-1 rounded-md text-sm font-normal border border-gray-700`}
  >
    <span className="text-xs">★</span> {text}
  </motion.div>
);

// Trading Displays Component
const TradingDisplays = () => (
  <>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="absolute -top-32 right-0 bg-gray-900 p-6 rounded-xl shadow-xl max-w-xs"
    >
      <div className="flex justify-between items-center">
        <p className="text-gray-400 text-sm">Strategy Performance</p>
        <FaChartLine className="text-red-500" />
      </div>
      <h3 className="text-3xl font-bold mt-2 text-white">+₹32,944.50</h3>
      <p className="text-green-500 text-sm mt-1">↑ Win Rate: 68.5%</p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="relative bg-gray-900 rounded-3xl p-3 shadow-2xl border border-gray-700 z-10 transform rotate-6 mt-20"
    >
      <div className="bg-gray-900 rounded-2xl p-6 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <div className="w-10 h-5 bg-gray-700 rounded-full"></div>
            <div className="w-10 h-5 bg-gray-700 rounded-full"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-700 rounded-sm"></div>
            <div className="text-xs text-gray-400">9:41</div>
          </div>
        </div>

        <div className="text-center mb-4">
          <h3 className="font-medium text-white">Iron Condor - NIFTY</h3>
        </div>

        <div className="flex justify-between space-x-2 mb-4">
          <button className="bg-gray-800 px-3 py-1 rounded-md text-xs text-gray-300">
            Weekly
          </button>
          <button className="bg-gray-800 px-3 py-1 rounded-md text-xs text-gray-300">
            Monthly
          </button>
          <button className="bg-red-500 px-3 py-1 rounded-md text-xs text-white">
            Thursday
          </button>
          <button className="bg-gray-800 px-3 py-1 rounded-md text-xs text-gray-300">
            Delta
          </button>
        </div>

        <div className="bg-gray-800 px-4 py-3 rounded-xl mb-6 text-gray-300">
          <div className="text-center">2 Lots × 4 Legs</div>
        </div>

        <button className="w-full bg-red-500 text-white py-3 rounded-xl">
          Run Backtest
        </button>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="absolute -bottom-20 left-0 bg-gray-900 p-6 rounded-xl shadow-xl max-w-xs"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm">Annual Performance</p>
          <h3 className="text-2xl font-bold mt-1 text-white">Sharpe: 1.82</h3>
        </div>
        <div className="text-green-500 font-medium">↑ 27.6%</div>
      </div>
    </motion.div>
  </>
);

export default HeroSection;
