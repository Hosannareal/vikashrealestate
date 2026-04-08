import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const CMARequestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const prefillData = location.state?.prefill || {};

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: prefillData.address || "",
    city: prefillData.city || "",
    area: prefillData.area || "",
    propertyType: prefillData.type || "",
    message: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.propertyType.trim()) newErrors.propertyType = "Property type is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo(0, 0);
    }, 1500);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = "Request a Comparative Market Analysis - Vikash Real Estate";

  const shareHandlers = {
    facebook: () => {
      window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(shareUrl), "_blank", "width=600,height=400");
    },
    twitter: () => {
      window.open("https://twitter.com/intent/tweet?url=" + encodeURIComponent(shareUrl) + "&text=" + encodeURIComponent(shareTitle), "_blank", "width=600,height=400");
    },
    linkedin: () => {
      window.open("https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(shareUrl), "_blank", "width=600,height=400");
    },
    email: () => {
      window.location.href = "mailto:?subject=" + encodeURIComponent(shareTitle) + "&body=" + encodeURIComponent("Check this out: " + shareUrl);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white pt-[140px] pb-20 px-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl border border-[#e5e0d8] p-10 md:p-16 shadow-sm max-w-2xl w-full text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="text-green-500" size={48} />
          </div>
          <h2 className="text-4xl font-serif text-[#0B0B0B] mb-4">Request Submitted!</h2>
          <p className="text-lg text-[#6B6B6B] mb-10 leading-relaxed">
            Thank you, <span className="font-semibold">{formData.firstName}</span>. Our expert team will review your property details and send you an accurate Comparative Market Analysis within 24-48 hours.
          </p>
          <div className="bg-[#f8f6f2] p-8 rounded-xl mb-10 border border-[#e5e0d8]">
            <p className="text-sm font-medium text-[#6B6B6B] mb-3 uppercase tracking-wider">What Happens Next</p>
            <div className="space-y-3 text-left">
              <p className="text-[#0B0B0B] flex items-start gap-3">
                <span className="text-[#C8A96A] font-bold mt-1">1.</span>
                <span>Our team analyzes recent comparable sales in your area</span>
              </p>
              <p className="text-[#0B0B0B] flex items-start gap-3">
                <span className="text-[#C8A96A] font-bold mt-1">2.</span>
                <span>We prepare a detailed valuation report</span>
              </p>
              <p className="text-[#0B0B0B] flex items-start gap-3">
                <span className="text-[#C8A96A] font-bold mt-1">3.</span>
                <span>You receive your CMA via email with next steps</span>
              </p>
            </div>
          </div>
          <button 
            onClick={() => navigate("/services/plot-resale")}
            className="w-full md:w-auto bg-[#C8A96A] text-white px-10 py-4 rounded-lg font-semibold tracking-wide hover:bg-[#b0945b] transition-all shadow-lg hover:shadow-xl"
          >
            Back to Sell Property
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      
      {/* PAGE HEADER WITH SHARE */}
      <section className="pt-[140px] pb-16 px-4 md:px-8 bg-gradient-to-b from-[#f8f6f2] to-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-6">
            <div>
              <span className="text-[#C8A96A] font-semibold tracking-widest uppercase text-xs mb-3 block">Free Service</span>
              <h1 className="text-4xl md:text-5xl font-serif text-[#0B0B0B] mb-4 leading-tight">
                Request a Market Valuation
              </h1>
              <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-2xl">
                Get an accurate Comparative Market Analysis (CMA) from our expert team. Free, no obligation, and delivered within 24-48 hours.
              </p>
            </div>
            
            {/* Share Buttons */}
            <div className="flex flex-col gap-3 md:sticky md:top-[160px]">
              <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">Share:</p>
              <div className="flex gap-2">
                <button 
                  onClick={shareHandlers.facebook}
                  className="w-10 h-10 rounded-lg bg-[#1877F2] text-white flex items-center justify-center hover:opacity-80 transition-all font-bold text-lg"
                  title="Share on Facebook"
                >
                  f
                </button>
                <button 
                  onClick={shareHandlers.twitter}
                  className="w-10 h-10 rounded-lg bg-[#000] text-white flex items-center justify-center hover:opacity-80 transition-all font-bold text-lg"
                  title="Share on X"
                >
                  𝕏
                </button>
                <button 
                  onClick={shareHandlers.linkedin}
                  className="w-10 h-10 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-80 transition-all font-bold text-sm"
                  title="Share on LinkedIn"
                >
                  in
                </button>
                <button 
                  onClick={shareHandlers.email}
                  className="w-10 h-10 rounded-lg bg-[#EA4335] text-white flex items-center justify-center hover:opacity-80 transition-all"
                  title="Share via Email"
                >
                  ✉
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-[#e5e0d8] p-8 md:p-12 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* PERSONAL INFORMATION */}
              <div>
                <h3 className="text-xl font-serif text-[#0B0B0B] mb-6 pb-4 border-b border-[#e5e0d8]">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider mb-2">
                      First Name *
                    </label>
                    <input 
                      type="text" 
                      name="firstName" 
                      value={formData.firstName} 
                      onChange={handleChange}
                      placeholder="Jane"
                      className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${errors.firstName ? "border-red-500" : "border-[#e5e0d8] focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20"}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider mb-2">
                      Last Name *
                    </label>
                    <input 
                      type="text" 
                      name="lastName" 
                      value={formData.lastName} 
                      onChange={handleChange}
                      placeholder="Doe"
                      className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${errors.lastName ? "border-red-500" : "border-[#e5e0d8] focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20"}`}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>
              </div>

              {/* CONTACT INFORMATION */}
              <div>
                <h3 className="text-xl font-serif text-[#0B0B0B] mb-6 pb-4 border-b border-[#e5e0d8]">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${errors.email ? "border-red-500" : "border-[#e5e0d8] focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20"}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange}
                      placeholder="+91 (555) 000-0000"
                      className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${errors.phone ? "border-red-500" : "border-[#e5e0d8] focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20"}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* PROPERTY INFORMATION */}
              <div>
                <h3 className="text-xl font-serif text-[#0B0B0B] mb-6 pb-4 border-b border-[#e5e0d8]">
                  Property Information
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider mb-2">
                      Property Address *
                    </label>
                    <input 
                      type="text" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange}
                      placeholder="Street address or location"
                      className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${errors.address ? "border-red-500" : "border-[#e5e0d8] focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20"}`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider mb-2">
                        City
                      </label>
                      <input 
                        type="text" 
                        name="city" 
                        value={formData.city} 
                        onChange={handleChange}
                        placeholder="Jaipur"
                        className="w-full px-4 py-3 border border-[#e5e0d8] rounded-lg outline-none focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider mb-2">
                        Area / Dimensions
                      </label>
                      <input 
                        type="text" 
                        name="area" 
                        value={formData.area} 
                        onChange={handleChange}
                        placeholder="e.g. 200 sq yd"
                        className="w-full px-4 py-3 border border-[#e5e0d8] rounded-lg outline-none focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider mb-2">
                      Property Type *
                    </label>
                    <select 
                      name="propertyType" 
                      value={formData.propertyType} 
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg outline-none transition-all bg-white text-[#0B0B0B] ${errors.propertyType ? "border-red-500" : "border-[#e5e0d8] focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20"}`}
                    >
                      <option value="">Select Property Type</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Farm Land">Farm Land</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                    {errors.propertyType && <p className="text-red-500 text-xs mt-1">{errors.propertyType}</p>}
                  </div>
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <h3 className="text-xl font-serif text-[#0B0B0B] mb-6 pb-4 border-b border-[#e5e0d8]">
                  Additional Details
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell us more about your property (condition, maintenance, unique features, etc.)"
                    className="w-full px-4 py-3 border border-[#e5e0d8] rounded-lg outline-none focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20 transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-6 border-t border-[#e5e0d8]">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#C8A96A] text-white px-10 py-4 rounded-lg font-semibold text-lg tracking-wide hover:bg-[#b0945b] transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Request Analysis"}
                </button>
                <p className="text-center text-xs text-[#6B6B6B] mt-4 uppercase tracking-wider">
                  We will respond within 24-48 hours
                </p>
              </div>

            </form>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-20 px-4 md:px-8 bg-[#f8f6f2]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-[#e5e0d8] p-10 md:p-14 text-center">
            <h3 className="text-2xl font-serif text-[#0B0B0B] mb-4">Why Our CMA?</h3>
            <p className="text-[#6B6B6B] mb-10 leading-relaxed max-w-2xl mx-auto">
              Our team combines local expertise, current market data, and comparative analysis to deliver accurate valuations you can trust.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-4xl font-serif text-[#C8A96A] mb-2">500+</p>
                <p className="text-sm text-[#6B6B6B] uppercase tracking-wider">CMAs Completed</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-serif text-[#C8A96A] mb-2">15+</p>
                <p className="text-sm text-[#6B6B6B] uppercase tracking-wider">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-serif text-[#C8A96A] mb-2">98%</p>
                <p className="text-sm text-[#6B6B6B] uppercase tracking-wider">Accuracy Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CMARequestPage;
