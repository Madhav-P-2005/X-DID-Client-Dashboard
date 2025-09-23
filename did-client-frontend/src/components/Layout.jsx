import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useTheme } from '../context/ThemeContext';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark } = useTheme();
  const gridBg = isDark
    ? 'bg-[#0b1f3a] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]'
    : 'bg-[#f6f8fb] [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:48px_48px]';

  return (
    <div className={`flex h-screen ${gridBg}`}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex w-full max-w-xs flex-col bg-gray-800">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className={`flex flex-1 flex-col overflow-hidden ${gridBg}`}>
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className={`flex-1 overflow-y-auto p-4 md:p-6 ${gridBg}`}>
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
