import React, { useState, useMemo } from "react";
import CreatePost from "../Components/CreatePost";
import Post from "../Components/Post";
import RightSidebar from "../Components/RightSidebar";
import PostModal from "../Components/PostModal";
import { FiInbox, FiSearch } from "react-icons/fi";

const formatRelative = (isoOrLabel) => {
  if (!isoOrLabel) return "";
  if (
    typeof isoOrLabel === "string" &&
    !isoOrLabel.includes("T") &&
    isoOrLabel.length < 12
  ) {
    return isoOrLabel;
  }
  const d = new Date(isoOrLabel);
  if (Number.isNaN(d.getTime())) return String(isoOrLabel);
  const diff = Date.now() - d.getTime();
  const min = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (min < 1) return "À l'instant";
  if (min < 60) return `il y a ${min} min`;
  if (h < 24) return `il y a ${h} h`;
  if (days === 1) return "hier";
  if (days < 7) return `il y a ${days} j`;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
};

const INITIAL_POSTS = [
  {
    id: 1,
    user: {
      name: "Dr. Maroua Djili",
      avatar: "https://randomuser.me/api/portraits/women/41.jpg",
      role: "Psychiatre",
      verified: true,
    },
    content:
      "Aujourd'hui, je voulais partager avec vous quelques techniques de respiration pour gérer le stress. La cohérence cardiaque est une méthode simple et efficace : 5 secondes d'inspiration, 5 secondes d'expiration, pendant 5 minutes.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 24,
    comments: 2,
    shares: 3,
    isLiked: false,
    isSaved: false,
    commentsList: [
      {
        id: 1,
        user: "Ahmed Ali",
        text: "Merci pour ce conseil Docteur ! Je vais essayer dès aujourd'hui.",
        createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        likes: 2,
        isLiked: false,
      },
      {
        id: 2,
        user: "Inas Chaala",
        text: "Je pratique cette technique depuis 2 semaines et je vois déjà la différence !",
        createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        likes: 5,
        isLiked: false,
      },
    ],
  },
  {
    id: 2,
    user: {
      name: "Groupe Méditation",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      role: "Groupe de soutien",
      verified: true,
    },
    content:
      "Séance de méditation guidée ce soir à 20h. Thème : lâcher prise et acceptation. Rejoignez-nous pour 30 minutes de détente. Accessible à tous les niveaux.",
    image: null,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: 42,
    comments: 1,
    shares: 7,
    isLiked: true,
    isSaved: true,
    commentsList: [
      {
        id: 1,
        user: "Fares Chaima",
        text: "Parfait timing, j'en avais besoin aujourd'hui !",
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        likes: 3,
        isLiked: false,
      },
    ],
  },
  {
    id: 3,
    user: {
      name: "Sara Ahmadi",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      role: "Coach bien-être",
      verified: false,
    },
    content:
      "Petit rappel : prendre 10 minutes pour soi n'est pas un luxe, c'est une nécessité. Comment prenez-vous soin de vous aujourd'hui ?",
    image: null,
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    likes: 18,
    comments: 0,
    shares: 2,
    isLiked: false,
    isSaved: false,
    commentsList: [],
  },
];

