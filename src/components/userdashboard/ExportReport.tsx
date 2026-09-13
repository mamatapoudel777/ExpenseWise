import { useState } from 'react';
import axios from 'axios';
import { Download, FileSpreadsheet, Calendar, AlertCircle, Loader2 } from 'lucide-react';
import UsersSidebar from './UsersSidebar';
import Header from '../commoncomponents/Header';

export default function ExportReport() {
  const rawBaseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  // Automatically attaches /api if not present in your .env
  const baseURL = rawBaseURL.endsWith('/api') ? rawBaseURL : `${rawBaseURL}/api`;
  const userId = localStorage.getItem("userId");

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleExportCSV = async () => {
    if (!userId) {
      setErrorMessage("User session not found. Please log in again.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.get(`${baseURL}/expenses/export/${userId}`, {
        params: {
          startDate: startDate || undefined,
          endDate: endDate || undefined,
        },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `Expense_Report_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error: any) {
      console.error("Export error:", error);
      
      // Axios receives errors as Blobs when responseType is 'blob'
      if (error.response?.data instanceof Blob) {
        const text = await error.response.data.text();
        try {
          const parsed = JSON.parse(text);
          setErrorMessage(parsed.message || "Failed to export records.");
        } catch {
          setErrorMessage("No expense records found for the selected criteria.");
        }
      } else {
        setErrorMessage("Server error while generating the report. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UsersSidebar />
      <div className="ml-64 flex flex-col w-[calc(100%-16rem)] min-h-screen">
        <Header />
        <div className="min-h-screen bg-white">
          <div className="max-w-5xl p-6">

            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Export Reports</h1>
              <p className="text-gray-500 text-sm">
                Download your expense transactions as a CSV spreadsheet for Excel, Numbers, or Google Sheets.
              </p>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                <AlertCircle size={18} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Main Export Card */}
            <div className="bg-white border-2 border-gray-300 rounded-2xl shadow-xl p-8 max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <FileSpreadsheet size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">CSV Spreadsheet</h2>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Includes Date, Category, Description, and Amount columns.
                  </p>
                </div>
              </div>

              {/* Optional Date Filter Inputs */}
              <div className="space-y-4 mb-8">
                <label className="block text-sm font-semibold text-gray-700">
                  Filter by Date Range (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleExportCSV}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Preparing File...</span>
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    <span>Download CSV Report</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}