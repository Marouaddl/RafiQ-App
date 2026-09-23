import React, { useState } from "react";
import {
  FiPhone,
  FiMessageCircle,
  FiCalendar,
  FiX,
  FiCheck,
  FiClock,
} from "react-icons/fi";

const ContactModal = ({ isOpen, onClose, psychiatrist, onToast }) => {
  const [mode, setMode] = useState("menu"); // menu | message | booking | success
  const [message, setMessage] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("10:00");
  const [bookingNote, setBookingNote] = useState("");

  if (!isOpen || !psychiatrist) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    setMode("menu");
    setMessage("");
    setBookingDate("");
    setBookingTime("10:00");
    setBookingNote("");
    onClose();
  };

  const handleCall = () => {
    const phone = psychiatrist.phone || "";
    if (phone) {
      window.location.href = `tel:${phone.replace(/\s/g, "")}`;
    }
    if (onToast) onToast(`Appel vers ${psychiatrist.name}…`);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMode("success");
    if (onToast) onToast("Message envoyé (simulation frontend)");
  };

  const handleBook = () => {
    if (!bookingDate) return;
    setMode("success");
    if (onToast)
      onToast(
        `Séance réservée le ${bookingDate} à ${bookingTime} (simulation)`
      );
  };

  const tomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg border border-gray-200 shadow-lg max-w-md w-full p-4 relative max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 id="modal-title" className="text-sm font-bold text-gray-900">
            {mode === "menu" && `Contacter ${psychiatrist.name}`}
            {mode === "message" && "Envoyer un message"}
            {mode === "booking" && "Réserver une séance"}
            {mode === "success" && "Confirmé"}
          </h3>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Fermer"
          >
            <FiX className="text-sm" />
          </button>
        </div>

        {/* Profil mini */}
        <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
          <img
            src={psychiatrist.image}
            alt={psychiatrist.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-xs font-semibold text-gray-900">
              {psychiatrist.name}
            </p>
            <p className="text-[10px] text-[#00796B]">{psychiatrist.specialty}</p>
          </div>
        </div>

        {mode === "menu" && (
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleCall}
              className="w-full py-2.5 rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 bg-[#00796B] text-white hover:bg-[#00695C]"
            >
              <FiPhone className="text-xs" />
              Appeler maintenant
              {psychiatrist.phone && (
                <span className="opacity-80 font-normal">
                  ({psychiatrist.phone})
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMode("message")}
              className="w-full py-2.5 rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-[#00796B] text-[#00796B] hover:bg-[#00796B] hover:text-white"
            >
              <FiMessageCircle className="text-xs" />
              Envoyer un message
            </button>
            <button
              type="button"
              onClick={() => setMode("booking")}
              className="w-full py-2.5 rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <FiCalendar className="text-xs" />
              Réserver une séance
            </button>

            {psychiatrist.nextAvailable && (
              <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-center">
                <p className="text-[10px] text-green-800 flex items-center justify-center gap-1">
                  <FiClock className="text-[10px]" />
                  Prochaine dispo : <strong>{psychiatrist.nextAvailable}</strong>
                </p>
              </div>
            )}
          </div>
        )}

        {mode === "message" && (
          <div className="space-y-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrivez votre message..."
              rows={4}
              className="w-full text-xs border border-gray-200 rounded-lg p-3 outline-none focus:border-[#00796B] resize-none"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode("menu")}
                className="flex-1 py-2 text-xs border border-gray-300 rounded-lg text-gray-600"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="flex-1 py-2 text-xs bg-[#00796B] text-white rounded-lg disabled:opacity-40"
              >
                Envoyer
              </button>
            </div>
          </div>
        )}

        {mode === "booking" && (
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] text-gray-600 mb-1">
                Date *
              </label>
              <input
                type="date"
                min={tomorrow()}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#00796B]"
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-600 mb-1">
                Heure
              </label>
              <select
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#00796B]"
              >
                {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"].map(
                  (t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-gray-600 mb-1">
                Note (optionnel)
              </label>
              <textarea
                value={bookingNote}
                onChange={(e) => setBookingNote(e.target.value)}
                rows={2}
                placeholder="Motif de la consultation..."
                className="w-full text-xs border border-gray-200 rounded-lg p-2 outline-none focus:border-[#00796B] resize-none"
              />
            </div>
            <p className="text-[10px] text-gray-500">
              Tarif : <strong>{psychiatrist.price} DA</strong> / séance
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode("menu")}
                className="flex-1 py-2 text-xs border border-gray-300 rounded-lg text-gray-600"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={handleBook}
                disabled={!bookingDate}
                className="flex-1 py-2 text-xs bg-[#00796B] text-white rounded-lg disabled:opacity-40"
              >
                Confirmer
              </button>
            </div>
          </div>
        )}

        {mode === "success" && (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiCheck className="text-green-600 text-xl" />
            </div>
            <p className="text-sm font-semibold text-gray-900 mb-1">
              Demande enregistrée
            </p>
            <p className="text-[11px] text-gray-500 mb-4">
              {psychiatrist.name} vous répondra dès que possible.
              <br />
              (Simulation frontend — pas d&apos;envoi réel)
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-[#00796B] text-white text-xs rounded-lg"
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;