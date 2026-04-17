import { Link } from 'react-router-dom';
import { MapPin, Clock, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { StatusBadge, PriorityBadge } from './StatusBadge';
import type { MaintenanceRequest } from '../data/types';

interface RequestCardProps {
  request: MaintenanceRequest;
}

const stageProgress: Record<string, number> = {
  submitted: 20,
  under_review: 40,
  scheduled: 60,
  in_progress: 80,
  completed: 100,
};

const progressColor: Record<string, string> = {
  submitted: 'bg-indigo-500',
  under_review: 'bg-amber-500',
  scheduled: 'bg-blue-500',
  in_progress: 'bg-violet-500',
  completed: 'bg-emerald-500',
};

export function RequestCard({ request }: RequestCardProps) {
  const progress = stageProgress[request.currentStage] ?? 0;

  return (
    <Link
      to={`/requests/${request.id}`}
      className="block bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all p-5 no-underline group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge stage={request.currentStage} />
            <PriorityBadge priority={request.priority} />
            <span className="text-xs text-gray-400 font-mono">{request.id}</span>
          </div>
          <h3 className="text-base font-semibold text-gray-900 mt-2 group-hover:text-cmu-red transition-colors">
            {request.title}
          </h3>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {request.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatDistanceToNow(new Date(request.submittedAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-cmu-red transition-colors shrink-0 mt-1" />
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressColor[request.currentStage]}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {request.estimatedResolution && request.currentStage !== 'completed' && (
        <div className="mt-3 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          Estimated resolution:{' '}
          <span className="font-medium text-gray-700">
            {new Date(request.estimatedResolution).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </span>
        </div>
      )}
    </Link>
  );
}
