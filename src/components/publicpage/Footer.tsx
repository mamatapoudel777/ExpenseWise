import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer: React.FC = () => {
  const footerLinks = {
    Product: ["Features", "Pricing", "Mobile App", "Integrations"],
    Company: ["About Us", "Careers", "Blog", "Press Kit"],
    Support: ["Help Center", "Contact Us", "Privacy Policy", "Terms"],
  };

  return (
    <footer className="bg-[#00694B] pt-5 pb-3 border-t border-gray-200">
      <div className="container mx-auto px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-white mb-4">
              💰 ExpenseWise
            </h3>
            <p className="text-white max-w-sm mb-6 leading-relaxed">
              Smart expense tracking made simple. Monitor income, control
              spending, and achieve financial clarity with ExpenseWise.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                { icon: <FaFacebookF />, link: "#" },
                { icon: <FaTwitter />, link: "#" },
                { icon: <FaInstagram />, link: "#" },
                { icon: <FaLinkedinIn />, link: "#" },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black hover:bg-[#00694B] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-white mb-4">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white hover:text-[#00694B] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-500 pt-4 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-white">
          <p>© {new Date().getFullYear()} ExpenseWise. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-[#00694B] transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#00694B] transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#00694B] transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
