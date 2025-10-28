import React from 'react';

const Comment = ({ comment, onLike }) => {
  return (
    <div className="flex space-x-2 sm:space-x-3">
      <img 
        src={`https://randomuser.me/api/portraits/${comment.user === 'Vous' ? 'men' : 'women'}/33.jpg`} 
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
              {comment.time}
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-gray-700 mt-0.5 sm:mt-1 break-words">
            {comment.text}
          </p>
        </div>
        <div className="flex space-x-3 sm:space-x-4 mt-1 sm:mt-1.5">
          <button 
            onClick={onLike}
            className={`text-[10px] sm:text-xs transition-colors ${
              comment.isLiked ? 'text-[#30A196] font-medium' : 'text-gray-500 hover:text-[#30A196]'
            }`}
          >
            J'aime ({comment.likes})
          </button>
          <button className="text-[10px] sm:text-xs text-gray-500 hover:text-[#30A196] transition-colors">
            Répondre
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;