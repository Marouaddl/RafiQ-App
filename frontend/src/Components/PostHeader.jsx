import React, { useState, useEffect } from "react";
import { FiMoreHorizontal, FiTrash2 } from "react-icons/fi";

const PostHeader = ({ post, onDelete, canDelete }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [open]);

  return (
    <div className="p-3 sm:p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
          <img
            src={post.user.avatar}
            alt={post.user.name}
            className="w-9 h-9 sm:w-8 sm:h-8 rounded-full border border-[#30A196] flex-shrink-0 object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-1">
              <h3 className="font-semibold text-sm sm:text-xs text-gray-900 truncate">
                {post.user.name}
              </h3>
              {post.user.verified && (
                <span className="text-[#30A196] text-sm sm:text-xs flex-shrink-0">
                  ✓
                </span>
              )}
            </div>
            <p className="text-xs sm:text-[10px] text-gray-500 truncate">
              {post.user.role} • {post.timestamp}
            </p>
          </div>
        </div>

        <div className="relative flex-shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
            className="text-gray-400 hover:text-gray-600 p-1"
            aria-label="Options"
          >
            <FiMoreHorizontal className="text-base sm:text-sm" />
          </button>

          {open && (
            <div
              className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 w-36 py-1"
              onClick={(e) => e.stopPropagation()}
            >
              {canDelete && onDelete && (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onDelete(post.id);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                >
                  <FiTrash2 className="text-xs" />
                  Supprimer
                </button>
              )}
              {!canDelete && (
                <p className="px-3 py-2 text-[10px] text-gray-400">
                  Aucune action
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostHeader;