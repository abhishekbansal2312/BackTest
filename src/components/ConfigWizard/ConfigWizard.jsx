import React, { useState } from "react";
import { useBacktest } from "../../contexts/BacktestContext";
import GeneralConfig from "./GeneralConfig";
import EntryExitConfig from "./EntryExitConfig";
import BacktestSettings from "./BacktestSettings";
import OptionLegConfig from "./OptionLegConfig";
import ConfigSummary from "./ConfigSummary";

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
    <div className="glass-panel p-6">
      <h1 className="text-2xl font-bold text-white mb-6">
        Options Backtest Configuration
      </h1>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8 relative">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex flex-col items-center z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
                ${
                  idx <= currentStep
                    ? "bg-primary text-white"
                    : "bg-gray-700 text-gray-400"
                }`}
              onClick={() => idx < currentStep && setCurrentStep(idx)}
            >
              {idx + 1}
            </div>
            <div
              className={`text-sm mt-2 ${
                idx <= currentStep ? "text-white" : "text-gray-400"
              }`}
            >
              {step.title}
            </div>
          </div>
        ))}
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-700 -z-0">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        <StepComponent nextStep={nextStep} />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          className="btn-secondary px-6 py-2"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          Back
        </button>

        {currentStep < steps.length - 1 ? (
          <button className="btn-primary px-6 py-2" onClick={nextStep}>
            Continue
          </button>
        ) : (
          <button
            className="btn-primary px-6 py-2"
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
