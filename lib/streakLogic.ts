// Utility functions for streak tracking

const STORAGE_KEY = 'studyDates';

// Get all study dates from localStorage
export function getStudyDates(): string[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Save study dates to localStorage
export function saveStudyDates(dates: string[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dates));
}

// Format date to YYYY-MM-DD string
export function formatDateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Format date string to display format (e.g., "14 March 2026")
export function formatDateForDisplay(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Get today's date as YYYY-MM-DD string
export function getTodayString(): string {
  return formatDateToString(new Date());
}

// Check if a date was studied
export function wasDateStudied(dateString: string, studyDates: string[]): boolean {
  return studyDates.includes(dateString);
}

// Get yesterday's date string
export function getYesterdayString(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return formatDateToString(yesterday);
}

// Calculate current streak
export function calculateStreak(studyDates: string[]): number {
  if (studyDates.length === 0) return 0;

  // Sort dates in descending order (newest first)
  const sortedDates = [...studyDates].sort((a, b) => b.localeCompare(a));
  
  const today = getTodayString();
  const yesterday = getYesterdayString();
  
  // Check if the most recent study date is today or yesterday
  const lastStudyDate = sortedDates[0];
  
  // If last study date is not today or yesterday, streak is 0
  if (lastStudyDate !== today && lastStudyDate !== yesterday) {
    return 0;
  }
  
  let streak = 0;
  let currentDate = new Date(lastStudyDate + 'T00:00:00');
  
  for (const dateString of sortedDates) {
    const expectedDate = formatDateToString(currentDate);
    
    if (dateString === expectedDate) {
      streak++;
      // Move to previous day
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (dateString < expectedDate) {
      // Gap found, stop counting
      break;
    }
  }
  
  return streak;
}

// Mark today as studied
export function markTodayAsStudied(): { success: boolean; message: string; alreadyMarked: boolean } {
  const studyDates = getStudyDates();
  const today = getTodayString();
  
  if (studyDates.includes(today)) {
    return {
      success: false,
      message: 'You have already marked today.',
      alreadyMarked: true
    };
  }
  
  studyDates.push(today);
  saveStudyDates(studyDates);
  
  return {
    success: true,
    message: 'Great job! You marked today as studied.',
    alreadyMarked: false
  };
}

// Get streak statistics
export function getStreakStats(): {
  currentStreak: number;
  totalDaysStudied: number;
  lastStudyDate: string | null;
} {
  const studyDates = getStudyDates();
  
  if (studyDates.length === 0) {
    return {
      currentStreak: 0,
      totalDaysStudied: 0,
      lastStudyDate: null
    };
  }
  
  // Sort dates in descending order to get the most recent
  const sortedDates = [...studyDates].sort((a, b) => b.localeCompare(a));
  
  return {
    currentStreak: calculateStreak(studyDates),
    totalDaysStudied: studyDates.length,
    lastStudyDate: sortedDates[0]
  };
}

// Get study history (sorted newest first)
export function getStudyHistory(): string[] {
  const studyDates = getStudyDates();
  return [...studyDates].sort((a, b) => b.localeCompare(a));
}

// Seed demo history dates for demonstration
export function seedDemoHistory(): void {
  if (typeof window === 'undefined') return;
  
  const existingDates = getStudyDates();
  if (existingDates.length > 0) return; // Don't seed if data already exists
  
  const today = new Date();
  const demosDates: string[] = [];
  
  // Add dates for the past 30 days with some gaps to show streak logic
  // Days 0-4 (today and last 4 days - current streak of 5)
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    demosDates.push(formatDateToString(date));
  }
  
  // Skip day 5-6 (gap to show streak reset)
  
  // Days 7-10 (a previous streak)
  for (let i = 7; i <= 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    demosDates.push(formatDateToString(date));
  }
  
  // Skip days 11-13
  
  // Days 14-16
  for (let i = 14; i <= 16; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    demosDates.push(formatDateToString(date));
  }
  
  // Skip days 17-19
  
  // Days 20-25
  for (let i = 20; i <= 25; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    demosDates.push(formatDateToString(date));
  }
  
  // Skip days 26-27
  
  // Days 28-30
  for (let i = 28; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    demosDates.push(formatDateToString(date));
  }
  
  saveStudyDates(demosDates);
}

// Clear all history (for testing)
export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
