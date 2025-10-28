import React from "react";
import { FiUser, FiVideo, FiMapPin, FiClock, FiHeart, FiShare2, FiCheck, FiPhone } from "react-icons/fi";
import StarRating from "./StarRating";

const PsychiatristCard = ({ psychiatrist, isFavorite, onToggleFavorite, onContact, onShare }) => {
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
    verified
  } = psychiatrist;

  // Gestion des clics avec stopPropagation
  const handleContactClick = (e) => {
    e.stopPropagation();
    onContact(psychiatrist);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(id);
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    onShare(psychiatrist);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all p-3 flex flex-col">
      <CardHeader
        name={name}
        specialty={specialty}
        image={image}
        available={available}
        online={online}
        verified={verified}
        isFavorite={isFavorite}
        onToggleFavorite={handleFavoriteClick}
        onShare={handleShareClick}
      />

      <p className="text-[10px] text-gray-600 mb-2 line-clamp-2">{description}</p>

      <RatingSection rating={rating} reviews={reviews} location={location} />

      <ConsultationBadges />

      <AdditionalInfo responseTime={responseTime} experience={experience} />

      <Languages languages={languages} />

      <Availability available={available} nextAvailable={nextAvailable} />

      <PriceAndContact price={price} onContact={handleContactClick} />
    </div>
  );
};

const CardHeader = ({ name, specialty, image, available, online, verified, isFavorite, onToggleFavorite, onShare }) => (
  <div className="flex items-start justify-between mb-2">
    <div className="flex items-center gap-2">
      <div className="relative">
        <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover border border-[#00796B]" />
        <StatusIndicators available={available} online={online} />
      </div>
      <div>
        <div className="flex items-center gap-1">
          <h3 className="text-xs font-semibold text-gray-800">{name}</h3>
          {verified && <FiCheck className="text-[#00796B] text-[10px]" />}
        </div>
        <p className="text-[10px] text-[#00796B]">{specialty}</p>
      </div>
    </div>
    
    <div className="flex gap-1">
      <button 
        onClick={onToggleFavorite} 
        className="text-gray-400 hover:text-red-500 transition-colors"
      >
        <FiHeart className={`text-xs ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
      </button>
      <button 
        onClick={onShare} 
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <FiShare2 className="text-xs" />
      </button>
    </div>
  </div>
);

const StatusIndicators = ({ available, online }) => (
  <div className="absolute -bottom-1 -right-1 flex gap-0.5">
    {available && <div className="w-2 h-2 bg-green-500 rounded-full border border-white"></div>}
    {online && <div className="w-2 h-2 bg-blue-500 rounded-full border border-white"></div>}
  </div>
);

const RatingSection = ({ rating, reviews, location }) => (
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
);

const ConsultationBadges = () => (
  <div className="flex items-center gap-1 mb-2">
    <Badge icon={FiUser} color="text-green-600" text="en personne" />
    <Badge icon={FiVideo} color="text-blue-600" text="en ligne" />
  </div>
);

const Badge = ({ icon: Icon, color, text }) => (
  <span className="text-[9px] px-1.5 py-0.5 rounded-full border border-gray-300 text-gray-700 flex items-center gap-0.5">
    <Icon className={`text-[8px] ${color}`} />
    {text}
  </span>
);

const AdditionalInfo = ({ responseTime, experience }) => (
  <div className="grid grid-cols-2 gap-1 text-[10px] text-gray-600 mb-2">
    <InfoItem icon={FiClock} text={`Réponse: ${responseTime}`} />
    <InfoItem icon={FiUser} text={experience} />
  </div>
);

const InfoItem = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-0.5">
    <Icon className="text-[#00796B] text-[8px]" />
    <span>{text}</span>
  </div>
);

const Languages = ({ languages }) => (
  <div className="mb-2">
    <div className="flex flex-wrap gap-0.5">
      {languages.map((lang, index) => (
        <span key={index} className="text-[9px] bg-gray-100 text-gray-700 px-1 py-0.5 rounded">
          {lang}
        </span>
      ))}
    </div>
  </div>
);

const Availability = ({ available, nextAvailable }) => {
  if (!available) return null;
  
  return (
    <div className="bg-green-50 border border-green-200 rounded p-1 mb-2 text-center">
      <p className="text-[9px] text-green-800">
        Disponible: <strong>{nextAvailable}</strong>
      </p>
    </div>
  );
};

const PriceAndContact = ({ price, onContact }) => (
  <div className="flex items-center justify-between mt-auto">
    <span className="text-xs font-bold text-gray-900">{price} DA</span>
    <button 
      onClick={onContact}
      className="bg-[#00796B] hover:bg-[#00695C] text-white text-[10px] font-medium px-2 py-1 rounded flex items-center gap-0.5 transition-colors"
    >
      <FiPhone className="text-[8px]" />
      Contacter
    </button>
  </div>
);

export default PsychiatristCard;