import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { Plus, Upload, X, Calendar, IndianRupee, FileText, Search, Filter } from 'lucide-react';
import UsersSidebar from './UsersSidebar';
import Header from '../commoncomponents/Header';
import axios from 'axios';
import { nanoid } from 'nanoid'; 

interface Expense {
  id: string;
  description: string;
  amount: string;
  category: string;
  date: string;
  receiptUrl: string | null;
}

interface FormData {
  description: string;
  amount: string;
  category: string;
  date: string;
  receipt: File | null;
}

export default function ExpenseDashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [_loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    receipt: null
  });
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

  const userId = localStorage.getItem("userId");
  const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Other'];

  // --- Fetch expenses from backend ---
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/expenses/${userId}`);
        // Ensure each expense has a string id
        const mappedExpenses = response.data.map((exp: any) => ({
          ...exp,
          id: exp.id?.toString() ?? nanoid()
        }));
        setExpenses(mappedExpenses);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, [userId]);

  // --- Input handling ---
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, receipt: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setReceiptPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setReceiptPreview(null);
    }
  };

  // --- Submit expense ---
  const handleSubmit = async () => {
    if (!formData.description || !formData.amount || !formData.category || !userId) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      userId,
      description: formData.description,
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date,
      receiptUrl: receiptPreview
    };

    try {
      const response = await axios.post('http://localhost:5000/api/expenses/add', payload);
      if (response.data.success) {
        const newExpense: Expense = {
          id: response.data.data.id?.toString() ?? nanoid(),
          ...response.data.data,
        };
        setExpenses(prev => [newExpense, ...prev]);

        setFormData({
          description: '',
          amount: '',
          category: '',
          date: new Date().toISOString().split('T')[0],
          receipt: null
        });
        setReceiptPreview(null);
        setShowAddModal(false);
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to save transaction.");
    }
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || '0'), 0);
  const currentMonth = new Date().getMonth();

  return (
    <>
      <UsersSidebar />
      <div className="ml-64 flex flex-col w-[calc(100%-16rem)] min-h-screen">
        <Header />
        <div className="min-h-screen bg-white">
          <div className="max-w-5xl p-6">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-700 mb-2">Transaction</h1>
              <p className="text-slate-400">Track and manage your expenses</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-100 text-sm font-medium">Total Expenses</span>
                  <IndianRupee className="text-emerald-100" size={24} />
                </div>
                <p className="text-3xl font-bold text-white">Rs {totalExpenses.toFixed(2)}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-100 text-sm font-medium">Total Transactions</span>
                  <FileText className="text-blue-100" size={24} />
                </div>
                <p className="text-3xl font-bold text-white">{expenses.length}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-100 text-sm font-medium">This Month</span>
                  <Calendar className="text-purple-100" size={24} />
                </div>
                <p className="text-3xl font-bold text-white">
                  Rs {expenses
                    .filter(e => new Date(e.date).getMonth() === currentMonth)
                    .reduce((sum, e) => sum + parseFloat(e.amount || '0'), 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <Plus size={20} />
                Add Expense
              </button>

              <div className="flex-1 flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search expenses..."
                    className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:bg-slate-700 transition-colors">
                  <Filter size={20} />
                </button>
              </div>
            </div>

            {/* Expenses List */}
            <div className="bg-white border-2 border-gray-300 rounded-2xl shadow-xl overflow-hidden">
              {expenses.length === 0 ? (
                <div className="text-center py-16 px-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="text-white" size={40} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No expenses yet</h3>
                  <p className="text-slate-500 mb-6">Start tracking by adding your first expense</p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                  >
                    <Plus size={20} />
                    Add Your First Expense
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-700">
                  {expenses.map((expense) => (
                    <div key={expense.id} className="p-6 hover:bg-slate-750 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-700">{expense.description}</h3>
                            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                              {expense.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-white">
                            <span className="flex items-center gap-1 text-white">
                              {new Date(expense.date).toLocaleDateString()}
                            </span>
                            {expense.receiptUrl && (
                              <span className="flex items-center gap-1 text-blue-400">
                                <Upload size={16} />
                                Receipt attached
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-700">Rs{parseFloat(expense.amount).toFixed(2)}</p>
                        </div>
                      </div>
                      {expense.receiptUrl && (
                        <div className="mt-4">
                          <img
                            src={expense.receiptUrl}
                            alt="Receipt"
                            className="h-32 rounded-lg border border-slate-700 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add Expense Modal */}
            {showAddModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-slate-700 flex items-center justify-between sticky top-0 bg-slate-800 z-10">
                    <h2 className="text-2xl font-bold text-white">Add New Expense</h2>
                    <button
                      onClick={() => { setShowAddModal(false); setReceiptPreview(null); }}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <X className="text-slate-400" size={24} />
                    </button>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Form fields */}
                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                      <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="e.g., Grocery shopping"
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    {/* Amount */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Amount</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                        <input
                          type="number"
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          step="0.01"
                          placeholder="0.00"
                          className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">Select a category</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    {/* Receipt */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Upload Receipt (Optional)</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="receipt-upload"
                        />
                        <label
                          htmlFor="receipt-upload"
                          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-900 border-2 border-dashed border-slate-700 rounded-xl text-slate-400 hover:border-emerald-500 hover:text-emerald-400 transition-colors cursor-pointer"
                        >
                          <Upload size={20} />
                          {formData.receipt ? formData.receipt.name : 'Choose file'}
                        </label>
                      </div>
                      {receiptPreview && (
                        <div className="mt-4">
                          <img
                            src={receiptPreview}
                            alt="Receipt preview"
                            className="w-full h-48 object-cover rounded-xl border border-slate-700"
                          />
                        </div>
                      )}
                    </div>

                    {/* Modal Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => { setShowAddModal(false); setReceiptPreview(null); }}
                        className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="flex-1 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-colors shadow-lg"
                      >
                        Add Expense
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
