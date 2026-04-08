import React from "react";
import { motion } from "framer-motion";

const UpcomingProjectSection = () => {
  return (
    <section className="py-24 bg-[#F5F1EB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-[#C6A769]"></div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C6A769]">
                Coming Soon
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif text-[#111111] uppercase tracking-tight leading-[1.1] mb-6">
              The Majestic Towers
            </h2>
            <p className="text-lg text-[#6B6B6B] font-light mb-2">
              Gurugram Sector-104
            </p>
            <p className="text-[#6B6B6B] mb-10 font-light text-base leading-relaxed">
              Ultra-luxury 4 & 5 BHK residences designed with meticulous
              craftsmanship. A sanctuary for those who demand the finest in
              modern living.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary flex items-center justify-center min-w-[200px]">
                Register Interest
              </button>
              <button className="btn-secondary flex items-center justify-center min-w-[200px]">
                Contact Agent
              </button>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#C6A769] opacity-20 blur-2xl rounded-full"></div>
            <div className="relative rounded-sm overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)]">
              <img
                src="https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=1200&q=80"
                alt="Upcoming Feature"
                className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#C6A769]/10 mix-blend-color-burn"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingProjectSection;
