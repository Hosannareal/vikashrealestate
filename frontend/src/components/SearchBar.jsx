import React, { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

const SearchBar = ({ isExpanded = false, mode = 'hero' }) => {
  const [filters, setFilters] = useState({
    propertyType: 'all',
    location: '',
    budgetMin: 0,
    budgetMax: 100,
    bedrooms: 'any',
    constructionStatus: {
      readyToMove: false,
      underConstruction: false,
      newLaunch: false,
    },
    postedBy: 'anyone',
  })

  const [activeAccordion, setActiveAccordion] = useState(null)

  const handleLocationChange = (e) => {
    setFilters({ ...filters, location: e.target.value })
  }

  const handlePropertyTypeChange = (e) => {
    setFilters({ ...filters, propertyType: e.target.value })
  }

  const handleBudgetChange = (type, value) => {
    setFilters({
      ...filters,
      [type]: parseInt(value),
    })
  }

  const handleBedroomChange = (e) => {
    setFilters({ ...filters, bedrooms: e.target.value })
  }

  const handleConstructionStatusChange = (status) => {
    setFilters({
      ...filters,
      constructionStatus: {
        ...filters.constructionStatus,
        [status]: !filters.constructionStatus[status],
      },
    })
  }

  const handlePostedByChange = (e) => {
    setFilters({ ...filters, postedBy: e.target.value })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Search filters:', filters)
    // Ready for API integration - just add fetch call here
  }

  const handleClear = () => {
    setFilters({
      propertyType: 'all',
      location: '',
      budgetMin: 0,
      budgetMax: 100,
      bedrooms: 'any',
      constructionStatus: {
        readyToMove: false,
        underConstruction: false,
        newLaunch: false,
      },
      postedBy: 'anyone',
    })
  }

  const toggleAccordion = (accordionId) => {
    setActiveAccordion(activeAccordion === accordionId ? null : accordionId)
  }

  // COMPACT MODE - For Hero Section
  if (mode === 'hero' && !isExpanded) {
    return (
      <form
        onSubmit={handleSearch}
        className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-4 md:p-6"
      >
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-end">
          {/* Property Type Selector - Left Side */}
          <div className="md:w-48">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Property Type
            </label>
            <select
              value={filters.propertyType}
              onChange={handlePropertyTypeChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white text-sm"
            >
              <option value="all">All Residential</option>
              <option value="apartment">Flat/Apartment</option>
              <option value="house">Independent House/Villa</option>
              <option value="land">Residential Land</option>
              <option value="builder">Builder Floor</option>
            </select>
          </div>

          {/* Search Input - Center */}
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Search Location
            </label>
            <input
              type="text"
              placeholder="City, Address, Zip, Neighborhood..."
              value={filters.location}
              onChange={handleLocationChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
            />
          </div>

          {/* Search Button - Right */}
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 whitespace-nowrap"
          >
            Search
          </button>
        </div>
      </form>
    )
  }

  // EXPANDED MODE - For Property Stats Section
  return (
    <form
      onSubmit={handleSearch}
      className="w-full bg-white rounded-lg shadow-lg p-6 md:p-8"
    >
      {/* Search Input and Button Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Location
          </label>
          <input
            type="text"
            placeholder="City, Address, Zip, Neighborhood, MLS Number, High School..."
            value={filters.location}
            onChange={handleLocationChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Search
          </button>
        </div>
      </div>

      {/* Accordions */}
      <div className="space-y-3 border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-gray-800">Advanced Filters</h3>
          <button
            type="button"
            onClick={handleClear}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear Filters
          </button>
        </div>

        {/* Accordion: Budget */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => toggleAccordion('budget')}
            className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition"
          >
            <span className="font-semibold text-gray-800 text-sm">Budget Range</span>
            <FiChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform ${
                activeAccordion === 'budget' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {activeAccordion === 'budget' && (
            <div className="px-4 py-4 bg-white space-y-4 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-700">Min Budget</label>
                  <span className="text-sm font-semibold text-blue-600">₹{filters.budgetMin} Cr</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.budgetMin}
                  onChange={(e) => handleBudgetChange('budgetMin', e.target.value)}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-700">Max Budget</label>
                  <span className="text-sm font-semibold text-blue-600">₹{filters.budgetMax} Cr+</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.budgetMax}
                  onChange={(e) => handleBudgetChange('budgetMax', e.target.value)}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Accordion: Bedroom */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => toggleAccordion('bedroom')}
            className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition"
          >
            <span className="font-semibold text-gray-800 text-sm">Bedroom</span>
            <FiChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform ${
                activeAccordion === 'bedroom' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {activeAccordion === 'bedroom' && (
            <div className="px-4 py-4 bg-white border-t border-gray-200">
              <select
                value={filters.bedrooms}
                onChange={handleBedroomChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
              >
                <option value="any">Any</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3+ BHK</option>
                <option value="studio">Studio</option>
              </select>
            </div>
          )}
        </div>

        {/* Accordion: Construction Status */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => toggleAccordion('construction')}
            className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition"
          >
            <span className="font-semibold text-gray-800 text-sm">Construction Status</span>
            <FiChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform ${
                activeAccordion === 'construction' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {activeAccordion === 'construction' && (
            <div className="px-4 py-4 bg-white space-y-3 border-t border-gray-200">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.constructionStatus.readyToMove}
                  onChange={() => handleConstructionStatusChange('readyToMove')}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-3 text-sm text-gray-700">Ready to Move</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.constructionStatus.underConstruction}
                  onChange={() => handleConstructionStatusChange('underConstruction')}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-3 text-sm text-gray-700">Under Construction</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.constructionStatus.newLaunch}
                  onChange={() => handleConstructionStatusChange('newLaunch')}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-3 text-sm text-gray-700">New Launch</span>
              </label>
            </div>
          )}
        </div>

        {/* Accordion: Posted By */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => toggleAccordion('postedby')}
            className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition"
          >
            <span className="font-semibold text-gray-800 text-sm">Posted By</span>
            <FiChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform ${
                activeAccordion === 'postedby' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {activeAccordion === 'postedby' && (
            <div className="px-4 py-4 bg-white border-t border-gray-200">
              <select
                value={filters.postedBy}
                onChange={handlePostedByChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
              >
                <option value="anyone">Anyone</option>
                <option value="owner">Owner</option>
                <option value="agent">Real Estate Agent</option>
                <option value="builder">Builder</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6 pt-6 border-t">
        <button
          type="button"
          onClick={handleClear}
          className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-lg transition-colors duration-200"
        >
          Clear
        </button>
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          Apply Filters
        </button>
      </div>
    </form>
  )
}

export default SearchBar
