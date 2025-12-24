import React from 'react';
import Navbar from './Navbar';

const HomePage: React.FC = () => {
  return (
    <>
    <Navbar/>
    
    <section className="pt-32 pb-20 bg-gradient-to-br from-[#00694B] to-[#00B37E] text-white">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight animate-fade-in">
            Take Control of <br /> Your Finances
          </h1>
          <p className="text-xl opacity-90 max-w-lg">
            Track your expenses, manage budgets, and grow your savings effortlessly with our intelligent dashboard.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-white text-[#00694B] font-bold rounded-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
              Get Started Free
            </button>
            <button className="px-8 py-4 border-2 border-white/50 text-white font-bold rounded-xl hover:bg-white/10 transition-all">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Dashboard Preview Widget */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 text-gray-800 transform rotate-2 hover:rotate-0 transition-transform duration-500">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-[#00694B]">Quick Overview</h3>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-500">Dec 2024</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-3 bg-red-50 rounded-xl">
              <p className="text-[10px] text-red-500 font-bold uppercase">Expenses</p>
              <p className="text-xl font-bold">$3,240</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <p className="text-[10px] text-green-500 font-bold uppercase">Income</p>
              <p className="text-xl font-bold">$5,800</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <p className="text-[10px] text-blue-500 font-bold uppercase">Balance</p>
              <p className="text-xl font-bold">$2,560</p>
            </div>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center p-3 border-b border-gray-50">
               <span className="font-semibold">Whole Foods</span>
               <span className="text-red-500 font-bold">-$85.50</span>
             </div>
             <div className="flex justify-between items-center p-3">
               <span className="font-semibold">Salary Deposit</span>
               <span className="text-green-500 font-bold">+$2,800</span>
             </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default HomePage;