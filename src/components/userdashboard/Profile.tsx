import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import {
  User, Mail, Phone, Wallet, Target, Camera, Save, PieChart,
  Calendar, MapPin, Briefcase, CreditCard, TrendingUp,
  Award, Bell, Lock, Eye, EyeOff
} from 'lucide-react';
import UsersSidebar from './UsersSidebar';
import Header from '../commoncomponents/Header';
import axios from 'axios';

interface UserData {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export default function Profile() {
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const [activeTab, setActiveTab] = useState('personal');
  const [user, setUser] = useState<UserData | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
    occupation: '',
    profilePic: '',

    monthlyIncome: '',
    savingsTarget: '',
    savingReason: '',
    currency: '',
    bankName: '',
    accountNumber: '',

    emailNotifications: true,
    smsNotifications: false,
    budgetAlerts: true,
    weeklyReports: true,

    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // FETCH LOGGED-IN USER (OPTION 2)
  const fetchUser = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      const res = await axios.get(`${baseURL}/users/${userId}`);

      setUser(res.data);
      console.log('API response:', res.data);

      // Prefill form
      setFormData(prev => ({
        ...prev,
        firstname: res.data.firstname,
        lastname: res.data.lastname,
        email: res.data.email,
      }));
    } catch (error) {
      console.error('Error fetching user', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () =>
      setFormData({ ...formData, profilePic: reader.result as string });
    reader.readAsDataURL(file);
  };

  const handleUpdate = () => {
    alert('Profile updated successfully!');
  };

  const savingsPercentage =
    formData.monthlyIncome && formData.savingsTarget
      ? ((Number(formData.savingsTarget) / Number(formData.monthlyIncome)) * 100).toFixed(0)
      : '0';

  return (
    <>
      <UsersSidebar />
      <div className="ml-64 flex flex-col w-[calc(100%-16rem)] min-h-screen">
        <Header />

        <div className="max-w-7xl mx-auto">
          {/* PROFILE HEADER */}
          <div className="bg-white rounded-3xl shadow-xl mb-8 overflow-hidden">
            <div className="h-32 bg-emerald-800 "></div>

            <div className="px-8 pb-8 -mt-16">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-3xl bg-white p-2 shadow-xl">
                    <div className="w-full h-full rounded-2xl bg-emerald-100 flex items-center justify-center overflow-hidden">
                      {formData.profilePic ? (
                        <img src={formData.profilePic} className="w-full h-full object-cover" />
                      ) : (
                        <User size={48} className="text-emerald-600" />
                      )}
                    </div>
                  </div>

                  <label className="absolute bottom-2 right-2 bg-emerald-500 p-3 rounded-xl text-white cursor-pointer">
                    <Camera size={18} />
                    <input type="file" hidden accept="image/*" onChange={handlePhotoUpload} />
                  </label>
                </div>

                <div className="flex-1">
                  <h1 className="text-2xl text-white font-bold">
                    {user ? `${user.firstname} ${user.lastname}` : 'Loading...'}
                  </h1>

                  <div className="flex gap-4 text-sm text-gray-600 mt-2">
                    <span className="flex items-center gap-1">
                      <Mail size={14} className="text-emerald-500" />
                      {user?.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone size={14} className="text-emerald-500" />
                      {formData.phoneNumber || 'Not set'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-emerald-100 p-4 rounded-xl text-center">
                    <TrendingUp className="mx-auto text-emerald-600" />
                    <div className="font-bold">
                     RS {(Number(formData.monthlyIncome) / 1000 || 0).toFixed(0)}k
                    </div>
                    <div className="text-xs">Income</div>
                  </div>

                  <div className="bg-blue-100 p-4 rounded-xl text-center">
                    <Target className="mx-auto text-blue-600" />
                    <div className="font-bold">{savingsPercentage}%</div>
                    <div className="text-xs">Savings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          {[
            { id: 'personal', label: 'Personal Info', icon: User },
            { id: 'financial', label: 'Financial Details', icon: Wallet },
            { id: 'preferences', label: 'Preferences', icon: Bell },
            { id: 'security', label: 'Security', icon: Lock }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                <User className="text-emerald-500" size={24} />
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    value={formData.firstname}
                    onChange={(e) => setFormData({...formData, firstname: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    value={formData.lastname}
                    onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="tel" 
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="date" 
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Occupation</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      value={formData.occupation}
                      onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Financial Details Tab */}
          {activeTab === 'financial' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                <PieChart className="text-emerald-500" size={24} />
                Financial Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Income (₨)</label>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="number" 
                      value={formData.monthlyIncome}
                      onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Savings Target (₨)</label>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="number" 
                      value={formData.savingsTarget}
                      onChange={(e) => setFormData({...formData, savingsTarget: e.target.value})}
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bank Name</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      value={formData.bankName}
                      onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Account Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Saving Goal</label>
                  <div className="flex flex-wrap gap-3">
                    {['Investment', 'Vacation', 'Gadget', 'Entertainment', 'Home', 'Education', 'Emergency Fund', 'Retirement'].map((goal) => (
                      <button
                        key={goal}
                        onClick={() => setFormData({...formData, savingReason: goal})}
                        className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          formData.savingReason === goal 
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Savings Progress */}
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-2xl mt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-700">Savings Rate</span>
                  <span className="text-lg font-bold text-emerald-600">{savingsPercentage}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(Number(savingsPercentage), 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  You're saving ₨{formData.savingsTarget} out of ₨{formData.monthlyIncome} monthly income
                </p>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                <Bell className="text-emerald-500" size={24} />
                Notification Preferences
              </h2>

              <div className="space-y-4">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Get text message alerts' },
                  { key: 'budgetAlerts', label: 'Budget Alerts', desc: 'Alert when approaching budget limits' },
                  { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Receive weekly expense summaries' }
                ].map(pref => (
                  <div key={pref.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                    <div>
                      <div className="font-semibold text-gray-800">{pref.label}</div>
                      <div className="text-sm text-gray-500">{pref.desc}</div>
                    </div>
                    <button
                      onClick={() => setFormData({...formData, [pref.key]: !formData[pref.key as keyof typeof formData]})}
                      className={`relative w-14 h-7 rounded-full transition-all ${
                        formData[pref.key as keyof typeof formData] ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        formData[pref.key as keyof typeof formData] ? 'translate-x-7' : ''
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                <Lock className="text-emerald-500" size={24} />
                Security Settings
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                      className="w-full pl-10 pr-12 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter current password"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
                  <div className="flex gap-3">
                    <Award className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <div className="font-semibold text-amber-900 mb-1">Password Requirements</div>
                      <ul className="text-sm text-amber-800 space-y-1">
                        <li>• At least 8 characters long</li>
                        <li>• Include uppercase and lowercase letters</li>
                        <li>• Include at least one number</li>
                        <li>• Include at least one special character</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <button 
              onClick={handleUpdate}
              className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-blue-600 shadow-lg shadow-emerald-200 transition-all"
            >
              <Save size={20} />
              Save Changes
            </button>
            <button 
              className="px-8 py-3.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}