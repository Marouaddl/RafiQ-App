import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

const PostHeader = ({ post }) => {
  return (
    <div className="p-3 sm:p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <img 
            src={post.user.avatar} 
            alt={post.user.name} 
            className="w-9 h-9 sm:w-8 sm:h-8 rounded-full border border-[#30A196] flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-1">
              <h3 className="font-semibold text-sm sm:text-xs text-gray-900 truncate">
                {post.user.name}
              </h3>
              {post.user.verified && (
                <span className="text-[#30A196] text-sm sm:text-xs flex-shrink-0">✓</span>
              )}
            </div>
            <p className="text-xs sm:text-[10px] text-gray-500 truncate">
              {post.user.role} • {post.timestamp}
            </p>
          </div>
        </div>
        <div className="relative flex-shrink-0">
          <button className="text-gray-400 hover:text-gray-600 p-1 sm:p-0">
            <FiMoreHorizontal className="text-base sm:text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;