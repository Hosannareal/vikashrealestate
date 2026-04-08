import React, { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Navigation from './Navigation'
import SearchBarNew from './SearchBarNew'

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlay, images.length])

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
    // Resume auto-play after 3 seconds of inactivity
    const timeout = setTimeout(() => setIsAutoPlay(true), 3000)
    return () => clearTimeout(timeout)
  }

  const goToPrevious = () => {
    goToSlide((currentIndex - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    goToSlide((currentIndex + 1) % images.length)
  }

  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Navigation */}
      <Navigation />

      {/* Carousel Images */}
      <div className="relative w-full h-screen">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="carousel-image"
            />
            <div className="hero-overlay" />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 text-white p-2 lg:p-3 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={24} />
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 text-white p-2 lg:p-3 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <FaChevronRight size={24} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Hero Content Container - Text & Search Bar */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        {/* Main Title */}
        <div className="text-center text-white mb-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
            Search Luxury Real Estate
          </h1>
          <p className="text-lg md:text-xl drop-shadow-md text-gray-100">
            Find Better Places to Live, Work and Wonder...
          </p>
        </div>

        {/* Search Bar */}
        {/* <div className="w-full relative top-36 max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <SearchBarNew inHero={true} />
        </div> */}
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-20" /> 
    </div>
  )
}

export default Carousel
