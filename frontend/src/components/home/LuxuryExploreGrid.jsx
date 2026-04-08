import React from "react";
import { motion } from "framer-motion";

const blocks = [
  {
    title: "Premium Residences",
    colSpan: "col-span-1 md:col-span-2",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Luxury Villas",
    colSpan: "col-span-1",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Commercial",
    colSpan: "col-span-1",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Emerging Markets",
    colSpan: "col-span-1 md:col-span-2",
    img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80",
  },
];

const LuxuryExploreGrid = () => {
  return (
    <section className="py-24 bg-[#F5F1EB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 border-b border-[#E8E1D9] pb-6">
          <h2 className="text-5xl md:text-6xl font-serif text-[#111111] uppercase tracking-tight">
            Collections
          </h2>
          <p className="text-[#6B6B6B] mt-4 text-lg font-light">
            Curated selections for every need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blocks.map((block, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.01 }}
              className={`group relative rounded-sm overflow-hidden cursor-pointer h-[280px] md:h-[320px] shadow-[0_4px_12px_-4px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.12)] transition-all ${block.colSpan}`}
            >
              <img
                src={block.img}
                alt={block.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/25 transition-colors duration-300"></div>

              <div className="absolute inset-0 flex items-center justify-center p-6">
                <h3 className="text-2xl md:text-3xl font-serif text-white uppercase tracking-wide text-center leading-tight group-hover:text-[#C6A769] transition-colors duration-300">
                  {block.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuxuryExploreGrid;
