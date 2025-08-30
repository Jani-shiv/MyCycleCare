import React from 'react';
import DashboardSummary from '../components/dashboard/DashboardSummary';
import CycleCalendar from '../components/tracker/CycleCalendar';
import MoodJournalSummary from '../components/dashboard/MoodJournalSummary';
import WellnessTips from '../components/dashboard/WellnessTips';
import { useUser } from '../context/UserContext';

const DashboardPage = () => {
  const { user } = useUser();
  
  if (!user) return null;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Welcome back, {user.name}
        </p>
      </div>
      
      <DashboardSummary />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CycleCalendar />
        <div className="space-y-6">
          <MoodJournalSummary />
          <WellnessTips />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;