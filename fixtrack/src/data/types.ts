export type RequestStage =
  | 'submitted'
  | 'under_review'
  | 'scheduled'
  | 'in_progress'
  | 'completed';

export interface StageEntry {
  stage: RequestStage;
  label: string;
  timestamp: string | null;
  note?: string;
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  location: string;
  building: string;
  roomNumber: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  currentStage: RequestStage;
  stages: StageEntry[];
  estimatedResolution: string | null;
  submittedAt: string;
  completionPhotoUrl: string | null;
  technicianName: string | null;
  technicianNote: string | null;
  residentName: string;
  residentEmail: string;
}

export interface Notification {
  id: string;
  requestId: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'stage_update' | 'schedule' | 'completion' | 'info';
}
