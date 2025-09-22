import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { useTheme } from '../context/ThemeContext';

const Verification = () => {
  const [vcHash, setVcHash] = useState('');
  const [result, setResult] = useState('');
  const { isDark } = useTheme();

  const panelBg = isDark ? 'bg-slate-900/60' : 'bg-white/90';
  const borderCls = isDark ? 'border-white/10' : 'border-gray-200';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-white/90' : 'text-gray-700';
  const inputBase = isDark
    ? 'bg-slate-800/80 text-white placeholder-white/50 border-white/10'
    : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300';

  const handleVerify = () => {
    // Mock verification
    setResult(vcHash ? 'Verification Successful: DID is valid.' : 'Invalid hash.');
  };

  return (
    <Layout>
      <div>
        <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${textPrimary}`}>Degree Verification</h2>
        <div className={`${panelBg} border ${borderCls} p-4 md:p-6 rounded`}>
          <p className={`mb-4 ${textSecondary}`}>Enter the VC hash or JSON to verify the degree's authenticity.</p>
          <input
            type="text"
            placeholder="VC Hash or JSON"
            value={vcHash}
            onChange={(e) => setVcHash(e.target.value)}
            className={`w-full p-2 rounded mb-4 border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase}`}
          />
          <Button className="bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-500" onClick={handleVerify}>Verify</Button>
          {result && <p className="mt-4 text-emerald-500">{result}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default Verification;
