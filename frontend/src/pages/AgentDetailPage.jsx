import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AgentProfile from '../components/AgentProfile';
import AgentListings from '../components/AgentListings';
import ContactAgentModal from '../components/ContactAgentModal';
import { mockAgents, mockAgentListings } from '../data/mockAgents';
import { MapPin, Copy, Check } from 'lucide-react';

const AgentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const agent = mockAgents.find((a) => a.id === parseInt(id));

  if (!agent) {
    return (
      <div className="w-full bg-white min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-3xl font-serif text-[#111111] mb-4">Agent Not Found</h1>
          <button
            onClick={() => navigate('/agents')}
            className="text-[#C6A769] font-semibold uppercase tracking-wider hover:text-[#B39659] transition"
          >
            Back to All Agents
          </button>
        </motion.div>
      </div>
    );
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(agent.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="w-full bg-white">
      {/* Agent Profile Section */}
      <AgentProfile agent={agent} />

      {/* Info Section - Office Location & Contact Info */}
      <section className="py-12 px-6 md:px-12 bg-[#f8f6f2] border-t border-[#e5e0d8]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Office Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-[#C6A769] font-serif text-2xl mb-6 flex items-center gap-2">
                <MapPin size={24} />
                Office Location
              </h3>
              <div className="space-y-3">
                <p className="text-[#111111] font-semibold">
                  {agent.officeLocation.office}
                </p>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">
                  {agent.officeLocation.address}
                </p>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-[#C6A769] font-serif text-2xl mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                    Office
                  </span>
                  <a
                    href={`tel:${agent.officeLocation.phone}`}
                    className="block text-[#C6A769] font-semibold text-lg hover:text-[#B39659] transition"
                  >
                    {agent.officeLocation.phone}
                  </a>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                    Cell
                  </span>
                  <a
                    href={`tel:${agent.officeLocation.cell}`}
                    className="block text-[#C6A769] font-semibold text-lg hover:text-[#B39659] transition"
                  >
                    {agent.officeLocation.cell}
                  </a>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                    Email
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <a
                      href={`mailto:${agent.officeLocation.email}`}
                      className="text-[#C6A769] font-semibold hover:text-[#B39659] transition break-all"
                    >
                      {agent.officeLocation.email}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1.5 hover:bg-[#e5e0d8] rounded transition"
                      title="Copy email"
                    >
                      {copiedEmail ? (
                        <Check size={16} className="text-emerald-600" />
                      ) : (
                        <Copy size={16} className="text-[#6B6B6B]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CMA / Valuation CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 bg-[#f8f6f2] border-2 border-[#C6A769] rounded-xl p-6 shadow-sm text-center"
            >
              <h3 className="font-serif text-[20px] text-[#111111] mb-2">Sell Your Plot</h3>
              <p className="text-[14px] text-[#6B6B6B] mb-4">Want to know what your plot is worth? Free market valuation.</p>
              <button 
                onClick={() => navigate('/services/plot-resale/request-cma')}
                className="w-full flex items-center justify-center py-3 bg-[#C6A769] hover:bg-[#b0945b] text-white uppercase tracking-wider text-[13px] font-bold rounded transition-colors"
              >
                Get Plot Valuation
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 px-6 md:px-12 bg-white border-t border-[#e5e0d8]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl border border-[#e5e0d8] p-8"
          >
            <h3 className="text-[#111111] font-serif text-2xl mb-6">Send a Message</h3>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#111111] font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#C6A769] focus:ring-1 focus:ring-[#C6A769] transition bg-white text-[#111111]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#111111] font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#C6A769] focus:ring-1 focus:ring-[#C6A769] transition bg-white text-[#111111]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#111111] font-semibold mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="(555) 000-0000"
                  className="w-full px-4 py-3 border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#C6A769] focus:ring-1 focus:ring-[#C6A769] transition bg-white text-[#111111]"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#111111] font-semibold mb-2">
                  Questions or Comments?
                </label>
                <textarea
                  placeholder="Your message here..."
                  rows={5}
                  className="w-full px-4 py-3 border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#C6A769] focus:ring-1 focus:ring-[#C6A769] transition bg-white text-[#111111] resize-none"
                />
              </div>

              {/* Opt-in Checkbox */}
              <div className="flex items-start gap-3 py-3 border-t border-[#e5e0d8]">
                <input
                  type="checkbox"
                  id="optIn"
                  className="w-4 h-4 mt-0.5 border-[#e5e0d8] rounded cursor-pointer accent-[#C6A769]"
                  defaultChecked
                />
                <label htmlFor="optIn" className="text-[12px] text-[#6B6B6B] leading-relaxed cursor-pointer">
                  I agree to receive marketing and customer service calls and text messages from
                  {` ${agent.name}`}. To opt out, you can reply 'stop' at any time or click the
                  unsubscribe link in the emails. Consent is not a condition of purchase. Msg/data
                  rates may apply.{' '}
                  <a href="#" className="text-[#C6A769] hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[#111111] text-white py-3 rounded-lg font-semibold uppercase tracking-wider text-sm hover:bg-[#333333] transition mt-6"
              >
                Send Message
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Agent Listings Section */}
      <AgentListings agent={agent} listings={mockAgentListings} />

      {/* Contact Modal */}
      <ContactAgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        agent={agent}
        onSubmit={(formData) => {
          console.log('Form submitted:', formData);
        }}
      />
    </div>
  );
};

export default AgentDetailPage;
