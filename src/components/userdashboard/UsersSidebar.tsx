import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard,Users, Settings, LogOut, Bell, Search } from 'lucide-react';
import LogoutModal from '../auth/Logout'

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center p-2 rounded-lg transition-colors text-sm font-medium ${
      isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-100 bg-[#005a40] hover:bg-[#004d37]'
    }`}
  >
    {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5 mr-3' })}
    <span className="flex-1 text-left">{label}</span>
  </button>
);

const UsersSidebar: React.FC = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const confirmLogout = () => {
    localStorage.removeItem('userName');
    navigate('/signin');
  };

  return (
    <>
      <aside className="w-64 bg-[#00694B] border-r border-gray-100 fixed top-0 left-0 h-full flex flex-col pt-4">
        <div className="px-4 mb-6 text-white text-xl font-bold">
          ExpenseWise
        </div>

        <nav className="flex-1 px-4 space-y-4">
          <h3 className="text-xs font-semibold uppercase text-gray-300 px-2">Menu</h3>
          <NavLink icon={<LayoutDashboard />} label="Dashboard" onClick={() => navigate('#')} />
          <NavLink icon={<Bell />} label="Transactions" />
<NavLink
  icon={<Users />}
  label="Profile Managements"
  onClick={() => navigate('#')}
/>
          <NavLink icon={<Settings />} label="Export Report" />
          <NavLink icon={<Search />} label='Net Balance' />
          
          <NavLink 
            icon={<LogOut />} 
            label="Log Out" 
            onClick={() => setShowLogoutModal(true)} 
          />
        </nav>
      </aside>

      {showLogoutModal && (
        <LogoutModal 
          onConfirm={confirmLogout} 
          onCancel={() => setShowLogoutModal(false)} 
        />
      )}
    </>
  );
};

export default UsersSidebar;