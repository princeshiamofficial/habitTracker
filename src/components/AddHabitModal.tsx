import React, { useState } from 'react';
import { useHabits } from '../context/HabitContext';
import { Frequency } from '../types/habit.types';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose }) => {
  const { addHabit } = useHabits();
  const [formData, setFormData] = useState({
    name: '',
    frequency: 'daily' as Frequency,
    target: '',
    startDate: new Date().toISOString().split('T')[0],
    reminder: false,
    reminderTime: '09:00',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    addHabit({
      name: formData.name,
      frequency: formData.frequency,
      target: formData.target,
      startDate: formData.startDate,
      reminder: formData.reminder,
      reminderTime: formData.reminder ? formData.reminderTime : undefined,
    });

    setFormData({
      name: '',
      frequency: 'daily',
      target: '',
      startDate: new Date().toISOString().split('T')[0],
      reminder: false,
      reminderTime: '09:00',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Add New Habit</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Habit Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Read 20 mins"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value as Frequency })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target
            </label>
            <input
              type="text"
              value={formData.target}
              onChange={(e) => setFormData({ ...formData, target: e.target.value })}
              placeholder="e.g., Drink 2L water"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="reminder"
              checked={formData.reminder}
              onChange={(e) => setFormData({ ...formData, reminder: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="reminder" className="text-sm text-gray-700">
              Enable Reminder
            </label>
          </div>

          {formData.reminder && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reminder Time
              </label>
              <input
                type="time"
                value={formData.reminderTime}
                onChange={(e) => setFormData({ ...formData, reminderTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
