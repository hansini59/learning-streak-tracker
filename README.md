# Daily Learning Streak Tracker

A full-stack web application built with Next.js 14 that helps students track their daily learning progress and maintain study streaks.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Storage**: Browser LocalStorage
- **Deployment**: Vercel-ready

## Features

- Mark daily study sessions with a single click
- Track current learning streak
- View total study days
- See last study date
- Browse complete study history
- Responsive design for all devices

## Project Structure

```
app/
  page.tsx              # Dashboard (main page)
  dashboard/page.tsx    # Dashboard (alternate route)
  history/page.tsx      # Study history page
  api/
    study/route.ts      # POST - Mark today's study
    streak/route.ts     # GET - Get streak statistics
    history/route.ts    # GET - Get study history

components/
  StreakCard.tsx        # Displays streak statistics
  StudyButton.tsx       # Button for marking study
  HistoryList.tsx       # Displays list of study dates

lib/
  streakLogic.ts        # Core streak calculation logic
```

## Streak Logic Rules

1. **No duplicates**: Users cannot mark study twice in one day
2. **Consecutive days**: If the user studied yesterday and studies today, streak increases
3. **Missed days**: If the user misses a day, streak resets to 1

### Example

```
10 March -> studied
11 March -> studied
12 March -> studied
Current streak = 3

If user misses 13 March and studies on 14 March:
Streak resets to = 1
```

## Data Storage

Study dates are stored in browser LocalStorage as an array:

```javascript
studyDates = [
  "2026-03-10",
  "2026-03-11",
  "2026-03-12"
]
```

## API Endpoints

### POST /api/study

Marks today as a study day.

**Response:**
```json
{
  "success": true,
  "message": "Study marked endpoint reached.",
  "timestamp": "2026-03-14T10:00:00.000Z"
}
```

### GET /api/streak

Returns current streak statistics.

**Response:**
```json
{
  "currentStreak": 3,
  "totalDaysStudied": 10,
  "lastStudyDate": "2026-03-14"
}
```

### GET /api/history

Returns list of all study dates.

**Response:**
```json
[
  "2026-03-14",
  "2026-03-12",
  "2026-03-11"
]
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## Deployment

This project is ready to deploy on Vercel:

1. Push your code to a Git repository
2. Connect the repository to Vercel
3. Deploy with zero configuration

Or deploy directly:

```bash
npx vercel
```


