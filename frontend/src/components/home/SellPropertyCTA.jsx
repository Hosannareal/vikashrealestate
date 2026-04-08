import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SellPropertyCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-[#F5F1EB] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#C6A769] opacity-8 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#E8E1D9] opacity-40 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
          {/* LEFT: Image with offset */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative -ml-6 lg:-ml-20 mt-6 lg:mt-0"
          >
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#C6A769] opacity-90 z-0"></div>
            <div className="relative h-[400px] lg:h-[500px] rounded-sm overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] z-10">
              <img
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
                alt="Sell Property"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#111111]/10"></div>
            </div>
          </motion.div>

          {/* RIGHT: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center p-0 lg:pl-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-[#C6A769]"></div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C6A769]">
                Sell & Rent
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-serif text-[#111111] uppercase tracking-tight leading-[1.1] mb-6">
              Maximize Your Returns
            </h2>
            <p className="text-[#6B6B6B] text-lg font-light mb-10 leading-relaxed">
              List your property with confidence. Reach qualified buyers and
              tenants, backed by our expert guidance and verified networking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/sell')}
                className="btn-primary flex items-center justify-center min-w-[200px]"
              >
                Sell Your Property
              </button>
              <button
                onClick={() => navigate('/valuation')}
                className="btn-secondary flex items-center justify-center min-w-[200px]"
              >
                Request Plot Valuation
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SellPropertyCTA;
