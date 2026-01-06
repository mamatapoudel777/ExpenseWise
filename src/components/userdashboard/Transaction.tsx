import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { Upload, Calendar, IndianRupee, FileText } from 'lucide-react';
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
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [_loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    receipt: null
  });
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

  const userId = localStorage.getItem("userId");

  // --- Fetch expenses from backend ---
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!userId) return;
      try {
        console.log("BASE URL:", import.meta.env.VITE_API_BASE_URL);
        console.log("BASE URL:", baseURL);
const response = await axios.get(
  `${baseURL}/api/expenses/${userId}`
);
        // Ensure each expense has a string id AXIOS INTERCEPTOR ACCESS TOKEN REFRESH JWT 
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

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                className="flex items-center justify-center w-full gap-2 bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold "
              >
                Added Transaction list
              </button>
            </div>
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
            </div>
          </div>
        </div>
    </>
  );
}
