import React from 'react';
import { useTheme } from '../context/ThemeContext';

const PageHeader = ({ title, subtitle, actions = null }) => {
  const { isDark } = useTheme();
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-white/80' : 'text-gray-600';
  return (
    <div className="mb-4 md:mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className={`text-2xl md:text-3xl font-bold ${textPrimary}`}>{title}</h2>
          {subtitle && <p className={`${textSecondary} mt-1`}>{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
