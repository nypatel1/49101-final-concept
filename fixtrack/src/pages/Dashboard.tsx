import { Link } from 'react-router-dom';
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  PlusCircle,
} from 'lucide-react';
import { useStore } from '../data/store';
import { RequestCard } from '../components/RequestCard';

export function Dashboard() {
  const { requests } = useStore();

  const active = requests.filter((r) => r.currentStage !== 'completed');
  const completed = requests.filter((r) => r.currentStage === 'completed');
  const urgent = requests.filter(
    (r) => r.priority === 'urgent' && r.currentStage !== 'completed',
  );

  const stats = [
    {
      label: 'Total Requests',
      value: requests.length,
      icon: ClipboardList,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      label: 'Active',
      value: active.length,
      icon: Clock,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'Completed',
      value: completed.length,
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Urgent',
      value: urgent.length,
      icon: AlertTriangle,
      color: 'bg-red-50 text-red-600',
    },
  ];

  const recentActive = active.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, Alex
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track your maintenance requests in real time.
          </p>
        </div>
        <Link
          to="/new"
          className="inline-flex items-center gap-2 bg-cmu-red hover:bg-cmu-red-dark text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors no-underline"
        >
          <PlusCircle className="w-4 h-4" />
          New Request
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-4"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Requests */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Active Requests
          </h2>
          <Link
            to="/requests"
            className="text-sm text-cmu-red hover:text-cmu-red-dark font-medium flex items-center gap-1 no-underline"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {recentActive.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentActive.map((req) => (
              <RequestCard key={req.id} request={req} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <p className="text-sm text-gray-500">
              All caught up! No active requests.
            </p>
          </div>
        )}
      </div>

      {/* Recently Completed */}
      {completed.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recently Completed
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completed.slice(0, 3).map((req) => (
              <RequestCard key={req.id} request={req} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
