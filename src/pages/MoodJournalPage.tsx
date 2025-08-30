import React, { useState } from 'react';
import MoodTracker from '../components/mood/MoodTracker';
import { useUser } from '../context/UserContext';
import { format, parseISO, isSameMonth, isSameYear } from 'date-fns';
import { Calendar, List, BarChart } from 'lucide-react';

const moodEmojis: Record<string, string> = {
  happy: '😊',
  calm: '😌',
  tired: '😴',
  sad: '😢',
  anxious: '😰',
  irritable: '😠',
  energetic: '⚡',
  better: '😌',
  neutral: '😐'
};

const MoodJournalPage = () => {
  const { user } = useUser();
  const [view, setView] = useState<'list' | 'calendar' | 'stats'>('list');
  
  if (!user) return null;
  
  // Group entries by month
  const entriesByMonth = user.moodEntries.reduce<Record<string, typeof user.moodEntries>>((acc, entry) => {
    const date = parseISO(entry.date);
    const monthYear = format(date, 'MMMM yyyy');
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    
    acc[monthYear].push(entry);
    return acc;
  }, {});
  
  // Sort entries by date (newest first) within each month
  Object.keys(entriesByMonth).forEach(month => {
    entriesByMonth[month].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  });
  
  // Calculate mood statistics
  const moodStats = user.moodEntries.reduce<Record<string, number>>((acc, entry) => {
    if (!acc[entry.mood]) {
      acc[entry.mood] = 0;
    }
    acc[entry.mood]++;
    return acc;
  }, {});
  
  // Sort months chronologically (newest first)
  const sortedMonths = Object.keys(entriesByMonth).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });
  
  const renderListView = () => (
    <div className="space-y-6">
      {sortedMonths.map(month => (
        <div key={month} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">{month}</h3>
          
          <div className="space-y-3">
            {entriesByMonth[month].map((entry, index) => (
              <div 
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">
                      {moodEmojis[entry.mood] || '😐'}
                    </span>
                    <h4 className="font-medium">
                      {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                    </h4>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {format(parseISO(entry.date), 'EEEE, MMMM d, yyyy')}
                  </div>
                </div>
                
                {entry.notes && (
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    {entry.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  
  const renderCalendarView = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Mood Calendar View</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        Calendar view would show moods by date in a calendar format.
      </p>
      <div className="p-8 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
        <p>Calendar visualization would be implemented here</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          (This is a placeholder for the calendar view)
        </p>
      </div>
    </div>
  );
  
  const renderStatsView = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Mood Statistics</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-sm mb-2">Most Common Moods</h4>
          <div className="space-y-2">
            {Object.entries(moodStats)
              .sort(([, a], [, b]) => b - a)
              .map(([mood, count]) => (
                <div key={mood} className="flex items-center">
                  <span className="text-xl mr-2">{moodEmojis[mood] || '😐'}</span>
                  <span className="font-medium">{mood.charAt(0).toUpperCase() + mood.slice(1)}</span>
                  <div className="ml-4 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full"
                      style={{ width: `${(count / user.moodEntries.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{count} days</span>
                </div>
              ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-sm mb-2">Monthly Mood Trends</h4>
          <div className="p-8 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
            <p>Mood trends visualization would be implemented here</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              (This is a placeholder for mood trends graph)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Mood Journal</h1>
        
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
              view === 'list' 
                ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm' 
                : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
            }`}
            onClick={() => setView('list')}
          >
            <List size={16} className="mr-1" /> List
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
              view === 'calendar' 
                ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm' 
                : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
            }`}
            onClick={() => setView('calendar')}
          >
            <Calendar size={16} className="mr-1" /> Calendar
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
              view === 'stats' 
                ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm' 
                : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
            }`}
            onClick={() => setView('stats')}
          >
            <BarChart size={16} className="mr-1" /> Statistics
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {view === 'list' && renderListView()}
          {view === 'calendar' && renderCalendarView()}
          {view === 'stats' && renderStatsView()}
        </div>
        
        <div>
          <MoodTracker />
        </div>
      </div>
    </div>
  );
};

export default MoodJournalPage;