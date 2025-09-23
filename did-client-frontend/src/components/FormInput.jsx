/* Path :- did-client-frontend/src/components/FormInput.jsx */

// why :-  Reusable form input component.

import React from "react";
import { useTheme } from '../context/ThemeContext';

const FormInput = ({
  type = "text",
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  error = "",
  helpText = "",
  className = "",
  ...props
}) => {
  const { isDark } = useTheme();
  const inputId = id || name || undefined;
  const labelCls = isDark ? 'text-white' : 'text-gray-900';
  const inputBase = isDark ? 'bg-slate-800/80 text-white placeholder-white/50 border-white/10' : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300';
  const helpCls = isDark ? 'text-white/60' : 'text-gray-500';
  const errCls = isDark ? 'text-red-400' : 'text-red-600';
  return (
    <div className="w-full mb-4">
      {label && (
        <label htmlFor={inputId} className={`block text-sm font-medium ${labelCls} mb-1`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${inputBase} ${error ? (isDark ? 'border-red-500' : 'border-red-400') : ''} ${className}`}
        {...props}
      />
      {helpText && !error && <p className={`mt-1 text-xs ${helpCls}`}>{helpText}</p>}
      {error && <p className={`mt-1 text-xs ${errCls}`}>{error}</p>}
    </div>
  );
};

export default FormInput;
