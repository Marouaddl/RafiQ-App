import React from "react";
import { FiSend } from "react-icons/fi";
import Comment from "./Comment";

const CommentsSection = ({
  post,
  newComment,
  onNewCommentChange,
  onAddComment,
  onLikeComment,
  onEditComment,
  onDeleteComment,
}) => {
  const comments = post.commentsList || [];

  return (
    <div className="border-t border-gray-100 p-3 sm:p-4">
      <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onLike={() => onLikeComment?.(post.id, comment.id)}
            onEdit={(commentId, newText) =>
              onEditComment?.(post.id, commentId, newText)
            }
            onDelete={(commentId) =>
              onDeleteComment?.(post.id, commentId)
            }
            canEdit={comment.user === "Vous"}
          />
        ))}
      </div>

      <div className="flex space-x-2 sm:space-x-3">
        <img
          src="https://randomuser.me/api/portraits/men/41.jpg"
          alt="Votre avatar"
          className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0"
        />
        <div className="flex-1 flex space-x-2">
          <input
            type="text"
            placeholder="Écrivez un commentaire..."
            value={newComment}
            onChange={(e) => onNewCommentChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newComment?.trim()) {
                onAddComment?.();
              }
            }}
            className="flex-1 bg-gray-100 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm border-none outline-none placeholder-gray-500"
          />
          <button
            onClick={onAddComment}
            disabled={!newComment?.trim()}
            className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-colors flex-shrink-0 ${
              newComment?.trim()
                ? "bg-[#30A196] text-white hover:bg-[#00796B]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiSend className="text-xs sm:text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;