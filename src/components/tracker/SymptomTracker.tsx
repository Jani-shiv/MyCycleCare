import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { Symptom, SymptomType, FlowLevel } from '../../types';

const symptoms: { id: SymptomType; label: string; icon: string }[] = [
  { id: 'cramps', label: 'Cramps', icon: '😣' },
  { id: 'headache', label: 'Headache', icon: '🤕' },
  { id: 'bloating', label: 'Bloating', icon: '🫃' },
  { id: 'backPain', label: 'Back Pain', icon: '🔙' },
  { id: 'breastTenderness', label: 'Breast Tenderness', icon: '😖' },
  { id: 'fatigue', label: 'Fatigue', icon: '😴' },
  { id: 'acne', label: 'Acne', icon: '😔' },
  { id: 'moodSwings', label: 'Mood Swings', icon: '🎭' },
  { id: 'other', label: 'Other', icon: '❓' },
];

const flowLevels: { id: FlowLevel; label: string; color: string }[] = [
  { id: 'spotting', label: 'Spotting', color: 'bg-red-200 dark:bg-red-900' },
  { id: 'light', label: 'Light', color: 'bg-red-300 dark:bg-red-800' },
  { id: 'medium', label: 'Medium', color: 'bg-red-400 dark:bg-red-700' },
  { id: 'heavy', label: 'Heavy', color: 'bg-red-500 dark:bg-red-600' },
];

const SymptomTracker: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [selectedFlow, setSelectedFlow] = useState<FlowLevel | null>(null);
  const [notes, setNotes] = useState('');
  const { user, updateUserCycleData } = useUser();
  
  const handleSymptomToggle = (symptomType: SymptomType) => {
    const existingSymptom = selectedSymptoms.find(s => s.type === symptomType);
    
    if (existingSymptom) {
      // If already exists, remove it
      setSelectedSymptoms(selectedSymptoms.filter(s => s.type !== symptomType));
    } else {
      // Add with default severity
      setSelectedSymptoms([
        ...selectedSymptoms,
        { type: symptomType, severity: 'moderate' }
      ]);
    }
  };
  
  const handleSeverityChange = (symptomType: SymptomType, severity: 'mild' | 'moderate' | 'severe') => {
    setSelectedSymptoms(selectedSymptoms.map(s => 
      s.type === symptomType ? { ...s, severity } : s
    ));
  };
  
  const handleSubmit = () => {
    if (!user) return;
    
    const today = new Date().toISOString().split('T')[0];
    
    // In a real app, you would save this to the backend
    const newEntry = {
      id: Math.random().toString(36).substring(7),
      startDate: today,
      symptoms: selectedSymptoms,
      flow: selectedFlow || 'medium',
      notes: notes
    };
    
    updateUserCycleData(newEntry);
    
    // Reset form
    setSelectedSymptoms([]);
    setSelectedFlow(null);
    setNotes('');
    
    // Show success message (in a real app)
    alert('Symptoms logged successfully!');
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Track Today's Symptoms</h3>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">How's your flow today?</h4>
        <div className="flex flex-wrap gap-2">
          {flowLevels.map((flow) => (
            <button
              key={flow.id}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedFlow === flow.id 
                  ? `${flow.color} text-white` 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}
              `}
              onClick={() => setSelectedFlow(flow.id)}
            >
              {flow.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Symptoms</h4>
        <div className="flex flex-wrap gap-2">
          {symptoms.map((symptom) => (
            <button
              key={symptom.id}
              className={`
                px-3 py-2 rounded-full text-sm font-medium transition-colors flex items-center
                ${selectedSymptoms.some(s => s.type === symptom.id)
                  ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}
              `}
              onClick={() => handleSymptomToggle(symptom.id)}
            >
              <span className="mr-1">{symptom.icon}</span>
              {symptom.label}
            </button>
          ))}
        </div>
      </div>
      
      {selectedSymptoms.length > 0 && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Symptom Severity</h4>
          
          {selectedSymptoms.map((symptom, index) => {
            const symptomInfo = symptoms.find(s => s.type === symptom.type);
            
            return (
              <div key={index} className="mb-3 last:mb-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <span className="mr-2">{symptomInfo?.icon}</span>
                    <span>{symptomInfo?.label}</span>
                  </div>
                  <button
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    onClick={() => handleSymptomToggle(symptom.type)}
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="flex space-x-2">
                  {(['mild', 'moderate', 'severe'] as const).map((severity) => (
                    <button
                      key={severity}
                      className={`
                        flex-1 py-1 rounded text-xs font-medium transition-colors
                        ${symptom.severity === severity
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'}
                      `}
                      onClick={() => handleSeverityChange(symptom.type, severity)}
                    >
                      {severity.charAt(0).toUpperCase() + severity.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      <div className="mb-6">
        <label 
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Notes
        </label>
        <textarea
          id="notes"
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="How are you feeling today?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      
      <button
        className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md font-medium shadow-sm hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
        onClick={handleSubmit}
      >
        Log Today's Symptoms
      </button>
    </div>
  );
};

export default SymptomTracker;