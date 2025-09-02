import React from 'react';

interface ProgressChartProps {
  completionRate: number;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ completionRate }) => {
  const circumference = 2 * Math.PI * 40;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (completionRate / 100) * circumference;

  return (
    <div className="flex items-center space-x-4">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="#3b82f6"
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-700">
            {Math.round(completionRate)}%
          </span>
        </div>
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-500 mb-1">Progress</div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};
