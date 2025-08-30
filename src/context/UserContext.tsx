import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, CycleData } from '../types';
import { mockUser } from '../data/mockData';

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUserCycleData: (data: CycleData) => void;
  updateUserMood: (date: string, mood: string, notes: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  // In a real app, this would make an API call
  const login = async (email: string, password: string) => {
    // Mock login for demo purposes
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve();
      }, 1000);
    });
  };

  // In a real app, this would make an API call
  const register = async (email: string, password: string, name: string) => {
    // Mock registration for demo purposes
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser = {
          ...mockUser,
          email,
          name,
          id: Math.random().toString(36).substring(7)
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUserCycleData = (data: CycleData) => {
    if (user) {
      const updatedUser = {
        ...user,
        cycleData: [...user.cycleData, data]
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const updateUserMood = (date: string, mood: string, notes: string) => {
    if (user) {
      const moodEntry = { date, mood, notes };
      const existingMoodIndex = user.moodEntries.findIndex(entry => entry.date === date);
      
      let updatedMoodEntries;
      if (existingMoodIndex >= 0) {
        updatedMoodEntries = [...user.moodEntries];
        updatedMoodEntries[existingMoodIndex] = moodEntry;
      } else {
        updatedMoodEntries = [...user.moodEntries, moodEntry];
      }
      
      const updatedUser = {
        ...user,
        moodEntries: updatedMoodEntries
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      register, 
      logout,
      updateUserCycleData,
      updateUserMood
    }}>
      {children}
    </UserContext.Provider>
  );
};