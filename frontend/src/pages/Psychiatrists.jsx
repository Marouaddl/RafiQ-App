import React from "react";
import { usePsychiatrists } from "../Components/hooks/usePsychiatrists";
import PsychiatristCard from "../Components/PsychiatristCard";
import SearchHeader from "../Components/SearchHeader";
import ContactModal from "../Components/ContactModal";
import Pagination from "../Components/Pagination";
import {
  FiX,
  FiMapPin,
  FiClock,
  FiCheck,
  FiPhone,
  FiHeart,
  FiShare2,
  FiStar,
} from "react-icons/fi";

const Psychiatrists = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedPsychiatrist,
    showModal,
    setShowModal,
    showDetail,
    setShowDetail,
    showFilters,
    setShowFilters,
    favorites,
    toggleFavorite,
    currentPage,
    setCurrentPage,
    currentPsychiatrists,
    filteredPsychiatrists,
    totalPages,
    handleContact,
    handleOpenDetail,
    handleShare,
    toast,
    showToast,
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
  } = usePsychiatrists();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[60] bg-gray-900 text-white text-xs px-4 py-2 rounded-full shadow-lg">
          {toast}
        </div>
      )}

      <SearchHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filteredCount={filteredPsychiatrists.length}
        filterSpecialty={filterSpecialty}
        setFilterSpecialty={setFilterSpecialty}
        filterAvailability={filterAvailability}
        setFilterAvailability={setFilterAvailability}
        filterPrice={filterPrice}
        setFilterPrice={setFilterPrice}
        filterRating={filterRating}
        setFilterRating={setFilterRating}
        filterFavoritesOnly={filterFavoritesOnly}
        setFilterFavoritesOnly={setFilterFavoritesOnly}
        sortBy={sortBy}
        setSortBy={setSortBy}
        resetFilters={resetFilters}
        favoritesCount={favorites.length}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 w-full flex-1">
        {currentPsychiatrists.length > 0 ? (
          currentPsychiatrists.map((psy) => (
            <PsychiatristCard
              key={psy.id}
              psychiatrist={psy}
              isFavorite={favorites.includes(psy.id)}
              onToggleFavorite={toggleFavorite}
              onContact={handleContact}
              onShare={handleShare}
              onOpenDetail={handleOpenDetail}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-sm mb-2">
              Aucun psychiatre trouvé
              {searchTerm ? ` pour « ${searchTerm} »` : ""}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="text-[#00796B] text-xs hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {showModal && (
        <ContactModal
          isOpen={showModal}
          psychiatrist={selectedPsychiatrist}
          onClose={() => setShowModal(false)}
          onToast={showToast}
        />
      )}

      {/* Fiche détail */}
      {showDetail && selectedPsychiatrist && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowDetail(false);
          }}
        >
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="relative">
              <div className="h-24 bg-gradient-to-r from-[#00796B] to-[#30A196]" />
              <button
                type="button"
                onClick={() => setShowDetail(false)}
                className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center"
                aria-label="Fermer"
              >
                <FiX />
              </button>
              <div className="px-4 -mt-10 pb-4">
                <img
                  src={selectedPsychiatrist.image}
                  alt={selectedPsychiatrist.name}
                  className="w-20 h-20 rounded-full border-4 border-white object-cover"
                />
                <div className="mt-2 flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1">
                      <h2 className="text-base font-bold text-gray-900">
                        {selectedPsychiatrist.name}
                      </h2>
                      {selectedPsychiatrist.verified && (
                        <FiCheck className="text-[#00796B]" />
                      )}
                    </div>
                    <p className="text-xs text-[#00796B]">
                      {selectedPsychiatrist.specialty}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => toggleFavorite(selectedPsychiatrist.id)}
                      className={
                        favorites.includes(selectedPsychiatrist.id)
                          ? "text-red-500 p-1.5"
                          : "text-gray-400 p-1.5 hover:text-red-500"
                      }
                      aria-label="Favori"
                    >
                      <FiHeart />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShare(selectedPsychiatrist)}
                      className="text-gray-400 p-1.5 hover:text-gray-600"
                      aria-label="Partager"
                    >
                      <FiShare2 />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mt-3 leading-5">
                  {selectedPsychiatrist.description}
                </p>

                <div className="grid grid-cols-2 gap-2 mt-4 text-[11px]">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <FiMapPin className="text-[#00796B]" />
                    {selectedPsychiatrist.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <FiClock className="text-[#00796B]" />
                    Réponse {selectedPsychiatrist.responseTime}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <FiStar className="text-yellow-500" />
                    {selectedPsychiatrist.rating} ({selectedPsychiatrist.reviews}{" "}
                    avis)
                  </div>
                  <div className="text-gray-600">
                    Expérience : {selectedPsychiatrist.experience}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {(selectedPsychiatrist.languages || []).map((l) => (
                    <span
                      key={l}
                      className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                    >
                      {l}
                    </span>
                  ))}
                </div>

                <div
                  className={
                    "mt-3 p-2 rounded text-center text-[11px] " +
                    (selectedPsychiatrist.available
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-orange-50 text-orange-800 border border-orange-200")
                  }
                >
                  {selectedPsychiatrist.available
                    ? "Disponible"
                    : "Indisponible"}{" "}
                  — {selectedPsychiatrist.nextAvailable}
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <span className="text-sm font-bold text-gray-900">
                    {selectedPsychiatrist.price} DA
                    <span className="text-[10px] font-normal text-gray-500">
                      {" "}
                      / séance
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setShowDetail(false);
                      handleContact(selectedPsychiatrist);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#00796B] text-white text-xs rounded-lg hover:bg-[#00695C]"
                  >
                    <FiPhone className="text-xs" />
                    Contacter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Psychiatrists;