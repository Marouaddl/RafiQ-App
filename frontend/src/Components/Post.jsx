import React, { useState } from 'react';
import { FiHeart, FiMessageCircle, FiShare2, FiMoreHorizontal, FiBookmark, FiSend } from 'react-icons/fi';
import PostHeader from './PostHeader';
import PostStats from './PostStats';
import PostActions from './PostActions';
import CommentsSection from './CommentsSection';

const Post = ({ post, onLike, onSave, onShare, onAddComment, onLikeComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(post.id, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-3 sm:mb-4">
    
      <PostHeader post={post} />
      
      
      <div className="p-3 sm:p-4">
        <p className="mt-2 text-xs sm:text-sm text-gray-800 leading-relaxed break-words">
          {post.content}
        </p>
        
        
        {post.image && (
          <div className="mt-3 sm:mt-4 relative">
            <img 
              src={post.image} 
              alt="Statut" 
              className="rounded-lg w-full h-48 sm:h-56 object-cover"
            />
          </div>
        )}
      </div>

     
      <PostStats post={post} />

      {/* Actions */}
      <PostActions
        post={post}
        onLike={onLike}
        onSave={onSave}
        onShare={onShare}
        onToggleComments={toggleComments}
      />

      {/* Section commentaires */}
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