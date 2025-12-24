import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white shadow-sm py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center">
            <div className="text-2xl font-bold">💰 Expense <span className='text-[#00B37E] text-3xl'>Wise</span></div>
        </a>

        {/* Action Buttons */}
<div className="hidden md:flex items-center space-x-4">
  
  <Link to="/signin">
    <button className="px-6 py-2 cursor-pointer text-[#00694B] font-semibold rounded-lg border-[2px] border-green-700 hover:bg-[#009e6d] hover:text-white">
      Login
    </button>
  </Link>

  <Link to="/signup">
    <button className="px-6 py-2 cursor-pointer bg-[#00B37E] text-white font-semibold rounded-lg hover:bg-[#009e6d] shadow-md transition-all">
      Sign Up
    </button>
  </Link>

</div>


        {/* Mobile Toggle */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;