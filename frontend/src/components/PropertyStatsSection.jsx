import React from 'react'

const PropertyStatsSection = () => {
  const stats = [
    {
      number: '#1',
      label: 'OFFICE',
      description: "Campion and Company's Rank for Boston Luxury Market Share"
    },
    {
      number: '#1',
      label: 'AGENT',
      description: "Tracy Campion's Sales Rank among All Agents in Boston"
    },
    {
      number: '$9',
      label: 'BILLION',
      description: 'Amount of Real Estate Sold by Campion and Company'
    },
    {
      number: '2200+',
      label: 'RESIDENCES',
      description: 'New Development Units Exclusively Marketed by Campion and Company'
    },
    {
      number: '19',
      label: 'YEARS',
      description: 'Campion and Company is Celebrating Nineteen Years of Excellence as Boston\'s Premier Luxury Agency'
    }
  ]

  return (
    <section className="w-full relative">
      {/* Background Image with Overlay */}
      <div
        className="relative py-20 md:py-28 min-h-screen"
        style={{
          backgroundImage: `url('/assets/bg 2.jpg')`,
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
        }}
      >
        {/* Dark Overlay */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-50" /> */}
        
        {/* Decorative Corner */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-yellow-400 z-10" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-yellow-400 z-10" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-yellow-400 z-10" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-yellow-400 z-10" />
        
        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Company Logo & Name */}
          <div className="text-center mb-8">
            <p className="text-yellow-400 text-lg font-semibold tracking-wider mb-2">
              🏛 CAMPION
            </p>
            <p className="text-yellow-400/80 text-sm tracking-wider">
              AND COMPANY
            </p>
          </div>

          {/* Main Title */}
          <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16 tracking-wider">
            BOSTON'S TOP OFFICE
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center text-white transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-5xl md:text-6xl lg:text-5xl font-bold mb-3 text-yellow-400">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm font-semibold tracking-widest mb-3 uppercase text-yellow-300">
                  {stat.label}
                </div>
                <p className="text-xs md:text-sm leading-relaxed text-gray-200 line-clamp-4">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertyStatsSection
