import React from 'react';

const Projects = () => {
  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Premium Projects</h1>
        <p className="text-gray-600 mb-12 text-lg max-w-2xl">
          Discover exclusive developments tailored for luxury living, inspired by properties like Ecolandmark and Campion Real Estate.
        </p>

        {/* Project List */}
        <div className="space-y-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 h-[400px]">
              <img src="/assets/images/project-banner1.jpg" alt="Project Banner" className="w-full h-full object-cover" />
            </div>
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <span className="text-yellow-600 text-sm font-bold uppercase tracking-wider mb-2">New Launch</span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ecolandmark Heights</h2>
              <p className="text-gray-600 mb-6 line-clamp-3">
                Experience unparalleled luxury and breathtaking views. Located in the heart of the city, this project offers state-of-the-art amenities and world-class design.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div>
                  <span className="block text-gray-500">Typology</span>
                  <span className="font-semibold text-gray-900">3 & 4 BHK Apartments</span>
                </div>
                <div>
                  <span className="block text-gray-500">Possession</span>
                  <span className="font-semibold text-gray-900">Dec 2026</span>
                </div>
                <div>
                  <span className="block text-gray-500">Location</span>
                  <span className="font-semibold text-gray-900">Downtown Boulevard</span>
                </div>
                <div>
                  <span className="block text-gray-500">Starting Price</span>
                  <span className="font-semibold text-blue-900">₹ 2.5 Cr</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition">
                  Download Brochure
                </button>
                <button className="border border-blue-900 text-blue-900 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;