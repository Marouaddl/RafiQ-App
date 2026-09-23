import React, { useState } from "react";
import {
  FiSearch,
  FiUsers,
  FiArrowLeft,
  FiClock,
  FiCheck,
} from "react-icons/fi";


// ======================================================
// COMPONENT
// ======================================================

const DiscoverGroups = ({
  groups,
  onBack,
  onJoinGroup,
}) => {

  const [search, setSearch] = useState("");


  // ====================================================
  // SEARCH
  // ====================================================

  const filteredGroups = groups.filter((group) => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return true;
    }

    return (
      group.name.toLowerCase().includes(query) ||
      group.category.toLowerCase().includes(query)
    );
  });


  // ====================================================
  // ENVOYER UNE DEMANDE
  // (délégué au parent via onJoinGroup, qui gère
  // le vrai state des groupes)
  // ====================================================

  return (

    <div className="min-h-[calc(100vh-60px)] bg-[#f7f9fa]">


      {/* =================================================
          RETOUR
      ================================================= */}

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#008f83] mb-5"
      >

        <FiArrowLeft />

        Retour à mes groupes

      </button>


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>

          <div className="flex items-center gap-2">

            <FiUsers className="text-[#008f83] text-xl" />

            <h1 className="text-xl font-bold text-gray-900">
              Découvrir des groupes
            </h1>

          </div>

          <p className="text-xs text-gray-500 mt-1">
            Trouvez une communauté qui correspond à vos besoins.
          </p>

        </div>


        {/* SEARCH */}

        <div className="flex items-center bg-white border border-gray-300 rounded-md h-9 px-3 w-64">

          <FiSearch className="text-gray-400 mr-2 text-sm" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un groupe..."
            className="w-full text-xs outline-none"
          />

        </div>

      </div>


      {/* =================================================
          TITLE
      ================================================= */}

      <div className="mb-4">

        <h2 className="font-semibold text-gray-800 text-sm">
          Groupes recommandés
        </h2>

        <p className="text-[11px] text-gray-500 mt-1">
          Envoyez une demande pour rejoindre un groupe.
        </p>

      </div>


      {/* =================================================
          GROUPES
      ================================================= */}

      {filteredGroups.length === 0 ? (

        <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">

          <FiSearch className="mx-auto text-3xl text-gray-300 mb-3" />

          <p className="text-xs text-gray-500">
            Aucun groupe trouvé.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

          {filteredGroups.map((group) => (

            <div
              key={group.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
            >

              <div className="h-32">

                <img
                  src={group.image}
                  alt={group.name}
                  className="w-full h-full object-cover"
                />

              </div>


              <div className="p-4">

                <h3 className="font-semibold text-sm text-gray-900">
                  {group.name}
                </h3>


                <p className="text-[11px] text-gray-500 mt-2 line-clamp-2">
                  {group.description}
                </p>


                <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-3">

                  <FiUsers />

                  {group.members} membres

                </div>


                {/* NOT MEMBER */}

                {group.membershipStatus === "not_member" && (

                  <button
                    onClick={() => onJoinGroup(group.id)}
                    className="w-full mt-4 py-2 bg-[#008f83] hover:bg-[#00796B] text-white rounded-md text-xs font-medium"
                  >

                    Rejoindre le groupe

                  </button>

                )}


                {/* PENDING */}

                {group.membershipStatus === "pending" && (

                  <div className="w-full mt-4 py-2 bg-[#fff7e6] text-[#b7791f] rounded-md text-xs flex items-center justify-center gap-2">

                    <FiClock />

                    Demande en attente

                  </div>

                )}


                {/* MEMBER */}

                {group.membershipStatus === "member" && (

                  <div className="w-full mt-4 py-2 bg-[#e6f5f3] text-[#008f83] rounded-md text-xs flex items-center justify-center gap-2">

                    <FiCheck />

                    Vous êtes membre

                  </div>

                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};


export default DiscoverGroups;