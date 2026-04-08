import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = ["CITIES", "UPCOMING", "NEW", "LUXURY"];

const itemsData = {
  "CITIES": [
    { title: "Back Bay", count: "142 Properties", image: "/assets/images/homebanner.jpg", link: "/projects" },
    { title: "Beacon Hill", count: "89 Properties", image: "/assets/images/homebanner.jpg", link: "/projects" },
    { title: "Seaport", count: "215 Properties", image: "/assets/images/homebanner.jpg", link: "/projects" },
    { title: "South End", count: "167 Properties", image: "/assets/images/homebanner.jpg", link: "/projects" },
  ],
  "UPCOMING": [
    { title: "The St. Regis", count: "Pre-construction", image: "/assets/images/homebanner.jpg", link: "/projects" },
    { title: "Raffles Boston", count: "Est. 2024", image: "/assets/images/homebanner.jpg", link: "/projects" },
    { title: "Winthrop Center", count: "Now Touring", image: "/assets/images/homebanner.jpg", link: "/projects" },
    { title: "One Dalton", count: "Limited Availability", image: "/assets/images/homebanner.jpg", link: "/projects" },
  ],
  "NEW": [
    { title: "182 Beacon St.", count: "$4.2M", image: "/assets/images/homebanner.jpg", link: "/projects" },
    { title: "45 Province", count: "$2.1M", image: "/assets/images/homebanner.jpg", link: "/projects" },
    { title: "Millennium Tower", count: "$3.5M", image: "/assets/images/homebanner.jpg", link: "/projects" },
    { title: "The Clarendon", count: "$5.8M", image: "/assets/images/homebanner.jpg", link: "/projects" },
  ],
  "LUXURY": [
    { title: "Penthouses", count: "24 Properties", image: "/assets/images/homebanner.jpg", link: "/projects" },
    { title: "Waterfront", count: "56 Properties", image: "/assets/images/homebanner.jpg", link: "/projects" },
    { title: "Historic", count: "89 Properties", image: "/assets/images/homebanner.jpg", link: "/projects" },
    { title: "New Development", count: "112 Properties", image: "/assets/images/homebanner.jpg", link: "/projects" },
  ]
};

const RecommendedSection = () => {
  const [activeTab, setActiveTab] = useState("CITIES");

  return (
    <section className="bg-white py-24 border-t border-[#E8E1D9]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-[#111111] mb-8 relative inline-block">
            Recommended
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#C8A96A]"></span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[13px] tracking-[0.15em] font-medium uppercase pb-2 border-b-2 transition-all duration-300 ${
                  activeTab === tab 
                    ? 'border-[#111111] text-[#111111]' 
                    : 'border-transparent text-[#888] hover:text-[#111111]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {itemsData[activeTab].map((item, index) => (
                <Link to={item.link} key={index} className="group cursor-pointer">
                  <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-[#f8f6f2]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-serif text-[#111111] group-hover:text-[#C8A96A] transition-colors duration-300 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[14px] text-[#6b6b6b] font-sans">
                      {item.count}
                    </p>
                  </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="text-center mt-16">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.15em] text-[#111111] hover:text-[#C8A96A] transition-colors"
          >
            Explore All Directory <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecommendedSection;