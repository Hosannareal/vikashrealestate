import React, { useState } from 'react';

const ContactCard = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="bg-white p-8 shadow-sm border border-[#E8E1D9] sticky top-[120px]">
      <h3 className="text-2xl font-serif text-[#111111] mb-2">Connect With Us</h3>
      <p className="text-[#6B6B6B] mb-6 text-[15px] font-sans">
        Populate the contact form below and one of our agents will reach out to you as soon as possible.
      </p>
      
      {submitted ? (
        <div className="bg-[#F5F1EB] text-[#111111] p-6 text-center border border-[#C8A96A] mb-6 font-sans">
          Thank you! Your message has been received successfully.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Your Name" 
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full border border-[#E8E1D9] px-4 py-3 text-[14px] focus:outline-none focus:border-[#C8A96A] bg-[#FAFAFA] font-sans transition-colors"
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full border border-[#E8E1D9] px-4 py-3 text-[14px] focus:outline-none focus:border-[#C8A96A] bg-[#FAFAFA] font-sans transition-colors"
          />
          <input 
            type="tel" 
            placeholder="Phone Number" 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full border border-[#E8E1D9] px-4 py-3 text-[14px] focus:outline-none focus:border-[#C8A96A] bg-[#FAFAFA] font-sans transition-colors"
          />
          <textarea 
            placeholder="Questions or Comments?" 
            required
            rows="4"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full border border-[#E8E1D9] px-4 py-3 text-[14px] focus:outline-none focus:border-[#C8A96A] bg-[#FAFAFA] resize-none font-sans transition-colors"
          ></textarea>
          <button 
            type="submit"
            className="w-full bg-[#111111] text-white py-3.5 text-[13px] uppercase tracking-widest font-medium hover:bg-[#C8A96A] transition-colors duration-300 mt-2"
          >
            Submit
          </button>
        </form>
      )}
      <div className="mt-8 pt-6 border-t border-[#E8E1D9]">
        <p className="text-[14px] text-[#111111] font-semibold mb-3 uppercase tracking-wider">Direct Contact</p>
        <p className="text-[15px] font-sans text-[#6B6B6B] mb-2 flex items-center gap-2">
          <span className="text-[#C8A96A]">P:</span> 617-236-0711
        </p>
        <p className="text-[15px] font-sans text-[#6B6B6B] mb-2 flex items-center gap-2">
          <span className="text-[#C8A96A]">E:</span> info@vikashrealestate.com
        </p>
        <p className="text-[15px] font-sans text-[#6B6B6B] flex items-start gap-2">
          <span className="text-[#C8A96A] mt-1 shrink-0">A:</span> 
          <span>172 Newbury Street<br/>Boston, MA 02116</span>
        </p>
      </div>
    </div>
  );
};

export default ContactCard;