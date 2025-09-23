import React from 'react';
import { Bars3Icon, UserIcon, ArrowRightOnRectangleIcon, LifebuoyIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Header = ({ onMenuClick }) => {
  const { isAuthenticated, user, logout } = useAuthContext();
  const { isDark, toggleTheme } = useTheme();
  const borderCls = isDark ? 'border-white/10' : 'border-gray-200';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-white/80' : 'text-gray-600';
  const btnBorder = isDark ? 'border-white/20 hover:bg-white/10' : 'border-gray-300 hover:bg-gray-100';

  return (
    <header className={`bg-transparent border-b ${borderCls} p-4 flex justify-between items-center`}>
      <div className="flex items-center">
        {onMenuClick && (
          <button onClick={onMenuClick} className="md:hidden mr-4">
            <Bars3Icon className={`w-6 h-6 ${textPrimary}`} />
          </button>
        )}
        <h1 className={`text-xl md:text-2xl font-bold ${textPrimary}`}>X-DiD Client Dashboard</h1>
      </div>
      {isAuthenticated ? (
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            title="Support"
            aria-label="Support"
            className={`inline-flex items-center justify-center px-3 py-1.5 rounded-md border ${btnBorder} ${textPrimary}`}
          >
            <LifebuoyIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            title="Toggle theme"
            aria-label="Toggle theme"
            className={`inline-flex items-center justify-center px-3 py-1.5 rounded-md border ${btnBorder} ${textPrimary}`}
          >
            {isDark ? (
              // Sun icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
                <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 1 1-1.5 0V3a.75.75 0 0 1 .75-.75Zm0 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 1 1-1.5 0V18a.75.75 0 0 1 .75-.75Zm9-6a.75.75 0 0 1-.75.75h-1.5a.75.75 0 1 1 0-1.5H20.25a.75.75 0 0 1 .75.75Zm-15 0A.75.75 0 0 1 6 12H4.5a.75.75 0 1 1 0-1.5H6A.75.75 0 0 1 6 12Zm11.78 7.03a.75.75 0 0 1-1.06 0l-1.06-1.06a.75.75 0 0 1 1.06-1.06l1.06 1.06a.75.75 0 0 1 0 1.06Zm-9.44-9.44a.75.75 0 0 1-1.06 0L6.22 8.47A.75.75 0 1 1 7.28 7.4l1.06 1.06a.75.75 0 0 1 0 1.06Zm9.44-7.44a.75.75 0 0 1 0 1.06L16.72 5.28a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0Zm-9.44 9.44L7.28 16.7A.75.75 0 0 1 6.22 15.6l1.06-1.06a.75.75 0 0 1 1.06 1.06Z" clipRule="evenodd" />
              </svg>
            ) : (
              // Moon icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M21.752 15.002A9 9 0 1 1 11.25 2.248a.75.75 0 0 1 .977.977 7.5 7.5 0 0 0 8.55 10.53.75.75 0 0 1 .975.246Z" />
              </svg>
            )}
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <UserIcon className={`w-6 h-6 ${textPrimary}`} />
            <span className={`text-sm ${textSecondary}`}>{user?.email}</span>
          </div>
          <button onClick={logout} className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md border ${isDark ? 'border-white/40' : 'border-gray-300'} text-sm ${textPrimary} ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
            <ArrowRightOnRectangleIcon className="w-4 h-4" /> Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            type="button"
            title="Support"
            aria-label="Support"
            className={`inline-flex items-center justify-center px-3 py-1.5 rounded-md border ${btnBorder} ${textPrimary}`}
          >
            <LifebuoyIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            title="Toggle theme"
            aria-label="Toggle theme"
            className={`inline-flex items-center justify-center px-3 py-1.5 rounded-md border ${btnBorder} ${textPrimary}`}
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" /><path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 1 1-1.5 0V3a.75.75 0 0 1 .75-.75Zm0 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 1 1-1.5 0V18a.75.75 0 0 1 .75-.75Zm9-6a.75.75 0 0 1-.75.75h-1.5a.75.75 0 1 1 0-1.5H20.25a.75.75 0 0 1 .75.75Zm-15 0A.75.75 0 0 1 6 12H4.5a.75.75 0 1 1 0-1.5H6A.75.75 0 0 1 6 12Zm11.78 7.03a.75.75 0 0 1-1.06 0l-1.06-1.06a.75.75 0 0 1 1.06-1.06l1.06 1.06a.75.75 0 0 1 0 1.06Zm-9.44-9.44a.75.75 0 0 1-1.06 0L6.22 8.47A.75.75 0 1 1 7.28 7.4l1.06 1.06a.75.75 0 0 1 0 1.06Zm9.44-7.44a.75.75 0 0 1 0 1.06L16.72 5.28a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0Zm-9.44 9.44L7.28 16.7A.75.75 0 0 1 6.22 15.6l1.06-1.06a.75.75 0 0 1 1.06 1.06Z" clipRule="evenodd" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M21.752 15.002A9 9 0 1 1 11.25 2.248a.75.75 0 0 1 .977.977 7.5 7.5 0 0 0 8.55 10.53.75.75 0 0 1 .975.246Z" /></svg>
            )}
          </button>
          <Link to="/login" className={`px-3 py-1.5 rounded-md border ${btnBorder} ${textPrimary} text-sm`}>Sign In</Link>
          <Link to="/register" className="px-3 py-1.5 rounded-md bg-emerald-500 text-white text-sm hover:bg-emerald-600">Get Started</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
