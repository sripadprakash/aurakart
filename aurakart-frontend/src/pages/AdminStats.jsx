import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiTrash2, FiArrowLeft, FiBarChart2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AdminStats = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem('aurakart_logs') || '[]');
    setLogs(savedLogs);
  }, []);

  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "aurakart_visit_logs.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const clearLogs = () => {
    if (window.confirm('Are you sure you want to clear all logs?')) {
      localStorage.removeItem('aurakart_logs');
      setLogs([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8 md:p-20 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <Link to="/" className="text-blue-400 flex items-center gap-2 mb-4 hover:underline">
              <FiArrowLeft /> Back to Website
            </Link>
            <h1 className="text-4xl font-black flex items-center gap-4 uppercase tracking-tighter">
              <FiBarChart2 className="text-blue-500" /> Visit Statistics
            </h1>
            <p className="text-gray-500 mt-2 font-medium">Tracking user interaction with the Demo Disclaimer</p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={downloadJSON}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20"
            >
              <FiDownload /> Download JSON
            </button>
            <button 
              onClick={clearLogs}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-6 py-3 rounded-xl font-bold transition-all border border-red-500/20"
            >
              <FiTrash2 /> Clear
            </button>
          </div>
        </div>

        <div className="bg-[#0f172a] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">ID</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Time</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Event</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {logs.length > 0 ? [...logs].reverse().map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-xs font-mono text-gray-500">{log.id}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-200">{log.timestamp}</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-[10px] font-black uppercase border border-green-500/20">
                        {log.event}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">{log.platform}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-20 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">
                      No visits recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 text-xs text-gray-500 leading-relaxed">
          <p><strong>Note:</strong> Since this is a frontend-only demo, these logs are stored in your <strong>Local Storage</strong>. This means you will only see visits from your own computer. To track real users globally, you should connect this project to <strong>Vercel Analytics</strong> or <strong>Firebase</strong>.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
