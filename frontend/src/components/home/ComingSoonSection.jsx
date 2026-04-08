import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ComingSoonSection = () => {
  const navigate = useNavigate();

  return (
    <section className="section section-soft relative w-full overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* LEFT SIDE - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <span className="text-xs uppercase tracking-[0.3em] font-medium text-[var(--primary)]">
                Our Services
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-serif text-black leading-tight mb-6">
              Sell Your Property <br />
              <span className="text-[var(--primary)]">with Confidence</span>
            </h2>

            <p className="text-lg text-[#a0a0a0] leading-relaxed max-w-md mb-10 font-light">
              Get accurate valuation, verified buyers, and expert guidance. We ensure a seamless selling experience with maximum returns.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => navigate('/sell')}
                className="bg-[var(--primary)] text-white px-8 py-3 uppercase text-xs tracking-widest hover:bg-[#b09355] transition-all font-semibold"
              >
                Sell Your Property
              </button>
              <button
                onClick={() => navigate('/valuation')}
                className="text-black border border-black/30 px-8 py-3 uppercase text-xs tracking-widest hover:bg-black/10 transition-all font-semibold"
              >
                Request Plot Valuation
              </button>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[450px] md:h-[550px]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/20 to-transparent z-0"></div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-full overflow-hidden shadow-2xl z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
                alt="Sell Your Property"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection;
