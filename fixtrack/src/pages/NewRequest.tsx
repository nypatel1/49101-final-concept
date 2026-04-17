import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle2 } from 'lucide-react';
import { useStore } from '../data/store';
import type { MaintenanceRequest } from '../data/types';

const categories = [
  'HVAC / Heating',
  'Plumbing',
  'Electrical',
  'Doors & Windows',
  'Appliances',
  'Pest Control',
  'General Repair',
  'Other',
];

const buildings = [
  'Morewood Gardens',
  'Mudge House',
  'Stever House',
  'Donner House',
  'Scobell House',
  'Henderson House',
  'Resnik House',
  'Boss House',
  'McGill House',
  'Welch House',
];

const priorities: Array<{ value: string; label: string; desc: string }> = [
  { value: 'low', label: 'Low', desc: 'Minor inconvenience' },
  { value: 'medium', label: 'Medium', desc: 'Noticeable issue' },
  { value: 'high', label: 'High', desc: 'Significant impact' },
  { value: 'urgent', label: 'Urgent', desc: 'Safety / health risk' },
];

export function NewRequest() {
  const navigate = useNavigate();
  const { addRequest } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [newId, setNewId] = useState('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    building: '',
    roomNumber: '',
    category: '',
    priority: 'medium',
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const id = `REQ-2026-${String(Math.floor(Math.random() * 900) + 100)}`;
    const now = new Date().toISOString();

    const newRequest: MaintenanceRequest = {
      id,
      title: form.title,
      description: form.description,
      location: `Room ${form.roomNumber}, ${form.building}`,
      building: form.building,
      roomNumber: form.roomNumber,
      category: form.category,
      priority: form.priority as MaintenanceRequest['priority'],
      currentStage: 'submitted',
      stages: [
        {
          stage: 'submitted',
          label: 'Request Submitted',
          timestamp: now,
          note: 'Request received and logged into the system.',
        },
        { stage: 'under_review', label: 'Under Review', timestamp: null },
        { stage: 'scheduled', label: 'Technician Scheduled', timestamp: null },
        { stage: 'in_progress', label: 'Work In Progress', timestamp: null },
        { stage: 'completed', label: 'Completed', timestamp: null },
      ],
      estimatedResolution: null,
      submittedAt: now,
      completionPhotoUrl: null,
      technicianName: null,
      technicianNote: null,
      residentName: 'Alex Chen',
      residentEmail: 'achen@andrew.cmu.edu',
    };

    addRequest(newRequest);
    setNewId(id);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          Request Submitted!
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Your request <span className="font-mono font-medium">{newId}</span>{' '}
          has been logged. You'll receive notifications as it progresses through
          each stage.
        </p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => navigate(`/requests/${newId}`)}
            className="bg-cmu-red hover:bg-cmu-red-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            Track Request
          </button>
          <button
            onClick={() => navigate('/requests')}
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            View All Requests
          </button>
        </div>
      </div>
    );
  }

  const isValid =
    form.title && form.description && form.building && form.roomNumber && form.category;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          New Maintenance Request
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Describe the issue and we'll get it resolved. You'll be able to track
          every step.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100"
      >
        {/* Title */}
        <div className="p-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Issue Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder="e.g., Broken radiator, leaking faucet"
            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cmu-red/20 focus:border-cmu-red transition-colors"
          />
        </div>

        {/* Description */}
        <div className="p-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            rows={4}
            placeholder="Describe the issue in detail — what's happening, when it started, and any relevant specifics. The more detail you provide, the faster we can resolve it."
            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cmu-red/20 focus:border-cmu-red transition-colors resize-none"
          />
        </div>

        {/* Location */}
        <div className="p-5 grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Building
            </label>
            <select
              value={form.building}
              onChange={(e) => update('building', e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cmu-red/20 focus:border-cmu-red transition-colors bg-white"
            >
              <option value="">Select building</option>
              {buildings.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Room Number
            </label>
            <input
              type="text"
              value={form.roomNumber}
              onChange={(e) => update('roomNumber', e.target.value)}
              placeholder="e.g., 412"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cmu-red/20 focus:border-cmu-red transition-colors"
            />
          </div>
        </div>

        {/* Category */}
        <div className="p-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => update('category', e.target.value)}
            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cmu-red/20 focus:border-cmu-red transition-colors bg-white"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div className="p-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Priority
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {priorities.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => update('priority', p.value)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  form.priority === p.value
                    ? 'border-cmu-red bg-cmu-red/5 ring-2 ring-cmu-red/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p
                  className={`text-sm font-semibold ${
                    form.priority === p.value
                      ? 'text-cmu-red'
                      : 'text-gray-700'
                  }`}
                >
                  {p.label}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">{p.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="p-5">
          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-cmu-red hover:bg-cmu-red-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}
