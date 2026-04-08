import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Shield, Users, Home, Zap, Award, MapPin, Upload, X } from 'lucide-react';

const PlotResalePage = () => {
  const navigate = useNavigate();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    propertyType: 'Residential',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          src: event.target.result,
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, images: uploadedImages });
    alert('Thank you! Your property submission has been received.');
    setFormData({ firstName: '', lastName: '', email: '', phone: '', address: '', propertyType: 'Residential', message: '' });
    setUploadedImages([]);
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="pt-[140px] pb-20 px-4 md:px-8 bg-gradient-to-b from-[#f8f6f2] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl md:text-6xl font-serif text-[#0B0B0B] mb-6 leading-tight">
                Sell Your Property with <span className="text-[#C8A96A]">Confidence</span>
              </h1>
              <p className="text-lg text-[#6B6B6B] mb-10 leading-relaxed max-w-lg">
                Get accurate market valuations, strategic marketing, and verified buyer connections. Maximize your property's value with expert guidance.
              </p>
              <button 
                onClick={() => navigate('/services/plot-resale/request-cma')}
                className="bg-[#C8A96A] text-white px-10 py-4 rounded-lg font-semibold tracking-wide hover:bg-[#b0945b] transition-all shadow-lg hover:shadow-xl"
              >
                Request Valuation
              </button>
            </div>
            
            {/* Right Image */}
            <div className="bg-gradient-to-br from-[#C8A96A]/20 to-[#C8A96A]/5 rounded-2xl h-[400px] md:h-[500px] flex items-center justify-center border border-[#C8A96A]/30">
              <div className="text-center">
                <Home className="w-24 h-24 mx-auto text-[#C8A96A]/40 mb-4" />
                <p className="text-[#999] text-sm">Premium Property Image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK BENEFITS STRIP */}
      <section className="py-16 px-4 md:px-8 bg-[#0B0B0B] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#C8A96A]/20 flex items-center justify-center flex-shrink-0">
                <Check className="text-[#C8A96A]" size={24} />
              </div>
              <div>
                <p className="font-semibold text-white">Best Market Price</p>
                <p className="text-sm text-gray-400 mt-1">Data-driven valuations</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#C8A96A]/20 flex items-center justify-center flex-shrink-0">
                <Users className="text-[#C8A96A]" size={24} />
              </div>
              <div>
                <p className="font-semibold text-white">Verified Buyers</p>
                <p className="text-sm text-gray-400 mt-1">Large buyer network</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#C8A96A]/20 flex items-center justify-center flex-shrink-0">
                <Zap className="text-[#C8A96A]" size={24} />
              </div>
              <div>
                <p className="font-semibold text-white">Quick Closing</p>
                <p className="text-sm text-gray-400 mt-1">Fast & smooth process</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROVEN TRACK RECORD */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Image */}
            <div className="bg-gradient-to-br from-[#C8A96A]/20 to-[#C8A96A]/5 rounded-2xl h-[400px] flex items-center justify-center border border-[#C8A96A]/30 order-2 md:order-1">
              <div className="text-center">
                <Award className="w-24 h-24 mx-auto text-[#C8A96A]/40 mb-4" />
                <p className="text-[#999] text-sm">Proven Results Image</p>
              </div>
            </div>
            
            {/* Right Content */}
            <div className="order-1 md:order-2">
              <span className="text-[#C8A96A] font-semibold tracking-widest uppercase text-xs mb-3 block">Proven Track Record</span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#0B0B0B] mb-6 leading-tight">
                Trusted by Hundreds of Sellers
              </h2>
              <p className="text-lg text-[#6B6B6B] mb-10 leading-relaxed">
                With years of expertise and successful transactions, we've built a reputation for delivering exceptional results. Our team consistently achieves above-market valuations and faster sales timelines.
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-10 py-8 border-y border-[#e5e0d8]">
                <div>
                  <p className="text-4xl font-serif text-[#C8A96A] mb-2">15+</p>
                  <p className="text-sm text-[#6B6B6B] uppercase tracking-wider">Years Experience</p>
                </div>
                <div>
                  <p className="text-4xl font-serif text-[#C8A96A] mb-2">500+</p>
                  <p className="text-sm text-[#6B6B6B] uppercase tracking-wider">Properties Sold</p>
                </div>
                <div>
                  <p className="text-4xl font-serif text-[#C8A96A] mb-2">98%</p>
                  <p className="text-sm text-[#6B6B6B] uppercase tracking-wider">Client Satisfaction</p>
                </div>
              </div>

              <button 
                onClick={() => navigate('/services/plot-resale/request-cma')}
                className="bg-[#C8A96A] text-white px-10 py-4 rounded-lg font-semibold tracking-wide hover:bg-[#b0945b] transition-all"
              >
                Request Comparative Market Analysis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US CARDS */}
      <section className="py-20 px-4 md:px-8 bg-[#f8f6f2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C8A96A] font-semibold tracking-widest uppercase text-xs mb-3 block">Our Advantages</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#0B0B0B] mb-6">Why Choose Us</h2>
            <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
              We combine expert market knowledge with modern technology to deliver superior results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: MapPin, title: 'Expert Local Knowledge', desc: 'Deep understanding of regional markets' },
              { icon: Award, title: 'Premium Marketing', desc: 'Strategic promotion to qualified buyers' },
              { icon: Zap, title: 'Fast Valuation', desc: 'Accurate analysis within 24 hours' },
              { icon: Shield, title: 'Trusted Network', desc: 'Verified buyers & secure transactions' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-8 border border-[#e5e0d8] hover:shadow-xl hover:border-[#C8A96A] transition-all group">
                <div className="w-14 h-14 rounded-lg bg-[#C8A96A]/10 flex items-center justify-center mb-6 group-hover:bg-[#C8A96A] transition-all">
                  <item.icon className="text-[#C8A96A] group-hover:text-white transition-all" size={28} />
                </div>
                <h3 className="text-xl font-serif text-[#0B0B0B] mb-3">{item.title}</h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROPERTY SUBMISSION FORM */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#C8A96A] font-semibold tracking-widest uppercase text-xs mb-3 block">Get Started</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#0B0B0B] mb-4">Submit Your Property</h2>
            <p className="text-lg text-[#6B6B6B]">
              Provide your property details to get started with a free valuation.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#e5e0d8] p-10 shadow-sm">
            <form onSubmit={handleFormSubmit} className="space-y-8">
              
              {/* Personal Info */}
              <div>
                <h3 className="text-lg font-serif text-[#0B0B0B] mb-6 pb-4 border-b border-[#e5e0d8]">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    name="firstName"
                    placeholder="First Name *"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20 transition-all"
                  />
                  <input 
                    type="text" 
                    name="lastName"
                    placeholder="Last Name *"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20 transition-all"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-serif text-[#0B0B0B] mb-6 pb-4 border-b border-[#e5e0d8]">Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20 transition-all"
                  />
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20 transition-all"
                  />
                </div>
              </div>

              {/* Property Details */}
              <div>
                <h3 className="text-lg font-serif text-[#0B0B0B] mb-6 pb-4 border-b border-[#e5e0d8]">Property Details</h3>
                <div className="space-y-6">
                  <input 
                    type="text" 
                    name="address"
                    placeholder="Property Address *"
                    value={formData.address}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20 transition-all"
                  />
                  <select 
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20 transition-all bg-white text-[#0B0B0B]"
                  >
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Farm Land</option>
                    <option>Industrial</option>
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <h3 className="text-lg font-serif text-[#0B0B0B] mb-6 pb-4 border-b border-[#e5e0d8]">Property Images</h3>
                <div className="border-2 border-dashed border-[#C8A96A]/30 rounded-lg p-8 text-center bg-[#C8A96A]/5 hover:border-[#C8A96A] transition-all cursor-pointer relative">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-10 h-10 text-[#C8A96A] mx-auto mb-3" />
                  <p className="text-[#0B0B0B] font-semibold mb-1">Drag and drop images here</p>
                  <p className="text-sm text-[#6B6B6B]">or click to select multiple files</p>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-[#0B0B0B] mb-4">Preview ({uploadedImages.length} images)</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {uploadedImages.map(img => (
                        <div key={img.id} className="relative group">
                          <img src={img.src} alt="preview" className="w-full h-32 object-cover rounded-lg border border-[#e5e0d8]" />
                          <button 
                            type="button"
                            onClick={() => removeImage(img.id)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-semibold text-[#0B0B0B] mb-2 block">Additional Information</label>
                <textarea 
                  name="message"
                  placeholder="Tell us more about your property..."
                  value={formData.message}
                  onChange={handleFormChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-[#e5e0d8] rounded-lg focus:outline-none focus:border-[#C8A96A] focus:ring-2 focus:ring-[#C8A96A]/20 transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#C8A96A] text-white px-10 py-4 rounded-lg font-semibold text-lg tracking-wide hover:bg-[#b0945b] transition-all shadow-lg hover:shadow-xl"
              >
                Submit Property
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-20 px-4 md:px-8 bg-[#0B0B0B] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Ready to Sell Your Property?</h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Take the next step with a free market valuation from our expert team.
          </p>
          <button 
            onClick={() => navigate('/services/plot-resale/request-cma')}
            className="bg-[#C8A96A] text-white px-12 py-4 rounded-lg font-semibold text-lg tracking-wide hover:bg-[#b0945b] transition-all shadow-lg hover:shadow-xl"
          >
            Get Started Now
          </button>
        </div>
      </section>

    </div>
  );
};

export default PlotResalePage;
