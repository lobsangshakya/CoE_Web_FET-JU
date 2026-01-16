
import React from 'react';
import { ProjectProgress } from '../../types';

interface ProgressBarProps {
  steps: ProjectProgress[];
  currentStep: ProjectProgress;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep, className = '' }) => {
  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <div className={`w-full flex items-center ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;

        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted ? 'bg-orange-accent border-orange-accent text-white' : 
                  isCurrent ? 'border-orange-accent bg-transparent text-orange-accent scale-110' : 
                  'border-gray-500 bg-transparent text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="font-bold">{index + 1}</span>
                )}
              </div>
              <p className={`mt-2 text-xs text-center font-semibold ${
                isCompleted || isCurrent ? 'text-white' : 'text-gray-400'
              }`}>{step}</p>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2 transition-colors duration-300 ${isCompleted ? 'bg-orange-accent' : 'bg-gray-500'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressBar;
