import React, { useState } from "react";
import PostHeader from "./PostHeader";
import PostStats from "./PostStats";
import PostActions from "./PostActions";
import CommentsSection from "./CommentsSection";

const Post = ({
  post,
  onLike,
  onSave,
  onShare,
  onAddComment,
  onLikeComment,
  onDelete,
  canDelete,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const toggleComments = () => setShowComments(!showComments);

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(post.id, newComment);
      setNewComment("");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-2 sm:mb-3 overflow-hidden w-full min-w-0">
      <PostHeader post={post} onDelete={onDelete} canDelete={canDelete} />

      <div className="px-2.5 sm:px-4 pb-2">
        <p className="text-[11px] sm:text-sm text-gray-800 leading-relaxed break-words whitespace-pre-wrap">
          {post.content}
        </p>

        {post.image && (
          <div className="mt-2 sm:mt-3 relative">
            <img
              src={post.image}
              alt="Publication"
              className="rounded-lg w-full max-h-48 sm:max-h-72 object-cover"
            />
          </div>
        )}
      </div>

      <PostStats post={post} />

      <PostActions
        post={post}
        onLike={onLike}
        onSave={onSave}
        onShare={onShare}
        onToggleComments={toggleComments}
      />

      {showComments && (
        <CommentsSection
          post={post}
          newComment={newComment}
          onNewCommentChange={setNewComment}
          onAddComment={handleAddComment}
          onLikeComment={onLikeComment}
        />
      )}
    </div>
  );
};

export default Post;