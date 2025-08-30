import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';

// Array of predefined mood options with their respective emojis and labels
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

/**
 * MoodTracker Component
 * Allows users to track their daily mood and add journal entries
 */
const MoodTracker = () => {
  // State for managing selected mood and notes
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  
  // Get user context and mood update function
  const { user, updateUserMood } = useUser();
  
  /**
   * Handles the submission of mood and notes
   * Updates the user's mood in context and resets the form
   */
  const handleSubmit = () => {
    // Return early if no mood selected or no user
    if (!selectedMood || !user) return;
    
    // Get current date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Update user mood in context
    updateUserMood(today, selectedMood, notes);
    
    // Reset form fields
    setSelectedMood(null);
    setNotes('');
    
    // Show success message
    alert('Mood logged successfully!');
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">How are you feeling today?</h3>
      
      {/* Grid of mood selection buttons */}
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
      
      {/* Journal entry textarea */}
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
      
      {/* Submit button */}
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