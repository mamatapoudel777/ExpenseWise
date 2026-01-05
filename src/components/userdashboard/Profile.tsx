import { useState, useEffect } from 'react';
import type {ChangeEvent} from 'react'
import { User, Mail, Phone, Wallet, Target, Camera, Save, PieChart } from 'lucide-react';
import UsersSidebar from './UsersSidebar';
import Header from '../commoncomponents/Header';
import axios from 'axios';

export default function Profile() {
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    monthlyIncome: '',
    savingsTarget: '',
    savingReason: 'Investment',
    profilePic: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleUpdate = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/users/${userId}`, formData);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Update failed");
    }
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, profilePic: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <div className="ml-64 p-10">Loading Profile...</div>;

  return (
    <>
      <UsersSidebar />
      <div className="ml-64 flex flex-col w-[calc(100%-16rem)] min-h-screen bg-gray-50">
        <Header />
        <div className="p-8 max-w-4xl mx-auto w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Account Settings</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Photo & Basic Info */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
              <div className="relative group mb-4">
                <div className="w-32 h-32 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                  {formData.profilePic ? (
                    <img src={formData.profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={64} className="text-emerald-500" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-emerald-500 p-2 rounded-full text-white cursor-pointer hover:scale-110 transition-transform shadow-lg">
                  <Camera size={18} />
                  <input type="file" className="hidden" onChange={handlePhotoUpload} accept="image/*" />
                </label>
              </div>
              <h2 className="text-xl font-bold text-gray-800">{formData.firstname} {formData.lastname}</h2>
              <p className="text-gray-400 text-sm mb-6">{formData.email}</p>
              
              <div className="w-full pt-6 border-t border-gray-50 space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={18} className="text-gray-400" />
                  <span className="text-sm">{formData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone size={18} className="text-gray-400" />
                  <span className="text-sm">{formData.phoneNumber || 'Add phone number'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Financial Goals */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <PieChart className="text-emerald-500" size={20} />
                  Financial Identity
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Monthly Income (Rs)</label>
                    <div className="relative">
                      <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="number" 
                        value={formData.monthlyIncome} 
                        onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Monthly Savings Target (Rs)</label>
                    <div className="relative">
                      <Target className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="number" 
                        value={formData.savingsTarget} 
                        onChange={(e) => setFormData({...formData, savingsTarget: e.target.value})}
                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Saving For</label>
                    <div className="flex flex-wrap gap-2">
                      {['Investment', 'Vacation', 'Gadget', 'Entertainment', 'Home', 'Education'].map((goal) => (
                        <button
                          key={goal}
                          onClick={() => setFormData({...formData, savingReason: goal})}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            formData.savingReason === goal 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-50">
                  <button 
                    onClick={handleUpdate}
                    className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-100 transition-all"
                  >
                    <Save size={20} />
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}