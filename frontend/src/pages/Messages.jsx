import React, { useState, useRef, useEffect } from 'react';
import { 
  FiSearch, FiMoreVertical, FiImage, FiSmile, FiSend, FiVideo, 
  FiPhone, FiPaperclip, FiMic, FiMapPin, FiUser, FiCheck, 
  FiCheckCircle, FiMenu, FiX, FiArrowLeft
} from 'react-icons/fi';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [replyMessage, setReplyMessage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef(null);

  const [conversations, setConversations] = useState([
    {
      id: 1,
      user: { name: 'Dr. Sophie Martin', avatar: 'https://randomuser.me/api/portraits/women/41.jpg', role: 'Psychiatre', online: true, verified: true },
      messages: [
        { id: 1, text: 'Bonjour Ahmed, comment allez-vous aujourd\'hui ?', time: '10:30', isMe: false, status: 'delivered', type: 'text' },
        { id: 2, text: 'Bonjour Docteur, je vais beaucoup mieux depuis nos dernières séances.', time: '10:32', isMe: true, status: 'read', type: 'text' }
      ],
      unread: 0, pinned: true
    },
    {
      id: 2,
      user: { name: 'Groupe Méditation', avatar: 'https://randomuser.me/api/portraits/women/32.jpg', role: 'Groupe de soutien', online: true, verified: true },
      messages: [{ id: 1, text: 'Séance de méditation guidée ce soir à 20h !', time: '09:15', isMe: false, status: 'delivered', type: 'text' }],
      unread: 2, pinned: false
    },
    {
      id: 3,
      user: { name: 'Dr. Karim Benali', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', role: 'Psychologue', online: false, verified: true },
      messages: [{ id: 1, text: 'Votre prochain rendez-vous est confirmé pour jeudi.', time: 'Hier', isMe: false, status: 'delivered', type: 'text' }],
      unread: 1, pinned: false
    },
    {
      id: 4,
      user: { name: 'Sara Ahmadi', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', role: 'Coach bien-être', online: true, verified: false },
      messages: [{ id: 1, text: 'Bonjour ! Comment avancent vos objectifs cette semaine ?', time: '08:20', isMe: false, status: 'delivered', type: 'text' }],
      unread: 0, pinned: false
    },
    {
      id: 5,
      user: { name: 'Groupe Entraide', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', role: 'Communauté', online: true, verified: true },
      messages: [{ id: 1, text: 'Nouvelle discussion sur la gestion du stress au travail', time: '07:45', isMe: false, status: 'delivered', type: 'text' }],
      unread: 5, pinned: false
    },
    {
      id: 6,
      user: { name: 'Dr. Leila Mansour', avatar: 'https://randomuser.me/api/portraits/women/50.jpg', role: 'Thérapeute', online: false, verified: true },
      messages: [{ id: 1, text: 'Merci pour votre feedback sur notre dernière séance.', time: 'Lun', isMe: false, status: 'delivered', type: 'text' }],
      unread: 0, pinned: false
    },
    {
      id: 7,
      user: { name: 'Dr. Youssef Alami', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', role: 'Psychiatre', online: true, verified: true },
      messages: [{ id: 1, text: 'Rappel: votre séance est prévue demain à 14h.', time: '11:30', isMe: false, status: 'delivered', type: 'text' }],
      unread: 0, pinned: true
    },
    {
      id: 8,
      user: { name: 'Groupe Yoga', avatar: 'https://randomuser.me/api/portraits/women/55.jpg', role: 'Groupe d\'activité', online: true, verified: true },
      messages: [{ id: 1, text: 'Séance de yoga spéciale détente ce weekend !', time: '10:15', isMe: false, status: 'delivered', type: 'text' }],
      unread: 3, pinned: false
    },
    {
      id: 9,
      user: { name: 'Dr. Nadia Bennis', avatar: 'https://randomuser.me/api/portraits/women/60.jpg', role: 'Psychologue', online: false, verified: true },
      messages: [{ id: 1, text: 'J\'ai reçu vos exercices, excellent travail !', time: 'Hier', isMe: false, status: 'delivered', type: 'text' }],
      unread: 0, pinned: false
    },
    {
      id: 10,
      user: { name: 'Support RafiQ', avatar: 'https://randomuser.me/api/portraits/men/55.jpg', role: 'Assistance', online: true, verified: true },
      messages: [{ id: 1, text: 'Comment puis-je vous aider aujourd\'hui ?', time: '09:00', isMe: false, status: 'delivered', type: 'text' }],
      unread: 1, pinned: false
    }
  ]);

  const emojis = ['😊', '😂', '❤️', '👍', '🙏', '😍', '🔥', '💪'];

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => scrollToBottom(), [selectedChat?.messages, isTyping]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const messageData = {
        id: Date.now(),
        text: newMessage,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
        status: 'sent',
        type: 'text',
        replyTo: replyMessage
      };

      const updatedConversations = conversations.map(conv => 
        conv.id === selectedChat.id ? { ...conv, messages: [...conv.messages, messageData], unread: 0 } : conv
      );

      setConversations(updatedConversations);
      setSelectedChat(updatedConversations.find(conv => conv.id === selectedChat.id));
      setNewMessage('');
      setReplyMessage(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const markAsRead = (conversationId) => {
    setConversations(conversations.map(conv => 
      conv.id === conversationId ? { ...conv, unread: 0 } : conv
    ));
  };

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'read': return <FiCheckCircle className="text-[#30A196] text-xs" />;
      default: return <FiCheck className="text-gray-400 text-xs" />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] bg-white overflow-hidden rounded-lg border border-gray-200">
      {/* Chat Area - Main content */}
      <div className={`flex-1 flex flex-col overflow-hidden ${!selectedChat && 'hidden md:flex'}`}>
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button onClick={() => { setSelectedChat(null); setShowSidebar(true); }} className="md:hidden p-1 hover:bg-gray-100 rounded">
                    <FiArrowLeft className="text-gray-600 text-sm" />
                  </button>
                  <div className="relative">
                    <img src={selectedChat.user.avatar} alt={selectedChat.user.name} className="w-8 h-8 rounded-full border border-[#30A196] object-cover" />
                    {selectedChat.user.online && <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <h2 className="font-semibold text-sm text-gray-900">{selectedChat.user.name}</h2>
                      {selectedChat.user.verified && <span className="text-[#30A196] text-xs">✓</span>}
                    </div>
                    <p className="text-xs text-gray-500">{selectedChat.user.online ? 'En ligne' : 'Hors ligne'} • {selectedChat.user.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button className="p-1.5 text-gray-600 hover:text-[#30A196] hover:bg-gray-100 rounded">
                    <FiPhone className="text-xs" />
                  </button>
                  <button className="p-1.5 text-gray-600 hover:text-[#30A196] hover:bg-gray-100 rounded">
                    <FiVideo className="text-xs" />
                  </button>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded">
                    <FiMoreVertical className="text-xs" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-2">
              <div className="space-y-1.5">
                {selectedChat.messages.map(message => (
                  <div key={message.id} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] ${message.isMe ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-flex flex-col ${message.isMe ? 'bg-[#30A196] text-white rounded-lg rounded-br-sm' : 'bg-white text-gray-900 rounded-lg rounded-bl-sm border border-gray-200'}`}>
                        <div className="px-2.5 py-1.5">
                          <p className="text-xs leading-relaxed">{message.text}</p>
                        </div>
                        <div className={`px-2.5 pb-1 flex items-center space-x-1 ${message.isMe ? 'justify-between' : 'justify-end'}`}>
                          <span className="text-[10px] opacity-75">{message.time}</span>
                          {message.isMe && <div className="flex items-center">{getStatusIcon(message.status)}</div>}
                        </div>
                      </div>
                      {!message.isMe && (
                        <button onClick={() => setReplyMessage(message)} className="text-[10px] text-gray-500 hover:text-[#30A196] mt-0.5">
                          Répondre
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-lg rounded-bl-sm px-2.5 py-1.5">
                      <div className="flex items-center space-x-1">
                        <div className="flex space-x-0.5">
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <span className="text-[10px] text-gray-500">écriture...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Reply Preview */}
            {replyMessage && (
              <div className="bg-gray-100 border-t border-gray-200 p-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-500 font-medium">Répondre à {replyMessage.isMe ? 'vous' : selectedChat.user.name}</p>
                    <p className="text-xs text-gray-700 truncate">{replyMessage.text}</p>
                  </div>
                  <button onClick={() => setReplyMessage(null)} className="text-gray-400 hover:text-gray-600 text-sm ml-1">×</button>
                </div>
              </div>
            )}

            {/* Input */}
            <div className="bg-white border-t border-gray-200 p-2">
              <div className="flex items-end space-x-1">
                <div className="flex space-x-0.5">
                  <button className="p-1 text-gray-400 hover:text-[#30A196] hover:bg-gray-100 rounded">
                    <FiPaperclip className="text-xs" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-[#30A196] hover:bg-gray-100 rounded">
                    <FiImage className="text-xs" />
                  </button>
                </div>
                
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Écrivez votre message..."
                    rows="1"
                    className="w-full bg-gray-100 rounded-lg px-2.5 py-1.5 text-xs border-none outline-none focus:ring-1 focus:ring-[#30A196] resize-none"
                    style={{ minHeight: '32px', maxHeight: '72px' }}
                  />
                  {showEmojiPicker && (
                    <div className="absolute bottom-full mb-1 bg-white border border-gray-200 rounded p-1.5 shadow-lg">
                      <div className="grid grid-cols-4 gap-1">
                        {emojis.map((emoji, i) => (
                          <button key={i} onClick={() => { setNewMessage(prev => prev + emoji); setShowEmojiPicker(false); }} className="p-1 hover:bg-gray-100 rounded text-sm">
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-0.5">
                  <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="p-1 text-gray-400 hover:text-[#30A196] hover:bg-gray-100 rounded">
                    <FiSmile className="text-xs" />
                  </button>
                  <button onClick={handleSendMessage} disabled={!newMessage.trim()} className={`p-1 rounded ${newMessage.trim() ? 'bg-[#30A196] text-white hover:bg-[#00796B]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                    <FiSend className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                <FiSend className="text-lg text-gray-400" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Sélectionnez une conversation</h3>
              <p className="text-[10px] text-gray-500">Choisissez une discussion pour commencer à échanger</p>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar - À DROITE */}
      <div className={`${showSidebar ? 'w-full md:w-48' : 'hidden'} ${selectedChat && 'hidden md:flex'} bg-white border-l border-gray-200 flex flex-col`}>
        <div className="p-2 border-b border-gray-200">
          <div className="flex items-center justify-between mb-1.5">
            <h1 className="text-sm font-bold text-gray-900">Messages</h1>
            <button className="p-1 hover:bg-gray-100 rounded">
              <FiUser className="text-xs text-gray-600" />
            </button>
          </div>
          
          <div className="relative">
            <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-[10px]" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-6 pr-2 py-1 bg-gray-100 rounded text-[10px] border-none focus:outline-none focus:ring-1 focus:ring-[#30A196]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map(conversation => (
            <div
              key={conversation.id}
              onClick={() => {
                setSelectedChat(conversation);
                markAsRead(conversation.id);
                setShowSidebar(false);
              }}
              className={`p-1.5 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedChat?.id === conversation.id ? 'bg-[#30A196] bg-opacity-10 border-l-2 border-[#30A196]' : ''
              }`}
            >
              <div className="flex items-start space-x-2">
                <div className="relative flex-shrink-0">
                  <img src={conversation.user.avatar} alt={conversation.user.name} className="w-7 h-7 rounded-full object-cover" />
                  {conversation.user.online && <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-green-500 rounded-full border border-white"></div>}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center space-x-0.5">
                      <h3 className="font-semibold text-[10px] text-gray-900 truncate">{conversation.user.name}</h3>
                      {conversation.user.verified && <span className="text-[#30A196] text-[8px]">✓</span>}
                      {conversation.pinned && <span className="text-yellow-500 text-[8px]">📌</span>}
                    </div>
                    <span className="text-[8px] text-gray-500 whitespace-nowrap">
                      {conversation.messages[conversation.messages.length - 1].time}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-[8px] text-gray-500">{conversation.user.role}</p>
                    {conversation.unread > 0 && (
                      <span className="bg-[#30A196] text-white text-[8px] rounded-full px-1 py-0.5 min-w-3 text-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-[10px] text-gray-600 truncate mt-0.5">
                    {conversation.messages[conversation.messages.length - 1].text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;