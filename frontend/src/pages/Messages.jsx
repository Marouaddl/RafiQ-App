import React, { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiMoreVertical,
  FiImage,
  FiSmile,
  FiSend,
  FiVideo,
  FiPhone,
  FiPaperclip,
  FiCheck,
  FiCheckCircle,
  FiArrowLeft,
  FiX,
  FiTrash2,
  FiCornerUpLeft,
  FiBookmark,
  FiMoreHorizontal,
} from "react-icons/fi";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [replyMessage, setReplyMessage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [attachedImage, setAttachedImage] = useState(null);
  const [openMenuConvId, setOpenMenuConvId] = useState(null);
  const [openMsgMenuId, setOpenMsgMenuId] = useState(null);

  const messagesEndRef = useRef(null);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [conversations, setConversations] = useState([
    {
      id: 1,
      user: {
        name: "Dr. Sophie Martin",
        avatar: "https://randomuser.me/api/portraits/women/41.jpg",
        role: "Psychiatre",
        online: true,
        verified: true,
      },
      messages: [
        {
          id: 1,
          text: "Bonjour Ahmed, comment allez-vous aujourd'hui ?",
          time: "10:30",
          isMe: false,
          status: "delivered",
          type: "text",
        },
        {
          id: 2,
          text: "Bonjour Docteur, je vais beaucoup mieux depuis nos dernières séances.",
          time: "10:32",
          isMe: true,
          status: "read",
          type: "text",
        },
      ],
      unread: 0,
      pinned: true,
    },
    {
      id: 2,
      user: {
        name: "Groupe Méditation",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        role: "Groupe de soutien",
        online: true,
        verified: true,
      },
      messages: [
        {
          id: 1,
          text: "Séance de méditation guidée ce soir à 20h !",
          time: "09:15",
          isMe: false,
          status: "delivered",
          type: "text",
        },
      ],
      unread: 2,
      pinned: false,
    },
    {
      id: 3,
      user: {
        name: "Dr. Karim Benali",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        role: "Psychologue",
        online: false,
        verified: true,
      },
      messages: [
        {
          id: 1,
          text: "Votre prochain rendez-vous est confirmé pour jeudi.",
          time: "Hier",
          isMe: false,
          status: "delivered",
          type: "text",
        },
      ],
      unread: 1,
      pinned: false,
    },
    {
      id: 4,
      user: {
        name: "Sara Ahmadi",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        role: "Coach bien-être",
        online: true,
        verified: false,
      },
      messages: [
        {
          id: 1,
          text: "Bonjour ! Comment avancent vos objectifs cette semaine ?",
          time: "08:20",
          isMe: false,
          status: "delivered",
          type: "text",
        },
      ],
      unread: 0,
      pinned: false,
    },
    {
      id: 5,
      user: {
        name: "Groupe Entraide",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        role: "Communauté",
        online: true,
        verified: true,
      },
      messages: [
        {
          id: 1,
          text: "Nouvelle discussion sur la gestion du stress au travail",
          time: "07:45",
          isMe: false,
          status: "delivered",
          type: "text",
        },
      ],
      unread: 5,
      pinned: false,
    },
    {
      id: 6,
      user: {
        name: "Support RafiQ",
        avatar: "https://randomuser.me/api/portraits/men/55.jpg",
        role: "Assistance",
        online: true,
        verified: true,
      },
      messages: [
        {
          id: 1,
          text: "Comment puis-je vous aider aujourd'hui ?",
          time: "09:00",
          isMe: false,
          status: "delivered",
          type: "text",
        },
      ],
      unread: 1,
      pinned: false,
    },
  ]);

  const emojis = ["😊", "😂", "❤️", "👍", "🙏", "😍", "🔥", "💪", "😢", "🎉"];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages, isTyping, attachedImage]);

  // Fermer les menus au clic extérieur
  useEffect(() => {
    const close = () => {
      setOpenMenuConvId(null);
      setOpenMsgMenuId(null);
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const getCurrentTime = () =>
    new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

  // ==================================================
  // ENVOYER UN MESSAGE (texte et/ou image) — version stable
  // ==================================================
  const handleSendMessage = () => {
    try {
      const textValue = (newMessage || "").trim();
      if ((!textValue && !attachedImage) || !selectedChat) return;

      const chatId = selectedChat.id;

      const messageData = {
        id: Date.now(),
        text: textValue,
        image: attachedImage ? { url: attachedImage.url, name: attachedImage.name || "" } : null,
        time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
        isMe: true,
        status: "sent",
        type: "text",
        replyTo: replyMessage
          ? {
              id: replyMessage.id,
              text: replyMessage.text || "",
              isMe: !!replyMessage.isMe,
            }
          : null,
      };

      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id !== chatId) return conv;
          return {
            ...conv,
            messages: [...(conv.messages || []), messageData],
            unread: 0,
          };
        })
      );

      setSelectedChat((prev) => {
        if (!prev || prev.id !== chatId) return prev;
        return {
          ...prev,
          messages: [...(prev.messages || []), messageData],
          unread: 0,
        };
      });

      setNewMessage("");
      setReplyMessage(null);
      setAttachedImage(null);
      setShowEmojiPicker(false);
    } catch (err) {
      console.error("Erreur envoi message:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      handleSendMessage();
    }
  };

  // ==================================================
  // IMAGE ATTACHÉE
  // ==================================================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAttachedImage({ url, name: file.name });
    e.target.value = "";
  };

  const handleRemoveAttachedImage = () => {
    if (attachedImage?.url) URL.revokeObjectURL(attachedImage.url);
    setAttachedImage(null);
  };

  // ==================================================
  // SUPPRIMER UN MESSAGE
  // ==================================================
  const handleDeleteMessage = (messageId) => {
    if (!selectedChat) return;
    if (!window.confirm("Supprimer ce message ?")) return;

    const chatId = selectedChat.id;

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === chatId
          ? {
              ...conv,
              messages: (conv.messages || []).filter((m) => m.id !== messageId),
            }
          : conv
      )
    );
    setSelectedChat((prev) =>
      prev && prev.id === chatId
        ? {
            ...prev,
            messages: (prev.messages || []).filter((m) => m.id !== messageId),
          }
        : prev
    );
    setOpenMsgMenuId(null);
  };

  // ==================================================
  // ÉPINGLER / DÉSEPINGLER
  // ==================================================
  const handleTogglePin = (conversationId) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? { ...conv, pinned: !conv.pinned }
          : conv
      )
    );
    setSelectedChat((prev) =>
      prev && prev.id === conversationId
        ? { ...prev, pinned: !prev.pinned }
        : prev
    );
    setOpenMenuConvId(null);
  };

  // ==================================================
  // SUPPRIMER UNE CONVERSATION
  // ==================================================
  const handleDeleteConversation = (conversationId) => {
    if (!window.confirm("Supprimer cette conversation ?")) return;
    setConversations((prev) =>
      prev.filter((conv) => conv.id !== conversationId)
    );
    if (selectedChat?.id === conversationId) {
      setSelectedChat(null);
      setShowSidebar(true);
    }
    setOpenMenuConvId(null);
  };

  // ==================================================
  // MARQUER COMME LU
  // ==================================================
  const markAsRead = (conversationId) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, unread: 0 } : conv
      )
    );
  };

  // ==================================================
  // FILTRE + TRI (épinglés en premier)
  // ==================================================
  const filteredConversations = conversations
    .filter(
      (conv) =>
        conv.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });

  const getStatusIcon = (status) => {
    if (status === "read") {
      return <FiCheckCircle className="text-[#30A196] text-xs" />;
    }
    return <FiCheck className="text-gray-400 text-xs" />;
  };

  const canSend = newMessage.trim() || attachedImage;

  return (
    // AJOUT: w-full max-w-full overflow-x-hidden
    <div className="flex w-full max-w-full h-[calc(100vh-6rem)] h-[calc(100dvh-6rem)] bg-white overflow-hidden overflow-x-hidden rounded-lg border border-gray-200">
      {/* ========== ZONE CHAT ========== */}
      <div
        className={`flex-1 flex flex-col overflow-hidden min-w-0 ${
          !selectedChat && "hidden md:flex"
        }`}
      >
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-2 md:p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 min-w-0">
                  <button
                    onClick={() => {
                      setSelectedChat(null);
                      setShowSidebar(true);
                      setReplyMessage(null);
                      setAttachedImage(null);
                    }}
                    className="md:hidden p-2 -ml-1 hover:bg-gray-100 rounded flex-shrink-0"
                  >
                    <FiArrowLeft className="text-gray-600 text-base md:text-sm" />
                  </button>
                  <div className="relative flex-shrink-0">
                    <img
                      src={selectedChat.user?.avatar || ""}
                      alt={selectedChat.user?.name || ""}
                      className="w-9 h-9 md:w-8 md:h-8 rounded-full border border-[#30A196] object-cover"
                    />
                    {selectedChat.user?.online && (
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center space-x-1">
                      <h2 className="font-semibold text-sm md:text-sm text-gray-900 truncate">
                        {selectedChat.user?.name}
                      </h2>
                      {selectedChat.user?.verified && (
                        <span className="text-[#30A196] text-xs">✓</span>
                      )}
                    </div>
                    <p className="text-[11px] md:text-xs text-gray-500 truncate">
                      {selectedChat.user?.online ? "En ligne" : "Hors ligne"} • {selectedChat.user?.role || ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <button className="p-2 md:p-1.5 text-gray-600 hover:text-[#30A196] hover:bg-gray-100 rounded">
                    <FiPhone className="text-sm md:text-xs" />
                  </button>
                  <button className="p-2 md:p-1.5 text-gray-600 hover:text-[#30A196] hover:bg-gray-100 rounded">
                    <FiVideo className="text-sm md:text-xs" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuConvId(
                        openMenuConvId === selectedChat.id
                          ? null
                          : selectedChat.id
                      );
                    }}
                    className="p-2 md:p-1.5 text-gray-600 hover:bg-gray-100 rounded relative flex-shrink-0"
                  >
                    <FiMoreVertical className="text-sm md:text-xs" />
                    {openMenuConvId === selectedChat.id && (
                      <div
                        className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 w-44 md:w-40 py-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handleTogglePin(selectedChat.id)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                        >
                          <FiBookmark />
                          {selectedChat.pinned
                            ? "Désépingler"
                            : "Épingler"}
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteConversation(selectedChat.id)
                          }
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                        >
                          <FiTrash2 />
                          Supprimer
                        </button>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            {/* AJOUT: overflow-x-hidden */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain bg-gray-50 p-2 md:p-2">
              <div className="space-y-1.5">
                {(selectedChat.messages || []).length === 0 && (
                  <p className="text-center text-xs text-gray-400 py-8">
                    Aucun message. Envoyez le premier !
                  </p>
                )}

                {(selectedChat.messages || []).map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-[85%] relative group ${
                        message.isMe ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className={`inline-flex flex-col ${
                          message.isMe
                            ? "bg-[#30A196] text-white rounded-lg rounded-br-sm"
                            : "bg-white text-gray-900 rounded-lg rounded-bl-sm border border-gray-200"
                        }`}
                      >
                        {/* Reply quote */}
                        {message.replyTo && (
                          <div
                            className={`mx-2 mt-2 px-2 py-1 rounded text-left border-l-2 ${
                              message.isMe
                                ? "bg-white/20 border-white/60"
                                : "bg-gray-50 border-[#30A196]"
                            }`}
                          >
                            <p className="text-[9px] opacity-80 font-medium">
                              {message.replyTo.isMe
                                ? "Vous"
                                : selectedChat.user?.name}
                            </p>
                            <p className="text-[10px] opacity-90 truncate break-all">
                              {message.replyTo.text || "Image"}
                            </p>
                          </div>
                        )}

                        {/* Image */}
                        {message.image && (
                          <div className="px-1.5 pt-1.5">
                            <img
                              src={message.image.url}
                              alt={message.image.name || "Image"}
                              className="max-w-full max-h-48 rounded-md object-cover"
                            />
                          </div>
                        )}

                        {/* Texte */}
                        {message.text && (
                          <div className="px-2.5 py-1.5 md:px-2.5 md:py-1.5">
                            {/* AJOUT: break-words */}
                            <p className="text-[13px] md:text-xs leading-relaxed whitespace-pre-wrap break-words">
                              {message.text}
                            </p>
                          </div>
                        )}

                        <div
                          className={`px-2.5 pb-1 flex items-center space-x-1 ${
                            message.isMe ? "justify-between" : "justify-end"
                          }`}
                        >
                          <span className="text-[10px] opacity-75">
                            {message.time}
                          </span>
                          {message.isMe && (
                            <div className="flex items-center">
                              {getStatusIcon(message.status)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions message */}
                      <div
                        className={`flex items-center gap-2 mt-0.5 ${
                          message.isMe ? "justify-end" : "justify-start"
                        }`}
                      >
                        {!message.isMe && (
                          <button
                            onClick={() => setReplyMessage(message)}
                            className="text-[10px] text-gray-500 hover:text-[#30A196] flex items-center gap-0.5 py-1 md:py-0"
                          >
                            <FiCornerUpLeft className="text-[9px]" />
                            Répondre
                          </button>
                        )}
                        {message.isMe && (
                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                            className="text-[10px] text-gray-400 hover:text-red-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-1 md:p-0"
                            title="Supprimer"
                          >
                            <FiTrash2 className="text-[11px] md:text-[10px]" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-lg rounded-bl-sm px-2.5 py-1.5">
                      <div className="flex items-center space-x-1">
                        <div className="flex space-x-0.5">
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
                          <div
                            className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <div
                            className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </div>
                        <span className="text-[10px] text-gray-500">
                          écriture...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Aperçu réponse */}
            {replyMessage && (
              <div className="bg-gray-100 border-t border-gray-200 p-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-gray-500 font-medium">
                      Répondre à{" "}
                      {replyMessage.isMe ? "vous" : selectedChat.user?.name}
                    </p>
                    <p className="text-xs text-gray-700 truncate">
                      {replyMessage.text || "Image"}
                    </p>
                  </div>
                  <button
                    onClick={() => setReplyMessage(null)}
                    className="text-gray-400 hover:text-gray-600 text-sm ml-1 p-1 flex-shrink-0"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            )}

            {/* Aperçu image jointe */}
            {attachedImage && (
              <div className="bg-gray-50 border-t border-gray-200 p-2">
                <div className="relative inline-block max-w-full">
                  <img
                    src={attachedImage.url}
                    alt={attachedImage.name}
                    className="max-h-24 max-w-full rounded-md border border-gray-200"
                  />
                  <button
                    onClick={handleRemoveAttachedImage}
                    className="absolute -top-1.5 -right-1.5 w-6 h-6 md:w-5 md:h-5 bg-gray-900 text-white rounded-full flex items-center justify-center"
                  >
                    <FiX className="text-[10px]" />
                  </button>
                </div>
              </div>
            )}

            {/* Input */}
            <div className="bg-white border-t border-gray-200 p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:pb-2">
              <div className="flex items-end space-x-1">
                <div className="flex space-x-0.5 flex-shrink-0">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1.5 md:p-1 text-gray-400 hover:text-[#30A196] hover:bg-gray-100 rounded"
                    title="Joindre un fichier"
                  >
                    <FiPaperclip className="text-sm md:text-xs" />
                  </button>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <button
                    onClick={() => imageInputRef.current?.click()}
                    className="p-1.5 md:p-1 text-gray-400 hover:text-[#30A196] hover:bg-gray-100 rounded"
                    title="Envoyer une image"
                  >
                    <FiImage className="text-sm md:text-xs" />
                  </button>
                </div>

                <div className="flex-1 relative min-w-0">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Écrivez votre message..."
                    rows="1"
                    className="w-full bg-gray-100 rounded-lg px-3 py-2 md:px-2.5 md:py-1.5 text-[16px] md:text-xs border-none outline-none focus:ring-1 focus:ring-[#30A196] resize-none"
                    style={{ minHeight: "36px", maxHeight: "96px", minWidth: "0" }}
                  />
                  {showEmojiPicker && (
                    <div className="absolute bottom-full mb-1 left-0 bg-white border border-gray-200 rounded p-1.5 shadow-lg z-10 max-w-[calc(100vw-2rem)]">
                      <div className="grid grid-cols-5 gap-1">
                        {emojis.map((emoji, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setNewMessage((prev) => prev + emoji);
                              setShowEmojiPicker(false);
                            }}
                            className="p-1 hover:bg-gray-100 rounded text-base md:text-sm w-9 h-9 md:w-auto md:h-auto flex items-center justify-center"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-0.5 flex-shrink-0">
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-1.5 md:p-1 text-gray-400 hover:text-[#30A196] hover:bg-gray-100 rounded"
                  >
                    <FiSmile className="text-sm md:text-xs" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!canSend}
                    className={`p-2 md:p-1 rounded ${
                      canSend
                        ? "bg-[#30A196] text-white hover:bg-[#00796B]"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <FiSend className="text-sm md:text-xs" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
              <div className="w-12 h-12 md:w-10 md:h-10 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                <FiSend className="text-xl md:text-lg text-gray-400" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Sélectionnez une conversation
              </h3>
              <p className="text-[11px] md:text-[10px] text-gray-500">
                Choisissez une discussion pour commencer à échanger
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ========== SIDEBAR LISTE ========== */}
      <div
        className={`${showSidebar ? "w-full md:w-52" : "hidden"} ${
          selectedChat && "hidden md:flex"
        } bg-white border-l border-gray-200 flex flex-col min-w-0 max-w-full`}
      >
        <div className="p-2 md:p-2 border-b border-gray-200">
          <div className="flex items-center justify-between mb-1.5">
            <h1 className="text-base md:text-sm font-bold text-gray-900">Messages</h1>
          </div>
          <div className="relative">
            <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-[12px] md:text-[10px]" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-7 md:pl-6 pr-2 py-2 md:py-1 bg-gray-100 rounded text-[16px] md:text-[10px] border-none focus:outline-none focus:ring-1 focus:ring-[#30A196]"
            />
          </div>
        </div>

        {/* AJOUT: overflow-x-hidden */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
          {filteredConversations.length === 0 ? (
            <p className="text-center text-[10px] text-gray-400 py-6 px-2">
              Aucune conversation trouvée
            </p>
          ) : (
            filteredConversations.map((conversation) => {
              const lastMsg =
                conversation.messages[conversation.messages.length - 1];
              return (
                <div
                  key={conversation.id}
                  onClick={() => {
                    setSelectedChat(conversation);
                    markAsRead(conversation.id);
                    setShowSidebar(false);
                    setReplyMessage(null);
                    setAttachedImage(null);
                  }}
                  className={`p-2 md:p-1.5 border-b border-gray-100 cursor-pointer hover:bg-gray-50 relative overflow-hidden ${
                    selectedChat?.id === conversation.id
                      ? "bg-[#30A196] bg-opacity-10 border-l-2 border-[#30A196]"
                      : ""
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    <div className="relative flex-shrink-0">
                      <img
                        src={conversation.user.avatar}
                        alt={conversation.user.name}
                        className="w-10 h-10 md:w-7 md:h-7 rounded-full object-cover"
                      />
                      {conversation.user.online && (
                        <div className="absolute bottom-0 right-0 w-2 h-2 md:w-1.5 md:h-1.5 bg-green-500 rounded-full border border-white" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center space-x-0.5 min-w-0">
                          <h3 className="font-semibold text-[13px] md:text-[10px] text-gray-900 truncate">
                            {conversation.user.name}
                          </h3>
                          {conversation.user.verified && (
                            <span className="text-[#30A196] text-[10px] md:text-[8px]">
                              ✓
                            </span>
                          )}
                          {conversation.pinned && (
                            <span className="text-yellow-500 text-[10px] md:text-[8px]">
                              📌
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] md:text-[8px] text-gray-500 whitespace-nowrap ml-1">
                          {lastMsg?.time || ""}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-[11px] md:text-[8px] text-gray-500 truncate">
                          {conversation.user.role}
                        </p>
                        {conversation.unread > 0 && (
                          <span className="bg-[#30A196] text-white text-[10px] md:text-[8px] rounded-full px-1.5 md:px-1 py-0.5 min-w-4 md:min-w-3 text-center">
                            {conversation.unread}
                          </span>
                        )}
                      </div>

                      <p className="text-[12px] md:text-[10px] text-gray-600 truncate mt-0.5">
                        {lastMsg?.image && !lastMsg?.text
                          ? "📷 Image"
                          : lastMsg?.text || ""}
                      </p>
                    </div>

                    {/* Menu conversation */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuConvId(
                          openMenuConvId === conversation.id
                            ? null
                            : conversation.id
                        );
                      }}
                      className="p-1.5 md:p-0.5 text-gray-400 hover:text-gray-600 flex-shrink-0"
                    >
                      <FiMoreHorizontal className="text-base md:text-xs" />
                    </button>
                  </div>

                  {openMenuConvId === conversation.id && (
                    <div
                      className="absolute right-2 top-10 md:top-8 bg-white border border-gray-200 rounded-md shadow-lg z-20 w-40 md:w-36 py-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleTogglePin(conversation.id)}
                        className="w-full flex items-center gap-2 px-3 py-2 md:py-1.5 text-xs md:text-[10px] text-gray-700 hover:bg-gray-50"
                      >
                        <FiBookmark />
                        {conversation.pinned ? "Désépingler" : "Épingler"}
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteConversation(conversation.id)
                        }
                        className="w-full flex items-center gap-2 px-3 py-2 md:py-1.5 text-xs md:text-[10px] text-red-600 hover:bg-red-50"
                      >
                        <FiTrash2 />
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;