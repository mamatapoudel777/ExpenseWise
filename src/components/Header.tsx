import React, { useState, useEffect } from 'react';
import { Search, Bell, Settings, Sun, User } from 'lucide-react';

const Header: React.FC = () => {
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    // This looks at the browser memory for 'userName'
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-white text-sm focus:outline-none focus:ring-0" 
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-800"><Settings className="w-5 h-5" /></button>
        <button className="relative text-gray-500 hover:text-gray-800">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
        </button>
        <button className="text-gray-500 hover:text-gray-800"><Sun className="w-5 h-5" /></button>
        
        <div className="flex items-center space-x-2 border-l pl-4 border-gray-200">
          
           <User className="w-6 h-6 rounded-full object-cover" />
          
          <div className="hidden sm:block text-md font-medium text-gray-700 capitalize">
            {userName}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;