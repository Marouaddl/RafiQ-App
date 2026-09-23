import React, { useState } from "react";
import {
  FiSearch,
  FiUsers,
  FiChevronRight,
  FiHeart,
  FiPlus,
  FiX,
} from "react-icons/fi";

const Groups = ({
  groups,
  onDiscoverGroups,
  onOpenGroup,
  onToggleFavorite,
  onCreateGroup,
}) => {
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const myGroups = (groups || []).filter(
    (group) => group.membershipStatus === "member"
  );

  const pendingRequestsCount = (groups || []).reduce((acc, group) => {
    if (group.currentUserRole !== "admin") return acc;
    const pending = (group.joinRequests || []).filter(
      (r) => r.status === "pending"
    ).length;
    return acc + pending;
  }, 0);

  const filteredGroups = myGroups.filter((group) => {
    const query = search.toLowerCase().trim();
    if (!query) return true;
    return (
      group.name.toLowerCase().includes(query) ||
      (group.category || "").toLowerCase().includes(query)
    );
  });

  const handleSubmitCreate = () => {
    if (!newName.trim()) return;
    onCreateGroup?.({
      name: newName,
      category: newCategory,
      description: newDescription,
    });
    setNewName("");
    setNewCategory("");
    setNewDescription("");
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-0 w-full min-w-0 px-0 sm:px-0 pb-2">
      {/* Header */}
      <div className="flex flex-col gap-3 mb-4 sm:mb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <FiUsers className="text-[#008f83] text-lg sm:text-xl flex-shrink-0" />
            <h1 className="text-base sm:text-xl font-bold text-gray-900">
              Mes groupes
            </h1>
            {pendingRequestsCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {pendingRequestsCount} demande
                {pendingRequestsCount > 1 ? "s" : ""}
              </span>
            )}
          </div>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
            Retrouvez les groupes que vous avez rejoints.
          </p>
        </div>

        {/* Boutons — colonne sur mobile, rangée sur desktop */}
        <div className="flex flex-col xs:flex-row sm:flex-row gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-1.5 w-full sm:w-auto px-3 py-2.5 sm:py-2 bg-white border border-gray-300 hover:border-[#008f83] hover:text-[#008f83] text-gray-700 rounded-lg text-xs font-medium"
          >
            <FiPlus className="text-sm" />
            Créer un groupe
          </button>
          <button
            type="button"
            onClick={onDiscoverGroups}
            className="flex items-center justify-center gap-1.5 w-full sm:w-auto px-3 py-2.5 sm:py-2 bg-[#008f83] hover:bg-[#00796B] text-white rounded-lg text-xs font-medium"
          >
            <FiUsers className="text-sm" />
            Rejoindre un groupe
            <FiChevronRight className="text-sm" />
          </button>
        </div>
      </div>

      {/* Recherche full width mobile */}
      <div className="mb-4">
        <div className="flex items-center bg-white border border-gray-300 rounded-lg h-9 px-3 w-full max-w-md">
          <FiSearch className="text-gray-400 mr-2 text-sm flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un groupe..."
            className="w-full text-xs outline-none min-w-0"
          />
        </div>
      </div>

      {filteredGroups.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-10 text-center">
          <FiUsers className="mx-auto text-2xl sm:text-3xl text-gray-300 mb-2" />
          <h2 className="font-semibold text-gray-800 text-sm">
            Vous n&apos;avez rejoint aucun groupe
          </h2>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-2 px-2">
            Découvrez les groupes disponibles et envoyez une demande pour
            rejoindre une communauté.
          </p>
          <button
            type="button"
            onClick={onDiscoverGroups}
            className="mt-4 px-5 py-2.5 bg-[#008f83] text-white rounded-lg text-xs"
          >
            Découvrir les groupes
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-3">
            <h2 className="font-semibold text-gray-800 text-sm">
              Groupes que vous avez rejoints
            </h2>
            <p className="text-[11px] text-gray-500 mt-0.5">
              {filteredGroups.length} groupe
              {filteredGroups.length > 1 ? "s" : ""}
            </p>
          </div>

          {/* 1 colonne mobile, 2 tablette, 3 desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            {filteredGroups.map((group) => {
              const groupPending =
                group.currentUserRole === "admin"
                  ? (group.joinRequests || []).filter(
                      (r) => r.status === "pending"
                    ).length
                  : 0;

              return (
                <div
                  key={group.id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden relative"
                >
                  {groupPending > 0 && (
                    <span className="absolute top-2 right-2 z-10 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      {groupPending}
                    </span>
                  )}
                  <div className="h-28 sm:h-32 overflow-hidden">
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm text-gray-900 leading-snug">
                        {group.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => onToggleFavorite?.(group.id)}
                        className={
                          "flex-shrink-0 p-0.5 " +
                          (group.isFavorite
                            ? "text-red-500"
                            : "text-gray-400 hover:text-red-500")
                        }
                      >
                        <FiHeart
                          fill={group.isFavorite ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1.5 line-clamp-2">
                      {group.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mt-2">
                      <FiUsers className="flex-shrink-0" />
                      {group.members} membres
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center px-2 py-0.5 bg-[#e6f5f3] text-[#008f83] rounded-full text-[9px]">
                        ✓ Membre
                      </span>
                      {group.currentUserRole === "admin" && (
                        <span className="inline-flex items-center px-2 py-0.5 bg-gray-900 text-white rounded-full text-[9px]">
                          Admin
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenGroup(group)}
                      className="w-full mt-3 py-2.5 sm:py-2 bg-[#008f83] hover:bg-[#00796B] text-white rounded-lg text-xs font-medium"
                    >
                      Voir le groupe
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal créer */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-lg p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Créer un nouveau groupe
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-1"
              >
                <FiX className="text-gray-400" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-medium text-gray-600">
                  Nom du groupe *
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ex : Confiance en Soi"
                  className="w-full mt-1 text-xs border border-gray-200 rounded-md px-3 py-2.5 outline-none focus:border-[#008f83]"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-gray-600">
                  Catégorie
                </label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Ex : Bien-être"
                  className="w-full mt-1 text-xs border border-gray-200 rounded-md px-3 py-2.5 outline-none focus:border-[#008f83]"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-gray-600">
                  Description
                </label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Décrivez l'objectif de ce groupe..."
                  className="w-full mt-1 h-20 text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#008f83] resize-none"
                />
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-5">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSubmitCreate}
                disabled={!newName.trim()}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#008f83] hover:bg-[#00796B] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg text-xs"
              >
                Créer le groupe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;