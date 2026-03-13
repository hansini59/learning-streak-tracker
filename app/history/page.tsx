'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HistoryList } from '@/components/HistoryList';
import { Button } from '@/components/ui/button';
import { getStudyHistory } from '@/lib/streakLogic';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function HistoryPage() {
  const [studyDates, setStudyDates] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const history = getStudyHistory();
    setStudyDates(history);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="animate-pulse space-y-4 w-full max-w-2xl">
              <div className="h-8 bg-secondary rounded w-1/2" />
              <div className="h-96 bg-secondary rounded" />
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
          {/* Header */}
          <div className="w-full max-w-2xl">
            <Link href="/">
              <Button variant="ghost" className="gap-2 mb-4">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <BookOpen className="w-7 h-7 text-emerald-600" />
              <h1 className="text-2xl font-bold text-foreground">Study History</h1>
            </div>
            <p className="text-muted-foreground mt-2">
              View all your recorded study sessions.
            </p>
          </div>

          {/* History List */}
          <HistoryList studyDates={studyDates} />

          {/* Stats Summary */}
          {studyDates.length > 0 && (
            <div className="text-center text-muted-foreground">
              <p>Total: {studyDates.length} {studyDates.length === 1 ? 'day' : 'days'} recorded</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
