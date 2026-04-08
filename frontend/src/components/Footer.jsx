import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] text-white pt-24 pb-12 border-t border-[#333] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">

          <div className="lg:col-span-2">
            <h3 className="text-3xl font-serif mb-6 text-[var(--primary)] tracking-widest uppercase">VIKASH</h3>
            <p className="text-[#a0a0a0] mb-8 leading-relaxed text-sm font-light max-w-md">
              A premier luxury real estate agency providing exceptional properties, strategic investments, and unparalleled client service across the globe.    
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-[#333] rounded-full flex items-center justify-center text-[#a0a0a0] hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-white transition-all">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="w-10 h-10 border border-[#333] rounded-full flex items-center justify-center text-[#a0a0a0] hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-white transition-all">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-10 h-10 border border-[#333] rounded-full flex items-center justify-center text-[#a0a0a0] hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-white transition-all">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="w-10 h-10 border border-[#333] rounded-full flex items-center justify-center text-[#a0a0a0] hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-white transition-all">
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-sans mb-6 text-sm tracking-widest text-white uppercase">Quick Links</h4>
            <ul className="space-y-4 text-[#a0a0a0] text-sm font-light">
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors duration-300">Our Agents</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors duration-300">Properties</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors duration-300">Testimonials</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans mb-6 text-sm tracking-widest text-white uppercase">Services</h4>
            <ul className="space-y-4 text-[#a0a0a0] text-sm font-light">
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors duration-300">Buying</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors duration-300">Selling</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors duration-300">Renting</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors duration-300">Valuation</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition-colors duration-300">Legal Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans mb-6 text-sm tracking-widest text-white uppercase">Newsletter</h4>
            <p className="text-[#a0a0a0] mb-6 text-sm font-light">Subscribe to receive exclusive luxury property insights.</p>
            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full px-0 py-2 bg-transparent border-b border-[#333] focus:outline-none focus:border-[var(--primary)] text-white placeholder-[#666] text-sm transition-colors rounded-none"
              />
              <button className="bg-[var(--primary)] text-white px-6 py-3 uppercase text-xs tracking-widest hover:bg-[#b09355] transition-all font-semibold mt-2 w-max">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#333] pt-8 flex flex-col md:flex-row justify-between items-center text-[#666] text-xs font-light tracking-wide">
          <p>&copy; {new Date().getFullYear()} VIKASH REAL ESTATE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--primary)] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[var(--primary)] transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
