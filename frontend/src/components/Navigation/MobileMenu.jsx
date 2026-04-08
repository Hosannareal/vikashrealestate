import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Phone } from 'lucide-react';
import { navItems } from './NavMenu';

const MobileMenu = ({ isOpen, onClose }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[100] md:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-[#111] z-[101] shadow-2xl flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="text-[#c6a87d] font-serif text-xl tracking-wider">VIKASH</span>
              <button onClick={onClose} className="text-white hover:text-[#c6a87d] transition-colors">
                <X size={28} />
              </button>
            </div>

            <div className="overflow-y-auto flex-grow py-6 px-6">
              <nav className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => item.hasDropdown ? toggleDropdown(item.name) : handleLinkClick()}
                    >
                      {item.hasDropdown ? (
                        <span className="text-white uppercase tracking-[0.15em] text-[15px]">{item.name}</span>
                      ) : (
                        <Link 
                          to={item.path} 
                          className="text-white uppercase tracking-[0.15em] text-[15px] block w-full"
                          onClick={handleLinkClick}
                        >
                          {item.name}
                        </Link>
                      )}
                      
                      {item.hasDropdown && (
                        <ChevronDown 
                          size={18} 
                          className={`text-white transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`}
                        />
                      )}
                    </div>

                    {item.hasDropdown && (
                      <AnimatePresence>
                        {openDropdown === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-4 pl-4 pt-4 pb-2 border-l border-white/10 mt-4">
                              {item.dropdownItems.map((dropItem) => (
                                <Link
                                  key={dropItem.name}
                                  to={dropItem.path}
                                  onClick={handleLinkClick}
                                  className="text-[#b8b8b8] uppercase tracking-[0.1em] text-[13px] hover:text-[#c6a87d] transition-colors"
                                >
                                  {dropItem.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col gap-6">
                <a href="tel:617-236-0711" className="flex items-center gap-3 text-white hover:text-[#c6a87d] transition-colors">
                  <Phone size={18} />
                  <span className="tracking-widest">617-236-0711</span>
                </a>
                <div className="flex items-center gap-4 text-[14px] uppercase tracking-wider">
                  <Link to="/login" className="text-white hover:text-[#c6a87d]" onClick={handleLinkClick}>Login</Link>
                  <span className="text-white/30">|</span>
                  <Link to="/register" className="text-white hover:text-[#c6a87d]" onClick={handleLinkClick}>Sign Up</Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;