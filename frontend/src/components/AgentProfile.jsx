import React from 'react';
import { motion } from 'framer-motion';

const AgentProfile = ({ agent }) => {
  return (
    <section className="py-12 px-6 md:px-12 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="h-[400px] md:h-[500px] overflow-hidden rounded-lg"
          >
            <img
              src={agent.image}
              alt={agent.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right: Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-between"
          >
            {/* Name & Phone */}
            <div className="mb-8">
              <h1 className="text-[3.5rem] md:text-[4rem] font-serif text-[#111111] leading-tight mb-4">
                {agent.name}
              </h1>
              <div className="text-right">
                <a
                  href={`tel:${agent.phone}`}
                  className="inline-block text-lg md:text-xl font-semibold text-[#C6A769] hover:text-[#B39659] transition"
                >
                  {agent.phone}
                </a>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-4 mb-8">
              {agent.bio.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-[#6B6B6B] text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Specialties & Languages */}
            <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-[#e5e0d8]">
              {/* Specialties */}
              <div>
                <h4 className="text-[11px] uppercase tracking-wider text-[#111111] font-semibold mb-3">
                  Specialties
                </h4>
                <div className="flex flex-wrap gap-2">
                  {agent.specialties?.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="bg-[#f8f6f2] text-[#111111] text-[11px] px-3 py-1.5 rounded-lg font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h4 className="text-[11px] uppercase tracking-wider text-[#111111] font-semibold mb-3">
                  Languages
                </h4>
                <div className="flex flex-wrap gap-2">
                  {agent.languages?.map((language, idx) => (
                    <span
                      key={idx}
                      className="bg-[#f8f6f2] text-[#111111] text-[11px] px-3 py-1.5 rounded-lg font-medium"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Service Areas */}
            <div>
              <h4 className="text-[11px] uppercase tracking-wider text-[#111111] font-semibold mb-3">
                Service Areas
              </h4>
              <div className="flex flex-wrap gap-2">
                {agent.serviceAreas?.map((area, idx) => (
                  <span key={idx} className="text-[#C6A769] text-[12px] font-semibold">
                    {area}
                    {idx < agent.serviceAreas.length - 1 && ' • '}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AgentProfile;
