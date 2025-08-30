import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, BarChart, HeartPulse, MessageSquare, Settings, Menu, X } from 'lucide-react';

/**
 * Sidebar component that provides navigation for the application
 * Includes both mobile and desktop views with responsive behavior
 */
const Sidebar = () => {
  // State to control sidebar visibility on mobile
  const [isOpen, setIsOpen] = useState(false);
  
  /**
   * Toggles the sidebar open/closed state
   */
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  // Navigation items configuration with routes, icons and labels
  const navItems = [
    { to: '/dashboard', icon: <BarChart size={20} />, label: 'Dashboard' },
    { to: '/tracker', icon: <Calendar size={20} />, label: 'Period Tracker' },
    { to: '/mood-journal', icon: <HeartPulse size={20} />, label: 'Mood Journal' },
    { to: '/wellness-assistant', icon: <MessageSquare size={20} />, label: 'Wellness Assistant' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];
  
  return (
    <>
      {/* Mobile menu button - only visible on mobile screens */}
      <button
        className="fixed p-2 m-3 rounded-md md:hidden z-20 bg-white dark:bg-gray-800 shadow-md"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Main sidebar container */}
      <aside
        className={`
          fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden 
          transition-all transform bg-white dark:bg-gray-800 shadow-md 
          md:translate-x-0 md:relative md:shadow-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Sidebar header with app title */}
        <div className="flex items-center justify-center h-16 px-4 bg-purple-600 dark:bg-purple-800">
          <h2 className="text-xl font-bold text-white">MyCycleCare</h2>
        </div>
        
        {/* Scrollable navigation container */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {/* Map through navigation items to create links */}
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `
                  flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors
                  ${isActive 
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200' 
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}
                `}
                onClick={() => setIsOpen(false)} // Close sidebar on mobile when link is clicked
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
      
      {/* Semi-transparent backdrop for mobile - only visible when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-5 bg-black bg-opacity-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;