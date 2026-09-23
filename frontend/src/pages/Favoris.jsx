import React, { useState, useEffect, useMemo } from "react";
import { usePsychiatrists } from "../Components/hooks/usePsychiatrists";
import PsychiatristCard from "../Components/PsychiatristCard";
import ContactModal from "../Components/ContactModal";
import {
  FiHeart,
  FiSearch,
  FiFileText,
  FiUser,
  FiBookmark,
  FiTrash2,
  FiBookOpen,
  FiX,
} from "react-icons/fi";

const POSTS_KEY = "rafiq_favorite_posts";
const ARTICLES_KEY = "rafiq_favorite_articles";

const DEFAULT_POSTS = [
  {
    id: 1,
    title: "Comprendre l'anxiété généralisée",
    excerpt:
      "Guide complet pour identifier et gérer les troubles anxieux au quotidien.",
    author: "Dr. Sara Ahmed",
    date: "15 Nov 2023",
    readTime: "5 min",
    category: "Santé Mentale",
    likes: 45,
    comments: 12,
  },
  {
    id: 2,
    title: "Les bienfaits de la méditation quotidienne",
    excerpt:
      "Comment intégrer la méditation dans votre routine pour améliorer votre bien-être.",
    author: "Dr. Karim Benali",
    date: "10 Nov 2023",
    readTime: "3 min",
    category: "Bien-être",
    likes: 89,
    comments: 23,
  },
  {
    id: 3,
    title: "Respiration et gestion du stress",
    excerpt:
      "Techniques simples de respiration pour calmer une crise d'anxiété en quelques minutes.",
    author: "Dr. Leila Mansour",
    date: "5 Nov 2023",
    readTime: "4 min",
    category: "Relaxation",
    likes: 62,
    comments: 8,
  },
];

const DEFAULT_ARTICLES = [
  {
    id: 1,
    title: "Nouvelles avancées en psychothérapie",
    excerpt:
      "Les dernières recherches sur les thérapies comportementales et cognitives.",
    source: "Journal de Psychologie",
    date: "20 Nov 2023",
    category: "Recherche",
  },
  {
    id: 2,
    title: "Gestion du stress au travail",
    excerpt:
      "Stratégies efficaces pour réduire le stress professionnel au quotidien.",
    source: "Santé Magazine",
    date: "18 Nov 2023",
    category: "Professionnel",
  },
];

