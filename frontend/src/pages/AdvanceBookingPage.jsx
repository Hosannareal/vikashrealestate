import React, { useEffect, useState } from 'react';

const AdvanceBookingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    plotInterest: '',
    budget: '',
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-[#C6A769]"></div>
            <span className="text-xs md:text-sm tracking-[0.25em] font-medium text-[#C6A769] uppercase">
              Advance Booking
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-white leading-tight mb-4">Reserve Early Access</h1>
          <p className="text-white/70 max-w-2xl">Submit your interest to reserve priority access for upcoming plots.</p>
        </div>
      </section>

      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-xl p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="block text-[12px] uppercase tracking-widest text-white/70 mb-2">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C6A769]"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-[12px] uppercase tracking-widest text-white/70 mb-2">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C6A769]"
                placeholder="Your phone number"
              />
            </div>

            <div>
              <label className="block text-[12px] uppercase tracking-widest text-white/70 mb-2">Plot Interest</label>
              <input
                name="plotInterest"
                value={formData.plotInterest}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C6A769]"
                placeholder="e.g. Residential plot near expressway"
              />
            </div>

            <div>
              <label className="block text-[12px] uppercase tracking-widest text-white/70 mb-2">Budget</label>
              <input
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C6A769]"
                placeholder="e.g. 1 Cr - 2 Cr"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#C6A769] text-white text-[13px] uppercase tracking-[0.15em] font-semibold rounded-lg hover:bg-[#b09355] transition"
            >
              Reserve Now
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AdvanceBookingPage;
