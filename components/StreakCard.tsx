'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Calendar, Clock } from 'lucide-react';
import { formatDateForDisplay } from '@/lib/streakLogic';

interface StreakCardProps {
  currentStreak: number;
  totalDaysStudied: number;
  lastStudyDate: string | null;
}

export function StreakCard({ currentStreak, totalDaysStudied, lastStudyDate }: StreakCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-foreground">Your Learning Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100">
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <p className="text-2xl font-bold text-foreground">
              {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100">
            <Calendar className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Study Days</p>
            <p className="text-2xl font-bold text-foreground">{totalDaysStudied}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Studied</p>
            <p className="text-lg font-semibold text-foreground">
              {lastStudyDate ? formatDateForDisplay(lastStudyDate) : 'Not yet'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
