import React from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import PageHeader from '../components/PageHeader';
import Dropzone from '../components/Dropzone';
import { useTheme } from '../context/ThemeContext';
import HighlightBanner from '../components/HighlightBanner';

const Templates = () => {
  const { isDark } = useTheme();
  const panelBg = isDark ? 'bg-slate-900/60' : 'bg-white/90';
  const borderCls = isDark ? 'border-white/10' : 'border-gray-200';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const handleFiles = (files) => {
    // TODO: parse and preview
    console.log('Uploaded files:', files);
  };
  return (
    <Layout>
      <div>
        <PageHeader
          title="Degree Templates"
          subtitle="Download the standardized CSV and upload filled files for preview."
          actions={<Button className="sm:w-auto bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-500">Download Template</Button>}
        />
        <div className="mt-4 mb-4">
          <HighlightBanner>
            While others wait, your graduates will own the future of credentialing. Don't be left behind in the race for verifiable identity.
          </HighlightBanner>
        </div>
        <div className={`${panelBg} border ${borderCls} p-4 md:p-6 rounded`}>
          <h3 className={`text-lg md:text-xl font-semibold mb-4 ${textPrimary}`}>Upload Filled Template</h3>
          <Dropzone onFiles={handleFiles} />
          <div className="mt-4 flex gap-3">
            <Button className="sm:w-auto bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-500">Upload & Preview</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Templates;
