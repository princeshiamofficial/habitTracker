import React from 'react';

interface StreakCounterProps {
  currentStreak: number;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({ currentStreak }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        {Array.from({ length: Math.min(currentStreak, 7) }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === 0 ? 'bg-orange-500' : 'bg-orange-300'
            }`}
          />
        ))}
        {currentStreak > 7 && (
          <span className="text-xs text-gray-500 ml-1">+{currentStreak - 7}</span>
        )}
      </div>
      <div>
        <div className="text-sm text-gray-500">Current Streak</div>
        <div className="text-lg font-semibold text-orange-600">
          {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
        </div>
      </div>
    </div>
  );
};
