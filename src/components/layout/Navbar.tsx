import React from 'react';
import { Bell, Moon, Sun, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useUser();
  
  return (
    <header className="z-10 py-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between h-full px-4 md:px-6">
        <div className="flex items-center">
          <div className="relative text-sm">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 font-bold text-lg">
              MyCycleCare
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>
          
          <button 
            className="relative text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
          </button>
          
          <div className="relative">
            <button
              className="flex items-center gap-2 text-sm p-1 rounded-full focus:outline-none"
              aria-label="User menu"
            >
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                {user?.name.charAt(0) || <User size={16} />}
              </div>
              <span className="hidden md:block font-medium">
                {user?.name || 'Guest'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;