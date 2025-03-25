/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const StepIndicator = ({ steps, currentStep, setCurrentStep }) => {
  return (
    <div className="relative py-8">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-1 bg-slate-700 absolute">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>
      </div>

      <div className="flex justify-between relative z-10">
        {steps.map((step, idx) => (
          <motion.div
            key={step.id}
            className="flex flex-col items-center"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{
              opacity: idx <= currentStep ? 1 : 0.5,
              scale: idx === currentStep ? 1.1 : 1,
            }}
            whileHover={{ scale: idx <= currentStep ? 1.2 : 1 }}
            whileTap={{ scale: idx <= currentStep ? 0.95 : 1 }}
          >
            <motion.div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center 
                text-white font-bold cursor-pointer shadow-lg
                ${
                  idx === currentStep
                    ? "bg-gradient-to-br from-cyan-500 to-blue-600 ring-4 ring-cyan-500/50"
                    : idx < currentStep
                    ? "bg-gradient-to-br from-cyan-600 to-blue-700"
                    : "bg-slate-700"
                }
              `}
              onClick={() => idx < currentStep && setCurrentStep(idx)}
            >
              <AnimatePresence mode="wait">
                {idx === currentStep ? (
                  <motion.span
                    key="current"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                  >
                    {idx + 1}
                  </motion.span>
                ) : (
                  <motion.span
                    key="other"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {idx + 1}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              className={`
                text-xs mt-2 whitespace-nowrap transition-all duration-300
                ${
                  idx === currentStep
                    ? "text-cyan-400 font-semibold"
                    : idx < currentStep
                    ? "text-white"
                    : "text-gray-400"
                }
              `}
            >
              {step.title}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
