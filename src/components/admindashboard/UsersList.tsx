import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Edit } from 'lucide-react';
import Sidebar from '../commoncomponents/Sidebar';
import Header from '../commoncomponents/Header';
import DeleteUserModal from './DeleteUserModal';
import EditUserModal from './EditModule';

interface UserData {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);


  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users');
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openDeleteModal = (user: UserData) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedUser) {
      try {
        await axios.delete(`http://localhost:5000/users/${selectedUser._id}`);
        setUsers(users.filter(u => u._id !== selectedUser._id));
        setIsModalOpen(false);
        setSelectedUser(null);
      } catch (error) {
        alert("Failed to delete user");
      }
    }
  };
   const openEditModal = (user: UserData) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const saveEdit = async (updatedData: {
    firstname: string;
    lastname: string;
    email: string;
  }) => {
    if (!selectedUser) return;

    try {
      const res = await axios.patch(
        `http://localhost:5000/users/${selectedUser._id}`,
        updatedData
      );

      setUsers(users.map(user =>
        user._id === selectedUser._id ? res.data : user
      ));

      setIsEditOpen(false);
      setSelectedUser(null);
    } catch (error) {
      alert('Failed to update user');
    }
  };

  return (
    <div className="flex h-screen bg-[#F7F8FC]">
      <Sidebar />

      <div className="ml-64 flex flex-col w-[calc(100%-16rem)] min-h-screen">
        <Header />

        <div className="p-8">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-[#00694B]">Registered Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                  <tr>
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Email</th>
                    <th className="p-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium capitalize">
                        {user.firstname} {user.lastname}
                      </td>
                      <td className="p-4 text-gray-600">
                        {user.email}
                      </td>
                      <td className="p-4 flex justify-center space-x-3">
                        <button
                            onClick={() => openEditModal(user)}
                            className="text-blue-600 hover:bg-blue-50 p-2 cursor-pointer rounded-lg transition-all"
                            >
                         <Edit size={18} />
                        </button>

                        <button 
                          onClick={() => openDeleteModal(user)} 
                          className="text-red-600 hover:bg-red-50 p-2 cursor-pointer rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedUser && (
        <DeleteUserModal 
          userName={`${selectedUser.firstname} ${selectedUser.lastname}`}
          onConfirm={confirmDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
      {isEditOpen && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onSave={saveEdit}
          onCancel={() => setIsEditOpen(false)}
        />
      )}
    </div>
  );
};

export default UsersList;