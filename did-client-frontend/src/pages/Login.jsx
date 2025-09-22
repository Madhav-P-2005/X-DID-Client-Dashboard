/* Path :- did-client-frontend/src/pages/Login.jsx */

// why :-  Login page component.

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import { useAuthContext } from '../context/AuthContext';
import SecureLogo from '../assets/SecureDApp.png';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();
  const { isDark, toggleTheme } = useTheme();

  const gridBg = isDark ? 'bg-grid-navy' : 'bg-grid-light';
  const borderCls = isDark ? 'border-white/10' : 'border-gray-200';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-white/80' : 'text-gray-600';
  const panelBg = isDark ? 'bg-slate-900/70' : 'bg-white/90';
  const accentText = isDark ? 'text-emerald-400' : 'text-emerald-600';
  const hoverAccentText = isDark ? 'hover:text-emerald-300' : 'hover:text-emerald-500';
  const inputBg = isDark ? 'bg-slate-800/80 text-white placeholder-white/50 border-white/10' : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300';
  const hoverBtn = isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100';
  const [recentEmails, setRecentEmails] = useState([]);
  const [showEmailSuggest, setShowEmailSuggest] = useState(false);
  const emailValue = watch('email');
  // Build suggestions list (recent emails only)
  const filteredRecent = (() => {
    const v = (emailValue || '').trim().toLowerCase();
    if (!v) return recentEmails;
    return recentEmails.filter((em) => em.toLowerCase().includes(v));
  })();
  const emailSuggestions = Array.from(new Set([...(filteredRecent || [])])).slice(0, 8);

  // Load previously used emails
  useEffect(() => {
    try {
      const raw = localStorage.getItem('recent_emails');
      if (raw) {
        const list = JSON.parse(raw);
        if (Array.isArray(list)) setRecentEmails(list);
      }
    } catch (_) {}
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');
      const payload = {
        email: (data.email || '').trim().toLowerCase(),
        password: data.password,
        remember,
      };
      // Mock auth flow (replace with API when backend is ready)
      if (!payload.email || !payload.password) throw new Error('Missing credentials');
      login(payload.email);
      // Persist email to recent list (max 8, unique)
      try {
        const raw = localStorage.getItem('recent_emails');
        const list = Array.isArray(JSON.parse(raw || '[]')) ? JSON.parse(raw || '[]') : [];
        const next = [payload.email, ...list.filter((e) => e.toLowerCase() !== payload.email.toLowerCase())].slice(0, 8);
        localStorage.setItem('recent_emails', JSON.stringify(next));
        setRecentEmails(next);
      } catch (_) {}
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${gridBg}`}>
      {/* Top brand header (transparent over grid) */}
      <header className={`w-full border-b ${borderCls} bg-transparent`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className={`text-2xl font-semibold tracking-tight ${textPrimary}`}>DID Client Dashboard</div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={`p-2 rounded-full ${isDark ? 'text-white/80' : 'text-gray-700'} ${hoverBtn}`}
              aria-label="Support"
              title="Support"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18 13a3 3 0 0 0-3 3v3h6v-3a3 3 0 0 0-3-3Z"/>
                <path fillRule="evenodd" d="M8.25 7.5a3.75 3.75 0 1 1 7.5 0v4.875a.375.375 0 0 1-.375.375h-6.75a.375.375 0 0 1-.375-.375V7.5Z" clipRule="evenodd"/>
                <path d="M5.25 12.75a2.25 2.25 0 0 1 2.25-2.25v1.125a1.125 1.125 0 0 0 1.125 1.125H6.75v.75a.75.75 0 0 1-1.5 0v-.75Zm13.5 0v.75a.75.75 0 0 1-1.5 0v-.75h-1.875A1.125 1.125 0 0 0 16.5 11.625V10.5a2.25 2.25 0 0 1 2.25 2.25Z"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDark ? 'text-white/80' : 'text-gray-700'} ${hoverBtn}`}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDark ? (
                // Sun icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" /><path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 1 1-1.5 0V3a.75.75 0 0 1 .75-.75Zm0 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 1 1-1.5 0V18a.75.75 0 0 1 .75-.75Zm9-6a.75.75 0 0 1-.75.75h-1.5a.75.75 0 1 1 0-1.5H20.25a.75.75 0 0 1 .75.75Zm-15 0A.75.75 0 0 1 6 12H4.5a.75.75 0 1 1 0-1.5H6A.75.75 0 0 1 6 12Zm11.78 7.03a.75.75 0 0 1-1.06 0l-1.06-1.06a.75.75 0 0 1 1.06-1.06l1.06 1.06a.75.75 0 0 1 0 1.06Zm-9.44-9.44a.75.75 0 0 1-1.06 0L6.22 8.47A.75.75 0 1 1 7.28 7.4l1.06 1.06a.75.75 0 0 1 0 1.06Zm9.44-7.44a.75.75 0 0 1 0 1.06L16.72 5.28a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0Zm-9.44 9.44L7.28 16.7A.75.75 0 0 1 6.22 15.6l1.06-1.06a.75.75 0 0 1 1.06 1.06Z" clipRule="evenodd" /></svg>
              ) : (
                // Moon icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M21.752 15.002A9 9 0 1 1 11.25 2.248a.75.75 0 0 1 .977.977 7.5 7.5 0 0 0 8.55 10.53.75.75 0 0 1 .975.246Z" /></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Background accents removed in favor of grid */}
      <div className="absolute inset-0 -z-0 pointer-events-none" />

      {/* Centered content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className={`rounded-2xl ${panelBg} border ${borderCls} shadow-sm p-4 sm:p-6 md:p-8`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left panel */}
            <div className="flex flex-col justify-center">
              <p className={`text-sm ${accentText}`}>Realtime Security</p>
              <h1 className={`mt-2 text-2xl sm:text-3xl font-semibold ${textPrimary}`}>Sign in</h1>
              <Link to="/register" className={`mt-6 inline-flex items-center ${accentText} ${hoverAccentText}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                  <path fillRule="evenodd" d="M8.25 4.5a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V6.31l-9.97 9.97a.75.75 0 1 1-1.06-1.06L16.94 5.25H9a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                </svg>
                Create Account
              </Link>
            </div>

            {/* Right panel: form */}
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium ${textPrimary} mb-2`}>Email</label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      onFocus={() => setShowEmailSuggest(true)}
                      onBlur={() => setTimeout(() => setShowEmailSuggest(false), 120)}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBg} ${errors.email ? (isDark ? 'border-red-500' : 'border-red-400') : ''}`}
                      {...register('email', {
                        required: 'Email is required',
                        maxLength: { value: 100, message: 'Email too long' },
                        minLength: { value: 5, message: 'Email too short' },
                        pattern: { value: /[^@\s]+@[^@\s]+\.[^@\s]+/, message: 'Invalid email format' },
                      })}
                    />
                    {showEmailSuggest && emailSuggestions.length > 0 && (
                      <div className={`absolute left-0 right-0 mt-1 max-h-56 overflow-auto rounded-lg border shadow-sm z-20 ${isDark ? 'bg-slate-900/95 border-white/10' : 'bg-white border-gray-200'}`}>
                        {emailSuggestions.map((s) => (
                          <button
                            type="button"
                            key={s}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => { setValue('email', s, { shouldValidate: true }); setShowEmailSuggest(false); }}
                            className={`w-full text-left px-3 py-2 text-sm ${isDark ? 'hover:bg-white/10 text-white/90' : 'hover:bg-gray-100 text-gray-800'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className={`mt-2 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>⚠️ {errors.email.message}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className={`block text-sm font-medium ${textPrimary}`}>Password</label>
                    <Link to="#" className={`text-xs ${accentText} ${hoverAccentText}`}>Forgot Password?</Link>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className={`w-full px-4 py-3 pr-10 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBg} ${errors.password ? (isDark ? 'border-red-500' : 'border-red-400') : ''}`}
                      {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className={`absolute inset-y-0 right-3 flex items-center ${isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.5 12c1.5 3.5 5.25 6.75 10.5 6.75 2.084 0 3.996-.56 5.64-1.527M6.228 6.228A10.45 10.45 0 0 1 12 5.25c5.25 0 9 3.25 10.5 6.75a10.523 10.523 0 0 1-4.233 4.726M6.228 6.228 3 3m3.228 3.228 3.27 3.27m0 0a2.25 2.25 0 1 0 3.182 3.183m-3.182-3.183 3.182 3.183M13.5 10.5l3 3" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className={`mt-2 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>⚠️ {errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className={`inline-flex items-center text-sm ${textPrimary}`}>
                    <input
                      type="checkbox"
                      className={`h-4 w-4 rounded ${isDark ? 'border-white/20 bg-slate-800/80' : 'border-gray-300 bg-white'} text-emerald-500 focus:ring-emerald-500`}
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    <span className="ml-2">Remember me</span>
                  </label>
                </div>

                {error && (
                  <div className={`rounded-xl border text-sm px-3 py-2 ${isDark ? 'border-red-400/30 bg-red-900/30 text-red-300' : 'border-red-300 bg-red-50 text-red-700'}`}>{error}</div>
                )}

                <Button type="submit" disabled={loading} className="mt-2 bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-500">
                  {loading ? 'Signing in...' : 'Sign in'}
                </Button>
              </form>
            </div>
          </div>

          {/* tagline */}
          <div className={`mt-8 text-center ${textSecondary}`}>
            <span className="text-xs md:text-sm">Secure Access to Verify Degree Certificates</span>
          </div>
        </div>

        {/* Footer logo text */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center justify-center gap-2">
            <img
              src={SecureLogo}
              alt="SecureDapp logo"
              className="w-12 h-12 object-contain"
              loading="lazy"
            />
            <span className={`font-bold text-xl md:text-2xl ${textPrimary}`}>SecureDApp</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
