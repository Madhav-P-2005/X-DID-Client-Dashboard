import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import { useTheme } from '../context/ThemeContext';

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      institutionName: '',
      institutionType: 'University',
      website: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      country: '',
      state: '',
      city: '',
      address: '',
      expectedVolume: '',
      ipfsProvider: 'Pinata',
      password: '',
      confirm: '',
      agree: false,
    },
    mode: 'onSubmit',
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isDark } = useTheme();

  const gridBg = isDark
    ? 'bg-[#0b1f3a] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]'
    : 'bg-[#f6f8fb] [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:48px_48px]';
  const panelBg = isDark ? 'bg-slate-900/70' : 'bg-white/90';
  const borderCls = isDark ? 'border-white/10' : 'border-gray-200';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-white/80' : 'text-gray-600';
  const inputBase = isDark
    ? 'bg-slate-800/80 text-white placeholder-white/50 border-white/10'
    : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300';

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // TODO: Integrate with backend when ready
      // For now, simply show success and redirect to Login
      alert('Registration successful. Please sign in.');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${gridBg}`}>
      {/* Background accents removed in favor of grid */}
      <div className="absolute inset-0 -z-0 pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
        <div className="mb-8 text-center">
          <h2 className={`text-3xl font-extrabold tracking-tight ${textPrimary}`}>Get started with X-DiD Dashboard</h2>
          <p className={`mt-1 ${textSecondary} text-sm`}>For Colleges and Universities to issue and verify degrees as Verifiable Credentials</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Card */}
          <div className={`lg:col-span-2 rounded-2xl ${panelBg} border ${borderCls} shadow-sm p-6`}>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium ${textPrimary} mb-1`}>Institution Name</label>
                <input
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase} ${errors.institutionName ? (isDark ? 'border-red-500' : 'border-red-400') : ''}`}
                  placeholder="e.g., ABC University"
                  {...register('institutionName', { required: 'Institution name is required', minLength: { value: 3, message: 'Too short' } })}
                />
                {errors.institutionName && <p className={`text-xs mt-1 ${isDark ? 'text-red-400' : 'text-red-600'}`}>{errors.institutionName.message}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-1`}>Institution Type</label>
                <select
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase}`}
                  {...register('institutionType')}
                >
                  <option>University</option>
                  <option>College</option>
                  <option>Institute</option>
                  <option>Department</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-1`}>Website</label>
                <input
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase} ${errors.website ? (isDark ? 'border-red-500' : 'border-red-400') : ''}`}
                  placeholder="https://"
                  {...register('website', { pattern: { value: /^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}.*$/, message: 'Invalid URL' } })}
                />
                {errors.website && <p className={`text-xs mt-1 ${isDark ? 'text-red-400' : 'text-red-600'}`}>{errors.website.message}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-1`}>Contact Person</label>
                <input
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase} ${errors.contactName ? (isDark ? 'border-red-500' : 'border-red-400') : ''}`}
                  placeholder="Full name"
                  {...register('contactName', { required: 'Contact name is required' })}
                />
                {errors.contactName && <p className={`text-xs mt-1 ${isDark ? 'text-red-400' : 'text-red-600'}`}>{errors.contactName.message}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-1`}>Contact Email</label>
                <input
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase} ${errors.contactEmail ? (isDark ? 'border-red-500' : 'border-red-400') : ''}`}
                  placeholder="admin@university.edu"
                  {...register('contactEmail', { required: 'Email is required', pattern: { value: /[^@\s]+@[^@\s]+\.[^@\s]+/, message: 'Invalid email' } })}
                />
                {errors.contactEmail && <p className={`text-xs mt-1 ${isDark ? 'text-red-400' : 'text-red-600'}`}>{errors.contactEmail.message}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-1`}>Contact Phone</label>
                <input
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase}`}
                  placeholder="+91 98765 43210"
                  {...register('contactPhone')}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-1`}>Country</label>
                <input className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase}`} {...register('country')} />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-1`}>State</label>
                <input className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase}`} {...register('state')} />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-1`}>City</label>
                <input className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase}`} {...register('city')} />
              </div>
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium ${textPrimary} mb-1`}>Address</label>
                <textarea className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase}`} rows="2" {...register('address')} />
              </div>

              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-1`}>Expected Issuance Volume (per month)</label>
                <select className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase}`} {...register('expectedVolume')}>
                  <option value="">Select</option>
                  <option>1-100</option>
                  <option>100-1,000</option>
                  <option>1,000-10,000</option>
                  <option>10,000+</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium ${textPrimary} mb-1`}>Preferred IPFS Provider</label>
                <select className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase}`} {...register('ipfsProvider')}>
                  <option>Pinata</option>
                  <option>Web3.Storage</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-1`}>Password</label>
                  <input
                    type="password"
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase} ${errors.password ? (isDark ? 'border-red-500' : 'border-red-400') : ''}`}
                    placeholder="••••••••"
                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                  />
                  {errors.password && <p className={`text-xs mt-1 ${isDark ? 'text-red-400' : 'text-red-600'}`}>{errors.password.message}</p>}
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-1`}>Confirm Password</label>
                  <input
                    type="password"
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase} ${errors.confirm ? (isDark ? 'border-red-500' : 'border-red-400') : ''}`}
                    placeholder="••••••••"
                    {...register('confirm', {
                      required: 'Confirm your password',
                      validate: (val) => val === watch('password') || 'Passwords do not match',
                    })}
                  />
                  {errors.confirm && <p className={`text-xs mt-1 ${isDark ? 'text-red-400' : 'text-red-600'}`}>{errors.confirm.message}</p>}
                </div>
              </div>

              <div className="md:col-span-2 flex items-start gap-3 mt-2">
                <input id="agree" type="checkbox" className="mt-1 accent-emerald-500" {...register('agree', { required: 'You must agree to continue' })} />
                <label htmlFor="agree" className={`text-sm ${textPrimary}`}>I agree to the terms and privacy policy.</label>
              </div>
              {errors.agree && <p className={`text-xs md:col-span-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>{errors.agree.message}</p>}

              <div className="md:col-span-2 mt-2">
                <Button type="submit" disabled={loading} className="bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-500">{loading ? 'Creating account...' : 'Get Started'}</Button>
                <p className={`text-sm ${textSecondary} mt-3`}>Already have an account? <Link to="/login" className={`${isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-500'}`}>Sign in</Link></p>
              </div>
            </form>
          </div>

          {/* Benefits Card */}
          <div className={`rounded-2xl ${panelBg} border ${borderCls} shadow-sm p-6`}>
            <h3 className={`text-lg font-semibold mb-3 ${textPrimary}`}>Why institutions choose us</h3>
            <ul className={`text-sm ${textSecondary} space-y-2 list-disc list-inside`}>
              <li>Standards-compliant X-DiD and Verifiable Credentials (W3C).</li>
              <li>Bulk issuance workflow with CSV/Excel templates.</li>
              <li>IPFS-backed storage for VC JSON and PDF artifacts.</li>
              <li>Powerful search with filters and audit logs.</li>
              <li>Public verification portal with X-DiD resolution.</li>
              <li>Secure by design — built with SecureDApp expertise.</li>
            </ul>
            <div className={`mt-4 text-sm ${textSecondary}`}>
              Company website: <a className={`${isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-500'}`} href="https://securedapp.io/" target="_blank" rel="noreferrer">securedapp.io</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
