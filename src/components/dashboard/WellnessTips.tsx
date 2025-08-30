import React from 'react';
import { useUser } from '../../context/UserContext';
import { wellnessTips } from '../../data/mockData';
import { Heart, Droplets, Brain } from 'lucide-react';

const WellnessTips = () => {
  // For a real app, we would filter tips based on current cycle phase
  // and symptoms, but for demo we'll just show random tips
  const randomTips = [...wellnessTips].sort(() => 0.5 - Math.random()).slice(0, 2);
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'period':
        return <Droplets size={18} className="text-red-500" />;
      case 'mental':
        return <Brain size={18} className="text-blue-500" />;
      default:
        return <Heart size={18} className="text-purple-500" />;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Wellness Tips For You</h3>
      
      <div className="space-y-4">
        {randomTips.map((tip) => (
          <div 
            key={tip.id}
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
          >
            <div className="flex items-center mb-2">
              {getCategoryIcon(tip.category)}
              <h4 className="ml-2 font-medium">{tip.title}</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {tip.description}
            </p>
          </div>
        ))}
      </div>
      
      <button
        className="mt-4 w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md font-medium shadow-sm hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
      >
        Get More Tips
      </button>
    </div>
  );
};

export default WellnessTips;