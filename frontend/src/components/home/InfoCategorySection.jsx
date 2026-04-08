import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Buying",
    desc: "Expert guidance for property acquisition.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eebff?w=400&q=80",
  },
  {
    title: "Selling",
    desc: "Maximize your property's market value.",
    img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80",
  },
  {
    title: "Plot Resale",
    desc: "Seamless land resale transactions.",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80",
  },
  {
    title: "Investment Advisory",
    desc: "Strategic real estate investments.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
  },
  {
    title: "Legal Assistance",
    desc: "Comprehensive documentation support.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
  },
  {
    title: "Property Valuation",
    desc: "Accurate market price assessment.",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80",
  },
  {
    title: "Site Visits",
    desc: "Guided property tours and inspections.",
    img: "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=400&q=80",
  },
];

// Duplicate items to ensure smooth infinite loop
const marqueeItems = [...categories, ...categories, ...categories];

const InfoCategorySection = () => {
  const navigate = useNavigate();

  const handleServiceClick = (title) => {
    const t = String(title || "").toLowerCase();

    if (t === "buying") return navigate("/plots");
    if (t === "selling") return navigate("/resale");
    if (t === "plot resale") return navigate("/resale");
    if (t === "investment advisory") return navigate("/contact?type=investment");
    if (t === "legal assistance") return navigate("/contact?type=legal");
    if (t === "property valuation") return navigate("/valuation");
    if (t === "site visits") return navigate("/request-site-visit");

    navigate("/contact");
  };

  return (
    <section className="section section-soft overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 mb-12">
        <h2 className="text-[40px] md:text-[48px] font-serif text-black uppercase tracking-tight">
          Our Services
        </h2>
      </div>

      <div className="w-full relative overflow-hidden group">
        <div className="flex w-max animate-marquee">
          {marqueeItems.map((cat, index) => (
            <div
              key={index}
              onClick={() => handleServiceClick(cat.title)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleServiceClick(cat.title);
              }}
              className="group w-[280px] mx-4 flex-shrink-0 cursor-pointer bg-[#1a1a1a] rounded-sm overflow-hidden border border-[#333] transition-all hover:border-[var(--primary)] hover:shadow-[0_0_0_1px_var(--primary)]"
            >
              <div className="h-[140px] w-full overflow-hidden">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-white text-[14px] uppercase tracking-wider mb-2">
                  {cat.title}
                </h3>
                <p className="text-[#a0a0a0] text-[12px] leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center md:text-right max-w-[1400px] mx-auto px-6 lg:px-12">
        <button
          onClick={() => navigate("/contact")}
          className="text-[#2c2925] border border-[#2c2925]/30 px-6 py-2 uppercase text-xs tracking-widest hover:bg-[var(--primary)] hover:border-[var(--primary)] transition-all"
        >
          View All Services
        </button>
      </div>
    </section>
  );
};

export default InfoCategorySection;
