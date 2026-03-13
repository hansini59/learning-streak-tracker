'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { formatDateForDisplay } from '@/lib/streakLogic';

interface HistoryListProps {
  studyDates: string[];
}

export function HistoryList({ studyDates }: HistoryListProps) {
  if (studyDates.length === 0) {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">Study History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No study dates recorded yet.</p>
            <p className="text-sm text-muted-foreground mt-1">Start your learning journey today!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">Study History</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {studyDates.map((date) => (
            <li
              key={date}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100">
                <Calendar className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="font-medium text-foreground">{formatDateForDisplay(date)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
