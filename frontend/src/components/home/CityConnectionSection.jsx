import React from "react";
import { motion } from "framer-motion";

const CityConnectionSection = () => {
  const gridItems = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1600573472550-d08e4c9cd6bc?auto=format&fit=crop&q=80",
      className: "col-span-1 row-span-2 h-[500px]",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      className: "col-span-1 row-span-1 h-[240px]",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1600498603989-dde9987311d9?auto=format&fit=crop&q=80",
      className: "col-span-1 row-span-1 h-[240px]",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
      className: "col-span-1 row-span-2 h-[500px]",
    },
  ];

  return (
    <section className="relative w-full py-32 bg-[#F5F1EB] overflow-hidden">
      {/* Background Assets */}
      {/* Gold texture - bottom left */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.25 }}
        transition={{ duration: 1 }}
        className="absolute bottom-10 left-[5%] w-[400px] h-[400px] pointer-events-none"
        style={{
          backgroundImage: "url('/assets/enhaceassets/golden-6.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Marble/texture - right side */}
      <div
        className="absolute top-0 right-0 w-1/3 h-2/3 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/enhaceassets/blackgrey.png')",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="mb-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C6A769] font-medium">
              Across the region
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-serif text-[#111111] leading-tight mb-6">
            CONNECTION
          </h2>

          <p className="text-lg text-[#6B6B6B] max-w-2xl">
            A new paradigm in luxury living. Discover our properties across
            premium locations and experiences beyond compare.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max"
        >
          {gridItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`${item.className} relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={`Property ${item.id}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-black/0"
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View Gallery Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <LuxuryButton text="VIEW GALLERY" direction="down" />
        </motion.div>
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

export default CityConnectionSection;
