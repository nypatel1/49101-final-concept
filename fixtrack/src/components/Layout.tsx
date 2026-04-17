import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  ClipboardList,
  PlusCircle,
  Home,
  Wrench,
} from 'lucide-react';
import { NotificationBell } from './NotificationBell';

const navItems = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/requests', label: 'My Requests', icon: ClipboardList },
  { to: '/new', label: 'New Request', icon: PlusCircle },
];

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-cmu-light flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5 no-underline">
              <div className="w-9 h-9 bg-cmu-red rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900 tracking-tight">
                  FixTrack
                </span>
                <span className="text-[11px] text-gray-400 ml-1.5 hidden sm:inline">
                  CMU Maintenance
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(({ to, label, icon: Icon }) => {
                const active =
                  to === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(to);
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors no-underline ${
                      active
                        ? 'bg-cmu-red/10 text-cmu-red'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <NotificationBell />
              <div className="w-8 h-8 rounded-full bg-cmu-red text-white flex items-center justify-center text-sm font-semibold">
                AC
              </div>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="md:hidden border-t border-gray-100 flex">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active =
              to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-xs font-medium no-underline ${
                  active ? 'text-cmu-red' : 'text-gray-500'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-400">
        FixTrack Prototype &middot; Carnegie Mellon University &middot; 49-101 Concept
      </footer>
    </div>
  );
}
