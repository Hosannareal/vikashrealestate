import React, { useState } from 'react';

const ContactSidebar = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="bg-[#f8f6f2] p-8 md:p-10 sticky top-[120px] max-w-sm mx-auto w-full">
      <h3 className="text-[26px] font-serif text-[#1a1a1a] mb-3">Connect With Us</h3>
      <p className="text-[#6B6B6B] mb-8 text-[15px] font-sans leading-relaxed">
        Our agents are ready to assist you. Please provide your details below.
      </p>

      {submitted ? (
        <div className="bg-white text-[#1a1a1a] p-6 text-center border-l-4 border-[#c6a87d] mb-6 font-sans">
          Your inquiry has been received. We will be in touch shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name *"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-[#EAE8E2] px-5 py-3.5 text-[15px] text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#c6a87d] placeholder-[#888] font-sans transition-all border-none"
          />
          <input
            type="email"
            placeholder="Email *"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full bg-[#EAE8E2] px-5 py-3.5 text-[15px] text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#c6a87d] placeholder-[#888] font-sans transition-all border-none"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full bg-[#EAE8E2] px-5 py-3.5 text-[15px] text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#c6a87d] placeholder-[#888] font-sans transition-all border-none"
          />
          <textarea
            placeholder="Message *"
            required
            rows="4"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full bg-[#EAE8E2] px-5 py-3.5 text-[15px] text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#c6a87d] placeholder-[#888] font-sans transition-all border-none resize-none"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-[#111] text-white py-4 text-[13px] uppercase tracking-[0.15em] font-medium hover:bg-[#c6a87d] transition-colors duration-300 mt-4"
          >
            Submit Options
          </button>
        </form>
      )}

      <div className="mt-10 pt-8 border-t border-[#e8e4db]">
        <h4 className="text-[13px] text-[#111] font-bold mb-4 uppercase tracking-[0.1em]">Direct Contact</h4>
        <div className="space-y-4 font-sans">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-[#888] uppercase tracking-wider">Phone</span>
            <a href="tel:617-236-0711" className="text-[15px] text-[#1a1a1a] hover:text-[#c6a87d] transition-colors">617-236-0711</a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-[#888] uppercase tracking-wider">Email</span>
            <a href="mailto:info@vikashrealestate.com" className="text-[15px] text-[#1a1a1a] hover:text-[#c6a87d] transition-colors">info@vikashrealestate.com</a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-[#888] uppercase tracking-wider">Office</span>
            <span className="text-[15px] text-[#1a1a1a] leading-relaxed">
              172 Newbury Street<br/>
              Boston, MA 02116
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSidebar;