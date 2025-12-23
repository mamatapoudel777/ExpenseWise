import React from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';

interface DeleteUserModalProps {
  userName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ userName, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-2">Delete User?</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <span className="font-bold text-gray-800">{userName}</span>? This action cannot be undone.
        </p>
        
        <div className="flex space-x-3">
          <button 
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;