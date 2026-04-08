import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const cities = [
  {
    name: "Delhi / NCR",
    count: "12,500+",
    img: "https://images.unsplash.com/photo-1587474260580-58955d233e72?auto=format&fit=crop&w=400&q=80",
    size: "large",
  },
  {
    name: "Mumbai",
    count: "8,200+",
    img: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&w=400&q=80",
    size: "small",
  },
  {
    name: "Bangalore",
    count: "15,100+",
    img: "https://images.unsplash.com/photo-1596423735880-54ecff019e09?auto=format&fit=crop&w=400&q=80",
    size: "medium",
  },
  {
    name: "Pune",
    count: "10,300+",
    img: "https://images.unsplash.com/photo-1590760893040-3fc7dfffd26d?auto=format&fit=crop&w=400&q=80",
    size: "small",
  },
  {
    name: "Hyderabad",
    count: "9,800+",
    img: "https://images.unsplash.com/photo-1627885743452-95f0adfa2bce?auto=format&fit=crop&w=400&q=80",
    size: "medium",
  },
  {
    name: "Chennai",
    count: "6,400+",
    img: "https://images.unsplash.com/photo-1590396035987-a25e9e03fa37?auto=format&fit=crop&w=400&q=80",
    size: "large",
  },
];

const ExploreByCities = () => {
  const navigate = useNavigate();

  return (
    <section className="section section-soft">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 border-b border-[#2c2925]/20 pb-6 flex justify-between items-end">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#2c2925] uppercase tracking-tight mb-2">
              Explore By City
            </h2>
            <p className="text-[#555] font-light text-sm">
              Discover premium properties across global markets
            </p>
          </div>
          <button
            onClick={() => navigate('/plots')}
            className="hidden md:block text-[#2c2925] border border-[#2c2925]/30 px-6 py-2 uppercase text-xs tracking-widest hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-white transition-all"
          >
            View All Cities
          </button>
        </div>

        {/* Masonry Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {cities.map((city, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(`/plots?city=${encodeURIComponent(city.name)}`)}
              className={`group relative overflow-hidden cursor-pointer shadow-lg break-inside-avoid rounded-sm ${city.size === "large" ? "h-[450px]" : city.size === "medium" ? "h-[350px]" : "h-[250px]"}`}
            >
              <img
                src={city.img}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:bg-black/40 transition-colors duration-500"></div>

              <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                <h3 className="text-2xl font-serif uppercase tracking-wider mb-1 group-hover:text-[var(--primary)] transition-colors drop-shadow-md">
                  {city.name}
                </h3>
                <p className="text-sm text-[#eee] font-light group-hover:text-white transition-colors">
                  {city.count} properties
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden w-full">
          <button
            onClick={() => navigate('/plots')}
            className="text-[#2c2925] border border-[#2c2925]/30 px-6 py-3 w-full uppercase text-xs tracking-widest hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-white transition-all"
          >
            View All Cities
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExploreByCities;