const Home = ({ groups }) => {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [showPostModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const CURRENT_USER = {
    name: "Ahmed Ali",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    role: "Membre",
    verified: false,
  };

  const displayPosts = useMemo(() => {
    let list = posts.map((p) => ({
      ...p,
      timestamp: formatRelative(p.createdAt || p.timestamp),
      commentsList: (p.commentsList || []).map((c) => ({
        ...c,
        time: formatRelative(c.createdAt || c.time),
      })),
    }));

    const q = search.toLowerCase().trim();
    if (q) {
      list = list.filter(
        (p) =>
          (p.content || "").toLowerCase().includes(q) ||
          (p.user?.name || "").toLowerCase().includes(q)
      );
    }

    if (filter === "saved") {
      list = list.filter((p) => p.isSaved);
    } else if (filter === "mine") {
      list = list.filter((p) => p.user?.name === CURRENT_USER.name);
    }

    return list;
  }, [posts, search, filter]);

  const handleCreatePost = (newPostData) => {
    const newPostObj = {
      id: Date.now(),
      user: { ...CURRENT_USER },
      content: newPostData.content || "",
      image: newPostData.image || null,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isSaved: false,
      commentsList: [],
    };
    setPosts((prev) => [newPostObj, ...prev]);
    showToast("Publication créée");
  };

  const handleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleSave = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, isSaved: !post.isSaved } : post
      )
    );
    const post = posts.find((p) => p.id === postId);
    if (post && !post.isSaved) showToast("Enregistré dans les favoris");
    else showToast("Retiré des favoris");
  };

  const handleShare = async (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      )
    );
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Lien copié");
      } else {
        showToast("Publication partagée");
      }
    } catch {
      showToast("Publication partagée");
    }
  };

  const handleAddComment = (postId, commentText) => {
    if (!commentText.trim()) return;
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments + 1,
              commentsList: [
                ...(post.commentsList || []),
                {
                  id: Date.now(),
                  user: "Vous",
                  text: commentText.trim(),
                  createdAt: new Date().toISOString(),
                  likes: 0,
                  isLiked: false,
                },
              ],
            }
          : post
      )
    );
  };

  const handleLikeComment = (postId, commentId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              commentsList: (post.commentsList || []).map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      isLiked: !comment.isLiked,
                      likes: comment.isLiked
                        ? comment.likes - 1
                        : comment.likes + 1,
                    }
                  : comment
              ),
            }
          : post
      )
    );
  };

  const handleDeletePost = (postId) => {
    if (!window.confirm("Supprimer cette publication ?")) return;
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    showToast("Publication supprimée");
  };

  return (
    <div className="flex relative w-full min-w-0">
      {toast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-[11px] sm:text-xs px-3 py-1.5 rounded-full shadow-lg max-w-[90vw] text-center">
          {toast}
        </div>
      )}

      {/* Fil d'actualité */}
      <div className="flex-1 flex justify-center min-w-0">
        <div className="w-full max-w-2xl px-2 sm:px-3 md:px-4">
          <div className="space-y-2 sm:space-y-3 pb-2">
            <CreatePost onShowModal={() => setShowModal(true)} />

            {/* Recherche + filtres */}
            <div className="bg-white border border-gray-200 rounded-lg p-1.5 sm:p-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-1.5 sm:gap-2">
              <div className="flex items-center bg-gray-100 rounded-full px-2.5 h-8 flex-1 min-w-0">
                <FiSearch className="text-gray-400 text-xs mr-1.5 flex-shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher..."
                  className="bg-transparent outline-none text-[11px] sm:text-xs w-full min-w-0"
                />
              </div>
              <div className="flex gap-1 overflow-x-auto">
                {[
                  { id: "all", label: "Tout" },
                  { id: "saved", label: "Enreg." },
                  { id: "mine", label: "Mes posts" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    className={
                      "flex-shrink-0 px-2.5 py-1 text-[10px] rounded-full border whitespace-nowrap " +
                      (filter === f.id
                        ? "bg-[#30A196] text-white border-[#30A196]"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50")
                    }
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {displayPosts.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-10 text-center">
                <FiInbox className="mx-auto text-2xl sm:text-3xl text-gray-300 mb-2" />
                <p className="text-[11px] sm:text-xs text-gray-500 px-2">
                  {search || filter !== "all"
                    ? "Aucune publication ne correspond."
                    : "Aucune publication pour le moment. Soyez le premier !"}
                </p>
                {(search || filter !== "all") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setFilter("all");
                    }}
                    className="mt-2 text-[#30A196] text-[11px] sm:text-xs hover:underline"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>
            ) : (
              displayPosts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onSave={handleSave}
                  onShare={handleShare}
                  onAddComment={handleAddComment}
                  onLikeComment={handleLikeComment}
                  onDelete={handleDeletePost}
                  canDelete={post.user?.name === CURRENT_USER.name}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Sidebar droite — desktop seulement */}
      <div className="hidden lg:block flex-shrink-0">
        <RightSidebar groups={groups} />
      </div>

      {showPostModal && (
        <PostModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreatePost}
        />
      )}
    </div>
  );
};

export default Home;