import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps, stepTitles }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        <div className="absolute -top-1 right-0 text-sm font-medium text-gray-600">
          {Math.round(progress)}%
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between">
        {stepTitles.map((title, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={index} className="flex flex-col items-center">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mb-2 ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isCurrent
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? <Check size={16} /> : stepNumber}
              </motion.div>
              <span className={`text-xs text-center max-w-20 ${
                isCurrent ? 'text-cyan-600 font-medium' : 'text-gray-500'
              }`}>
                {title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;