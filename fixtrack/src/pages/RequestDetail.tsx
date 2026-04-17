import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  User,
  Clock,
  Calendar,
  Camera,
  Tag,
  AlertTriangle,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { useStore } from '../data/store';
import { StageTracker } from '../components/StageTracker';
import { StatusBadge, PriorityBadge } from '../components/StatusBadge';

export function RequestDetail() {
  const { id } = useParams<{ id: string }>();
  const { requests } = useStore();
  const request = requests.find((r) => r.id === id);

  if (!request) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Request not found.</p>
        <Link to="/requests" className="text-cmu-red text-sm mt-2 inline-block">
          Back to requests
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back link */}
      <Link
        to="/requests"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors no-underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to requests
      </Link>

      {/* Header card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <StatusBadge stage={request.currentStage} />
              <PriorityBadge priority={request.priority} />
              <span className="text-xs text-gray-400 font-mono">
                {request.id}
              </span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              {request.title}
            </h1>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
          {request.description}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-gray-100">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">
                Location
              </p>
              <p className="text-sm text-gray-800 font-medium">
                {request.location}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Tag className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">
                Category
              </p>
              <p className="text-sm text-gray-800 font-medium">
                {request.category}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">
                Submitted
              </p>
              <p className="text-sm text-gray-800 font-medium">
                {format(new Date(request.submittedAt), 'MMM d, yyyy')}
              </p>
              <p className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(request.submittedAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          {request.technicianName && (
            <div className="flex items-start gap-2">
              <User className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">
                  Technician
                </p>
                <p className="text-sm text-gray-800 font-medium">
                  {request.technicianName}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Stage Tracker — main column */}
        <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-5">
            Request Timeline
          </h2>
          <StageTracker
            stages={request.stages}
            currentStage={request.currentStage}
          />
        </div>

        {/* Side panel */}
        <div className="space-y-5">
          {/* Estimated Resolution */}
          {request.estimatedResolution && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-semibold text-gray-900">
                  {request.currentStage === 'completed'
                    ? 'Resolved On'
                    : 'Estimated Resolution'}
                </h3>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {format(
                  new Date(request.estimatedResolution),
                  'EEE, MMM d, yyyy',
                )}
              </p>
              <p className="text-sm text-gray-500">
                {format(new Date(request.estimatedResolution), 'h:mm a')}
              </p>
              {request.currentStage !== 'completed' && (
                <div className="mt-3 bg-blue-50 rounded-lg p-2.5 text-xs text-blue-700 flex items-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  This is an estimate and may change based on technician availability.
                </div>
              )}
            </div>
          )}

          {/* Completion Photo */}
          {request.completionPhotoUrl && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Camera className="w-4 h-4 text-emerald-500" />
                <h3 className="text-sm font-semibold text-gray-900">
                  Completion Photo
                </h3>
              </div>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={request.completionPhotoUrl}
                  alt="Completed maintenance work"
                  className="w-full h-48 object-cover"
                />
              </div>
              {request.technicianNote && (
                <div className="mt-3 bg-emerald-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-emerald-800 mb-1">
                    Technician Note:
                  </p>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    {request.technicianNote}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Pending completion placeholder */}
          {!request.completionPhotoUrl &&
            request.currentStage !== 'completed' && (
              <div className="bg-white rounded-xl border border-gray-200 border-dashed p-5 text-center">
                <Camera className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400 font-medium">
                  Completion Photo
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  A photo will be added here when work is completed.
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
