import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';

const ContactAgentModal = ({ isOpen, onClose, agent, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
    optIn: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const inquiryOptions = ['Buy Plot', 'Sell Land', 'Investment', 'Other'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleDropdownSelect = (value) => {
    setFormData((prev) => ({ ...prev, inquiryType: value }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.inquiryType) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API success
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setFormData({ name: '', email: '', phone: '', inquiryType: '', message: '', optIn: false });
        setSubmitStatus(null);
      }, 1500);
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="w-full max-w-md bg-white rounded-[16px] shadow-[0_20px_40px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="bg-[#f8f6f2] border-b border-[#e5e0d8] px-6 py-6 text-center relative flex-shrink-0">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 text-[#6B6B6B] hover:text-[#111111] hover:bg-[#e5e0d8] rounded-full transition"
                >
                  <X size={20} />
                </button>
                <h2 className="text-2xl font-serif text-[#111111] mb-1">Contact Agent</h2>
                <p className="text-[#6B6B6B] text-sm">
                  Get in touch for land & plot inquiries
                </p>
                {agent && (
                  <div className="mt-3 inline-block px-3 py-1 bg-[#111111] text-white text-[10px] uppercase tracking-wider rounded-full font-semibold">
                    {agent.name}
                  </div>
                )}
              </div>

              {/* Form Content */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100">
                      <span className="text-3xl text-emerald-500">✓</span>
                    </div>
                    <p className="text-[#111111] font-semibold text-lg">Inquiry Sent Successfully!</p>
                    <p className="text-[#6B6B6B] text-sm mt-2">The agent will get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold mb-1.5">
                        * Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#C6A769] focus:ring-1 focus:ring-[#C6A769] transition bg-[#f8f6f2] focus:bg-white text-[#111111] text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold mb-1.5">
                          * Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#C6A769] focus:ring-1 focus:ring-[#C6A769] transition bg-[#f8f6f2] focus:bg-white text-[#111111] text-sm"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold mb-1.5">
                          * Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+91 XXXXX XXXXX"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#C6A769] focus:ring-1 focus:ring-[#C6A769] transition bg-[#f8f6f2] focus:bg-white text-[#111111] text-sm"
                        />
                      </div>
                    </div>

                    {/* Inquiry Type (Dropdown) */}
                    <div className="relative">
                      <label className="block text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold mb-1.5">
                        * Inquiry Type
                      </label>
                      <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full px-4 py-3 border border-[#e5e0d8] rounded-lg bg-[#f8f6f2] hover:bg-white text-[#111111] text-sm cursor-pointer flex justify-between items-center transition"
                      >
                        <span className={formData.inquiryType ? 'text-[#111111]' : 'text-gray-400'}>
                          {formData.inquiryType || 'Select inquiry type'}
                        </span>
                        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </div>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-10 w-full mt-1 bg-white border border-[#e5e0d8] rounded-lg shadow-lg overflow-hidden"
                          >
                            {inquiryOptions.map((option) => (
                              <div
                                key={option}
                                onClick={() => handleDropdownSelect(option)}
                                className="px-4 py-3 text-sm text-[#111111] hover:bg-[#f8f6f2] hover:text-[#C6A769] cursor-pointer transition-colors"
                              >
                                {option}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold mb-1.5">
                        Message
                      </label>
                      <textarea
                        name="message"
                        placeholder="I'm interested in..."
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#C6A769] focus:ring-1 focus:ring-[#C6A769] transition bg-[#f8f6f2] focus:bg-white text-[#111111] text-sm resize-none custom-scrollbar"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#C6A769] text-white py-3.5 rounded-lg font-semibold uppercase tracking-wider text-sm hover:bg-[#a8874f] disabled:opacity-50 disabled:cursor-not-allowed transition mt-4 shadow-md hover:shadow-lg"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactAgentModal;
