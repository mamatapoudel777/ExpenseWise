import React from 'react';
import Navbar from './Navbar';
import BarChart from '../admindashboard/Bar';
import Features from './Features'
import Footer from './Footer'
import Testimonials from './Testimonials';
import CTASection from './JoinUs';
import { Link } from "react-router-dom";

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
            Track your expenses, manage budgets and income, and grow your savings effortlessly with our intelligent dashboard.
          </p>
          <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-full shadow-md max-w-xl">
  <input
    type="text"
    placeholder="Enter your email or phone number"
    className="flex-1 px-5 py-3 text-gray-900 outline-none bg-transparent rounded-full"
  />

  <Link to="/signin">
    <button className="px-6 py-3 cursor-pointer bg-gradient-to-br from-[#00694B] to-[#00B37E] text-white font-semibold rounded-full hover:bg-[#009f76] transition-all">
      Get Started Free
    </button>
  </Link>
</div>

        </div>

        {/* Dashboard Preview Widget */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 text-gray-800 hover:rotate-0 transition-transform duration-500">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-2xl text-[#00694B]">Dashboard Overview</h3>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-500">Dec 2024</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-3 bg-red-50 rounded-xl">
              <p className="text-[10px] text-red-500 font-bold uppercase">Expenses</p>
              <p className="text-xl font-bold">RS 30,240</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <p className="text-[10px] text-green-500 font-bold uppercase">Income</p>
              <p className="text-xl font-bold">RS 5O,800</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <p className="text-[10px] text-blue-500 font-bold uppercase">Balance</p>
              <p className="text-xl font-bold">RS 20,560</p>
            </div>
          <div className="col-span-12 lg:col-span-5 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          
          <div className="h-48">
            <BarChart />
          </div>
        </div>          </div>
          
        </div>
      </div>
    </section>
    <Features/>
    <CTASection/>
    <Testimonials/>
    <Footer/>
    </>
  );
};

export default HomePage;