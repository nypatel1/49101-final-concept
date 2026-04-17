import { useState } from 'react';
import { useStore } from '../data/store';
import { RequestCard } from '../components/RequestCard';
import type { RequestStage } from '../data/types';

const filters: Array<{ value: string; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

export function RequestList() {
  const { requests } = useStore();
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered =
    activeFilter === 'all'
      ? requests
      : requests.filter((r) => r.currentStage === (activeFilter as RequestStage));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Requests</h1>
        <p className="text-sm text-gray-500 mt-1">
          All your maintenance requests in one place.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              activeFilter === f.value
                ? 'bg-cmu-red text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f.label}
            {f.value === 'all' && (
              <span className="ml-1.5 opacity-70">{requests.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Request list */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((req) => (
            <RequestCard key={req.id} request={req} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-sm text-gray-400">
            No requests matching this filter.
          </p>
        </div>
      )}
    </div>
  );
}
