import React from 'react';

const Footer: React.FC = () => {
  const footerLinks = {
    Product: ["Features", "Pricing", "Mobile App", "Integrations"],
    Company: ["About Us", "Careers", "Blog", "Press Kit"],
    Support: ["Help Center", "Contact Us", "Privacy Policy", "Terms"]
  };

  return (
    <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-[#00694B] mb-6">ExpenseWise</h3>
            <p className="text-gray-500 max-w-sm mb-6">
              Your trusted partner in financial management. Track, analyze, and optimize your spending with ease and precision.
            </p>
            <div className="flex gap-4">
              {['📘', '🐦', '📷', '💼'].map((icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-[#00B37E] hover:text-white transition-all shadow-sm">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-gray-800 mb-6">{title}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-500 hover:text-[#00B37E] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2024 ExpenseWise. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;