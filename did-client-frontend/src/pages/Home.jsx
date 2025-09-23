import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { isDark } = useTheme();
  const gridBg = isDark
    ? 'bg-[#0b1f3a] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]'
    : 'bg-[#f6f8fb] [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:48px_48px]';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-white/80' : 'text-gray-600';
  const panelBg = isDark ? 'bg-slate-900/70' : 'bg-white/90';
  const borderCls = isDark ? 'border-white/10' : 'border-gray-200';

  return (
    <div className={`min-h-screen flex flex-col ${gridBg}`}>
      <Header />
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">
          <div className={`rounded-2xl ${panelBg} border ${borderCls} p-6 md:p-10`}> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${textPrimary}`}>Issue and Verify Degrees with X-DiD</h1>
                <p className={`mt-3 text-base md:text-lg ${textSecondary}`}>
                  A clean, secure dashboard for institutions to issue Verifiable Credentials and
                  an easy portal to verify authenticity.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link to="/register" className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-emerald-500 text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    Get Started
                  </Link>
                  <Link to="/login" className={`inline-flex items-center justify-center px-5 py-2.5 rounded-md border ${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-300 text-gray-900 hover:bg-gray-100'}`}>
                    Sign In
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className={`rounded-xl ${panelBg} border ${borderCls} p-4 h-full`}> 
                  <ul className={`text-sm md:text-base space-y-2 ${textSecondary}`}>
                    <li>• Standards-compliant X-DiD and Verifiable Credentials (W3C)</li>
                    <li>• Bulk issuance via CSV/Excel templates</li>
                    <li>• IPFS-backed storage for VC JSON and PDFs</li>
                    <li>• Powerful search, filters, and audit logs</li>
                    <li>• Public verification portal with X-DiD resolution</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className={`text-center text-sm ${textSecondary}`}>
            © {new Date().getFullYear()} X-DiD Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
