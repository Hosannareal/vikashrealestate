import React from 'react';
import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopBar = ({ variant }) => {
  // Mock auth state
  const isLoggedIn = false;
  
  // Adjusted text color based on variant or state
  const textColor = "text-white"; 
  const borderColor = "border-white/10";

  return (
    <div className={`flex justify-end items-center gap-8 text-[11px] font-sans tracking-[0.08em] pb-2 ${textColor}`}>
      <a href="tel:617-236-0711" className="flex items-center gap-2 text-white/85 hover:text-[#c6a87d] transition-colors duration-300">
        <Phone size={13} />
        <span className="font-medium">617-236-0711</span>
      </a>
      
      <span className="text-white/20 text-xs">|</span>
      
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <Link to="/account" className="text-white/85 hover:text-[#c6a87d] transition-colors duration-300 uppercase font-medium">
            My Account
          </Link>
        ) : (
          <div className="flex items-center gap-4 text-white/85">
            <Link to="/login" className="hover:text-[#c6a87d] transition-colors duration-300 uppercase font-medium">
              Login
            </Link>
            <span className="text-white/30">|</span>
            <Link to="/register" className="hover:text-[#c6a87d] transition-colors duration-300 uppercase font-medium">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;