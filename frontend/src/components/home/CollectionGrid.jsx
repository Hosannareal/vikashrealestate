import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const collections = [
  {
    name: "Luxury Developments",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
  },
  {
    name: "Back Bay",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
  },
  {
    name: "Beacon Hill",
    img: "https://images.unsplash.com/photo-1542314831-c6a4d1424b33?auto=format&fit=crop&q=80",
  },
  {
    name: "South End",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80",
  },
  {
    name: "Midtown",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
  },
  {
    name: "Bulfinch Crossing",
    img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80",
  },
];

const CollectionGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="section section-soft !py-0 w-full overflow-hidden">
      {/* Header Area */}
      <div className="  w-full py-16 text-center border-b border-[#333]">
        <p className="text-[var(--primary)] font-serif italic text-xl mb-4">
          About Campion & Company � List with Campion & Company
        </p>
        {/* <div className="w-48 h-[1px] bg-[var(--primary)]/30 mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#111] rotate-45 border border-[var(--primary)]/30"></div>
        </div> */}
      </div>

      {/* Full Bleed Grid */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {collections.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover="hover"
              onClick={() => navigate(`/plots/${idx + 1}`)}
              className="relative aspect-video lg:aspect-[4/3] w-full overflow-hidden group cursor-pointer border-[0.5px] border-[#222]"
            >
              <motion.img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover"
                variants={{
                  hover: { scale: 1.05 },
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500 z-10"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6 text-center">
                <span className="text-xs uppercase tracking-[0.2em] text-[#ccc] mb-2 group-hover:text-white transition-colors">
                  Explore
                </span>
                <h3 className="text-3xl lg:text-4xl font-serif text-white tracking-wide group-hover:text-[var(--primary)] transition-colors">
                  {item.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionGrid;
