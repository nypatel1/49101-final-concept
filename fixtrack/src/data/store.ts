import { useState, useCallback } from 'react';
import { mockRequests, mockNotifications } from './mockData';
import type { MaintenanceRequest, Notification } from './types';

let globalRequests = [...mockRequests];
let globalNotifications = [...mockNotifications];
let listeners: Array<() => void> = [];

function emit() {
  listeners.forEach((l) => l());
}

export function useStore() {
  const [, setTick] = useState(0);

  const rerender = useCallback(() => setTick((t) => t + 1), []);

  useState(() => {
    listeners.push(rerender);
    return () => {
      listeners = listeners.filter((l) => l !== rerender);
    };
  });

  const addRequest = (req: MaintenanceRequest) => {
    globalRequests = [req, ...globalRequests];
    const notif: Notification = {
      id: `n-${Date.now()}`,
      requestId: req.id,
      title: 'Request Received',
      message: `Your maintenance request "${req.title}" (${req.id}) has been submitted successfully.`,
      timestamp: new Date().toISOString(),
      read: false,
      type: 'info',
    };
    globalNotifications = [notif, ...globalNotifications];
    emit();
  };

  const markNotificationRead = (id: string) => {
    globalNotifications = globalNotifications.map((n) =>
      n.id === id ? { ...n, read: true } : n,
    );
    emit();
  };

  const markAllNotificationsRead = () => {
    globalNotifications = globalNotifications.map((n) => ({ ...n, read: true }));
    emit();
  };

  return {
    requests: globalRequests,
    notifications: globalNotifications,
    addRequest,
    markNotificationRead,
    markAllNotificationsRead,
  };
}
