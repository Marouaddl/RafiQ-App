import React, { useState } from "react";
import { usePsychiatrists } from "../Components/hooks/usePsychiatrists";
import PsychiatristCard from "../Components/PsychiatristCard";
import ContactModal from "../Components/ContactModal";
import { FiHeart, FiArrowLeft, FiSearch, FiFileText, FiUser, FiBookmark } from "react-icons/fi";

const Favoris = () => {
  const {
    selectedPsychiatrist,
    showModal,
    setShowModal,
    favorites,
    toggleFavorite,
    handleContact,
    handleShare
  } = usePsychiatrists();

  const [activeTab, setActiveTab] = useState("psychiatrists");
  const [searchTerm, setSearchTerm] = useState("");

  // Données mock pour les posts favoris
  const favoritePosts = [
    {
      id: 1,
      title: "Comprendre l'anxiété généralisée",
      excerpt: "Guide complet pour identifier et gérer les troubles anxieux...",
      author: "Dr. Sara Ahmed",
      date: "15 Nov 2023",
      readTime: "5 min",
      category: "Santé Mentale",
      likes: 45,
      comments: 12
    },
    {
      id: 2,
      title: "Les bienfaits de la méditation quotidienne",
      excerpt: "Comment intégrer la méditation dans votre routine pour améliorer votre bien-être...",
      author: "Dr. Karim Benali",
      date: "10 Nov 2023",
      readTime: "3 min",
      category: "Bien-être",
      likes: 89,
      comments: 23
    }
  ];

  // Données mock pour les articles favoris
  const favoriteArticles = [
    {
      id: 1,
      title: "Nouvelles avancées en psychothérapie",
      excerpt: "Les dernières recherches sur les thérapies comportementales...",
      source: "Journal de Psychologie",
      date: "20 Nov 2023",
      category: "Recherche"
    },
    {
      id: 2,
      title: "Gestion du stress au travail",
      excerpt: "Stratégies efficaces pour réduire le stress professionnel...",
      source: "Santé Magazine",
      date: "18 Nov 2023",
      category: "Professionnel"
    }
  ];

  // Filtrer les psychiatres favoris
  const favoritePsychiatrists = [
    {
      id: 1,
      name: "Dr. Sara Ahmed",
      specialty: "Psychiatre",
      description: "Spécialiste en thérapie cognitive et troubles anxieux avec 8 ans d'expérience",
      rating: 4.8,
      reviews: 127,
      experience: "8 ans",
      location: "Alger Centre",
      price: 2500,
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      available: true,
      online: true,
      languages: ["Français", "Arabe"],
      nextAvailable: "Aujourd'hui 14:00",
      responseTime: "15 min",
      verified: true
    },
    {
      id: 2,
      name: "Dr. Karim Benali",
      specialty: "Psychologue",
      description: "Expert en thérapie comportementale et gestion du stress",
      rating: 4.6,
      reviews: 89,
      experience: "6 ans",
      location: "Hydra",
      price: 2000,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      available: true,
      online: false,
      languages: ["Français", "Arabe"],
      nextAvailable: "Demain 10:00",
      responseTime: "30 min",
      verified: true
    }
  ];

  // Fonction de recherche selon l'onglet actif
  const getFilteredContent = () => {
    const term = searchTerm.toLowerCase();
    
    switch (activeTab) {
      case "psychiatrists":
        return favoritePsychiatrists.filter(psy =>
          psy.name.toLowerCase().includes(term) ||
          psy.specialty.toLowerCase().includes(term) ||
          psy.description.toLowerCase().includes(term)
        );
      case "posts":
        return favoritePosts.filter(post =>
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          post.author.toLowerCase().includes(term)
        );
      case "articles":
        return favoriteArticles.filter(article =>
          article.title.toLowerCase().includes(term) ||
          article.excerpt.toLowerCase().includes(term) ||
          article.source.toLowerCase().includes(term)
        );
      default:
        return [];
    }
  };

  const filteredContent = getFilteredContent();

  // Composant pour les posts favoris
  const PostCard = ({ post }) => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              {post.category}
            </span>
            <span className="text-[9px] text-gray-500">{post.readTime}</span>
          </div>
          <h3 className="text-xs font-semibold text-gray-900 mb-1">{post.title}</h3>
          <p className="text-[10px] text-gray-600 mb-2 line-clamp-2">{post.excerpt}</p>
        </div>
        <button 
          onClick={() => {/* Logique pour retirer des favoris */}}
          className="text-red-500 hover:text-red-600 transition-colors ml-2"
        >
          <FiHeart className="text-xs fill-red-500" />
        </button>
      </div>
      
      <div className="flex items-center justify-between text-[10px] text-gray-500">
        <div className="flex items-center gap-1">
          <FiUser className="text-[8px]" />
          <span>{post.author}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>{post.date}</span>
          <div className="flex items-center gap-1">
            <FiHeart className="text-[8px]" />
            <span>{post.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Composant pour les articles favoris
  const ArticleCard = ({ article }) => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              {article.category}
            </span>
          </div>
          <h3 className="text-xs font-semibold text-gray-900 mb-1">{article.title}</h3>
          <p className="text-[10px] text-gray-600 mb-2 line-clamp-2">{article.excerpt}</p>
        </div>
        <button 
          onClick={() => {/* Logique pour retirer des favoris */}}
          className="text-red-500 hover:text-red-600 transition-colors ml-2"
        >
          <FiBookmark className="text-xs fill-red-500" />
        </button>
      </div>
      
      <div className="flex items-center justify-between text-[10px] text-gray-500">
        <span>{article.source}</span>
        <span>{article.date}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      {/* Header Personnalisé */}
      <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => window.history.back()}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FiArrowLeft className="text-sm" />
              </button>
              <div className="flex items-center gap-2">
                <div className="bg-[#00796B] bg-opacity-10 p-1.5 rounded-full">
                  <FiHeart className="text-[#00796B] text-sm" />
                </div>
                <div>
                  <h1 className="text-sm font-bold text-gray-900">Mes Favoris</h1>
                  <p className="text-[10px] text-gray-500">
                    {filteredContent.length} élément{filteredContent.length > 1 ? 's' : ''} sauvegardé{filteredContent.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="relative flex-1 sm:w-64">
                <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder={`Rechercher dans mes ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-6 pr-3 py-1 text-xs rounded bg-gray-100 border-none focus:outline-none focus:ring-1 focus:ring-[#00796B]"
                />
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex space-x-1 border-b border-gray-200">
            {[
              { id: "psychiatrists", label: "Psychiatres", icon: FiUser, count: favoritePsychiatrists.length },
              { id: "posts", label: "Posts", icon: FiFileText, count: favoritePosts.length },
              { id: "articles", label: "Articles", icon: FiBookmark, count: favoriteArticles.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 px-3 py-2 text-xs font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? "text-[#00796B]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="text-xs" />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1 py-0.5 rounded ${
                  activeTab === tab.id
                    ? "bg-[#00796B] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {tab.count}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00796B]"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu Principal */}
      <div className="max-w-6xl mx-auto w-full flex-1 p-4">
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeTab === "psychiatrists" &&
              filteredContent.map((psy) => (
                <PsychiatristCard
                  key={psy.id}
                  psychiatrist={psy}
                  isFavorite={true}
                  onToggleFavorite={toggleFavorite}
                  onContact={handleContact}
                  onShare={handleShare}
                />
              ))}
            
            {activeTab === "posts" &&
              filteredContent.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            
            {activeTab === "articles" &&
              filteredContent.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
          </div>
        ) : (
          // État vide
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-[#00796B] bg-opacity-10 p-4 rounded-full mb-4">
              <FiHeart className="text-[#00796B] text-2xl" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Aucun {activeTab} en favoris
            </h3>
            <p className="text-xs text-gray-600 max-w-md mb-4">
              {activeTab === "psychiatrists" && "Ajoutez des psychiatres à vos favoris pour les retrouver facilement."}
              {activeTab === "posts" && "Sauvegardez des posts intéressants pour les relire plus tard."}
              {activeTab === "articles" && "Ajoutez des articles à vos favoris pour les consulter ultérieurement."}
            </p>
            <button 
              onClick={() => window.history.back()}
              className="bg-[#00796B] text-white text-xs font-medium px-4 py-2 rounded hover:bg-[#00695C] transition-colors"
            >
              Explorer le contenu
            </button>
          </div>
        )}
      </div>

      {/* Modal de Contact */}
      {showModal && (
        <ContactModal
          psychiatrist={selectedPsychiatrist}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Favoris;