import React, { useState } from "react";
import { useBacktest } from "../../contexts/BacktestContext";
import GeneralConfig from "./GeneralConfig";
import EntryExitConfig from "./EntryExitConfig";
import BacktestSettings from "./BackTestSettings";
import OptionLegConfig from "./OptionLegConfig";
import ConfigSummary from "./ConfigSummary";
import StepIndicator from "./StepIndicator";

const steps = [
  { id: "general", title: "Basic Setup", component: GeneralConfig },
  { id: "entryExit", title: "Entry & Exit", component: EntryExitConfig },
  { id: "settings", title: "Backtest Settings", component: BacktestSettings },
  { id: "legs", title: "Option Legs", component: OptionLegConfig },
  { id: "summary", title: "Review & Run", component: ConfigSummary },
];

const ConfigWizard = ({ onComplete, isLoading }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { buildConfig } = useBacktest();

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const StepComponent = steps[currentStep].component;

  return (
    <div className=" p-8 rounded-2xl shadow-2xl border border-indigo-800/50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-tight">
          Options Backtest Configuration
        </h1>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-400">Progress:</span>
          <span className="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
            {`Step ${currentStep + 1} of ${steps.length}`}
          </span>
        </div>
      </div>

      {/* Progress Steps */}
      <StepIndicator
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      {/* Step Content */}
      <div className="min-h-[400px] mb-8">
        <StepComponent nextStep={nextStep} />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          className={`px-6 py-2 rounded-md transition-all duration-300 ${
            currentStep === 0
              ? "bg-slate-700 text-gray-400 cursor-not-allowed"
              : "bg-slate-800 text-white hover:bg-slate-700 hover:ring-2 hover:ring-cyan-500/50"
          }`}
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          Back
        </button>

        {currentStep < steps.length - 1 ? (
          <button
            className="px-6 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-all duration-300 hover:ring-2 hover:ring-cyan-500/50"
            onClick={nextStep}
          >
            Continue
          </button>
        ) : (
          <button
            className={`px-6 py-2 rounded-md transition-all duration-300 ${
              isLoading
                ? "bg-slate-700 text-gray-400 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600 hover:ring-2 hover:ring-green-500/50"
            }`}
            onClick={() => {
              buildConfig();
              onComplete();
            }}
            disabled={isLoading}
          >
            {isLoading ? "Running..." : "Run Backtest"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ConfigWizard;
