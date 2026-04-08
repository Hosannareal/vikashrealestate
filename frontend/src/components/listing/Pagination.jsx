import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, totalResults }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-8 border-t border-[#E9E4DC]">
      <p className="text-[13px] text-[#6B6B6B] mb-4 sm:mb-0">
        Showing <span className="font-semibold text-[#111]">1-{Math.min(50, totalResults)}</span> of <span className="font-semibold text-[#111]">{totalResults}</span> results
      </p>

      <div className="flex items-center gap-2">
        <button 
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center rounded-md border border-[#E9E4DC] text-[#111] hover:border-[#111] disabled:opacity-50 disabled:hover:border-[#E9E4DC] transition-colors bg-white"
        >
          <ChevronLeft size={16} />
        </button>

        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className={`w-10 h-10 flex items-center justify-center rounded-md text-[13px] font-medium transition-colors border
              ${currentPage === page 
                ? 'bg-[#111] text-white border-[#111]' 
                : 'bg-white text-[#111] border-[#E9E4DC] hover:border-[#111]'
              }
            `}
          >
            {page}
          </button>
        ))}
        
        <span className="text-[#6B6B6B] px-1">...</span>

        <button
          className="w-10 h-10 flex items-center justify-center rounded-md text-[13px] font-medium transition-colors border bg-white text-[#111] border-[#E9E4DC] hover:border-[#111]"
        >
          12
        </button>

        <button 
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center rounded-md border border-[#E9E4DC] text-[#111] hover:border-[#111] disabled:opacity-50 disabled:hover:border-[#E9E4DC] transition-colors bg-white"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;