function loadList(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveList(key, list) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

const Favoris = () => {
  const {
    selectedPsychiatrist,
    showModal,
    setShowModal,
    favorites,
    toggleFavorite,
    handleContact,
    handleShare,
    handleOpenDetail,
    favoritePsychiatristsList,
    toast: psyToast,
    showToast,
  } = usePsychiatrists();

  const [activeTab, setActiveTab] = useState("psychiatrists");
  const [searchTerm, setSearchTerm] = useState("");
  const [favoritePosts, setFavoritePosts] = useState(() =>
    loadList(POSTS_KEY, DEFAULT_POSTS)
  );
  const [favoriteArticles, setFavoriteArticles] = useState(() =>
    loadList(ARTICLES_KEY, DEFAULT_ARTICLES)
  );
  const [localToast, setLocalToast] = useState(null);

  useEffect(() => {
    saveList(POSTS_KEY, favoritePosts);
  }, [favoritePosts]);

  useEffect(() => {
    saveList(ARTICLES_KEY, favoriteArticles);
  }, [favoriteArticles]);

  const toast = localToast || psyToast;

  const showLocalToast = (msg) => {
    setLocalToast(msg);
    setTimeout(() => setLocalToast(null), 2500);
  };

  const removePost = (id) => {
    if (!window.confirm("Retirer ce post des favoris ?")) return;
    setFavoritePosts((prev) => prev.filter((p) => p.id !== id));
    showLocalToast("Post retiré des favoris");
  };

  const removeArticle = (id) => {
    if (!window.confirm("Retirer cet article des favoris ?")) return;
    setFavoriteArticles((prev) => prev.filter((a) => a.id !== id));
    showLocalToast("Article retiré des favoris");
  };

  const removePsychiatrist = (id) => {
    toggleFavorite(id);
    showLocalToast("Psychiatre retiré des favoris");
  };

  const term = searchTerm.toLowerCase().trim();

  const filteredPsychiatrists = useMemo(() => {
    const list = favoritePsychiatristsList || [];
    if (!term) return list;
    return list.filter(
      (psy) =>
        psy.name.toLowerCase().includes(term) ||
        psy.specialty.toLowerCase().includes(term) ||
        (psy.description || "").toLowerCase().includes(term) ||
        (psy.location || "").toLowerCase().includes(term)
    );
  }, [favoritePsychiatristsList, term]);

  const filteredPosts = useMemo(() => {
    if (!term) return favoritePosts;
    return favoritePosts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.author.toLowerCase().includes(term) ||
        post.category.toLowerCase().includes(term)
    );
  }, [favoritePosts, term]);

  const filteredArticles = useMemo(() => {
    if (!term) return favoriteArticles;
    return favoriteArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(term) ||
        article.excerpt.toLowerCase().includes(term) ||
        article.source.toLowerCase().includes(term) ||
        article.category.toLowerCase().includes(term)
    );
  }, [favoriteArticles, term]);

  const tabs = [
    {
      id: "psychiatrists",
      label: "Psychiatres",
      icon: FiUser,
      count: (favoritePsychiatristsList || []).length,
    },
    {
      id: "posts",
      label: "Posts",
      icon: FiFileText,
      count: favoritePosts.length,
    },
    {
      id: "articles",
      label: "Articles",
      icon: FiBookOpen,
      count: favoriteArticles.length,
    },
  ];

  const totalCount =
    (favoritePsychiatristsList || []).length +
    favoritePosts.length +
    favoriteArticles.length;

  const PostCard = ({ post }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[9px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              {post.category}
            </span>
            <span className="text-[9px] text-gray-500">{post.readTime}</span>
          </div>
          <h3 className="text-xs font-semibold text-gray-900 mb-1">
            {post.title}
          </h3>
          <p className="text-[10px] text-gray-600 mb-2 line-clamp-2">
            {post.excerpt}
          </p>
          <p className="text-[10px] text-gray-400">
            {post.author} • {post.date}
          </p>
        </div>
        <button
          type="button"
          onClick={() => removePost(post.id)}
          className="text-red-400 hover:text-red-600 p-1 flex-shrink-0"
          title="Retirer des favoris"
          aria-label="Retirer des favoris"
        >
          <FiHeart className="text-sm text-red-500" />
        </button>
      </div>
      <div className="flex items-center gap-3 text-[10px] text-gray-500 pt-2 border-t border-gray-100">
        <span>{post.likes} j'aime</span>
        <span>{post.comments} commentaires</span>
      </div>
    </div>
  );

  const ArticleCard = ({ article }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <span className="text-[9px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
            {article.category}
          </span>
          <h3 className="text-xs font-semibold text-gray-900 mt-1.5 mb-1">
            {article.title}
          </h3>
          <p className="text-[10px] text-gray-600 mb-2 line-clamp-2">
            {article.excerpt}
          </p>
          <p className="text-[10px] text-gray-400">
            {article.source} • {article.date}
          </p>
        </div>
        <button
          type="button"
          onClick={() => removeArticle(article.id)}
          className="text-red-400 hover:text-red-600 p-1 flex-shrink-0"
          title="Retirer des favoris"
          aria-label="Retirer des favoris"
        >
          <FiBookmark className="text-sm text-[#30A196]" />
        </button>
      </div>
    </div>
  );

  const EmptyState = ({ text }) => (
    <div className="col-span-full bg-white border border-gray-200 rounded-lg p-10 text-center">
      <FiHeart className="mx-auto text-3xl text-gray-300 mb-3" />
      <p className="text-xs text-gray-500 mb-1">{text}</p>
      <p className="text-[10px] text-gray-400">
        Ajoutez des éléments depuis les autres pages de l&apos;application.
      </p>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#f7f9fa] pb-8 relative">
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-xs px-4 py-2 rounded-full shadow-lg">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FiHeart className="text-red-500" />
              Mes favoris
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {totalCount} élément{totalCount !== 1 ? "s" : ""} sauvegardé
              {totalCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher dans vos favoris..."
            className="w-full pl-8 pr-8 py-2 text-xs bg-gray-100 rounded-lg outline-none focus:ring-1 focus:ring-[#30A196]"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <FiX className="text-xs" />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={
                "flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition-colors " +
                (activeTab === tab.id
                  ? "bg-[#30A196] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200")
              }
            >
              <tab.icon className="text-xs" />
              {tab.label}
              <span
                className={
                  "text-[10px] px-1.5 rounded-full " +
                  (activeTab === tab.id
                    ? "bg-white/20"
                    : "bg-gray-200 text-gray-600")
                }
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {activeTab === "psychiatrists" &&
          (filteredPsychiatrists.length === 0 ? (
            <EmptyState
              text={
                term
                  ? "Aucun psychiatre ne correspond à votre recherche."
                  : "Aucun psychiatre en favoris."
              }
            />
          ) : (
            filteredPsychiatrists.map((psy) => (
              <PsychiatristCard
                key={psy.id}
                psychiatrist={psy}
                isFavorite={favorites.includes(psy.id)}
                onToggleFavorite={removePsychiatrist}
                onContact={handleContact}
                onShare={handleShare}
                onOpenDetail={handleOpenDetail}
              />
            ))
          ))}

        {activeTab === "posts" &&
          (filteredPosts.length === 0 ? (
            <EmptyState
              text={
                term
                  ? "Aucun post ne correspond à votre recherche."
                  : "Aucun post en favoris."
              }
            />
          ) : (
            filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ))}

        {activeTab === "articles" &&
          (filteredArticles.length === 0 ? (
            <EmptyState
              text={
                term
                  ? "Aucun article ne correspond à votre recherche."
                  : "Aucun article en favoris."
              }
            />
          ) : (
            filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          ))}
      </div>

      {/* Contact modal */}
      {showModal && (
        <ContactModal
          isOpen={showModal}
          psychiatrist={selectedPsychiatrist}
          onClose={() => setShowModal(false)}
          onToast={showToast}
        />
      )}
    </div>
  );
};

export default Favoris;