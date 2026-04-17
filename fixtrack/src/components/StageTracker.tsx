import {
  FileText,
  Search,
  CalendarClock,
  Wrench,
  CheckCircle2,
} from 'lucide-react';
import { format } from 'date-fns';
import type { StageEntry, RequestStage } from '../data/types';

const stageIcons: Record<RequestStage, typeof FileText> = {
  submitted: FileText,
  under_review: Search,
  scheduled: CalendarClock,
  in_progress: Wrench,
  completed: CheckCircle2,
};

const stageColors: Record<RequestStage, { dot: string; line: string; icon: string; bg: string }> = {
  submitted: {
    dot: 'border-indigo-500 bg-indigo-500',
    line: 'bg-indigo-300',
    icon: 'text-white',
    bg: 'bg-indigo-50',
  },
  under_review: {
    dot: 'border-amber-500 bg-amber-500',
    line: 'bg-amber-300',
    icon: 'text-white',
    bg: 'bg-amber-50',
  },
  scheduled: {
    dot: 'border-blue-500 bg-blue-500',
    line: 'bg-blue-300',
    icon: 'text-white',
    bg: 'bg-blue-50',
  },
  in_progress: {
    dot: 'border-violet-500 bg-violet-500',
    line: 'bg-violet-300',
    icon: 'text-white',
    bg: 'bg-violet-50',
  },
  completed: {
    dot: 'border-emerald-500 bg-emerald-500',
    line: 'bg-emerald-300',
    icon: 'text-white',
    bg: 'bg-emerald-50',
  },
};

const inactiveStyle = {
  dot: 'border-gray-300 bg-white',
  line: 'bg-gray-200',
  icon: 'text-gray-400',
  bg: 'bg-gray-50',
};

interface StageTrackerProps {
  stages: StageEntry[];
  currentStage: RequestStage;
}

const stageOrder: RequestStage[] = [
  'submitted',
  'under_review',
  'scheduled',
  'in_progress',
  'completed',
];

export function StageTracker({ stages, currentStage }: StageTrackerProps) {
  const currentIdx = stageOrder.indexOf(currentStage);

  return (
    <div className="space-y-0">
      {stages.map((entry, i) => {
        const isActive = i <= currentIdx;
        const isCurrent = entry.stage === currentStage;
        const isLast = i === stages.length - 1;
        const Icon = stageIcons[entry.stage];
        const colors = isActive ? stageColors[entry.stage] : inactiveStyle;

        return (
          <div key={entry.stage} className="flex gap-4">
            {/* Timeline column */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${colors.dot} ${
                  isCurrent ? 'ring-4 ring-offset-2 ring-current/20 scale-110' : ''
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${colors.icon}`} />
              </div>
              {!isLast && (
                <div
                  className={`w-0.5 flex-1 min-h-[48px] ${
                    isActive && i < currentIdx ? colors.line : 'bg-gray-200'
                  }`}
                />
              )}
            </div>

            {/* Content column */}
            <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
              <div className="flex items-center gap-2">
                <h4
                  className={`text-sm font-semibold ${
                    isActive ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {entry.label}
                </h4>
                {isCurrent && (
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${stageColors[entry.stage].bg} ${stageColors[entry.stage].icon.replace('text-white', `text-${entry.stage === 'submitted' ? 'indigo' : entry.stage === 'under_review' ? 'amber' : entry.stage === 'scheduled' ? 'blue' : entry.stage === 'in_progress' ? 'violet' : 'emerald'}-700`)}`}>
                    Current
                  </span>
                )}
              </div>
              {entry.timestamp ? (
                <p className="text-xs text-gray-500 mt-0.5">
                  {format(new Date(entry.timestamp), 'MMM d, yyyy · h:mm a')}
                </p>
              ) : (
                <p className="text-xs text-gray-400 mt-0.5 italic">Pending</p>
              )}
              {entry.note && isActive && (
                <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
                  {entry.note}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
