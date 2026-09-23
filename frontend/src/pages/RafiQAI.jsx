import React, { useState, useRef, useEffect } from "react";
import { FiArrowUp, FiTrash2 } from "react-icons/fi";

const SUGGESTIONS = [
  "Je me sens stressé",
  "J'ai du mal à dormir",
  "Je me sens anxieux",
  "Propose-moi une respiration",
];

function getAiReply(userText) {
  const t = userText.toLowerCase();
  if (t.includes("stress") || t.includes("stressé")) {
    return "Le stress est une réaction normale. Essayez 5 minutes de cohérence cardiaque : inspirez 5 secondes, expirez 5 secondes. Voulez-vous que je vous guide pas à pas ?";
  }
  if (t.includes("sommeil") || t.includes("dormir") || t.includes("insomnie")) {
    return "Pour le sommeil, évitez les écrans 30 min avant de vous coucher et essayez une routine calme. Souhaitez-vous des conseils plus précis ?";
  }
  if (t.includes("anxi") || t.includes("angoiss")) {
    return "L'anxiété peut être difficile à porter seul. Nommer ce que vous ressentez est déjà un premier pas. Voulez-vous en parler un peu plus, ou préférer un exercice de calme ?";
  }
  if (t.includes("respir") || t.includes("détente") || t.includes("relax")) {
    return "Exercice simple : inspirez par le nez (4 sec), retenez (4 sec), expirez par la bouche (6 sec). Répétez 5 fois. Dites-moi comment vous vous sentez après.";
  }
  if (t.includes("seul") || t.includes("perdu") || t.includes("fatigué") || t.includes("fatigue")) {
    return "Merci de me le dire. C'est déjà une bonne étape d'en parler. Vous voulez que je vous aide à comprendre ce sentiment, ou que je propose une petite activité apaisante ?";
  }
  return "Merci de me le dire. Je suis là pour vous écouter. Parlez-moi davantage de ce que vous ressentez, sans jugement.";
}

const RafiQAI = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendText = (text) => {
    const trimmed = (text || "").trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [...prev, { type: "user", text: trimmed }]);
    setMessage("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: getAiReply(trimmed) },
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleSend = () => sendText(message);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    if (messages.length === 0) return;
    if (!window.confirm("Effacer la conversation ?")) return;
    setMessages([]);
    setIsTyping(false);
  };

  return (
    <div className="h-[calc(100vh-7.5rem)] lg:h-[calc(100vh-4rem)] bg-[#f8fafb] flex flex-col relative">
      {/* Header */}
      <div className="flex-shrink-0 text-center pt-3 pb-2 px-3 sm:px-4 border-b border-gray-100 bg-[#f8fafb]">
        <div className="flex items-center justify-center gap-2 relative">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">RafiQ AI</h1>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-0 p-1.5 text-gray-400 hover:text-red-500 rounded"
              title="Effacer"
            >
              <FiTrash2 className="text-sm" />
            </button>
          )}
        </div>
        <p className="mt-0.5 text-[11px] sm:text-xs text-gray-600 px-2">
          Je suis là pour vous écouter. Posez-moi n&apos;importe quelle question.
        </p>
      </div>

      {/* Chat scrollable */}
      <div className="flex-1 overflow-y-auto min-h-0 w-full max-w-3xl mx-auto px-3 sm:px-4 py-3">
        {messages.length === 0 && (
          <div className="space-y-3 mb-4">
            <div className="flex justify-end">
              <div className="bg-[#008f83] text-white px-3 py-2 rounded-2xl rounded-br-md text-xs max-w-[85%] sm:max-w-xs shadow-sm">
                je me sens un peu perdu et fatigué
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-3 py-2.5 text-xs text-gray-800 max-w-[85%] sm:max-w-md shadow-sm">
                <p className="font-semibold mb-0.5">Merci de me le dire</p>
                <p>C&apos;est déjà une bonne étape d&apos;en parler.</p>
                <p className="mt-1">
                  Vous voulez que je vous aide à comprendre pourquoi vous vous
                  sentez ainsi, ou que je vous propose une activité relaxante ?
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                "flex " + (msg.type === "user" ? "justify-end" : "justify-start")
              }
            >
              <div
                className={
                  msg.type === "user"
                    ? "bg-[#008f83] text-white px-3 py-2 rounded-2xl rounded-br-md text-xs max-w-[85%] sm:max-w-md shadow-sm break-words"
                    : "bg-white border border-gray-200 rounded-2xl rounded-bl-md px-3 py-2.5 text-xs text-gray-800 max-w-[85%] sm:max-w-md shadow-sm break-words"
                }
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-3 py-2.5 text-xs text-gray-500 shadow-sm">
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  />
                </span>
              </div>
            </div>
          )}
        </div>
        <div ref={bottomRef} className="h-2" />
      </div>

      {/* Suggestions */}
      {messages.length === 0 && (
        <div className="flex-shrink-0 px-3 sm:px-4 pb-2 max-w-3xl mx-auto w-full">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => sendText(s)}
                className="text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-[#008f83] hover:text-[#008f83] transition"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* INPUT — au-dessus de la bottom nav mobile (h-14 = 3.5rem) */}
      <div className="flex-shrink-0 bg-[#f8fafb] border-t border-gray-100 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-full shadow-sm px-3 py-1.5 flex items-center gap-2">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Parlez-moi de ce que vous ressentez…"
              rows={1}
              className="flex-1 resize-none outline-none text-xs text-gray-700 placeholder-gray-400 bg-transparent py-1.5 max-h-20 min-w-0"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!message.trim() || isTyping}
              className={
                "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition " +
                (message.trim() && !isTyping
                  ? "bg-[#008f83] hover:bg-[#00796b] text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed")
              }
              aria-label="Envoyer"
            >
              <FiArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RafiQAI;