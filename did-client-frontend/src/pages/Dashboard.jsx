import React from 'react';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { isDark } = useTheme();
  const panelBg = isDark ? 'bg-slate-900/60' : 'bg-white/90';
  const borderCls = isDark ? 'border-white/10' : 'border-gray-200';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const muted = isDark ? 'text-white/90' : 'text-gray-700';
  const warn = isDark ? 'text-yellow-300' : 'text-yellow-600';
  return (
    <Layout>
      <div>
        <PageHeader title="Dashboard Overview" subtitle="Key metrics and recent activity across the DID issuance workflow" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <div className={`${panelBg} border ${borderCls} p-4 md:p-6 rounded`}>
            <h3 className={`text-lg font-semibold ${textPrimary}`}>Total Degrees Issued</h3>
            <p className="text-2xl font-bold text-emerald-400">1,245</p>
          </div>
          <div className={`${panelBg} border ${borderCls} p-4 md:p-6 rounded`}>
            <h3 className={`text-lg font-semibold ${textPrimary}`}>Pending Verifications</h3>
            <p className={`text-2xl font-bold ${warn}`}>23</p>
          </div>
          <div className={`${panelBg} border ${borderCls} p-4 md:p-6 rounded`}>
            <h3 className={`text-lg font-semibold ${textPrimary}`}>Templates Downloaded</h3>
            <p className="text-2xl font-bold text-emerald-400">156</p>
          </div>
        </div>
        <div className="mt-6 md:mt-8">
          <h3 className={`text-lg md:text-xl font-semibold mb-4 ${textPrimary}`}>Recent Activity</h3>
          <ul className={`${panelBg} border ${borderCls} p-4 rounded`}>
            <li className={`mb-2 ${muted}`}>Degree issued for John Doe - 2 hours ago</li>
            <li className={`mb-2 ${muted}`}>Template downloaded by admin - 4 hours ago</li>
            <li className={`${muted}`}>Verification completed for Jane Smith - 1 day ago</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
