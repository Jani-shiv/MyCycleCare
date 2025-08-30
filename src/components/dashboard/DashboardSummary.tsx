// Import necessary dependencies
import React from 'react';
import { Calendar, Heart, Droplet, Clock } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { getPredictionData } from '../../data/mockData';
import { format, differenceInDays, parseISO } from 'date-fns';

// Main dashboard summary component
const DashboardSummary = () => {
  // Get user data from context
  const { user } = useUser();
  
  // Return null if no user data is available
  if (!user) return null;
  
  // Get prediction data and calculate days until next period
  const predictions = getPredictionData(user);
  const today = new Date();
  const nextPeriodDate = parseISO(predictions.nextPeriodPrediction);
  const daysUntilPeriod = differenceInDays(nextPeriodDate, today);
  
  // Determine the current menstrual phase based on days until period
  const getPhaseText = () => {
    if (daysUntilPeriod <= 0) {
      return "You're on your period";
    } else if (daysUntilPeriod <= 3) {
      return "PMS phase";
    } else if (daysUntilPeriod >= 12 && daysUntilPeriod <= 16) {
      return "Ovulation phase";
    } else if (daysUntilPeriod > 16) {
      return "Follicular phase";
    } else {
      return "Luteal phase";
    }
  };
  
  const phaseText = getPhaseText();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Next Period Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center">
          <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
            <Calendar size={20} />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Period</p>
            <p className="text-xl font-semibold">
              {daysUntilPeriod <= 0 
                ? 'Today' 
                : `In ${daysUntilPeriod} days`}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {format(nextPeriodDate, 'MMM d, yyyy')}
            </p>
          </div>
        </div>
      </div>
      
      {/* Current Phase Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center">
          <div className="rounded-full p-3 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
            <Heart size={20} />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Phase</p>
            <p className="text-xl font-semibold">{phaseText}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Day {user.cycleData.length > 0 
                ? differenceInDays(today, parseISO(user.cycleData[user.cycleData.length - 1].startDate)) + 1 
                : '?'} of cycle
            </p>
          </div>
        </div>
      </div>
      
      {/* Fertile Window Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center">
          <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
            <Droplet size={20} />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fertile Window</p>
            <p className="text-xl font-semibold">
              {format(parseISO(predictions.fertileWindowStart), 'MMM d')} - {format(parseISO(predictions.fertileWindowEnd), 'MMM d')}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ovulation: {format(parseISO(predictions.ovulationPrediction), 'MMM d')}
            </p>
          </div>
        </div>
      </div>
      
      {/* Cycle Stats Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center">
          <div className="rounded-full p-3 bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300">
            <Clock size={20} />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cycle Stats</p>
            <p className="text-xl font-semibold">
              {predictions.avgCycleLength} day cycle
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {predictions.avgPeriodLength} day period
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the component
export default DashboardSummary;