'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { StreakCard } from '@/components/StreakCard';
import { StudyButton } from '@/components/StudyButton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { getStreakStats, markTodayAsStudied, getTodayString, getStudyDates } from '@/lib/streakLogic';
import { History, CheckCircle, AlertCircle, BookOpen } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    currentStreak: 0,
    totalDaysStudied: 0,
    lastStudyDate: null as string | null,
  });
  const [message, setMessage] = useState<{ type: 'success' | 'info'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStudiedToday, setHasStudiedToday] = useState(false);
  const [mounted, setMounted] = useState(false);

  const loadStats = useCallback(() => {
    const streakStats = getStreakStats();
    setStats(streakStats);
    
    const studyDates = getStudyDates();
    const today = getTodayString();
    setHasStudiedToday(studyDates.includes(today));
  }, []);

  useEffect(() => {
    setMounted(true);
    loadStats();
  }, [loadStats]);

  const handleMarkStudy = async () => {
    setIsLoading(true);
    setMessage(null);

    await new Promise(resolve => setTimeout(resolve, 300));

    const result = markTodayAsStudied();
    
    if (result.alreadyMarked) {
      setMessage({ type: 'info', text: result.message });
    } else {
      setMessage({ type: 'success', text: result.message });
      setHasStudiedToday(true);
    }

    loadStats();
    setIsLoading(false);
  };

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="animate-pulse space-y-4 w-full max-w-md">
              <div className="h-8 bg-secondary rounded w-3/4 mx-auto" />
              <div className="h-64 bg-secondary rounded" />
              <div className="h-14 bg-secondary rounded" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-emerald-600" />
              <h1 className="text-3xl font-bold text-foreground">Learning Streak Tracker</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Welcome! Track your daily learning progress.
            </p>
          </div>

          <StreakCard
            currentStreak={stats.currentStreak}
            totalDaysStudied={stats.totalDaysStudied}
            lastStudyDate={stats.lastStudyDate}
          />

          {message && (
            <Alert
              className={`w-full max-w-md ${
                message.type === 'success' 
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                  : 'border-blue-500 bg-blue-50 text-blue-800'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-blue-600" />
              )}
              <AlertDescription className="ml-2">{message.text}</AlertDescription>
            </Alert>
          )}

          <StudyButton
            onClick={handleMarkStudy}
            isLoading={isLoading}
            disabled={hasStudiedToday}
          />

          {hasStudiedToday && !message && (
            <p className="text-sm text-muted-foreground">
              You have already marked today. Come back tomorrow!
            </p>
          )}

          <Link href="/history">
            <Button variant="outline" className="gap-2">
              <History className="w-4 h-4" />
              View Study History
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
