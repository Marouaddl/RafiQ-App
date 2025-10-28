import React from "react";
import { FiSearch, FiFilter } from "react-icons/fi";

const SearchHeader = ({ 
  searchTerm, 
  setSearchTerm, 
  showFilters, 
  setShowFilters, 
  filteredCount 
}) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-gray-900">Psychiatres</h1>
            <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
              {filteredCount} trouvés
            </span>
          </div>
          
          <div className="flex gap-2">
            <div className="relative flex-1 sm:w-64">
              <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="text"
                placeholder="Rechercher un psychiatre..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-6 pr-3 py-1 text-xs rounded bg-gray-100 border-none focus:outline-none focus:ring-1 focus:ring-[#00796B]"
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="px-2 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50 flex items-center gap-1"
            >
              <FiFilter className="text-xs" />
              Filtres
            </button>
          </div>
        </div>

        {showFilters && <AdvancedFilters />}
      </div>
    </div>
  );
};

const AdvancedFilters = () => (
  <div className="border-t border-gray-200 pt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
    <select className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#00796B]">
      <option>Toutes spécialités</option>
      <option>Psychiatre</option>
      <option>Psychologue</option>
      <option>Psychothérapeute</option>
    </select>
    
    <select className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#00796B]">
      <option>Toute disponibilité</option>
      <option>Disponible maintenant</option>
      <option>En ligne</option>
    </select>
    
    <select className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#00796B]">
      <option>Tous prix</option>
      <option>Moins de 2000 DA</option>
      <option>2000-3000 DA</option>
      <option>Plus de 3000 DA</option>
    </select>
    
    <select className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#00796B]">
      <option>Toutes notes</option>
      <option>4.5+ étoiles</option>
      <option>4.0+ étoiles</option>
      <option>3.5+ étoiles</option>
    </select>
  </div>
);

export default SearchHeader;