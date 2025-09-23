import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import { useTheme } from '../context/ThemeContext';
import HighlightBanner from '../components/HighlightBanner';

const Degrees = () => {
  const { isDark } = useTheme();
  const panelBg = isDark ? 'bg-slate-900/60' : 'bg-white/90';
  const borderCls = isDark ? 'border-white/10' : 'border-gray-200';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-white/80' : 'text-gray-600';
  const inputBase = isDark ? 'bg-slate-800/80 text-white placeholder-white/50 border-white/10' : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300';
  const hoverRow = isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100';
  const [searchParams, setSearchParams] = useSearchParams();
  // Rich mock data for Step 1 (programs, batches, statuses)
  const mockDegrees = [
    { id: 1, name: 'John Doe', email: 'john@example.com', rollNo: 'BCA-001', program: 'BCA', status: 'Issued', date: '2023-10-01', batchId: 'B2023-01', batchName: 'Oct 2023 Batch' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', rollNo: 'BBA-045', program: 'BBA', status: 'Pending', date: '2023-10-02', batchId: 'B2023-01', batchName: 'Oct 2023 Batch' },
    { id: 3, name: 'Arjun Rao', email: 'arjun@uni.edu', rollNo: 'BCA-002', program: 'BCA', status: 'Issued', date: '2023-10-05', batchId: 'B2023-02', batchName: 'Nov 2023 Batch' },
    { id: 4, name: 'Meera Iyer', email: 'meera@uni.edu', rollNo: 'BTECH-210', program: 'B.Tech', status: 'Failed', date: '2023-10-06', batchId: 'B2023-02', batchName: 'Nov 2023 Batch' },
    { id: 5, name: 'Karan Mehta', email: 'karan@uni.edu', rollNo: 'MBA-010', program: 'MBA', status: 'Issued', date: '2023-10-10', batchId: 'B2023-03', batchName: 'Dec 2023 Batch' },
  ];

  // Filter state
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [status, setStatus] = useState(searchParams.get('status') || 'All');
  const [program, setProgram] = useState(searchParams.get('program') || 'All');
  const [batch, setBatch] = useState(searchParams.get('batch') || 'All');
  const [fromDate, setFromDate] = useState(searchParams.get('from') || '');
  const [toDate, setToDate] = useState(searchParams.get('to') || '');
  const [groupByBatch, setGroupByBatch] = useState(searchParams.get('group') === '1');
  const [expandedBatches, setExpandedBatches] = useState(() => new Set());
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'date'); // name | email | program | rollNo | status | date | batchName
  const [sortDir, setSortDir] = useState(searchParams.get('sortDir') || 'desc'); // asc | desc
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [pageSize, setPageSize] = useState(parseInt(searchParams.get('pageSize') || '10'));

  // Sync state to URL query params
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (status !== 'All') params.set('status', status);
    if (program !== 'All') params.set('program', program);
    if (batch !== 'All') params.set('batch', batch);
    if (fromDate) params.set('from', fromDate);
    if (toDate) params.set('to', toDate);
    if (groupByBatch) params.set('group', '1');
    if (sortBy) params.set('sortBy', sortBy);
    if (sortDir) params.set('sortDir', sortDir);
    if (!groupByBatch) {
      params.set('page', String(page));
      params.set('pageSize', String(pageSize));
    }
    setSearchParams(params, { replace: true });
  }, [query, status, program, batch, fromDate, toDate, groupByBatch, sortBy, sortDir, page, pageSize, setSearchParams]);

  const programs = useMemo(() => ['All', ...Array.from(new Set(mockDegrees.map(d => d.program)))], [mockDegrees]);
  const batches = useMemo(() => ['All', ...Array.from(new Set(mockDegrees.map(d => `${d.batchId}::${d.batchName}`)))], [mockDegrees]);

  // Apply filters
  const filtered = useMemo(() => {
    return mockDegrees.filter((d) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q || [d.name, d.email, d.rollNo, d.batchName, d.batchId]
          .some(v => (v || '').toString().toLowerCase().includes(q));
      const matchesStatus = status === 'All' || d.status === status;
      const matchesProgram = program === 'All' || d.program === program;
      const matchesBatch = batch === 'All' || `${d.batchId}::${d.batchName}` === batch;
      const dateOk = (!fromDate || d.date >= fromDate) && (!toDate || d.date <= toDate);
      return matchesQuery && matchesStatus && matchesProgram && matchesBatch && dateOk;
    });
  }, [mockDegrees, query, status, program, batch, fromDate, toDate]);

  // Sort
  const sorted = useMemo(() => {
    const arr = [...filtered];
    const dir = sortDir === 'asc' ? 1 : -1;
    arr.sort((a, b) => {
      const av = a[sortBy];
      const bv = b[sortBy];
      if (sortBy === 'date') {
        // ISO date strings compare lexicographically
        return av === bv ? 0 : (av > bv ? 1 : -1) * dir;
      }
      const as = (av || '').toString().toLowerCase();
      const bs = (bv || '').toString().toLowerCase();
      if (as < bs) return -1 * dir;
      if (as > bs) return 1 * dir;
      return 0;
    });
    return arr;
  }, [filtered, sortBy, sortDir]);

  // Reset page when dependencies change
  React.useEffect(() => { setPage(1); }, [query, status, program, batch, fromDate, toDate, sortBy, sortDir, pageSize, groupByBatch]);

  // Pagination (disabled when grouped)
  const total = sorted.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, pageCount);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
  const pageItems = groupByBatch ? sorted : sorted.slice(startIndex, endIndex);

  const handleSort = (col) => {
    if (sortBy === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortDir(col === 'date' ? 'desc' : 'asc');
    }
  };

  // Group helpers
  const batchEntries = useMemo(() => Array.from(new Map(sorted.map(d => [d.batchId, d.batchName])).entries()), [sorted]);
  const batchSummaries = useMemo(() => {
    const map = new Map();
    for (const d of sorted) {
      const key = d.batchId;
      if (!map.has(key)) map.set(key, { total: 0, Issued: 0, Pending: 0, Failed: 0 });
      const sum = map.get(key);
      sum.total += 1;
      if (d.status in sum) sum[d.status] += 1;
    }
    return map; // Map<batchId, {total, Issued, Pending, Failed}>
  }, [sorted]);

  const toggleBatch = (id) => {
    setExpandedBatches(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const expandAll = () => setExpandedBatches(new Set(batchEntries.map(([id]) => id)));
  const collapseAll = () => setExpandedBatches(new Set());

  // Highlight helper
  const highlight = (text) => {
    const q = query.trim();
    if (!q) return text;
    const idx = (text || '').toString().toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + q.length);
    const after = text.slice(idx + q.length);
    return (
      <>
        {before}
        <mark className="bg-yellow-200 text-gray-900 rounded px-0.5">{match}</mark>
        {after}
      </>
    );
  };

  // Details drawer
  const [selected, setSelected] = useState(null);
  const closeDrawer = () => setSelected(null);

  return (
    <Layout>
      <div>
        <PageHeader title="Issued Degrees" subtitle="Search, filter, and manage issued verifiable credentials" />
        <div className="mt-4 mb-4">
          <HighlightBanner>
            Empower your students with the ultimate control. X-DiD ensures personal degree security, putting their achievements firmly in their hands.
          </HighlightBanner>
        </div>
        {/* Filter Bar */}
        <div className={`${panelBg} border ${borderCls} p-4 md:p-6 rounded mb-4`}>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium ${textPrimary} mb-1`}>Search</label>
              <input
                type="text"
                placeholder="Name, email, or roll no"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${textPrimary} mb-1`}>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase}`}>
                {['All', 'Issued', 'Pending', 'Failed'].map(s => (<option key={s}>{s}</option>))}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${textPrimary} mb-1`}>Program</label>
              <select value={program} onChange={(e) => setProgram(e.target.value)} className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase}`}>
                {programs.map(p => (<option key={p} value={p}>{p}</option>))}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${textPrimary} mb-1`}>Batch</label>
              <select value={batch} onChange={(e) => setBatch(e.target.value)} className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase}`}>
                {batches.map(b => {
                  if (b === 'All') return <option key="All">All</option>;
                  const [id, name] = b.split('::');
                  return <option key={b} value={b}>{name} ({id})</option>;
                })}
              </select>
            </div>
            <div className="flex items-end gap-2">
              <div className="w-1/2">
                <label className={`block text-sm font-medium ${textPrimary} mb-1`}>From</label>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase}`} />
              </div>
              <div className="w-1/2">
                <label className={`block text-sm font-medium ${textPrimary} mb-1`}>To</label>
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBase}`} />
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {['BCA', 'BBA', 'B.Tech', 'MBA'].map((p) => (
                <button key={p} onClick={() => setProgram(p)} className={`px-3 py-1.5 rounded-full border text-sm ${program === p ? 'bg-emerald-500 text-white border-emerald-500' : isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-300 text-gray-900 hover:bg-gray-100'}`}>
                  {p}
                </button>
              ))}
            </div>
            <label className={`inline-flex items-center gap-2 text-sm ${textPrimary}`}>
              <input type="checkbox" className="accent-emerald-500" checked={groupByBatch} onChange={(e) => setGroupByBatch(e.target.checked)} />
              Group by Batch
            </label>
          </div>
        </div>

        {/* Degrees List */}
        {!groupByBatch ? (
          <div className={`${panelBg} border ${borderCls} p-4 md:p-6 rounded overflow-x-auto`}>
            <table className="w-full min-w-full">
              <thead>
                <tr className={`border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                  {[
                    { key: 'name', label: 'Name' },
                    { key: 'email', label: 'Email' },
                    { key: 'program', label: 'Program' },
                    { key: 'rollNo', label: 'Roll No' },
                    { key: 'status', label: 'Status' },
                    { key: 'date', label: 'Date' },
                    { key: 'batchName', label: 'Batch' },
                  ].map((col) => (
                    <th key={col.key} className={`text-left p-2 select-none ${textSecondary}`}>
                      <button onClick={() => handleSort(col.key)} className="inline-flex items-center gap-1 hover:underline">
                        {col.label}
                        {sortBy === col.key && (<span className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>{sortDir === 'asc' ? '▲' : '▼'}</span>)}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageItems.map((d) => (
                  <tr key={d.id} className={`border-b ${isDark ? 'border-white/10' : 'border-gray-200'} ${hoverRow} cursor-pointer`} onClick={() => setSelected(d)}>
                    <td className={`p-2 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>{highlight(d.name)}</td>
                    <td className={`p-2 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>{highlight(d.email)}</td>
                    <td className={`p-2 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>{highlight(d.program)}</td>
                    <td className={`p-2 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>{highlight(d.rollNo)}</td>
                    <td className={`p-2 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>{highlight(d.status)}</td>
                    <td className={`p-2 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>{highlight(d.date)}</td>
                    <td className={`p-2 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>{highlight(d.batchName)}</td>
                  </tr>
                ))}
                {pageItems.length === 0 && (
                  <tr>
                    <td className={`p-4 text-center ${isDark ? 'text-white/60' : 'text-gray-500'}`} colSpan={7}>No degrees found for current filters.</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className={`mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 ${textSecondary}`}>
              <div className="text-sm">
                Showing {total === 0 ? 0 : startIndex + 1}–{endIndex} of {total}
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm">Rows per page</label>
                <select value={pageSize} onChange={(e) => setPageSize(parseInt(e.target.value))} className={`px-2 py-1 rounded border ${inputBase}`}>
                  {[10, 25, 50].map(n => (<option key={n} value={n}>{n}</option>))}
                </select>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className={`px-3 py-1 rounded border ${isDark ? 'border-white/20' : 'border-gray-300'} disabled:opacity-50`}
                >Prev</button>
                <span className="text-sm">Page {currentPage} / {pageCount}</span>
                <button
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  disabled={currentPage >= pageCount}
                  className={`px-3 py-1 rounded border ${isDark ? 'border-white/20' : 'border-gray-300'} disabled:opacity-50`}
                >Next</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-end gap-2">
              <button onClick={expandAll} className={`px-3 py-1.5 rounded border text-sm ${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-300 text-gray-900 hover:bg-gray-100'}`}>Expand All</button>
              <button onClick={collapseAll} className={`px-3 py-1.5 rounded border text-sm ${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-300 text-gray-900 hover:bg-gray-100'}`}>Collapse All</button>
            </div>

            {batchEntries.map(([id, name]) => {
              const items = sorted.filter(d => d.batchId === id);
              const sum = batchSummaries.get(id) || { total: items.length, Issued: 0, Pending: 0, Failed: 0 };
              const isOpen = expandedBatches.has(id);
              return (
                <div key={id} className={`${panelBg} border ${borderCls} rounded`}>
                  <button onClick={() => toggleBatch(id)} className="w-full text-left px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`inline-block w-3 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>{isOpen ? '▾' : '▸'}</span>
                      <h3 className={`text-base md:text-lg font-semibold ${textPrimary}`}>{highlight(name)} <span className={`${isDark ? 'text-white/60' : 'text-gray-500'} text-sm`}>({highlight(id)})</span></h3>
                    </div>
                    <div className={`flex items-center gap-3 text-xs md:text-sm ${textSecondary}`}>
                      <span>Total: {sum.total}</span>
                      <span className="text-emerald-400">Issued: {sum.Issued}</span>
                      <span className={`${isDark ? 'text-yellow-300' : 'text-yellow-600'}`}>Pending: {sum.Pending}</span>
                      <span className={`${isDark ? 'text-red-400' : 'text-red-600'}`}>Failed: {sum.Failed}</span>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="p-4 md:p-6 overflow-x-auto">
                      <table className="w-full min-w-full">
                        <thead>
                          <tr className={`border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                            <th className={`text-left p-2 ${textSecondary}`}>Name</th>
                            <th className={`text-left p-2 ${textSecondary}`}>Email</th>
                            <th className={`text-left p-2 ${textSecondary}`}>Program</th>
                            <th className={`text-left p-2 ${textSecondary}`}>Roll No</th>
                            <th className={`text-left p-2 ${textSecondary}`}>Status</th>
                            <th className={`text-left p-2 ${textSecondary}`}>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((d) => (
                            <tr key={d.id} className={`border-b ${isDark ? 'border-white/10' : 'border-gray-200'} ${hoverRow} cursor-pointer`} onClick={() => setSelected(d)}>
                              <td className={`p-2 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>{highlight(d.name)}</td>
                              <td className={`p-2 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>{highlight(d.email)}</td>
                              <td className={`p-2 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>{highlight(d.program)}</td>
                              <td className={`p-2 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>{highlight(d.rollNo)}</td>
                              <td className={`p-2 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>{highlight(d.status)}</td>
                              <td className={`p-2 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>{highlight(d.date)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
            {sorted.length === 0 && (
              <div className={`${panelBg} border ${borderCls} p-6 rounded text-center ${isDark ? 'text-white/60' : 'text-gray-500'}`}>No degrees found for current filters.</div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Degrees;
