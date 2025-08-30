import { User, CycleData, WellnessTip } from '../types';
import { add, format, sub } from 'date-fns';

// Mock user data
export const mockUser: User = {
  id: 'user123',
  name: 'Mini ',
  email: 'miniprincess@example.com',
  cycleData: [
    {
      id: 'cycle001',
      startDate: format(sub(new Date(), { days: 35 }), 'yyyy-MM-dd'),
      endDate: format(sub(new Date(), { days: 29 }), 'yyyy-MM-dd'),
      symptoms: [
        { type: 'cramps', severity: 'moderate' },
        { type: 'headache', severity: 'mild' }
      ],
      flow: 'medium',
      notes: 'Felt tired most of the day'
    },
    {
      id: 'cycle002',
      startDate: format(sub(new Date(), { days: 7 }), 'yyyy-MM-dd'),
      endDate: format(sub(new Date(), { days: 3 }), 'yyyy-MM-dd'),
      symptoms: [
        { type: 'cramps', severity: 'mild' },
        { type: 'bloating', severity: 'moderate' }
      ],
      flow: 'heavy',
      notes: 'Chocolate cravings'
    }
  ],
  moodEntries: [
    {
      date: format(sub(new Date(), { days: 7 }), 'yyyy-MM-dd'),
      mood: 'tired',
      notes: 'First day of period, feeling drained'
    },
    {
      date: format(sub(new Date(), { days: 6 }), 'yyyy-MM-dd'),
      mood: 'irritable',
      notes: 'Second day, cramps are bothering me'
    },
    {
      date: format(sub(new Date(), { days: 5 }), 'yyyy-MM-dd'),
      mood: 'better',
      notes: 'Feeling a bit better today'
    },
    {
      date: format(sub(new Date(), { days: 2 }), 'yyyy-MM-dd'),
      mood: 'happy',
      notes: 'Period almost over, feeling good!'
    },
    {
      date: format(sub(new Date(), { days: 1 }), 'yyyy-MM-dd'),
      mood: 'energetic',
      notes: 'Went for a run today, feeling energetic'
    },
    {
      date: format(new Date(), 'yyyy-MM-dd'),
      mood: 'calm',
      notes: 'Feeling balanced today'
    }
  ],
  preferences: {
    cycleLengthAvg: 28,
    periodLengthAvg: 5,
    notificationsEnabled: true,
    remindersEnabled: true,
    darkModeEnabled: false,
    language: 'en'
  }
};

// Mock wellness tips
export const wellnessTips: WellnessTip[] = [
  {
    id: 'tip001',
    title: 'Stay Hydrated During Your Period',
    description: 'Drinking plenty of water helps reduce bloating and cramps. Aim for at least 8 glasses a day during your period.',
    category: 'period',
    relatedSymptoms: ['cramps', 'bloating']
  },
  {
    id: 'tip002',
    title: 'Heat Therapy for Cramps',
    description: 'Apply a heating pad to your lower abdomen to relieve menstrual cramps. The heat helps relax the muscles and reduce pain.',
    category: 'period',
    relatedSymptoms: ['cramps', 'backPain']
  },
  {
    id: 'tip003',
    title: 'Mindful Breathing for Anxiety',
    description: 'Practice deep breathing for 5 minutes when feeling anxious. Breathe in for 4 counts, hold for 2, and exhale for 6 counts.',
    category: 'mental',
    relatedSymptoms: ['moodSwings']
  },
  {
    id: 'tip004',
    title: 'Proper Intimate Hygiene',
    description: 'Change pads or tampons every 4-6 hours to prevent infections. Opt for unscented products to reduce irritation.',
    category: 'hygiene'
  },
  {
    id: 'tip005',
    title: 'Sleep Position for Period Pain',
    description: 'Try sleeping in the fetal position to relieve pressure on your abdominal muscles and reduce period pain.',
    category: 'period',
    relatedSymptoms: ['cramps']
  },
  {
    id: 'tip006',
    title: 'Foods to Reduce Bloating',
    description: 'Include potassium-rich foods like bananas and leafy greens to help reduce water retention and bloating during your period.',
    category: 'general',
    relatedSymptoms: ['bloating']
  }
];

// Generate next period prediction based on mock data
export const getPredictionData = (user: User) => {
  const lastPeriod = user.cycleData.sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )[0];
  
  const lastPeriodDate = new Date(lastPeriod.startDate);
  const nextPeriodDate = add(lastPeriodDate, { days: user.preferences.cycleLengthAvg });
  
  const ovulationDate = add(lastPeriodDate, { days: Math.floor(user.preferences.cycleLengthAvg / 2) - 14 });
  const fertileWindowStart = sub(ovulationDate, { days: 5 });
  const fertileWindowEnd = add(ovulationDate, { days: 1 });
  
  return {
    avgCycleLength: user.preferences.cycleLengthAvg,
    avgPeriodLength: user.preferences.periodLengthAvg,
    nextPeriodPrediction: format(nextPeriodDate, 'yyyy-MM-dd'),
    ovulationPrediction: format(ovulationDate, 'yyyy-MM-dd'),
    fertileWindowStart: format(fertileWindowStart, 'yyyy-MM-dd'),
    fertileWindowEnd: format(fertileWindowEnd, 'yyyy-MM-dd')
  };
};