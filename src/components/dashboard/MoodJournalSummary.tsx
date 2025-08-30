import React from 'react';
import { useUser } from '../../context/UserContext';
import { format, subDays, parseISO } from 'date-fns';

const moodEmojis: Record<string, string> = {
  happy: '😊',
  calm: '😌',
  tired: '😴',
  sad: '😢',
  anxious: '😰',
  irritable: '😠',
  energetic: '⚡',
  better: '😌'
};

const MoodJournalSummary = () => {
  const { user } = useUser();
  
  if (!user) return null;
  
  // Get the last 5 mood entries
  const recentMoods = [...user.moodEntries]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Recent Mood Entries</h3>
      
      <div className="space-y-3">
        {recentMoods.length > 0 ? (
          recentMoods.map((entry, index) => (
            <div key={index} className="flex items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex-shrink-0 text-2xl mr-3">
                {moodEmojis[entry.mood] || '😐'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                  {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {entry.notes}
                </p>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {format(parseISO(entry.date), 'MMM d')}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No mood entries recorded yet
          </p>
        )}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <a 
          href="/mood-journal"
          className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline"
        >
          View all entries →
        </a>
      </div>
    </div>
  );
};

export default MoodJournalSummary;