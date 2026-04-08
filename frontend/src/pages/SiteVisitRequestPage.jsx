import React, { useState, useEffect } from 'react';
import { CheckCircle2, Calendar, Clock, MapPin, Users, MessageSquare } from 'lucide-react';
import RecommendedSearches from '../components/RecommendedSearches';

const SiteVisitRequestPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    propertyInterest: '',
    numberOfVisitors: '1',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required';
    if (!formData.preferredTime) newErrors.preferredTime = 'Preferred time is required';
    if (!formData.propertyInterest.trim()) newErrors.propertyInterest = 'Property selection is required';

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
      fullName: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      propertyInterest: '',
      numberOfVisitors: '1',
      message: '',
    });
    setErrors({});
    setIsSuccess(false);
  };

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM',
    '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  const properties = [
    'Lakeside Residences',
    'Green Valley Tower',
    'Urban Horizon',
    'Riverside Villas',
    'Tech Hub 2026',
    'Smart Living Phase 2',
    'Eco Reserve',
    'Metropolitan Plaza',
  ];

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
            <h2 className="text-4xl font-serif font-bold text-[#0B0B0B] mb-4">Request Received!</h2>
            <p className="text-lg text-[#6B6B6B] mb-2">
              Thank you for scheduling a site visit with us.
            </p>
            <p className="text-[#6B6B6B] mb-8">
              We've sent a confirmation email to <span className="font-medium text-[#0B0B0B]">{formData.email}</span>. Our team will contact you shortly to confirm your visit.
            </p>

            <div className="bg-[#F5F1EB] border border-[#E8E1D9] rounded-lg p-8 mb-8 text-left">
              <h3 className="font-serif text-xl text-[#0B0B0B] mb-6">Visit Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b border-[#E8E1D9]">
                  <span className="text-[#6B6B6B]">Name:</span>
                  <span className="font-medium text-[#0B0B0B]">{formData.fullName}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-[#E8E1D9]">
                  <span className="text-[#6B6B6B]">Email:</span>
                  <span className="font-medium text-[#0B0B0B]">{formData.email}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-[#E8E1D9]">
                  <span className="text-[#6B6B6B]">Phone:</span>
                  <span className="font-medium text-[#0B0B0B]">{formData.phone}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-[#E8E1D9]">
                  <span className="text-[#6B6B6B]">Property:</span>
                  <span className="font-medium text-[#0B0B0B]">{formData.propertyInterest}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-[#E8E1D9]">
                  <span className="text-[#6B6B6B]">Date & Time:</span>
                  <span className="font-medium text-[#0B0B0B]">{formData.preferredDate} at {formData.preferredTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Visitors:</span>
                  <span className="font-medium text-[#0B0B0B]">{formData.numberOfVisitors} {formData.numberOfVisitors === '1' ? 'person' : 'people'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="inline-block px-8 py-3 bg-[#C8A96A] text-white font-medium uppercase tracking-wider rounded-lg hover:bg-[#B8955A] transition-all duration-300"
            >
              Schedule Another Visit
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
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#0B0B0B] mb-6 leading-tight">
              Schedule a Site Visit
            </h1>
            <p className="text-xl text-[#6B6B6B] mb-8 font-light">
              Book your personalized tour of our premium properties. Our agents will guide you through every detail of your dream home.
            </p>
            <div className="flex gap-6 flex-wrap">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#C8A96A]" />
                <span className="text-[#6B6B6B]">Multiple Locations</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#C8A96A]" />
                <span className="text-[#6B6B6B]">Flexible Timings</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
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
            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('fullName')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-0 py-3 border-b-2 bg-transparent text-[#0B0B0B] placeholder-[#BFBFBF] focus:outline-none transition-all ${
                    errors.fullName
                      ? 'border-red-500 focus:border-red-500'
                      : focusedField === 'fullName'
                      ? 'border-[#C8A96A]'
                      : 'border-[#E8E1D9]'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-2">{errors.fullName}</p>}
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
            </div>

            {/* Row 2: Phone and Number of Visitors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

              {/* Number of Visitors */}
              <div>
                <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">
                  <Users className="inline w-4 h-4 mr-2" />
                  Number of Visitors
                </label>
                <select
                  name="numberOfVisitors"
                  value={formData.numberOfVisitors}
                  onChange={handleChange}
                  className="w-full px-0 py-3 border-b-2 bg-transparent text-[#0B0B0B] focus:outline-none border-[#E8E1D9] focus:border-[#C8A96A] transition-all appearance-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num} className="bg-white text-[#0B0B0B]">
                      {num} {num === 1 ? 'Person' : 'People'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Property Interest */}
            <div>
              <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">
                <MapPin className="inline w-4 h-4 mr-2" />
                Property Interested In *
              </label>
              <select
                name="propertyInterest"
                value={formData.propertyInterest}
                onChange={handleChange}
                className={`w-full px-0 py-3 border-b-2 bg-transparent text-[#0B0B0B] focus:outline-none transition-all appearance-none cursor-pointer ${
                  errors.propertyInterest
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-[#E8E1D9] focus:border-[#C8A96A]'
                }`}
              >
                <option value="" className="bg-white text-[#BFBFBF]">
                  Select a property...
                </option>
                {properties.map((prop) => (
                  <option key={prop} value={prop} className="bg-white text-[#0B0B0B]">
                    {prop}
                  </option>
                ))}
              </select>
              {errors.propertyInterest && <p className="text-red-500 text-sm mt-2">{errors.propertyInterest}</p>}
            </div>

            {/* Row 4: Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className={`w-full px-0 py-3 border-b-2 bg-transparent text-[#0B0B0B] focus:outline-none transition-all ${
                    errors.preferredDate
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[#E8E1D9] focus:border-[#C8A96A]'
                  }`}
                />
                {errors.preferredDate && <p className="text-red-500 text-sm mt-2">{errors.preferredDate}</p>}
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">
                  <Clock className="inline w-4 h-4 mr-2" />
                  Preferred Time *
                </label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className={`w-full px-0 py-3 border-b-2 bg-transparent text-[#0B0B0B] focus:outline-none transition-all appearance-none cursor-pointer ${
                    errors.preferredTime
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[#E8E1D9] focus:border-[#C8A96A]'
                  }`}
                >
                  <option value="" className="bg-white text-[#BFBFBF]">
                    Select time...
                  </option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time} className="bg-white text-[#0B0B0B]">
                      {time}
                    </option>
                  ))}
                </select>
                {errors.preferredTime && <p className="text-red-500 text-sm mt-2">{errors.preferredTime}</p>}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">
                <MessageSquare className="inline w-4 h-4 mr-2" />
                Additional Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 border-2 bg-white text-[#0B0B0B] placeholder-[#BFBFBF] focus:outline-none transition-all rounded-lg resize-none ${
                  focusedField === 'message'
                    ? 'border-[#C8A96A]'
                    : 'border-[#E8E1D9]'
                }`}
                placeholder="Tell us about your preferences or any special requests..."
                rows="5"
              />
              <p className="text-sm text-[#6B6B6B] mt-2">{formData.message.length}/500 characters</p>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#C8A96A] text-white font-medium uppercase tracking-widest rounded-lg hover:bg-[#B8955A] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {isSubmitting ? 'Scheduling Visit...' : 'Schedule Site Visit'}
              </button>
              <p className="text-center text-[#6B6B6B] text-sm mt-4">
                * Required fields. We respect your privacy.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-12 bg-[#F5F1EB]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Calendar className="w-12 h-12 text-[#C8A96A] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#0B0B0B] mb-2">Flexible Scheduling</h3>
              <p className="text-[#6B6B6B]">Choose your preferred date and time that works best for you.</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-[#C8A96A] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#0B0B0B] mb-2">Personal Service</h3>
              <p className="text-[#6B6B6B]">Our agents provide personalized guidance for every visit.</p>
            </div>
            <div className="text-center">
              <MapPin className="w-12 h-12 text-[#C8A96A] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#0B0B0B] mb-2">Prime Locations</h3>
              <p className="text-[#6B6B6B]">Visit our properties in the most sought-after areas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Searches */}
      <RecommendedSearches />
    </div>
  );
};

export default SiteVisitRequestPage;
