import React from "react";
import { motion } from "framer-motion";

const LandPlotSection = () => {
  return (
    <section className="relative w-full py-32 bg-[#F5F1EB] overflow-hidden">
      {/* Background Assets */}
      {/* Black paint stroke */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute bottom-20 left-[10%] w-96 h-96 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/enhaceassets/blackpaint-5.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          opacity: 0.25,
        }}
      />

      {/* Grey texture background */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/enhaceassets/blackgrey.png')",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* LEFT SIDE - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <span className="text-xs uppercase tracking-[0.3em] text-[#C6A769] font-medium">
                Opportunities
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-serif text-[#111111] leading-tight mb-6">
              LAND & PLOTS
            </h2>

            <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-md mb-10">
              Prime land parcels in strategic locations. Perfect for development
              or investment with unlimited potential.
            </p>

            <LuxuryButton text="VIEW MORE" direction="up" />
          </motion.div>

          {/* RIGHT SIDE - Overlapping Images */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] md:h-[600px]"
          >
            {/* Background texture layer */}
            <div
              className="absolute inset-0 opacity-15 rounded-2xl"
              style={{
                backgroundImage: "url('/assets/enhaceassets/blackgrey.png')",
                backgroundSize: "cover",
              }}
            />

            {/* Main Image - Large */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6 }}
              className="absolute left-0 top-0 w-[90%] h-[75%] rounded-2xl overflow-hidden shadow-2xl z-20"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
                alt="Land Plot 1"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Secondary Image - Offset Right Bottom */}
            <motion.div
              whileHover={{ scale: 1.05, zIndex: 30 }}
              transition={{ duration: 0.6 }}
              className="absolute right-0 bottom-0 w-[60%] h-[60%] rounded-xl overflow-hidden shadow-xl z-10 border-8 border-[#F5F1EB]"
            >
              <img
                src="https://images.unsplash.com/photo-1600498603989-dde9987311d9?auto=format&fit=crop&q=80"
                alt="Land Plot 2"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Luxury Button Component
const LuxuryButton = ({ text, direction = "down" }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="relative group px-8 py-3 bg-[#E4D5B7] text-[#111111] text-xs uppercase tracking-widest font-semibold overflow-hidden"
    >
      {/* Hover background spread effect */}
      <motion.div
        className="absolute inset-0 -m-6 opacity-0"
        style={{
          backgroundImage: "url('/assets/enhaceassets/hover.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          top: direction === "down" ? 0 : "auto",
          bottom: direction === "up" ? 0 : "auto",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 0.5, scale: 1.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      <span className="relative z-10">{text}</span>
    </motion.button>
  );
};

export default LandPlotSection;
