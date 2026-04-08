import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    target: 10000,
    suffix: "+",
    label: "HAPPY CLIENTS",
  },
  {
    target: 500,
    suffix: "+",
    label: "PLOTS SOLD",
  },
  {
    target: 50,
    suffix: "+",
    label: "LOCATIONS",
  },
];

const NumberCounter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    if (isInView) {
      let startTimestamp = null;
      const duration = 1500; // 1.5s

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const WhyChooseUsSection = () => {
  return (
    <section className="section section-soft w-full flex items-center justify-center relative overflow-hidden text-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center"
      >
        <div className="flex flex-col items-center mb-16 text-center w-full">
          <h2 className="text-4xl md:text-5xl font-serif text-[#2c2925] uppercase tracking-tight leading-tight mb-4">
            WHY CHOOSE US
          </h2>
          <div className="w-16 h-[1px] bg-[var(--primary)] mx-auto"></div>
        </div>

        <div className="w-full flex md:flex-row flex-col justify-center items-center gap-12 md:gap-32">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center w-full"
            >
              <div className="text-5xl md:text-6xl font-bold text-[var(--primary)] mb-4 flex justify-center w-full">
                <NumberCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base uppercase tracking-widest text-[#555] font-medium w-full text-center">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WhyChooseUsSection;
