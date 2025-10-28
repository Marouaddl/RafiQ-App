import React from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 p-4 border-t border-gray-200 bg-white">
      <button 
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center gap-1 border border-gray-300 rounded-full px-2 py-1 text-[10px] text-gray-700 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiArrowLeft className="text-gray-700 text-[10px]" /> 
        précédente
      </button>
      
      <span className="text-[10px] text-gray-600 px-2">
        Page {currentPage} sur {totalPages}
      </span>
      
      <button 
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 bg-[#00796B] text-white rounded-full px-2 py-1 text-[10px] hover:bg-[#00695C] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        suivante 
        <FiArrowRight className="text-[10px]" />
      </button>
    </div>
  );
};

export default Pagination;