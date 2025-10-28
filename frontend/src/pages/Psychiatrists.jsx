import React from "react";
import { usePsychiatrists } from "../Components/hooks/usePsychiatrists";
import PsychiatristCard from "../Components/PsychiatristCard";
import SearchHeader from "../Components/SearchHeader";
import ContactModal from "../Components/ContactModal";
import Pagination from "../Components/Pagination";

const Psychiatrists = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedPsychiatrist,
    showModal,
    setShowModal,
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
    handleShare
  } = usePsychiatrists();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <SearchHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filteredCount={filteredPsychiatrists.length}
      />

      {/* Grid des psychiatres */}
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
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-sm">Aucun psychiatre trouvé pour "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-2 text-[#00796B] text-xs hover:underline"
            >
              Réinitialiser la recherche
            </button>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal renders as overlay on same page */}
      {showModal && (
        <ContactModal
          isOpen={showModal}
          psychiatrist={selectedPsychiatrist}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Psychiatrists;