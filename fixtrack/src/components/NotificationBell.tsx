import { useState, useRef, useEffect } from 'react';
import { Bell, CheckCheck, Package, Calendar, Info, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../data/store';
import { formatDistanceToNow } from 'date-fns';
import type { Notification } from '../data/types';

const typeIcon: Record<Notification['type'], typeof Bell> = {
  stage_update: Wrench,
  schedule: Calendar,
  completion: Package,
  info: Info,
};

const typeColor: Record<Notification['type'], string> = {
  stage_update: 'text-indigo-500 bg-indigo-50',
  schedule: 'text-blue-500 bg-blue-50',
  completion: 'text-emerald-500 bg-emerald-50',
  info: 'text-amber-500 bg-amber-50',
};

export function NotificationBell() {
  const { notifications, markNotificationRead, markAllNotificationsRead } =
    useStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleNotificationClick(n: Notification) {
    markNotificationRead(n.id);
    setOpen(false);
    navigate(`/requests/${n.requestId}`);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-cmu-red text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-96 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="flex items-center gap-1 text-xs text-cmu-red hover:text-cmu-red-dark font-medium"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto divide-y divide-gray-50">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-gray-400">
                No notifications yet.
              </div>
            ) : (
              notifications.map((n) => {
                const Icon = typeIcon[n.type];
                return (
                  <button
                    key={n.id}
                    onClick={() => handleNotificationClick(n)}
                    className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-gray-50 transition-colors ${
                      !n.read ? 'bg-cmu-red/[0.03]' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${typeColor[n.type]}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`text-sm leading-snug ${
                            !n.read
                              ? 'font-semibold text-gray-900'
                              : 'font-medium text-gray-700'
                          }`}
                        >
                          {n.title}
                        </p>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-cmu-red shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                        {n.message}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        {formatDistanceToNow(new Date(n.timestamp), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
