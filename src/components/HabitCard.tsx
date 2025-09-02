import React from 'react';
import { useHabits } from '../context/HabitContext';
import { Habit } from '../types/habit.types';
import { StreakCounter } from './StreakCounter';
import { ProgressChart } from './ProgressChart';

interface HabitCardProps {
  habit: Habit;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit }) => {
  const { toggleCompletion, getHabitStats } = useHabits();
  const stats = getHabitStats(habit.id);
  
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completions.some(
    c => c.date === today && c.completed
  );

  const handleToggleCompletion = () => {
    toggleCompletion(habit.id, today);
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg ${
      isCompletedToday ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{habit.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{habit.target}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="capitalize">{habit.frequency}</span>
            <span>•</span>
            <span>Started: {new Date(habit.startDate).toLocaleDateString()}</span>
          </div>
        </div>
        <button
          onClick={handleToggleCompletion}
          className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
            isCompletedToday
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {isCompletedToday && <span className="text-lg">✓</span>}
        </button>
      </div>

      <div className="space-y-4">
        <ProgressChart completionRate={stats.completionRate} />
        
        <div className="flex items-center justify-between">
          <StreakCounter currentStreak={stats.currentStreak} />
          <div className="text-right">
            <div className="text-sm text-gray-500">Total Completed</div>
            <div className="text-lg font-semibold text-gray-800">
              {stats.totalCompletions}
            </div>
          </div>
        </div>

        {habit.reminder && (
          <div className="flex items-center text-sm text-blue-600 bg-blue-50 rounded px-3 py-2">
            <span className="mr-2">🔔</span>
            Reminder at {habit.reminderTime}
          </div>
        )}
      </div>
    </div>
  );
};
