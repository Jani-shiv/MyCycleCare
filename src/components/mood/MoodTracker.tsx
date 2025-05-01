import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';

const moods = [
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'calm', emoji: '😌', label: 'Calm' },
  { id: 'tired', emoji: '😴', label: 'Tired' },
  { id: 'sad', emoji: '😢', label: 'Sad' },
  { id: 'anxious', emoji: '😰', label: 'Anxious' },
  { id: 'irritable', emoji: '😠', label: 'Irritable' },
  { id: 'energetic', emoji: '⚡', label: 'Energetic' },
  { id: 'neutral', emoji: '😐', label: 'Neutral' },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const { user, updateUserMood } = useUser();
  
  const handleSubmit = () => {
    if (!selectedMood || !user) return;
    
    const today = new Date().toISOString().split('T')[0];
    
    // Update user mood in context
    updateUserMood(today, selectedMood, notes);
    
    // Reset form
    setSelectedMood(null);
    setNotes('');
    
    // Show success message (in a real app)
    alert('Mood logged successfully!');
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">How are you feeling today?</h3>
      
      <div className="grid grid-cols-4 gap-3 mb-6">
        {moods.map((mood) => (
          <button
            key={mood.id}
            className={`
              p-3 rounded-lg flex flex-col items-center justify-center transition-all
              ${selectedMood === mood.id 
                ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 scale-105 shadow-md' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}
            `}
            onClick={() => setSelectedMood(mood.id)}
          >
            <span className="text-2xl mb-1">{mood.emoji}</span>
            <span className="text-xs font-medium">{mood.label}</span>
          </button>
        ))}
      </div>
      
      <div className="mb-6">
        <label 
          htmlFor="moodNotes"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Journal Entry
        </label>
        <textarea
          id="moodNotes"
          rows={4}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Write about your feelings today..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      
      <button
        className={`
          w-full py-2 rounded-md font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
          ${!selectedMood 
            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700'}
        `}
        onClick={handleSubmit}
        disabled={!selectedMood}
      >
        Save Today's Mood
      </button>
    </div>
  );
};

export default MoodTracker;