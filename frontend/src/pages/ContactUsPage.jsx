import React, { useState, useEffect } from 'react';
import { CheckCircle2, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import RecommendedSearches from '../components/RecommendedSearches';
import { useLocation } from 'react-router-dom';

const ContactUsPage = () => {
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    selectAgent: '',
    message: '',
    optIn: false,
  });

  const [selectedOffice, setSelectedOffice] = useState('mumbai');

  const officeData = {
    mumbai: {
      office: 'Mumbai Headquarters',
      phone: '+91 98765 43210',
      email: 'contact@vikashrealestate.com',
      address: 'Bandra, Mumbai 400050, India',
      hours: 'Mon - Fri: 10 AM - 6 PM',
    },
    delhi: {
      office: 'Delhi Branch',
      phone: '+91 97654 32109',
      email: 'delhi@vikashrealestate.com',
      address: 'Connaught Place, New Delhi 110001, India',
      hours: 'Mon - Fri: 10 AM - 6 PM',
    },
    bangalore: {
      office: 'Bangalore Office',
      phone: '+91 96543 21098',
      email: 'bangalore@vikashrealestate.com',
      address: 'Whitefield, Bangalore 560066, India',
      hours: 'Mon - Fri: 10 AM - 6 PM',
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Prefill message from query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (!type) return;

    const investmentMsg = 'I would like consultation regarding real estate investment opportunities.';
    const legalMsg = 'I need legal assistance regarding property documentation.';

    setFormData((prev) => {
      if (prev.message && prev.message.trim().length > 0) return prev;
      if (type === 'investment') return { ...prev, message: investmentMsg };
      if (type === 'legal') return { ...prev, message: legalMsg };
      return prev;
    });
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo(0, 0);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      selectAgent: '',
      message: '',
      optIn: false,
    });
    setErrors({});
    setIsSuccess(false);
  };

  const agents = [
    'Any Available Agent',
    'Rajesh Kumar',
    'Priya Sharma',
    'Amit Verma',
    'Neha Singh',
    'Ahmed Hassan',
  ];

  const currentOffice = officeData[selectedOffice];

  if (isSuccess) {
    return (
      <div className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-b from-white to-[#F5F1EB]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#C8A96A]/20 blur-xl rounded-full"></div>
                <CheckCircle2 className="w-20 h-20 text-[#C8A96A] relative" />
              </div>
            </div>
            <h2 className="text-4xl font-serif font-bold text-[#0B0B0B] mb-4">Thank You!</h2>
            <p className="text-lg text-[#6B6B6B] mb-2">
              Your message has been received successfully.
            </p>
            <p className="text-[#6B6B6B] mb-8">
              Our team will get back to you within 24 hours at <span className="font-medium text-[#0B0B0B]">{formData.email}</span>
            </p>

            <div className="bg-white border border-[#E8E1D9] rounded-lg p-8 mb-8 shadow-sm">
              <p className="text-[#6B6B6B] mb-4">In the meantime, feel free to:</p>
              <div className="space-y-3 text-left">
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#C8A96A]" />
                  <span className="text-[#6B6B6B]">Call us directly at <span className="font-medium text-[#0B0B0B]">{currentOffice.phone}</span></span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#C8A96A]" />
                  <span className="text-[#6B6B6B]">Email us at <span className="font-medium text-[#0B0B0B]">{currentOffice.email}</span></span>
                </p>
                <p className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#C8A96A]" />
                  <span className="text-[#6B6B6B]">Visit us at <span className="font-medium text-[#0B0B0B]">{currentOffice.address}</span></span>
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="inline-block px-8 py-3 bg-[#C8A96A] text-white font-medium uppercase tracking-wider rounded-lg hover:bg-[#B8955A] transition-all duration-300"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 bg-gradient-to-b from-[#F5F1EB] to-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#0B0B0B] mb-6 leading-tight">
            Get in Touch
          </h1>
          <p className="text-xl text-[#6B6B6B] font-light">
            Have questions about our properties or services? We're here to help. Reach out to our team and we'll respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Side - Form */}
            <div className="lg:col-span-2">
              {/* Error Summary */}
              {Object.keys(errors).length > 0 && (
                <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-medium mb-3">Please correct the following errors:</p>
                  <ul className="list-disc list-inside space-y-1 text-red-600">
                    {Object.values(errors).map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#0B0B0B] mb-2">Contact Information</h2>
                  <p className="text-[#6B6B6B] mb-6">Fill out the form below and we'll be in touch shortly.</p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-0 py-3 border-b-2 bg-transparent text-[#0B0B0B] placeholder-[#BFBFBF] focus:outline-none transition-all ${
                      errors.name
                        ? 'border-red-500 focus:border-red-500'
                        : focusedField === 'name'
                        ? 'border-[#C8A96A]'
                        : 'border-[#E8E1D9]'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-0 py-3 border-b-2 bg-transparent text-[#0B0B0B] placeholder-[#BFBFBF] focus:outline-none transition-all ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : focusedField === 'email'
                        ? 'border-[#C8A96A]'
                        : 'border-[#E8E1D9]'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-0 py-3 border-b-2 bg-transparent text-[#0B0B0B] placeholder-[#BFBFBF] focus:outline-none transition-all ${
                      errors.phone
                        ? 'border-red-500 focus:border-red-500'
                        : focusedField === 'phone'
                        ? 'border-[#C8A96A]'
                        : 'border-[#E8E1D9]'
                    }`}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
                </div>

                {/* Select Agent */}
                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">
                    Select Agent (Optional)
                  </label>
                  <select
                    name="selectAgent"
                    value={formData.selectAgent}
                    onChange={handleChange}
                    className="w-full px-0 py-3 border-b-2 bg-transparent text-[#0B0B0B] focus:outline-none border-[#E8E1D9] focus:border-[#C8A96A] transition-all appearance-none cursor-pointer"
                  >
                    {agents.map((agent) => (
                      <option key={agent} value={agent} className="bg-white text-[#0B0B0B]">
                        {agent}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 border-2 bg-white text-[#0B0B0B] placeholder-[#BFBFBF] focus:outline-none transition-all rounded-lg resize-none ${
                      errors.message
                        ? 'border-red-500 focus:border-red-500'
                        : focusedField === 'message'
                        ? 'border-[#C8A96A]'
                        : 'border-[#E8E1D9]'
                    }`}
                    placeholder="Tell us how we can help you..."
                    rows="6"
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
                  <p className="text-sm text-[#6B6B6B] mt-2">{formData.message.length}/1000 characters</p>
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="optIn"
                    id="optIn"
                    checked={formData.optIn}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 accent-[#C8A96A] cursor-pointer rounded"
                  />
                  <label htmlFor="optIn" className="text-[#6B6B6B] text-sm cursor-pointer">
                    I'd like to receive updates about new properties and exclusive offers
                  </label>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#C8A96A] text-white font-medium uppercase tracking-widest rounded-lg hover:bg-[#B8955A] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </button>
                  <p className="text-center text-[#6B6B6B] text-sm mt-4">
                    * Required fields. We respect your privacy.
                  </p>
                </div>
              </form>
            </div>

            {/* Right Side - Office Information */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#0B0B0B] mb-8">Our Offices</h2>

              {/* Office Selector */}
              <div className="space-y-3 mb-8">
                {Object.entries(officeData).map(([key, office]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedOffice(key)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedOffice === key
                        ? 'border-[#C8A96A] bg-[#F5F1EB]'
                        : 'border-[#E8E1D9] hover:border-[#C8A96A] bg-white'
                    }`}
                  >
                    <p className="font-medium text-[#0B0B0B]">{office.office}</p>
                  </button>
                ))}
              </div>

              {/* Selected Office Info Card */}
              <div className="bg-[#F5F1EB] border border-[#E8E1D9] rounded-lg p-6 sticky top-32">
                <h3 className="font-serif text-xl font-bold text-[#0B0B0B] mb-6">
                  {currentOffice.office}
                </h3>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-[#C8A96A] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-[#6B6B6B] text-sm mb-1">Phone</p>
                      <a
                        href={`tel:${currentOffice.phone}`}
                        className="text-[#0B0B0B] font-medium hover:text-[#C8A96A] transition-colors"
                      >
                        {currentOffice.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-[#C8A96A] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-[#6B6B6B] text-sm mb-1">Email</p>
                      <a
                        href={`mailto:${currentOffice.email}`}
                        className="text-[#0B0B0B] font-medium hover:text-[#C8A96A] transition-colors break-all"
                      >
                        {currentOffice.email}
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-[#C8A96A] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-[#6B6B6B] text-sm mb-1">Address</p>
                      <p className="text-[#0B0B0B] font-medium">{currentOffice.address}</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-[#C8A96A] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-[#6B6B6B] text-sm mb-1">Business Hours</p>
                      <p className="text-[#0B0B0B] font-medium">{currentOffice.hours}</p>
                      <p className="text-[#6B6B6B] text-sm mt-1">Sat & Sun: Closed</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-[#E8E1D9]">
                  <p className="text-[#6B6B6B] text-sm mb-4">Follow Us</p>
                  <div className="flex gap-3">
                    <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#0B0B0B] hover:bg-[#C8A96A] hover:text-white transition-all">
                      <FaFacebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#0B0B0B] hover:bg-[#C8A96A] hover:text-white transition-all">
                      <FaTwitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#0B0B0B] hover:bg-[#C8A96A] hover:text-white transition-all">
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Searches */}
      <RecommendedSearches />
    </div>
  );
};

export default ContactUsPage;
