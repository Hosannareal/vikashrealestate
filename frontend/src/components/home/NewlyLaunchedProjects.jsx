import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { mockLandProperties } from "../../data/mockLand";

const NewlyLaunchedProjects = () => {
  const navigate = useNavigate();

  const newlyLaunched = useMemo(() => {
    return mockLandProperties
      .filter((p) => p?.status === "newly_launched" || p?.isNew)
      .slice(0, 3);
  }, []);

  const goToNewlyLaunched = () => {
    navigate("/plots?view=map&sort=newly-launched&status=newly-launched");
  };

  return (
    <section className="section section-soft">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 border-b border-[#2c2925]/20 pb-6 flex justify-between items-end">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#2c2925] uppercase tracking-tight mb-2">
              Newly Launched
            </h2>
            <p className="text-[#555] font-light text-sm">
              Exceptional residences crafted to inspire
            </p>
          </div>
          <button
            onClick={goToNewlyLaunched}
            className="hidden md:block text-[#2c2925] border border-[#2c2925]/30 px-6 py-2 uppercase text-xs tracking-widest hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-white transition-all"
          >
            Explore More
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {newlyLaunched.map((plot, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              onClick={goToNewlyLaunched}
              className="group cursor-pointer relative bg-[#111] overflow-hidden"
            >
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={plot.imageUrl}
                  alt={plot.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Default State Bottom Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end transition-all duration-300 group-hover:opacity-0 group-hover:pointer-events-none z-10 h-full">
                  <h3 className="text-2xl font-serif text-white uppercase tracking-wide mb-1 leading-tight">
                    {plot.title}
                  </h3>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-sm text-[#ddd] font-light">
                      {plot.location}
                    </p>
                    <span className="text-[var(--primary)] font-semibold tracking-wide text-sm">
                      ₹{(plot.price / 10000000).toFixed(2)} Cr
                    </span>
                  </div>
                </div>

                {/* Hover State Full Overlay */}
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-transparent group-hover:border-[var(--primary)] z-20">
                  <h3 className="text-2xl font-serif text-[var(--primary)] uppercase tracking-wide mb-2 text-center">
                    {plot.title}
                  </h3>
                  <p className="text-sm text-[#ccc] mb-4 font-light text-center">
                    {plot.location}
                  </p>
                  <p className="text-sm text-white font-semibold mb-6">
                    ₹{(plot.price / 10000000).toFixed(2)} Cr
                  </p>
                  <button className="text-white border-b border-[var(--primary)] uppercase text-sm font-semibold tracking-widest hover:text-[var(--primary)] transition-colors pb-1">
                    Inquire &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden w-full">
          <button
            onClick={goToNewlyLaunched}
            className="text-[#2c2925] border border-[#2c2925]/30 px-6 py-3 w-full uppercase text-xs tracking-widest hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-white transition-all"
          >
            Explore More
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewlyLaunchedProjects;
