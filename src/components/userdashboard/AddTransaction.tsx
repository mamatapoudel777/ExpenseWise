import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { Plus, Upload, X, IndianRupee, FileText, Search, Filter, Trash2, Edit3 } from 'lucide-react';
import UsersSidebar from './UsersSidebar';
import Header from '../commoncomponents/Header';
import axios from 'axios';

interface Expense {
  id: string;
  _id:string;
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

export default function AddExpenseDashboard() {
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
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

  // --- 1. Fetch expenses from backend ---
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`${baseURL}/expenses/${userId}`);
        const mappedExpenses = response.data.map((exp: any) => ({
          ...exp,
          id: exp._id?.toString() || exp.id?.toString()
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

  // --- 2. Input handling ---
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

  // --- 3. Delete Logic ---
  const handleDelete = async () => {
  if (!deleteId) return;
  try {
    await axios.delete(`${baseURL}/expenses/${deleteId}`);
    setExpenses(prev => prev.filter(exp => exp._id !== deleteId));
    setDeleteId(null); // Close the modal
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Failed to delete transaction");
    setDeleteId(null);
  }
};

  // --- 4. Open Edit Modal ---
  const handleEditClick = (expense: Expense) => {
    setEditingId(expense.id);
    setFormData({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      date: expense.date.split('T')[0],
      receipt: null
    });
    setReceiptPreview(expense.receiptUrl);
    setShowAddModal(true);
  };

  // --- 5. Submit expense (Handles ADD and EDIT) ---
  const handleSubmit = async () => {
    if (!formData.description || !formData.amount || !formData.category || !userId) {
      alert("Please fill all required fields");
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
      if (editingId) {
        // UPDATE MODE
        const response = await axios.patch(`${baseURL}/expenses/${editingId}`, payload);
        if (response.data.success) {
          setExpenses(prev => prev.map(exp => 
            exp.id === editingId ? { ...response.data.data, id: editingId } : exp
          ));
        }
      } else {
        // ADD MODE
        const response = await axios.post(`${baseURL}/expenses/add`, payload);
        if (response.data.success) {
          const newExpense: Expense = {
            id: response.data.data._id || response.data.data.id,
            ...response.data.data,
          };
          setExpenses(prev => [newExpense, ...prev]);
        }
      }

      // Cleanup
      setShowAddModal(false);
      setEditingId(null);
      setFormData({
        description: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        receipt: null
      });
      setReceiptPreview(null);
    } catch (error) {
      console.error("Error saving expense:", error);
      alert("Failed to save transaction.");
    }
  };

  return (
    <>
      <UsersSidebar />
      <div className="ml-64 flex flex-col w-[calc(100%-16rem)] min-h-screen">
        <Header />
        <div className="min-h-screen bg-white">
          <div className="max-w-5xl p-6">
            
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={() => {
                  setEditingId(null);
                  setShowAddModal(true);
                }}
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg"
              >
                <Plus size={20} /> Add Expense
              </button>

              <div className="flex-1 flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search expenses..."
                    className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <button className="px-4 py-3 bg-slate-800 rounded-xl text-white hover:bg-slate-700 transition-colors">
                  <Filter size={20} />
                </button>
              </div>
            </div>

            {/* Expenses List */}
            <div className="bg-white border-2 border-gray-300 rounded-2xl shadow-xl overflow-hidden">
              {loading ? (
                <div className="text-center py-16 text-gray-500">Loading expenses...</div>
              ) : expenses.length === 0 ? (
                <div className="text-center py-16 px-6">
                  <FileText className="text-emerald-500 mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-gray-700">No expenses yet</h3>
                  <p className="text-slate-500 mb-6">Start tracking by adding your first expense</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {expenses.map((expense) => (
                    <div key={expense.id} className="p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">{expense.description}</h3>
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase">
                              {expense.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{new Date(expense.date).toLocaleDateString()}</span>
                            {expense.receiptUrl && <span className="text-blue-500 font-medium">Receipt Attached</span>}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <p className="text-2xl font-bold text-gray-900">Rs {parseFloat(expense.amount).toFixed(2)}</p>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleEditClick(expense)}
                              className="p-2 cursor-pointer text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit3 size={18} />
                            </button>
                            <button 
                           onClick={() => setDeleteId(expense._id)} 
                           className="p-2 cursor-pointer text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                            >
                            <Trash2 size={18} />
                          </button>
                          </div>
                        </div>
                      </div>
                      
                      {expense.receiptUrl && (
                        <div className="mt-4">
                          <img
                            src={expense.receiptUrl}
                            alt="Receipt"
                            className="h-24 w-24 rounded-lg border border-gray-200 object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
{/* Delete Confirmation Modal */}
{deleteId && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
    <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 animate-in fade-in zoom-in duration-200">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <Trash2 size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Transaction?</h2>
        <p className="text-gray-500 mb-8">
          Are you sure you want to delete this expense? This action cannot be undone.
        </p>
        
        <div className="flex gap-3 w-full">
          <button 
            onClick={() => setDeleteId(null)}
            className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleDelete}
            className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 shadow-lg shadow-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
)}
            {/* Add/Edit Modal */}
            {showAddModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-slate-700 flex items-center justify-between sticky top-0 bg-slate-800 z-10">
                    <h2 className="text-2xl font-bold text-white">
                      {editingId ? "Edit Expense" : "Add New Expense"}
                    </h2>
                    <button
                      onClick={() => { setShowAddModal(false); setEditingId(null); setReceiptPreview(null); }}
                      className="p-2 hover:bg-slate-700 rounded-lg text-slate-400"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="p-6 space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                      <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="e.g., Grocery shopping"
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Amount</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="number"
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Receipt (Optional)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="receipt-upload"
                      />
                      <label
                        htmlFor="receipt-upload"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-900 border-2 border-dashed border-slate-700 rounded-xl text-slate-400 hover:border-emerald-500 cursor-pointer"
                      >
                        <Upload size={20} />
                        {formData.receipt ? formData.receipt.name : 'Click to upload image'}
                      </label>
                      {receiptPreview && (
                        <img src={receiptPreview} className="mt-4 w-full h-32 object-cover rounded-xl border border-slate-700" alt="Preview" />
                      )}
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => { setShowAddModal(false); setEditingId(null); setReceiptPreview(null); }}
                        className="flex-1 px-6 py-3 bg-slate-700 text-white rounded-xl font-semibold hover:bg-slate-600"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 shadow-lg"
                      >
                        {editingId ? "Save Changes" : "Add Expense"}
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