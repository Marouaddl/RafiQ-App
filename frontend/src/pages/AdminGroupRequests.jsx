import React, { useState, useRef } from "react";
import {
  FiUsers,
  FiCheck,
  FiX,
  FiClock,
  FiArrowLeft,
  FiSettings,
  FiTrash2,
  FiImage,
} from "react-icons/fi";


const AdminGroupRequests = ({
  group,
  onBack,
  onAccept,
  onReject,
  onUpdateGroup,
  onDeleteGroup,
}) => {

  const [activeTab, setActiveTab] = useState("requests");

  // brouillon des paramètres du groupe
  const [name, setName] = useState(group?.name || "");
  const [category, setCategory] = useState(group?.category || "");
  const [description, setDescription] = useState(group?.description || "");
  const [image, setImage] = useState(group?.image || "");
const [imagePreview, setImagePreview] = useState(null);  // ← nouveau
const imageInputRef = useRef(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);


  // ==================================================
  // DEMANDES RÉELLES DU GROUPE
  // (group.joinRequests vient de l'état central,
  // plus de fausses données locales)
  // ==================================================

  const pendingRequests = (group?.joinRequests || []).filter(
    (request) => request.status === "pending"
  );


  // ==================================================
  // ACCEPT / REJECT
  // (on délègue au parent via onAccept / onReject,
  // qui mettent à jour le vrai state des groupes)
  // ==================================================

  const handleAccept = (requestId) => {
    onAccept?.(group.id, requestId);
  };

  const handleReject = (requestId) => {
    onReject?.(group.id, requestId);

  };

  const handleImageFileChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Aperçu local (frontend only, pas d'upload serveur)
  const url = URL.createObjectURL(file);
  setImagePreview({ url, name: file.name });
  setImage(url);
  e.target.value = "";
};

const handleRemoveImagePreview = () => {
  if (imagePreview?.url) {
    URL.revokeObjectURL(imagePreview.url);
  }
  setImagePreview(null);
  setImage(group?.image || "");
};


  // ==================================================
  // ENREGISTRER LES PARAMÈTRES
  // ==================================================

  const handleSaveSettings = () => {

    if (!name.trim()) {
      return;
    }

    onUpdateGroup?.(group.id, {
      name: name.trim(),
      category: category.trim(),
      description: description.trim(),
      image: image.trim() || group.image,
    });

  };

  const handleConfirmDelete = () => {
    onDeleteGroup?.(group.id);
    setShowDeleteConfirm(false);
  };


  return (

    <div className="min-h-[calc(100vh-60px)] bg-[#f7f9fa]">


      {/* BACK */}

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#008f83] mb-5"
      >

        <FiArrowLeft />

        Retour au groupe

      </button>


      {/* HEADER */}

      <div className="bg-white border border-gray-200 rounded-lg p-5 mb-5">

        <div className="flex items-center gap-3">

          <FiUsers className="text-[#008f83] text-xl" />

          <div>

            <h1 className="text-lg font-bold text-gray-900">

              Gérer le groupe

            </h1>

            <p className="text-xs text-gray-500 mt-1">

              {group?.name || "Votre groupe"}

            </p>

          </div>

        </div>


        {/* TABS */}

        <div className="flex items-center gap-6 mt-5 border-t border-gray-100 pt-4">

          <button
            onClick={() => setActiveTab("requests")}
            className={`flex items-center gap-2 text-xs font-medium ${
              activeTab === "requests" ? "text-[#008f83]" : "text-gray-500"
            }`}
          >
            <FiClock />
            Demandes d'adhésion
            {pendingRequests.length > 0 && (
              <span className="bg-[#008f83] text-white text-[9px] px-1.5 py-0.5 rounded-full">
                {pendingRequests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 text-xs font-medium ${
              activeTab === "settings" ? "text-[#008f83]" : "text-gray-500"
            }`}
          >
            <FiSettings />
            Paramètres
          </button>

        </div>

      </div>


      {/* =================================================
          ONGLET : DEMANDES D'ADHÉSION
      ================================================= */}

      {activeTab === "requests" && (

        <>

          <div className="flex items-center gap-2 mb-4">

            <FiClock className="text-[#008f83]" />

            <p className="text-xs text-gray-600">

              {pendingRequests.length} demande
              {pendingRequests.length > 1 ? "s" : ""} en attente

            </p>

          </div>


          {pendingRequests.length === 0 ? (

            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">

              <FiCheck className="mx-auto text-4xl text-[#008f83] mb-3" />

              <h2 className="text-sm font-semibold text-gray-800">

                Aucune demande en attente

              </h2>

              <p className="text-xs text-gray-500 mt-2">

                Toutes les demandes ont été traitées.

              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {pendingRequests.map((request) => (

                <div
                  key={request.id}
                  className="bg-white border border-gray-200 rounded-lg p-5"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">


                    {/* USER */}

                    <div className="flex items-center gap-4">

                      <img
                        src={
                          request.user.avatar ||
                          "https://ui-avatars.com/api/?name=" +
                            encodeURIComponent(request.user.name || "?")
                        }
                        alt={request.user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      <div>

                        <h3 className="text-sm font-semibold text-gray-900">

                          {request.user.name}

                        </h3>

                        <p className="text-[11px] text-gray-500 mt-1">

                          souhaite rejoindre votre groupe

                        </p>

                        <p className="text-[10px] text-gray-400 mt-1">

                          {request.requestedAt}

                        </p>

                      </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="flex items-center gap-2">

                      <button
                        onClick={() =>
                          handleReject(request.id)
                        }
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-md text-xs"
                      >

                        <FiX />

                        Refuser

                      </button>


                      <button
                        onClick={() =>
                          handleAccept(request.id)
                        }
                        className="flex items-center gap-2 px-4 py-2 bg-[#008f83] hover:bg-[#00796B] text-white rounded-md text-xs"
                      >

                        <FiCheck />

                        Accepter

                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </>

      )}


      {/* =================================================
          ONGLET : PARAMÈTRES
      ================================================= */}

      {activeTab === "settings" && (

        <div className="space-y-5">

          <div className="bg-white border border-gray-200 rounded-lg p-5">

            <h3 className="text-xs font-semibold text-gray-800 mb-4">
              Informations du groupe
            </h3>

            <div className="space-y-3">

              <div>
                <label className="text-[11px] font-medium text-gray-600">
                  Nom du groupe
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#008f83]"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-gray-600">
                  Catégorie
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full mt-1 text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#008f83]"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-gray-600">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-1 h-20 text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#008f83] resize-none"
                />
              </div>

              {/* IMAGE DE COUVERTURE : URL + UPLOAD FICHIER */}
<div>
  <label className="text-[11px] font-medium text-gray-600">
    Image de couverture
  </label>
  <div className="mt-1 flex flex-col gap-2">
    {/* Champ URL (désactivé si un fichier est choisi) */}
    <input
      type="text"
      value={imagePreview ? "" : image}
      onChange={(e) => {
        setImage(e.target.value);
        setImagePreview(null);
      }}
      placeholder="URL de l'image[](https://...)"
      className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#008f83]"
      disabled={!!imagePreview}
    />

    {/* Bouton fichier + supprimer */}
    <div className="flex items-center gap-2">
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => imageInputRef.current?.click()}
        className="flex items-center gap-2 px-3 py-1.5 text-[11px] border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
      >
        <FiImage className="text-green-600" />
        Choisir un fichier
      </button>
      {imagePreview && (
        <button
          type="button"
          onClick={handleRemoveImagePreview}
          className="text-[11px] text-red-500 hover:underline"
        >
          Supprimer le fichier
        </button>
      )}
    </div>

    {/* Aperçu */}
    {(imagePreview || image) && (
      <div className="mt-2">
        <img
          src={imagePreview?.url || image}
          alt="Aperçu couverture"
          className="max-h-32 rounded-md border border-gray-200 object-cover"
        />
        {imagePreview && (
          <p className="text-[10px] text-gray-400 mt-1">
            {imagePreview.name} (aperçu local)
          </p>
        )}
      </div>
    )}
  </div>
</div>

            </div>

            <div className="flex justify-end mt-4">

              <button
                onClick={handleSaveSettings}
                disabled={!name.trim()}
                className="px-5 py-2 bg-[#008f83] hover:bg-[#00796B] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-md text-xs"
              >
                Enregistrer les modifications
              </button>

            </div>

          </div>


          {/* ZONE DANGEREUSE */}

          <div className="bg-white border border-red-200 rounded-lg p-5">

            <h3 className="text-xs font-semibold text-red-600 mb-2">
              Zone dangereuse
            </h3>

            <p className="text-[11px] text-gray-500 mb-3">
              Supprimer ce groupe est définitif. Toutes les publications,
              tous les membres et toutes les demandes seront perdus.
            </p>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-red-300 hover:bg-red-50 text-red-600 rounded-md text-xs"
            >
              <FiTrash2 />
              Supprimer le groupe
            </button>

          </div>

        </div>

      )}


      {/* =================================================
          CONFIRMATION SUPPRESSION
      ================================================= */}

      {showDeleteConfirm && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-lg p-6 max-w-sm w-full">

            <h3 className="text-sm font-semibold text-gray-900">
              Supprimer "{group?.name}" ?
            </h3>

            <p className="text-xs text-gray-500 mt-2">
              Cette action est irréversible. Le groupe, ses publications
              et ses membres seront définitivement supprimés.
            </p>

            <div className="flex justify-end gap-2 mt-5">

              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs"
              >
                Annuler
              </button>

              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs"
              >
                Supprimer définitivement
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
};


export default AdminGroupRequests;