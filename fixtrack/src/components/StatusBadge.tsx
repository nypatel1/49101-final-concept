import type { RequestStage } from '../data/types';

const config: Record<RequestStage, { label: string; className: string }> = {
  submitted: {
    label: 'Submitted',
    className: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
  },
  under_review: {
    label: 'Under Review',
    className: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  },
  scheduled: {
    label: 'Scheduled',
    className: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  },
  in_progress: {
    label: 'In Progress',
    className: 'bg-violet-50 text-violet-700 ring-violet-600/20',
  },
  completed: {
    label: 'Completed',
    className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  },
};

const priorityConfig: Record<string, { label: string; className: string }> = {
  low: {
    label: 'Low',
    className: 'bg-gray-50 text-gray-600 ring-gray-500/20',
  },
  medium: {
    label: 'Medium',
    className: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  },
  high: {
    label: 'High',
    className: 'bg-orange-50 text-orange-700 ring-orange-600/20',
  },
  urgent: {
    label: 'Urgent',
    className: 'bg-red-50 text-red-700 ring-red-600/20',
  },
};

export function StatusBadge({ stage }: { stage: RequestStage }) {
  const { label, className } = config[stage];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${className}`}
    >
      {label}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: string }) {
  const { label, className } = priorityConfig[priority] ?? priorityConfig.low;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${className}`}
    >
      {label}
    </span>
  );
}
