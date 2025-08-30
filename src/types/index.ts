// Represents a user in the system with their personal data and preferences
export interface User {
  id: string;                 // Unique identifier for the user
  name: string;              // User's full name
  email: string;             // User's email address
  cycleData: CycleData[];    // Array of menstrual cycle records
  moodEntries: MoodEntry[];  // Array of mood tracking entries
  preferences: UserPreferences; // User's application preferences
}

// Represents a single menstrual cycle record
export interface CycleData {
  id: string;              // Unique identifier for the cycle
  startDate: string;       // Start date of the cycle
  endDate?: string;        // Optional end date of the cycle
  symptoms: Symptom[];     // Array of symptoms experienced during the cycle
  flow: FlowLevel;         // Level of menstrual flow
  notes?: string;          // Optional notes about the cycle
}

// Represents a symptom and its characteristics
export interface Symptom {
  type: SymptomType;       // Type of symptom experienced
  severity: 'mild' | 'moderate' | 'severe';  // Severity level of the symptom
  notes?: string;          // Optional notes about the symptom
}

// Types of symptoms that can be tracked
export type SymptomType = 
  | 'cramps' 
  | 'headache' 
  | 'bloating' 
  | 'backPain' 
  | 'breastTenderness' 
  | 'fatigue' 
  | 'acne' 
  | 'moodSwings'
  | 'other';

// Levels of menstrual flow that can be recorded
export type FlowLevel = 'spotting' | 'light' | 'medium' | 'heavy';

// Represents a mood tracking entry
export interface MoodEntry {
  date: string;            // Date of the mood entry
  mood: string;            // Mood state (e.g., 'happy', 'sad', 'anxious')
  notes?: string;          // Optional notes about the mood
}

// User's application preferences and settings
export interface UserPreferences {
  cycleLengthAvg: number;      // Average length of user's menstrual cycle
  periodLengthAvg: number;     // Average length of user's period
  notificationsEnabled: boolean; // Whether notifications are enabled
  remindersEnabled: boolean;    // Whether reminders are enabled
  darkModeEnabled: boolean;     // Whether dark mode is enabled
  language: string;             // User's preferred language
}

// Statistical data about the user's cycles
export interface CycleStats {
  avgCycleLength: number;       // Average length of all recorded cycles
  avgPeriodLength: number;      // Average length of all recorded periods
  nextPeriodPrediction?: string; // Predicted start date of next period
  ovulationPrediction?: string;  // Predicted ovulation date
  fertileWindowStart?: string;   // Predicted start of fertile window
  fertileWindowEnd?: string;     // Predicted end of fertile window
}

// Wellness tips and advice for users
export interface WellnessTip {
  id: string;                   // Unique identifier for the tip
  title: string;               // Title of the wellness tip
  description: string;         // Detailed description of the tip
  category: 'period' | 'hygiene' | 'mental' | 'general';  // Category of the tip
  relatedSymptoms?: SymptomType[]; // Optional array of related symptoms
}

// Reminders for various activities and events
export interface Reminder {
  id: string;                   // Unique identifier for the reminder
  title: string;               // Title of the reminder
  description?: string;        // Optional detailed description
  dateTime: string;            // When the reminder should trigger
  recurrence?: 'daily' | 'weekly' | 'monthly' | 'cycle-based' | 'none';  // How often to repeat
  isCompleted: boolean;        // Whether the reminder has been completed
  category: 'period' | 'hygiene' | 'medication' | 'water' | 'sleep' | 'other';  // Category of reminder
}