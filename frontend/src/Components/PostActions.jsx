import React from 'react';
import { FiHeart, FiMessageCircle, FiShare2, FiBookmark } from 'react-icons/fi';

const PostActions = ({ post, onLike, onSave, onShare, onToggleComments }) => {
  return (
    <div className="p-2 sm:p-1.5 flex justify-between items-center">
      <button 
        onClick={() => onLike(post.id)}
        className={`flex items-center space-x-1 sm:space-x-1.5 px-3 py-2 sm:px-2 sm:py-1.5 rounded-lg text-xs sm:text-[10px] flex-1 justify-center transition-colors ${
          post.isLiked 
            ? 'text-red-600 bg-red-50' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <FiHeart className={`text-sm sm:text-xs ${post.isLiked ? 'fill-red-600' : ''}`} />
        <span className="hidden xs:inline">J'aime</span>
      </button>
      
      <button 
        onClick={onToggleComments}
        className="flex items-center space-x-1 sm:space-x-1.5 px-3 py-2 sm:px-2 sm:py-1.5 rounded-lg text-xs sm:text-[10px] text-gray-600 hover:bg-gray-100 flex-1 justify-center transition-colors"
      >
        <FiMessageCircle className="text-sm sm:text-xs" />
        <span className="hidden xs:inline">Commenter</span>
      </button>
      
      <button 
        onClick={() => onShare(post.id)}
        className="flex items-center space-x-1 sm:space-x-1.5 px-3 py-2 sm:px-2 sm:py-1.5 rounded-lg text-xs sm:text-[10px] text-gray-600 hover:bg-gray-100 flex-1 justify-center transition-colors"
      >
        <FiShare2 className="text-sm sm:text-xs" />
        <span className="hidden xs:inline">Partager</span>
      </button>
      
      <button 
        onClick={() => onSave(post.id)}
        className={`flex items-center justify-center px-3 py-2 sm:px-2 sm:py-1.5 rounded-lg text-xs sm:text-[10px] transition-colors ${
          post.isSaved 
            ? 'text-[#30A196] bg-green-50' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <FiBookmark className={`text-sm sm:text-xs ${post.isSaved ? 'fill-[#30A196]' : ''}`} />
      </button>
    </div>
  );
};

export default PostActions;