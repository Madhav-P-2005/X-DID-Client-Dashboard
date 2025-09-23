import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, DocumentIcon, AcademicCapIcon, ShieldCheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  const { isDark } = useTheme();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: HomeIcon },
    { path: '/templates', label: 'Templates', icon: DocumentIcon },
    { path: '/degrees', label: 'Degrees', icon: AcademicCapIcon },
    { path: '/verification', label: 'Verification', icon: ShieldCheckIcon },
  ];

  return (
    <div className={`w-64 min-h-screen p-4 bg-transparent border-r ${isDark ? 'border-white/10 text-white' : 'border-gray-200 text-gray-900'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">X-DiD Client Dashboard</h2>
        {onClose && (
          <button onClick={onClose} className="md:hidden">
            <XMarkIcon className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-900'}`} />
          </button>
        )}
      </div>
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={`flex items-center p-3 mb-2 rounded border ${
              location.pathname === item.path
                ? isDark ? 'bg-white/10 border-white/20' : 'bg-gray-100 border-gray-200'
                : isDark ? 'border-transparent hover:bg-white/5' : 'border-transparent hover:bg-gray-100'
            }`}
          >
            <item.icon className={`w-5 h-5 mr-3 ${isDark ? 'text-white' : 'text-gray-900'}`} />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
