import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';

const Degrees = () => {
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
        {/* Filter Bar */}
        <div className="bg-white p-4 md:p-6 rounded shadow mb-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                placeholder="Name, email, or roll no"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {['All', 'Issued', 'Pending', 'Failed'].map(s => (<option key={s}>{s}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
              <select value={program} onChange={(e) => setProgram(e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {programs.map(p => (<option key={p} value={p}>{p}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
              <select value={batch} onChange={(e) => setBatch(e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {batches.map(b => {
                  if (b === 'All') return <option key="All">All</option>;
                  const [id, name] = b.split('::');
                  return <option key={b} value={b}>{name} ({id})</option>;
                })}
              </select>
            </div>
            <div className="flex items-end gap-2">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {['BCA', 'BBA', 'B.Tech', 'MBA'].map((p) => (
                <button key={p} onClick={() => setProgram(p)} className={`px-3 py-1.5 rounded-full border text-sm ${program === p ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-50'}`}>
                  {p}
                </button>
              ))}
            </div>
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={groupByBatch} onChange={(e) => setGroupByBatch(e.target.checked)} />
              Group by Batch
            </label>
          </div>
        </div>

        {/* Degrees List */}
        {!groupByBatch ? (
          <div className="bg-white p-4 md:p-6 rounded shadow overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="border-b">
                  {[
                    { key: 'name', label: 'Name' },
                    { key: 'email', label: 'Email' },
                    { key: 'program', label: 'Program' },
                    { key: 'rollNo', label: 'Roll No' },
                    { key: 'status', label: 'Status' },
                    { key: 'date', label: 'Date' },
                    { key: 'batchName', label: 'Batch' },
                  ].map((col) => (
                    <th key={col.key} className="text-left p-2 select-none">
                      <button onClick={() => handleSort(col.key)} className="inline-flex items-center gap-1 hover:underline">
                        {col.label}
                        {sortBy === col.key && (
                          <span className="text-xs text-gray-500">{sortDir === 'asc' ? '▲' : '▼'}</span>
                        )}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageItems.map((d) => (
                  <tr key={d.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => setSelected(d)}>
                    <td className="p-2">{highlight(d.name)}</td>
                    <td className="p-2">{highlight(d.email)}</td>
                    <td className="p-2">{highlight(d.program)}</td>
                    <td className="p-2">{highlight(d.rollNo)}</td>
                    <td className="p-2">{highlight(d.status)}</td>
                    <td className="p-2">{highlight(d.date)}</td>
                    <td className="p-2">{highlight(d.batchName)}</td>
                  </tr>
                ))}
                {pageItems.length === 0 && (
                  <tr>
                    <td className="p-4 text-center text-gray-500" colSpan={7}>No degrees found for current filters.</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-sm text-gray-600">
                Showing {total === 0 ? 0 : startIndex + 1}–{endIndex} of {total}
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Rows per page</label>
                <select value={pageSize} onChange={(e) => setPageSize(parseInt(e.target.value))} className="px-2 py-1 rounded border border-gray-300">
                  {[10, 25, 50].map(n => (<option key={n} value={n}>{n}</option>))}
                </select>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                >Prev</button>
                <span className="text-sm text-gray-700">Page {currentPage} / {pageCount}</span>
                <button
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  disabled={currentPage >= pageCount}
                  className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                >Next</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-end gap-2">
              <button onClick={expandAll} className="px-3 py-1.5 rounded border border-gray-300 text-sm hover:bg-gray-50">Expand All</button>
              <button onClick={collapseAll} className="px-3 py-1.5 rounded border border-gray-300 text-sm hover:bg-gray-50">Collapse All</button>
            </div>

            {batchEntries.map(([id, name]) => {
              const items = sorted.filter(d => d.batchId === id);
              const sum = batchSummaries.get(id) || { total: items.length, Issued: 0, Pending: 0, Failed: 0 };
              const isOpen = expandedBatches.has(id);
              return (
                <div key={id} className="bg-white rounded shadow">
                  <button onClick={() => toggleBatch(id)} className="w-full text-left px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="inline-block w-3 text-gray-500">{isOpen ? '▾' : '▸'}</span>
                      <h3 className="text-base md:text-lg font-semibold">{highlight(name)} <span className="text-gray-500 text-sm">({highlight(id)})</span></h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs md:text-sm text-gray-600">
                      <span>Total: {sum.total}</span>
                      <span className="text-green-700">Issued: {sum.Issued}</span>
                      <span className="text-yellow-700">Pending: {sum.Pending}</span>
                      <span className="text-red-700">Failed: {sum.Failed}</span>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="p-4 md:p-6 overflow-x-auto">
                      <table className="w-full min-w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Name</th>
                            <th className="text-left p-2">Email</th>
                            <th className="text-left p-2">Program</th>
                            <th className="text-left p-2">Roll No</th>
                            <th className="text-left p-2">Status</th>
                            <th className="text-left p-2">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((d) => (
                            <tr key={d.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => setSelected(d)}>
                              <td className="p-2">{highlight(d.name)}</td>
                              <td className="p-2">{highlight(d.email)}</td>
                              <td className="p-2">{highlight(d.program)}</td>
                              <td className="p-2">{highlight(d.rollNo)}</td>
                              <td className="p-2">{highlight(d.status)}</td>
                              <td className="p-2">{highlight(d.date)}</td>
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
              <div className="bg-white p-6 rounded shadow text-center text-gray-500">No degrees found for current filters.</div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Degrees;
