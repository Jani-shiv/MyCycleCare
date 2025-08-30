// Import necessary dependencies
import React from 'react';
import CycleCalendar from '../components/tracker/CycleCalendar';
import SymptomTracker from '../components/tracker/SymptomTracker';
import { useUser } from '../context/UserContext';
import { Calendar, TrendingUp } from 'lucide-react';
import { getPredictionData } from '../data/mockData';
import { format, parseISO } from 'date-fns';

// Main TrackerPage component
const TrackerPage = () => {
  // Get user data from context
  const { user } = useUser();
  
  // Return null if user is not authenticated
  if (!user) return null;
  
  // Get prediction data for the user
  const predictions = getPredictionData(user);
  
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Period Tracker</h1>
      </div>
      
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left column - Calendar and Insights */}
        <div className="lg:col-span-3 space-y-6">
          {/* Cycle calendar component */}
          <CycleCalendar />
          
          {/* Cycle insights card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Cycle Insights</h3>
            
            {/* Predictions grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Next period prediction */}
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-2">
                  <Calendar size={18} className="text-purple-700 dark:text-purple-300" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-900 dark:text-white">Next Period</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {format(parseISO(predictions.nextPeriodPrediction), 'MMMM d, yyyy')}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Expected to last {predictions.avgPeriodLength} days
                  </p>
                </div>
              </div>
              
              {/* Ovulation prediction */}
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                  <TrendingUp size={18} className="text-blue-700 dark:text-blue-300" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-900 dark:text-white">Ovulation</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {format(parseISO(predictions.ovulationPrediction), 'MMMM d, yyyy')}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Fertile window: {format(parseISO(predictions.fertileWindowStart), 'MMM d')} - {format(parseISO(predictions.fertileWindowEnd), 'MMM d')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Cycle history section */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-2">
                Cycle History
              </h4>
              
              {/* Cycle history list */}
              <div className="space-y-2">
                {user.cycleData.length > 0 ? (
                  // Sort and display last 3 cycles
                  [...user.cycleData]
                    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
                    .slice(0, 3)
                    .map((cycle, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <div>
                          <p className="text-sm font-medium">
                            {format(parseISO(cycle.startDate), 'MMMM d, yyyy')}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {cycle.endDate 
                              ? `${format(parseISO(cycle.startDate), 'MMM d')} - ${format(parseISO(cycle.endDate), 'MMM d')}` 
                              : 'In progress'}
                          </p>
                        </div>
                        {/* Flow indicator */}
                        <div className="text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            cycle.flow === 'heavy' 
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' 
                              : cycle.flow === 'medium'
                                ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
                                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                          }`}>
                            {cycle.flow.charAt(0).toUpperCase() + cycle.flow.slice(1)} flow
                          </span>
                        </div>
                      </div>
                    ))
                ) : (
                  // Empty state message
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">
                    No cycle data recorded yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - Symptom tracker */}
        <div className="lg:col-span-2">
          <SymptomTracker />
        </div>
      </div>
    </div>
  );
};

export default TrackerPage;