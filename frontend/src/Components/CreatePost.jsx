import React from 'react';
import {FiImage , FiVideo , FiSmile} from 'react-icons/fi';

const CreatePost = ({onShowModal}) => {
    return(
        <div className='bg-white rounded-lg border border-gray-200 p-3 sm:p-4'>
            <div className='flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4'>
                <img
                 src="https://randomuser.me/api/portraits/men/41.jpg" 
                 alt="Votre avatar" 
                 className='w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#30A196] flex-shrink-0'
                 />
                 <button
                 onClick={onShowModal}
                 className='flex-1 text-left bg-gray-100 hover:bg-gray-200 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500 transition-colors'
                 >
                    Partagez vos pensées, Ahmed ...
                 </button>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3 text-xs sm:text-sm">
                <button 
                  onClick={onShowModal}
                  className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-[#30A196] transition-colors px-2 py-1 rounded-lg hover:bg-gray-50"
                >
                  <FiImage className="text-sm sm:text-base" />
                  <span>Photo</span>
                </button>
                <button 
                  onClick={onShowModal}
                  className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-[#30A196] transition-colors px-2 py-1 rounded-lg hover:bg-gray-50"
                >
                  <FiVideo className="text-sm sm:text-base" />
                  <span>Vidéo</span>
                </button>
                <button 
                  onClick={onShowModal}
                  className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-[#30A196] transition-colors px-2 py-1 rounded-lg hover:bg-gray-50"
                >
                  <FiSmile className="text-sm sm:text-base" />
                  <span>Humeur</span>
                </button>
            </div>
        </div>
    );
};

export default CreatePost;