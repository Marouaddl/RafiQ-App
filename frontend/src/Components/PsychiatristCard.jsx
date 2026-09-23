import React from "react";
import {
  FiUser,
  FiVideo,
  FiMapPin,
  FiClock,
  FiHeart,
  FiShare2,
  FiCheck,
  FiPhone,
} from "react-icons/fi";
import StarRating from "./StarRating";

const PsychiatristCard = ({
  psychiatrist,
  isFavorite,
  onToggleFavorite,
  onContact,
  onShare,
  onOpenDetail,
}) => {
  const {
    id,
    name,
    specialty,
    description,
    rating,
    reviews,
    experience,
    location,
    price,
    image,
    available,
    online,
    languages,
    nextAvailable,
    responseTime,
    verified,
  } = psychiatrist;

  return (
    <div
      className={
        "bg-white border rounded-lg shadow-sm hover:shadow-md transition-all p-3 flex flex-col cursor-pointer " +
        (available ? "border-gray-200" : "border-gray-200 opacity-90")
      }
      onClick={() => onOpenDetail && onOpenDetail(psychiatrist)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" && onOpenDetail) onOpenDetail(psychiatrist);
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="relative w-12 h-12 flex-shrink-0">
            <img
              src={image}
              alt={name}
              className="w-12 h-12 rounded-full object-cover border border-[#00796B]"
            />
            {(available || online) && (
              <span
                className={
                  "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white shadow-sm " +
                  (available ? "bg-green-500" : "bg-blue-500")
                }
                title={available ? "Disponible" : "En ligne"}
              />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h3 className="text-xs font-semibold text-gray-800">{name}</h3>
              {verified && (
                <FiCheck className="text-[#00796B] text-[10px]" title="Vérifié" />
              )}
            </div>
            <p className="text-[10px] text-[#00796B]">{specialty}</p>
          </div>
        </div>

        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => onToggleFavorite(id)}
            className={
              "transition-colors " +
              (isFavorite
                ? "text-red-500"
                : "text-gray-400 hover:text-red-500")
            }
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <FiHeart className="text-xs" />
          </button>
          <button
            type="button"
            onClick={() => onShare(psychiatrist)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Partager"
          >
            <FiShare2 className="text-xs" />
          </button>
        </div>
      </div>

      <p className="text-[10px] text-gray-600 mb-2 line-clamp-2">{description}</p>

      {/* Rating */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <StarRating rating={rating} />
          <span className="text-[10px] text-gray-600">({rating})</span>
          <span className="text-[10px] text-gray-500">{reviews} avis</span>
        </div>
        <div className="flex items-center gap-0.5 text-[10px] text-gray-600">
          <FiMapPin className="text-[#00796B] text-[8px]" />
          <span>{location}</span>
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-1 mb-2">
        <span className="text-[9px] px-1.5 py-0.5 rounded-full border border-gray-300 text-gray-700 flex items-center gap-0.5">
          <FiUser className="text-[8px] text-green-600" />
          en personne
        </span>
        <span className="text-[9px] px-1.5 py-0.5 rounded-full border border-gray-300 text-gray-700 flex items-center gap-0.5">
          <FiVideo className="text-[8px] text-blue-600" />
          en ligne
        </span>
      </div>

      {/* Info */}
      <div className="grid grid-cols-2 gap-1 text-[10px] text-gray-600 mb-2">
        <div className="flex items-center gap-0.5">
          <FiClock className="text-[#00796B] text-[8px]" />
          <span>Réponse: {responseTime}</span>
        </div>
        <div className="flex items-center gap-0.5">
          <FiUser className="text-[#00796B] text-[8px]" />
          <span>{experience}</span>
        </div>
      </div>

      {/* Languages */}
      <div className="mb-2 flex flex-wrap gap-0.5">
        {(languages || []).map((lang, index) => (
          <span
            key={index}
            className="text-[9px] bg-gray-100 text-gray-700 px-1 py-0.5 rounded"
          >
            {lang}
          </span>
        ))}
      </div>

      {/* Availability */}
      {available ? (
        <div className="bg-green-50 border border-green-200 rounded p-1 mb-2 text-center">
          <p className="text-[9px] text-green-800">
            Disponible : <strong>{nextAvailable}</strong>
          </p>
        </div>
      ) : (
        <div className="bg-orange-50 border border-orange-200 rounded p-1 mb-2 text-center">
          <p className="text-[9px] text-orange-800">
            Indisponible — prochaine : <strong>{nextAvailable}</strong>
          </p>
        </div>
      )}

      {/* Price + Contact */}
      <div
        className="flex items-center justify-between mt-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-xs font-bold text-gray-900">{price} DA</span>
        <button
          type="button"
          onClick={() => onContact(psychiatrist)}
          className="bg-[#00796B] hover:bg-[#00695C] text-white text-[10px] font-medium px-2.5 py-1 rounded flex items-center gap-0.5 transition-colors"
        >
          <FiPhone className="text-[8px]" />
          Contacter
        </button>
      </div>
    </div>
  );
};

export default PsychiatristCard;