import React from 'react';
import { useTheme } from '../context/ThemeContext';

const HighlightBanner = ({ children }) => {
  const { isDark } = useTheme();
  const textCls = isDark ? 'text-emerald-200' : 'text-emerald-700';
  const bgCls = isDark ? 'bg-emerald-400/10' : 'bg-emerald-500/10';
  const borderCls = isDark ? 'border-emerald-400/20' : 'border-emerald-500/20';
  const content = typeof children === 'string' ? children.trim() : children;

  return (
    <div className={`relative max-w-5xl mx-auto rounded-md border ${borderCls} ${bgCls} p-2.5 md:p-3`}>
      <div className="flex items-center justify-center">
        <p className={`text-center text-sm md:text-base leading-relaxed ${textCls} whitespace-nowrap overflow-hidden text-ellipsis w-full`} title={typeof content === 'string' ? content : undefined}>{content}</p>
      </div>
    </div>
  );
};

export default HighlightBanner;
