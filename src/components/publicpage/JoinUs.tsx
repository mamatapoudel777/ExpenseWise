import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-r from-[#00B37E] to-[#00694B] py-24 overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Ready to Take Control?
        </motion.h2>

        <motion.p
          className="text-white text-lg md:text-xl mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Join thousands of users already managing their finances smarter.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row justify-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <button
            onClick={() => navigate("/contactus")}
            className="px-8 py-4 bg-white text-[#00694B] font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all"
          >
            Get in Touch 
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl shadow-lg hover:bg-white hover:text-[#00694B] hover:scale-105 transition-all"
          >
            Login
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
