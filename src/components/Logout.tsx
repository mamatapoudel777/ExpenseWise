import React from 'react';
import { LogOut } from 'lucide-react';

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <LogOut className="w-8 h-8 text-green-800" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Confirm Logout</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to log out of your account?</p>
        
        <div className="flex space-x-3">
          <button 
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-green-900 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;