import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const ValuationPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    propertyType: 'Plot',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo(0, 0);
    }, 900);
  };

  if (isSuccess) {
    return (
      <div className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-b from-white to-[#F5F1EB]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-[#C8A96A]/20 blur-xl rounded-full"></div>
              <CheckCircle2 className="w-20 h-20 text-[#C8A96A] relative" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B0B0B] mb-4">Valuation Request Sent</h1>
          <p className="text-[#6B6B6B] text-lg">Our team will contact you shortly with an estimate.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-16 px-6 md:px-12 bg-gradient-to-b from-[#F5F1EB] to-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#0B0B0B] mb-6 leading-tight">Request Plot Valuation</h1>
          <p className="text-xl text-[#6B6B6B] font-light">Share a few details and we’ll prepare an accurate estimate.</p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-0 py-3 border-b-2 bg-transparent text-[#0B0B0B] placeholder-[#BFBFBF] focus:outline-none border-[#E8E1D9] focus:border-[#C8A96A] transition-all"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-0 py-3 border-b-2 bg-transparent text-[#0B0B0B] placeholder-[#BFBFBF] focus:outline-none border-[#E8E1D9] focus:border-[#C8A96A] transition-all"
                placeholder="Your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">Location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-0 py-3 border-b-2 bg-transparent text-[#0B0B0B] placeholder-[#BFBFBF] focus:outline-none border-[#E8E1D9] focus:border-[#C8A96A] transition-all"
                placeholder="City / Locality"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">Property Type</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full py-3 bg-transparent border-b-2 border-[#E8E1D9] focus:outline-none focus:border-[#C8A96A] text-[#0B0B0B]"
              >
                <option value="Plot">Plot</option>
                <option value="Land">Land</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-0 py-3 border-b-2 bg-transparent text-[#0B0B0B] placeholder-[#BFBFBF] focus:outline-none border-[#E8E1D9] focus:border-[#C8A96A] transition-all resize-none"
                placeholder="Any additional details"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-8 py-3 bg-[#C8A96A] text-white font-medium uppercase tracking-wider rounded-lg hover:bg-[#B8955A] transition-all duration-300"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ValuationPage;
