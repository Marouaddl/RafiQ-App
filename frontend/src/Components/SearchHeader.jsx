import React from "react";
import { FiSearch, FiFilter, FiHeart, FiX } from "react-icons/fi";

const SearchHeader = ({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  filteredCount,
  filterSpecialty,
  setFilterSpecialty,
  filterAvailability,
  setFilterAvailability,
  filterPrice,
  setFilterPrice,
  filterRating,
  setFilterRating,
  filterFavoritesOnly,
  setFilterFavoritesOnly,
  sortBy,
  setSortBy,
  resetFilters,
  favoritesCount = 0,
}) => {
  const hasActiveFilters =
    filterSpecialty !== "all" ||
    filterAvailability !== "all" ||
    filterPrice !== "all" ||
    filterRating !== "all" ||
    filterFavoritesOnly ||
    sortBy !== "default" ||
    !!searchTerm.trim();

  return (
    <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-gray-900">Psychiatres</h1>
            <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
              {filteredCount} trouvé{filteredCount !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex gap-2 flex-wrap">
            <div className="relative flex-1 sm:w-64 min-w-[160px]">
              <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="text"
                placeholder="Rechercher un psychiatre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-6 pr-3 py-1.5 text-xs rounded bg-gray-100 border-none focus:outline-none focus:ring-1 focus:ring-[#00796B]"
              />
            </div>

            <button
              type="button"
              onClick={() => setFilterFavoritesOnly(!filterFavoritesOnly)}
              className={
                "px-2 py-1.5 border rounded text-xs flex items-center gap-1 " +
                (filterFavoritesOnly
                  ? "border-red-300 bg-red-50 text-red-600"
                  : "border-gray-300 hover:bg-gray-50 text-gray-600")
              }
              title="Favoris uniquement"
            >
              <FiHeart className="text-xs" />
              {favoritesCount > 0 && (
                <span className="text-[10px]">{favoritesCount}</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={
                "px-2 py-1.5 border rounded text-xs hover:bg-gray-50 flex items-center gap-1 " +
                (showFilters
                  ? "border-[#00796B] text-[#00796B] bg-[#00796B]/5"
                  : "border-gray-300")
              }
            >
              <FiFilter className="text-xs" />
              Filtres
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="border-t border-gray-200 pt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#00796B]"
            >
              <option value="all">Toutes spécialités</option>
              <option value="Psychiatre">Psychiatre</option>
              <option value="Psychologue">Psychologue</option>
              <option value="Psychothérapeute">Psychothérapeute</option>
            </select>

            <select
              value={filterAvailability}
              onChange={(e) => setFilterAvailability(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#00796B]"
            >
              <option value="all">Toute disponibilité</option>
              <option value="available">Disponible maintenant</option>
              <option value="online">En ligne</option>
            </select>

            <select
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#00796B]"
            >
              <option value="all">Tous prix</option>
              <option value="lt2000">Moins de 2000 DA</option>
              <option value="2000-3000">2000–3000 DA</option>
              <option value="gt3000">Plus de 3000 DA</option>
            </select>

            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#00796B]"
            >
              <option value="all">Toutes notes</option>
              <option value="4.5">4.5+ étoiles</option>
              <option value="4.0">4.0+ étoiles</option>
              <option value="3.5">3.5+ étoiles</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#00796B]"
            >
              <option value="default">Tri par défaut</option>
              <option value="rating">Meilleure note</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
              <option value="available">Disponibles d&apos;abord</option>
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center justify-center gap-1 px-2 py-1.5 border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
              >
                <FiX className="text-xs" />
                Réinitialiser
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHeader;