import React, { useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaChartLine,
  FaCog,
  FaRocket,
  FaShieldAlt,
  FaLightbulb,
  FaChartBar,
  FaClipboardCheck,
} from "react-icons/fa";

const FeaturesSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform values for scroll effects
  const centralCardScale = useTransform(
    scrollYProgress,
    [0.1, 0.3],
    [0.95, 1.05]
  );
  const sideCardsBlur = useTransform(scrollYProgress, [0.1, 0.3], [0, 3]);
  const sideCardsOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0.7]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black py-20 overflow-hidden"
    >
      {/* Background decorative elements */}
      <motion.div
        animate={{
          opacity: [0.1, 0.14, 0.1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute top-40 -right-20 text-white text-[300px] font-bold"
      >
        *
      </motion.div>

      <motion.div
        animate={{
          opacity: [0.05, 0.08, 0.05],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute -bottom-40 -left-20 text-white text-[400px] font-bold"
      >
        *
      </motion.div>

      <div className="container mx-auto px-6 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
              Advanced Features
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Our professional-grade platform gives you everything you need to
            develop, test, and optimize your NIFTY options trading strategies.
          </p>
        </motion.div>

        {/* Main features display */}
        <div className="relative min-h-[500px] my-24">
          {/* Side Features (Left) */}
          <motion.div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 space-y-8 w-64 md:w-72"
            style={{
              filter: `blur(${sideCardsBlur}px)`,
              opacity: sideCardsOpacity,
            }}
          >
            <FeatureCard
              icon={<FaChartBar />}
              title="Comprehensive Analysis"
              description="Detailed metrics including win rate, Sharpe ratio, drawdown, and more."
              index={0}
              metrics={[
                { label: "Win Rate", value: "68.5%" },
                { label: "CAGR", value: "27.6%" },
              ]}
            />

            <FeatureCard
              icon={<FaShieldAlt />}
              title="Risk Management"
              description="Simulate strategies without risking real capital."
              index={1}
              metrics={[
                { label: "Max Drawdown", value: "14.2%" },
                { label: "Risk Ratio", value: "1.94" },
              ]}
            />
          </motion.div>

          {/* Center Feature */}
          <motion.div
            className="relative mx-auto z-20 max-w-md"
            style={{ scale: centralCardScale }}
          >
            <CentralFeature />
          </motion.div>

          {/* Side Features (Right) */}
          <motion.div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 space-y-8 w-64 md:w-72"
            style={{
              filter: `blur(${sideCardsBlur}px)`,
              opacity: sideCardsOpacity,
            }}
          >
            <FeatureCard
              icon={<FaLightbulb />}
              title="Strategy Builder"
              description="Intuitive interface to create complex multi-leg options strategies."
              index={2}
              metrics={[
                { label: "Strategy Types", value: "12+" },
                { label: "Custom Rules", value: "∞" },
              ]}
            />

            <FeatureCard
              icon={<FaClipboardCheck />}
              title="Optimization Tools"
              description="Fine-tune parameters to maximize performance."
              index={3}
              metrics={[
                { label: "Parameters", value: "20+" },
                { label: "Iterations", value: "Fast" },
              ]}
            />
          </motion.div>
        </div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32"
        >
          <FeatureGridItem
            icon={<FaChartLine className="text-red-500" />}
            title="Performance Tracking"
            description="Track every aspect of your strategy performance with detailed metrics and visualizations."
            delay={0.1}
          />

          <FeatureGridItem
            icon={<FaCog className="text-orange-500" />}
            title="Flexible Configuration"
            description="Customize entry/exit times, trading days, and expiry selections to match your trading style."
            delay={0.2}
          />

          <FeatureGridItem
            icon={<FaRocket className="text-yellow-500" />}
            title="Rapid Backtesting"
            description="Test years of market data in seconds for quick strategy validation and improvement."
            delay={0.3}
          />
        </motion.div>
      </div>
    </section>
  );
};

// Feature Card Component for side displays
const FeatureCard = ({ icon, title, description, metrics, index }) => (
  <motion.div
    initial={{ opacity: 0, x: index < 2 ? -30 : 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7, delay: 0.1 * index }}
    viewport={{ once: true }}
    className="bg-gray-900 rounded-xl p-5 border border-gray-800 shadow-lg"
  >
    <div className="flex items-center mb-3">
      <div className="text-red-500 text-xl mr-3">{icon}</div>
      <h3 className="font-bold text-white">{title}</h3>
    </div>

    <p className="text-gray-400 text-sm mb-4">{description}</p>

    <div className="flex justify-between">
      {metrics.map((metric, i) => (
        <div key={i} className="bg-gray-800 rounded-lg px-3 py-2 text-center">
          <p className="text-xs text-gray-400">{metric.label}</p>
          <p className="text-white font-bold">{metric.value}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

// Central Feature Component
const CentralFeature = () => {
  // Animated chart data
  const chartPoints = [20, 22, 19, 23, 25, 28, 26, 29, 32, 30, 34];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gray-900 rounded-2xl p-6 border border-gray-700 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>

      <h3 className="text-xl font-bold text-white mb-4 text-center">
        Strategy Builder
      </h3>

      <div className="bg-gray-800 rounded-xl p-4 mb-6">
        <div className="flex justify-between mb-3">
          <div className="text-gray-400 text-sm">Strategy Type</div>
          <div className="text-white font-medium text-sm">Iron Condor</div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-900 p-2 rounded-lg">
            <p className="text-xs text-gray-400">Option Type</p>
            <div className="flex mt-1">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-md mr-1">
                CE
              </span>
              <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-md">
                PE
              </span>
            </div>
          </div>

          <div className="bg-gray-900 p-2 rounded-lg">
            <p className="text-xs text-gray-400">Position</p>
            <div className="flex mt-1">
              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-md mr-1">
                BUY
              </span>
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-md">
                SELL
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-3 rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400">Leg Configuration</p>
            <div className="flex space-x-1">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 2,
                    delay: i * 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="w-1 h-6 bg-gradient-to-t from-red-500 to-orange-500 rounded-full"
                ></motion.div>
              ))}
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">SELL CE</span>
              <span className="text-white">+1 @ ATM+300</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">BUY CE</span>
              <span className="text-white">-1 @ ATM+500</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">SELL PE</span>
              <span className="text-white">+1 @ ATM-300</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">BUY PE</span>
              <span className="text-white">-1 @ ATM-500</span>
            </div>
          </div>
        </div>

        {/* Mini Chart */}
        <div className="h-16 relative">
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-full">
            {chartPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${point}px` }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`w-1.5 rounded-t-sm ${
                  i % 2 === 0 ? "bg-red-500" : "bg-orange-500"
                }`}
              ></motion.div>
            ))}
          </div>
          <motion.div
            animate={{
              x: ["0%", "100%", "0%"],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-4 left-0 w-full border-t border-dashed border-green-500 z-10"
          >
            <div className="bg-green-500 text-xs px-1 text-white absolute -top-4 -right-1">
              B/E
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex space-x-3">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-xl text-sm font-medium"
        >
          Run Backtest
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-10 bg-gray-800 rounded-xl flex items-center justify-center text-white"
        >
          <FaCog />
        </motion.button>
      </div>

      {/* Decorative elements */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-12 -right-12 w-24 h-24 border border-gray-800 rounded-full opacity-20"
      ></motion.div>
      <motion.div
        animate={{
          rotate: [360, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-16 -right-16 w-32 h-32 border border-gray-800 rounded-full opacity-15"
      ></motion.div>
    </motion.div>
  );
};

// Feature Grid Item Component
const FeatureGridItem = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all group"
  >
    <div className="mb-4 text-2xl">{icon}</div>
    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-red-500 transition-colors">
      {title}
    </h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

export default FeaturesSection;
