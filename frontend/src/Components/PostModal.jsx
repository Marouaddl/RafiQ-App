import React, { useState, useRef } from "react";
import { FiImage, FiX } from "react-icons/fi";

const PostModal = ({ onClose, onSubmit }) => {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileRef = useRef(null);

  const tags = [
    "Bien-être",
    "Stress",
    "Méditation",
    "Gratitude",
    "Motivation",
  ];

  const handleCreatePost = () => {
    if (!content.trim() && !selectedImage) return;
    onSubmit({
      content: content.trim(),
      image: selectedImage,
    });
    setContent("");
    setSelectedImage(null);
    onClose();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setSelectedImage(ev.target.result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const removeImage = () => setSelectedImage(null);

  const addTag = (tag) => {
    setContent((prev) => (prev ? `${prev} #${tag}` : `#${tag}`));
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-sm">Créer une publication</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Fermer"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src="https://randomuser.me/api/portraits/men/41.jpg"
              alt="Votre avatar"
              className="w-8 h-8 rounded-full border border-[#30A196] object-cover"
            />
            <div>
              <p className="font-medium text-xs">Ahmed Ali</p>
              <p className="text-[10px] text-gray-500">Membre</p>
            </div>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Quoi de neuf, Ahmed ?"
            className="w-full border-none outline-none resize-none text-sm placeholder-gray-500 min-h-[100px]"
          />

          {selectedImage && (
            <div className="relative mt-3">
              <img
                src={selectedImage}
                alt="Aperçu"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
                aria-label="Retirer l'image"
              >
                <FiX className="text-xs" />
              </button>
            </div>
          )}

          <div className="mt-3">
            <p className="text-xs text-gray-600 mb-2">Ajouter un thème :</p>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => addTag(tag)}
                  className="text-[10px] px-2 py-1 rounded-full border border-gray-200 text-gray-600 hover:border-[#30A196] hover:text-[#30A196]"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t p-4">
          <div className="flex justify-between items-center mb-3">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center space-x-2 text-xs text-gray-600 hover:text-[#30A196]"
            >
              <FiImage className="text-[#30A196]" />
              <span>Photo</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleCreatePost}
            disabled={!content.trim() && !selectedImage}
            className={
              "w-full py-2 rounded-lg text-xs font-medium transition-colors " +
              (content.trim() || selectedImage
                ? "bg-[#30A196] text-white hover:bg-[#00796B]"
                : "bg-gray-200 text-gray-500 cursor-not-allowed")
            }
          >
            Publier
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;