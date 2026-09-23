import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";

const Comment = ({
  comment,
  onLike,
  onEdit,
  onDelete,
  canEdit = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text || "");

  const handleSaveEdit = () => {
    const trimmed = (editText || "").trim();
    if (!trimmed) return;
    onEdit?.(comment.id, trimmed);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(comment.text || "");
    setIsEditing(false);
  };

  return (
    <div className="flex space-x-2 sm:space-x-3">
      <img
        src={`https://randomuser.me/api/portraits/${
          comment.user === "Vous" ? "men" : "women"
        }/33.jpg`}
        alt={comment.user}
        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="bg-gray-100 rounded p-2 sm:p-3">
          <div className="flex justify-between items-start space-x-2">
            <span className="font-medium text-[10px] sm:text-xs text-gray-900 truncate">
              {comment.user}
            </span>
            <span className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
              {comment.time || "À l'instant"}
            </span>
          </div>

          {isEditing ? (
            <div className="mt-1.5 space-y-2">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full text-[10px] sm:text-xs border border-gray-300 rounded-md p-2 outline-none focus:border-[#30A196] resize-none"
                rows={2}
                autoFocus
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveEdit}
                  disabled={!editText.trim()}
                  className="flex items-center gap-1 px-2 py-1 bg-[#30A196] text-white rounded text-[10px] disabled:opacity-40"
                >
                  <FiCheck className="text-[10px]" />
                  Enregistrer
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-600 rounded text-[10px]"
                >
                  <FiX className="text-[10px]" />
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <p className="text-[10px] sm:text-xs text-gray-700 mt-0.5 sm:mt-1 break-words">
              {comment.text}
            </p>
          )}
        </div>

        <div className="flex space-x-3 sm:space-x-4 mt-1 sm:mt-1.5 items-center">
          <button
            onClick={onLike}
            className={`text-[10px] sm:text-xs transition-colors ${
              comment.isLiked
                ? "text-[#30A196] font-medium"
                : "text-gray-500 hover:text-[#30A196]"
            }`}
          >
            J'aime ({comment.likes || 0})
          </button>
          <button className="text-[10px] sm:text-xs text-gray-500 hover:text-[#30A196] transition-colors">
            Répondre
          </button>

          {/* Modifier / Supprimer — visible uniquement pour l'auteur */}
          {canEdit && !isEditing && (
            <>
              <button
                onClick={() => {
                  setEditText(comment.text || "");
                  setIsEditing(true);
                }}
                className="text-[10px] sm:text-xs text-gray-400 hover:text-[#30A196] flex items-center gap-0.5"
                title="Modifier"
              >
                <FiEdit2 className="text-[10px]" />
                Modifier
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Supprimer ce commentaire ?")) {
                    onDelete?.(comment.id);
                  }
                }}
                className="text-[10px] sm:text-xs text-gray-400 hover:text-red-500 flex items-center gap-0.5"
                title="Supprimer"
              >
                <FiTrash2 className="text-[10px]" />
                Supprimer
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;