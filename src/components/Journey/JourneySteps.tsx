import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define the journey step type
type JourneyStep = {
  id: number;
  title: string;
  description: string;
  icon: string;
  content: string;
};

// Define the steps in the user journey
const journeySteps: JourneyStep[] = [
  {
    id: 1,
    title: "Configuration",
    description: "Set up your trading strategy parameters",
    icon: "⚙️",
    content:
      "Use the Configuration Wizard to define your trading parameters, including asset selection, timeframe, and strategy rules.",
  },
  {
    id: 2,
    title: "Backtesting",
    description: "Run historical tests on your strategy",
    icon: "📊",
    content:
      "Upload historical data or use our provided datasets to evaluate how your strategy would have performed in the past.",
  },
  {
    id: 3,
    title: "Analysis",
    description: "Review your strategy performance",
    icon: "📈",
    content:
      "Examine key metrics like win/loss ratios, profit by price movement, and trade duration to understand your strategy strengths and weaknesses.",
  },
  {
    id: 4,
    title: "Optimization",
    description: "Refine your strategy for better results",
    icon: "🔍",
    content:
      "Use the insights from your backtest to iterate and improve your trading parameters for better performance.",
  },
  {
    id: 5,
    title: "Deployment",
    description: "Implement your strategy in live markets",
    icon: "🚀",
    content:
      "Once satisfied with your backtesting results, deploy your strategy to start trading with confidence.",
  },
];

interface JourneyStepsProps {
  className?: string;
}

const JourneySteps: React.FC<JourneyStepsProps> = ({ className = "" }) => {
  const [activeStep, setActiveStep] = useState(1);

  // Animation variants
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

  // 3D tilt effect on hover
  const tilt = {
    rest: {
      transform: "perspective(500px) rotateX(0deg) rotateY(0deg)",
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      transform: "perspective(500px) rotateX(10deg) rotateY(-10deg)",
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className={`py-24 px-4 bg-stone-50 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={staggerChildren}
    >
      <div className="container mx-auto relative">
        {/* Decorative elements */}
        <motion.div
          className="absolute -top-20 left-0 w-32 h-32 rounded-full bg-stone-100"
          animate={{
            y: [0, -15, 0],
            transition: {
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            },
          }}
          style={{ zIndex: 0 }}
        />

        <motion.div
          className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-stone-100"
          animate={{
            y: [0, -15, 0],
            transition: {
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            },
          }}
          style={{ zIndex: 0 }}
        />

        <motion.h2
          className="text-4xl md:text-5xl font-bold text-black text-center mb-6 relative z-10"
          variants={fadeInUp}
        >
          Your Path to Excellence
        </motion.h2>

        <motion.div
          className="w-24 h-1 bg-stone-900 mx-auto mb-16"
          variants={fadeInUp}
        />

        {/* Step Navigation */}
        <motion.div
          className="flex flex-wrap justify-center mb-16 gap-4"
          variants={staggerChildren}
        >
          {journeySteps.map((step) => (
            <motion.button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`flex items-center px-6 py-3 border-2 rounded-lg transition-all duration-300 ${
                activeStep === step.id
                  ? "bg-stone-900 text-white border-stone-900 shadow-lg"
                  : "bg-transparent text-stone-900 border-stone-300 hover:border-stone-900"
              }`}
              variants={fadeInUp}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-3">{step.icon}</span>
              <span className="font-medium">{step.title}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Active Step Content */}
        <div className="relative">
          {/* Progress Bar */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-stone-200 -z-10">
            <motion.div
              className="h-full bg-stone-900 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: activeStep / journeySteps.length }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)" }}
            />
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            <AnimatePresence mode="wait">
              {journeySteps.map((step) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    scale: activeStep === step.id ? 1.05 : 1,
                    y: activeStep === step.id ? -10 : 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div initial="rest" whileHover="hover" animate="rest">
                    <motion.div
                      className={`p-8 flex flex-col items-center text-center h-full bg-white rounded-xl ${
                        activeStep === step.id
                          ? "shadow-xl border-2 border-stone-900"
                          : "shadow-md border border-stone-100"
                      }`}
                      variants={tilt}
                    >
                      <motion.div
                        className={`w-20 h-20 flex items-center justify-center text-3xl mb-6 rounded-full ${
                          step.id <= activeStep
                            ? "bg-stone-900 text-white"
                            : "bg-stone-100 text-stone-400"
                        }`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {step.icon}
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-3">
                        {step.title}
                      </h3>
                      <p className="text-sm text-stone-600 mb-4">
                        {step.description}
                      </p>
                      <p className="text-sm">{step.content}</p>

                      {activeStep === step.id && (
                        <motion.div
                          className="mt-3 w-full  border-t border-stone-100"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                        >
                          <button className="text-stone-900 font-medium">
                            Learn More →
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JourneySteps;
