import React from "react";
import { FiPhone, FiMessageCircle, FiCalendar, FiX } from "react-icons/fi";

const ContactModal = ({ isOpen, onClose, psychiatrist }) => {
  if (!isOpen || !psychiatrist) return null;

  // Fermer le modal en cliquant sur le fond
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg border border-gray-200 shadow-lg max-w-md w-full p-4 relative">
        <ModalHeader name={psychiatrist.name} onClose={onClose} />
        <ContactOptions />
        <AvailabilityInfo nextAvailable={psychiatrist.nextAvailable} />
      </div>
    </div>
  );
};

const ModalHeader = ({ name, onClose }) => (
  <div className="flex justify-between items-center mb-4">
    <h3 id="modal-title" className="text-sm font-bold text-gray-900">Contacter {name}</h3>
    <button 
      onClick={onClose} 
      className="text-gray-500 hover:text-gray-700 transition-colors"
    >
      <FiX className="text-sm" />
    </button>
  </div>
);

const ContactOptions = () => (
  <div className="space-y-2">
    <ContactButton 
      icon={FiPhone} 
      text="Appeler maintenant" 
      className="bg-[#00796B] text-white hover:bg-[#00695C]" 
    />
    <ContactButton 
      icon={FiMessageCircle} 
      text="Envoyer un message" 
      className="border border-[#00796B] text-[#00796B] hover:bg-[#00796B] hover:text-white" 
    />
    <ContactButton 
      icon={FiCalendar} 
      text="Réserver une séance" 
      className="border border-gray-300 text-gray-700 hover:bg-gray-50" 
    />
  </div>
);

const ContactButton = ({ icon: Icon, text, className }) => {
  return (
    <button className={`w-full py-2 rounded text-xs font-semibold transition-colors flex items-center justify-center space-x-1 ${className}`}>
      <Icon className="text-[10px]" />
      <span>{text}</span>
    </button>
  );
};

const AvailabilityInfo = ({ nextAvailable }) => {
  if (!nextAvailable) return null;

  return (
    <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-center">
      <p className="text-[10px] text-green-800">
        Prochaine disponibilité: <strong>{nextAvailable}</strong>
      </p>
    </div>
  );
};

export default ContactModal;