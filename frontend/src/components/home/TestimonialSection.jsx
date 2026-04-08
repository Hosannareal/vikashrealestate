import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Home Buyer",
    text: "An exceptional experience finding our dream residence. The curated listings and expert guidance made all the difference.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    name: "Priya Singh",
    role: "Investor",
    text: "Impeccable service throughout the investment journey. The insights provided were invaluable and the support exceptional.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    name: "Amit Verma",
    role: "Seller",
    text: "Seamless experience from listing to sale. Professional guidance at every stage made this completely stress-free.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
  },
];

const TestimonialSection = () => {
  return (
    <section className="section section-soft border-t border-[var(--primary)]/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-end mb-16 border-b border-[#2c2925]/20 pb-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#2c2925] uppercase tracking-tight mb-2">
              Testimonials
            </h2>
            <p className="text-[#555] font-light text-sm">
              Trusted by our discerning clientele across the globe
            </p>
          </div>
          <button className="hidden md:block text-[#2c2925] border border-[#2c2925]/30 px-6 py-2 uppercase text-xs tracking-widest hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-white transition-all">
            View All Reviews
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white p-10 rounded-sm shadow-sm border border-[#e5e5e5] hover:border-[var(--primary)] transition-colors duration-300"
            >
              <div className="flex gap-1 text-[var(--primary)] mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="text-[#333] mb-10 font-light text-[15px] italic leading-relaxed min-h-[80px]">
                "{testi.text}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-[#eee]">
                <img
                  src={testi.img}
                  alt={testi.name}
                  className="w-12 h-12 rounded-full object-cover shadow-sm border border-[#eee]"
                />
                <div>
                  <h4 className="font-serif text-[#2c2925] text-sm uppercase tracking-wide">
                    {testi.name}
                  </h4>
                  <p className="text-xs text-[#777] font-light mt-1">
                    {testi.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden w-full">
          <button className="text-[#2c2925] border border-[#2c2925]/30 px-6 py-3 w-full uppercase text-xs tracking-widest hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-white transition-all">
            View All Reviews
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
