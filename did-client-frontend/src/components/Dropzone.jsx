import React, { useState, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

const Dropzone = ({ onFiles, className = '' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { isDark } = useTheme();

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length && onFiles) onFiles(files);
  }, [onFiles]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length && onFiles) onFiles(files);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-md p-6 text-center transition-colors ${
        isDragging
          ? isDark
            ? 'border-emerald-400 bg-slate-800/50'
            : 'border-emerald-500 bg-emerald-50'
          : isDark
          ? 'border-white/20'
          : 'border-gray-300'
      } ${className}`}
    >
      <p className={`mb-3 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>Drag and drop CSV/Excel files here</p>
      <p className={`mb-4 text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>or</p>
      <label className="inline-block">
        <span className="px-4 py-2 bg-emerald-500 text-white rounded-md cursor-pointer hover:bg-emerald-600">Browse Files</span>
        <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={handleChange} className="hidden" />
      </label>
    </div>
  );
};

export default Dropzone;
