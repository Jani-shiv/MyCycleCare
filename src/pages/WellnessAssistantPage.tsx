import React from 'react';
import WellnessChat from '../components/assistant/WellnessChat';
import { wellnessTips } from '../data/mockData';
import { Heart, Droplets, Brain, Info } from 'lucide-react';

/**
 * WellnessAssistantPage Component
 * Displays wellness tips and chat interface for user interaction
 */
const WellnessAssistantPage = () => {
  // Array of available tip categories
  const tipCategories = ['all', 'period', 'hygiene', 'mental', 'general'];
  
  // State to track currently selected category
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  
  // Filter tips based on selected category
  const filteredTips = selectedCategory === 'all' 
    ? wellnessTips 
    : wellnessTips.filter(tip => tip.category === selectedCategory);
  
  /**
   * Returns appropriate icon component based on tip category
   * @param {string} category - The category to get icon for
   * @returns {JSX.Element} Icon component
   */
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'period':
        return <Droplets size={18} className="text-red-500" />;
      case 'mental':
        return <Brain size={18} className="text-blue-500" />;
      case 'hygiene':
        return <Droplets size={18} className="text-green-500" />;
      case 'general':
        return <Info size={18} className="text-purple-500" />;
      default:
        return <Heart size={18} className="text-purple-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Wellness Assistant</h1>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Section */}
        <div className="lg:col-span-2">
          <WellnessChat />
        </div>
        
        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Wellness Tips Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Wellness Tips</h3>
            
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tipCategories.map(category => (
                <button
                  key={category}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Tips List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {filteredTips.map(tip => (
                <div 
                  key={tip.id}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  {/* Tip Header with Icon */}
                  <div className="flex items-center mb-2">
                    {getCategoryIcon(tip.category)}
                    <h4 className="ml-2 font-medium">{tip.title}</h4>
                  </div>
                  {/* Tip Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {tip.description}
                  </p>
                  {/* Related Symptoms Tags */}
                  {tip.relatedSymptoms && tip.relatedSymptoms.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {tip.relatedSymptoms.map(symptom => (
                        <span 
                          key={symptom}
                          className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Empty State Message */}
              {filteredTips.length === 0 && (
                <p className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No tips available for this category
                </p>
              )}
            </div>
          </div>
          
          {/* Help CTA Section */}
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg shadow-sm p-5 text-white">
            <h3 className="text-lg font-semibold mb-2">Need More Help?</h3>
            <p className="mb-4 text-purple-100">
              Our wellness assistant can provide personalized advice based on your cycle and symptoms.
            </p>
            <button
              className="w-full py-2 bg-white text-purple-700 rounded-md font-medium shadow-sm hover:bg-purple-50 transition-colors"
            >
              Ask a Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessAssistantPage;