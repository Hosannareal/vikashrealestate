import React from "react";
import { motion } from "framer-motion";

const articles = [
  {
    title: "Agricultural land investment insights",
    date: "Jan 12, 2026",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200&h=200&fit=crop",
  },
  {
    title: "Commercial plots in prime cities",
    date: "Feb 05, 2026",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop",
  },
  {
    title: "RERA compliance for land deals",
    date: "Mar 18, 2026",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=200&fit=crop",
  },
];

const ExploreLandSection = () => {
  return (
    <section className="py-24 bg-[#F5F1EB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px]"
          >
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-[#C6A769] opacity-20 blur-2xl"></div>
            <div className="relative rounded-sm overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)]">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
                alt="Land view"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#C6A769]/5 mix-blend-multiply"></div>
            </div>
          </motion.div>

          {/* RIGHT: Content & Articles */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-start"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-[#C6A769]"></div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C6A769]">
                Land & Plots
              </span>
            </div>

            <h2 className="text-5xl md:text-5xl font-serif text-[#111111] uppercase tracking-tight leading-[1.2] mb-6">
              Prime Land Opportunities
            </h2>
            <p className="text-[#6B6B6B] mb-10 font-light text-base leading-relaxed">
              Discover exceptional land parcels across premium locations. From
              residential plots to commercial spaces, we curate verified
              investment opportunities for discerning investors.
            </p>
            <button className="btn-primary self-start mb-16 min-w-[200px]">
              Explore Land
            </button>

            {/* Articles List */}
            <div className="border-t border-[#E8E1D9] pt-8">
              <h3 className="text-sm font-serif uppercase tracking-widest text-[#111111] mb-8">
                Journal
              </h3>
              <div className="space-y-6">
                {articles.map((article, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 4 }}
                    className="group cursor-pointer flex gap-4 items-start"
                  >
                    <img
                      src={article.img}
                      alt={article.title}
                      className="w-20 h-20 rounded-sm object-cover shadow-sm flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-sans font-medium text-[#111111] group-hover:text-[#C6A769] line-clamp-2 transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-xs text-[#6B6B6B] mt-2 font-light">
                        {article.date}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExploreLandSection;
