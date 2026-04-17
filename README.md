# FixTrack — CMU Facilities Maintenance Tracker

A transparent, real-time maintenance request tracking system for CMU residents — inspired by FedEx/UPS package tracking.

## Features

- **Stage-based request tracking** — Submitted → Under Review → Scheduled → In Progress → Completed, with estimated resolution dates
- **Completion photo confirmation** — Technicians attach a photo of the finished work as proof of completion
- **Proactive notification system** — In-app notifications at every stage transition
- **New request submission** — Structured form with building, room, category, and priority fields
- **Dashboard** — Overview of all requests with stats, filtering, and progress bars

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Lucide Icons
- date-fns

## Getting Started

```bash
cd fixtrack
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
fixtrack/
├── src/
│   ├── components/    # Reusable UI components
│   ├── data/          # Types, mock data, and state management
│   ├── pages/         # Route-level page components
│   ├── App.tsx        # Router setup
│   └── main.tsx       # Entry point
└── index.html
```

## 49-101 Final Concept — Carnegie Mellon University
