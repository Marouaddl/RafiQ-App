import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  FiUser,
  FiEdit3,
  FiCamera,
  FiSettings,
  FiBookmark,
  FiHeart,
  FiShare2,
  FiMessageCircle,
  FiUsers,
  FiVideo,
  FiImage,
  FiPlus,
  FiGrid,
  FiList,
  FiCalendar,
  FiAward,
  FiLock,
  FiGlobe,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiEye,
  FiEyeOff,
  FiTrash2,
  FiBarChart2,
  FiFilter,
  FiSearch,
  FiLogOut,
  FiX,
  FiCheck,
} from "react-icons/fi";

const Profile = ({ user }) => {
  const isPro = user?.role === "psychiatre";
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditing, setIsEditing] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showSavedContent, setShowSavedContent] = useState(false);
  const [showGroupManagement, setShowGroupManagement] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [showActivityHistory, setShowActivityHistory] = useState(false);
  const [showFollowers, setShowFollowers] = useState(null); // 'followers' | 'following' | null
  const [viewMode, setViewMode] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [toast, setToast] = useState(null);

  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [newPostPrivacy, setNewPostPrivacy] = useState("public");
  const [newGroupData, setNewGroupData] = useState({
    name: "",
    description: "",
    isPrivate: false,
  });

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const postImageRef = useRef(null);

  const [userProfile, setUserProfile] = useState({
    name: "Ahmed Ali",
    username: "@ahmedali",
    bio: "Passionné par le bien-être mental et le développement personnel. Je partage mon parcours et mes découvertes.",
    location: "Alger, Algérie",
    email: "ahmed.ali@example.com",
    phone: "+213 123 456 789",
    joinDate: "Membre depuis Octobre 2023",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    cover:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    specialty: "Psychiatre",
    registrationNumber: "",
    price: 2500,
    experience: "",
    availability: "Lun–Ven 9h–17h",
    stats: {
      posts: 3,
      followers: 345,
      following: 156,
      groups: 3,
    },
    privacy: {
      profile: "public",
      posts: "public",
      groups: "friends",
    },
    notifications: {
      email: true,
      push: false,
    },
  });

  const [editForm, setEditForm] = useState({ ...userProfile });

  // Sync depuis le compte connecté
  useEffect(() => {
    if (!user) return;
    setUserProfile((prev) => ({
      ...prev,
      name: user.name || prev.name,
      email: user.email || prev.email,
      username: user.email
        ? `@${String(user.email).split("@")[0]}`
        : prev.username,
      registrationNumber:
        user.registrationNumber || prev.registrationNumber || "",
    }));
  }, [user?.id, user?.email, user?.name]);

  const [userPosts, setUserPosts] = useState([
    {
      id: 1,
      type: "text",
      title: "Mon parcours avec l'anxiété",
      content:
        "Aujourd'hui, je veux partager mon expérience avec l'anxiété et comment j'ai appris à la gérer au quotidien.",
      likes: 45,
      comments: 12,
      shares: 5,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      category: "Santé Mentale",
      privacy: "public",
      isLiked: false,
      isSaved: false,
      tags: ["anxiété", "méditation", "bien-être"],
      image: null,
    },
    {
      id: 2,
      type: "image",
      title: "Moment de méditation",
      content: "Un beau moment de paix ce matin. La nature nous offre tant de sérénité.",
      image:
        "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400",
      likes: 89,
      comments: 23,
      shares: 8,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      category: "Bien-être",
      privacy: "public",
      isLiked: true,
      isSaved: true,
      tags: ["méditation", "nature"],
    },
    {
      id: 3,
      type: "video",
      title: "Exercice de respiration",
      content: "Une technique simple pour calmer l'anxiété en 5 minutes.",
      videoThumbnail:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
      likes: 156,
      comments: 34,
      shares: 15,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      category: "Exercices",
      privacy: "private",
      isLiked: false,
      isSaved: false,
      tags: ["respiration", "relaxation"],
      image: null,
    },
  ]);

  const [userGroups, setUserGroups] = useState([
    {
      id: 1,
      name: "Gestion du Stress",
      description: "Groupe d'entraide pour la gestion du stress quotidien",
      members: 234,
      posts: 45,
      isPrivate: false,
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100",
      lastActivity: "2 heures",
      role: "Admin",
      joinedDate: "15 Jan 2024",
    },
    {
      id: 2,
      name: "Méditation Guidée",
      description: "Séances de méditation guidée quotidiennes",
      members: 156,
      posts: 23,
      isPrivate: true,
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100",
      lastActivity: "5 heures",
      role: "Membre",
      joinedDate: "20 Fév 2024",
    },
    {
      id: 3,
      name: "Parents et Anxiété",
      description: "Support pour parents faisant face à l'anxiété",
      members: 89,
      posts: 12,
      isPrivate: false,
      image:
        "https://images.unsplash.com/photo-1516627145497-ae69578cfc06?w=100",
      lastActivity: "1 jour",
      role: "Modérateur",
      joinedDate: "10 Mar 2024",
    },
  ]);

  const [userVideos] = useState([
    {
      id: 1,
      title: "Introduction à la pleine conscience",
      description: "Les bases de la pleine conscience en 15 minutes",
      views: "1.2K",
      likes: 234,
      thumbnail:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300",
      duration: "15:30",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      category: "Éducation",
    },
    {
      id: 2,
      title: "Yoga pour débutants",
      description: "Séance de yoga douce pour commencer la journée",
      views: "856",
      likes: 145,
      thumbnail:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300",
      duration: "22:15",
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      category: "Exercice",
    },
  ]);

  const [savedContent, setSavedContent] = useState([
    {
      id: 1,
      type: "post",
      title: "10 techniques pour mieux dormir",
      author: "Dr. Sophia Chen",
      date: "5 jours",
      excerpt:
        "Découvrez des méthodes scientifiquement prouvées pour améliorer votre sommeil...",
    },
    {
      id: 2,
      type: "article",
      title: "L'impact de la nutrition sur la santé mentale",
      author: "Nutrition Today",
      date: "1 semaine",
      excerpt: "Comment votre alimentation influence votre bien-être mental...",
    },
  ]);

  const [userBadges] = useState([
    {
      id: 1,
      name: "Contributeur Actif",
      description: "A publié plus de 20 posts",
      icon: "📝",
      earnedDate: "15 Mar 2024",
      level: "gold",
    },
    {
      id: 2,
      name: "Leader Communautaire",
      description: "A créé 3 groupes ou plus",
      icon: "👥",
      earnedDate: "20 Fév 2024",
      level: "silver",
    },
    {
      id: 3,
      name: "Aide Précieuse",
      description: "A aidé 50 membres",
      icon: "🤝",
      earnedDate: "10 Jan 2024",
      level: "bronze",
    },
  ]);

  const [activityHistory] = useState([
    {
      id: 1,
      type: "post",
      action: "created",
      title: "Mon parcours avec l'anxiété",
      date: "2 heures",
      details: "Nouvelle publication",
    },
    {
      id: 2,
      type: "like",
      action: "received",
      title: "Exercice de respiration",
      date: "5 heures",
      details: "15 nouvelles réactions",
    },
    {
      id: 3,
      type: "group",
      action: "joined",
      title: "Méditation Guidée",
      date: "1 jour",
      details: "Nouveau groupe rejoint",
    },
  ]);

  const fakeFollowers = [
    { id: 1, name: "Sara Benali", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 2, name: "Karim B.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 3, name: "Dr. Sophie", avatar: "https://randomuser.me/api/portraits/women/41.jpg" },
  ];

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const formatRelative = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
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

  // ========== HANDLERS ==========
  // Publie le profil pro dans le catalogue patient
  const publishPublicProfile = (profileData) => {
    let role = user?.role;
    try {
      const auth = JSON.parse(localStorage.getItem("rafiq_auth") || "null");
      if (auth?.role) role = auth.role;
    } catch {
      /* ignore */
    }
    if (role !== "psychiatre") {
      console.log("Publish ignoré, role =", role);
      return;
    }

    const entry = {
      id: user?.id || profileData.email || `pro-${Date.now()}`,
      name: profileData.name || "Psychiatre",
      specialty: profileData.specialty || "Psychiatre",
      description:
        profileData.bio || "Professionnel de santé mentale sur RafiQ",
      rating: 5,
      reviews: 0,
      experience: profileData.experience || "",
      location: profileData.location || "",
      price: Number(profileData.price) || 0,
      image:
        profileData.avatar ||
        "https://randomuser.me/api/portraits/men/41.jpg",
      available: true,
      online: true,
      languages: ["Français", "Arabe"],
      nextAvailable: profileData.availability || "Sur rendez-vous",
      responseTime: "—",
      verified: !!(profileData.registrationNumber || "").trim(),
      phone: profileData.phone || "",
      email: profileData.email || user?.email || "",
      isRealAccount: true,
    };

    try {
      const raw = localStorage.getItem("rafiq_public_psychiatrists");
      let list = [];
      if (raw && raw !== "null") {
        const parsed = JSON.parse(raw);
        list = Array.isArray(parsed) ? parsed : [];
      }
      const without = list.filter(
        (p) =>
          String(p.id) !== String(entry.id) &&
          (p.email || "") !== (entry.email || "")
      );
      without.unshift(entry);
      localStorage.setItem(
        "rafiq_public_psychiatrists",
        JSON.stringify(without)
      );
      window.dispatchEvent(new Event("rafiq-public-psy-updated"));
      console.log("Publié OK:", entry.name);
    } catch (e) {
      console.error("publishPublicProfile", e);
    }
  };

  const handleOpenEdit = () => {
    setEditForm({
      name: userProfile.name,
      username: userProfile.username,
      bio: userProfile.bio,
      location: userProfile.location,
      email: userProfile.email,
      phone: userProfile.phone,
      specialty: userProfile.specialty || "Psychiatre",
      registrationNumber: userProfile.registrationNumber || "",
      price: userProfile.price ?? 2500,
      experience: userProfile.experience || "",
      availability: userProfile.availability || "Lun–Ven 9h–17h",
    });
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    if (!(editForm.name || "").trim()) {
      showToast("Le nom est obligatoire");
      return;
    }
    const next = {
      ...userProfile,
      name: editForm.name.trim(),
      username: (editForm.username || "").trim(),
      bio: (editForm.bio || "").trim(),
      location: (editForm.location || "").trim(),
      email: (editForm.email || "").trim(),
      phone: (editForm.phone || "").trim(),
      specialty: (editForm.specialty || "Psychiatre").trim(),
      registrationNumber: (editForm.registrationNumber || "").trim(),
      price: Number(editForm.price) || 0,
      experience: (editForm.experience || "").trim(),
      availability: (editForm.availability || "").trim(),
    };
    setUserProfile(next);
    publishPublicProfile(next);
    setIsEditing(false);
    showToast(
      isPro ? "Profil publié sur la page Psychiatres" : "Profil mis à jour"
    );
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUserProfile((prev) => {
      const next = { ...prev, avatar: url };
      publishPublicProfile(next);
      return next;
    });
    showToast("Photo de profil mise à jour");
    e.target.value = "";
  };

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUserProfile((prev) => ({ ...prev, cover: url }));
    showToast("Photo de couverture mise à jour");
    e.target.value = "";
  };

  const handlePostImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setNewPostImage({ url, name: file.name });
    e.target.value = "";
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim() && !newPostImage) return;
    const newPost = {
      id: Date.now(),
      type: newPostImage ? "image" : "text",
      title: "Nouvelle publication",
      content: newPostContent.trim(),
      image: newPostImage ? newPostImage.url : null,
      likes: 0,
      comments: 0,
      shares: 0,
      createdAt: new Date().toISOString(),
      category: "Général",
      privacy: newPostPrivacy,
      isLiked: false,
      isSaved: false,
      tags: [],
    };
    setUserPosts((prev) => [newPost, ...prev]);
    setUserProfile((prev) => ({
      ...prev,
      stats: { ...prev.stats, posts: prev.stats.posts + 1 },
    }));
    setNewPostContent("");
    setNewPostImage(null);
    setNewPostPrivacy("public");
    setShowCreatePost(false);
    showToast("Publication créée");
  };

  const handleDeletePost = (postId) => {
    if (!window.confirm("Supprimer cette publication ?")) return;
    setUserPosts((prev) => prev.filter((p) => p.id !== postId));
    setUserProfile((prev) => ({
      ...prev,
      stats: { ...prev.stats, posts: Math.max(0, prev.stats.posts - 1) },
    }));
    showToast("Publication supprimée");
  };

  const handleLikePost = (postId) => {
    setUserPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likes: p.likes + (isLiked ? 1 : -1),
        };
      })
    );
  };

  const handleSavePost = (postId) => {
    setUserPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, isSaved: !p.isSaved } : p
      )
    );
    const post = userPosts.find((p) => p.id === postId);
    if (post && !post.isSaved) {
      setSavedContent((prev) => [
        {
          id: Date.now(),
          type: "post",
          title: post.title,
          author: userProfile.name,
          date: "À l'instant",
          excerpt: post.content,
        },
        ...prev,
      ]);
      showToast("Enregistré dans vos favoris");
    } else {
      showToast("Retiré des favoris");
    }
  };

  const handleSharePost = (postId) => {
    setUserPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, shares: p.shares + 1 } : p
      )
    );
    showToast("Lien copié (simulation)");
  };

  const handleCyclePrivacy = (postId) => {
    const order = ["public", "friends", "private"];
    setUserPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const idx = order.indexOf(p.privacy || "public");
        return { ...p, privacy: order[(idx + 1) % order.length] };
      })
    );
  };

  const handleCreateGroup = () => {
    if (!newGroupData.name.trim()) return;
    const newGroup = {
      id: Date.now(),
      name: newGroupData.name.trim(),
      description: newGroupData.description.trim(),
      members: 1,
      posts: 0,
      isPrivate: newGroupData.isPrivate,
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100",
      lastActivity: "À l'instant",
      role: "Admin",
      joinedDate: new Date().toLocaleDateString("fr-FR"),
    };
    setUserGroups((prev) => [newGroup, ...prev]);
    setUserProfile((prev) => ({
      ...prev,
      stats: { ...prev.stats, groups: prev.stats.groups + 1 },
    }));
    setNewGroupData({ name: "", description: "", isPrivate: false });
    setShowCreateGroup(false);
    showToast("Groupe créé");
  };

  const handleLeaveGroup = (groupId) => {
    if (!window.confirm("Quitter ce groupe ?")) return;
    setUserGroups((prev) => prev.filter((g) => g.id !== groupId));
    setUserProfile((prev) => ({
      ...prev,
      stats: { ...prev.stats, groups: Math.max(0, prev.stats.groups - 1) },
    }));
    showToast("Vous avez quitté le groupe");
  };

  const handleViewGroup = (group) => {
    showToast(`Ouverture de « ${group.name} » (navigation groupes à brancher)`);
  };

  const handleRemoveSaved = (id) => {
    setSavedContent((prev) => prev.filter((s) => s.id !== id));
  };

  const privacyIcon = (privacy) => {
    if (privacy === "private") return <FiLock className="text-xs" />;
    if (privacy === "friends") return <FiUsers className="text-xs" />;
    return <FiGlobe className="text-xs" />;
  };

  const privacyLabel = (privacy) => {
    if (privacy === "private") return "Privé";
    if (privacy === "friends") return "Amis";
    return "Public";
  };

  // ========== FILTERED DATA ==========
  const filteredPosts = useMemo(() => {
    return userPosts.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        (p.title || "").toLowerCase().includes(q) ||
        (p.content || "").toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q));
      const matchCat =
        filterCategory === "all" || p.category === filterCategory;
      return matchSearch && matchCat;
    });
  }, [userPosts, searchQuery, filterCategory]);

  const filteredGroups = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return userGroups;
    return userGroups.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        (g.description || "").toLowerCase().includes(q)
    );
  }, [userGroups, searchQuery]);

  const filteredVideos = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return userVideos;
    return userVideos.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        (v.description || "").toLowerCase().includes(q)
    );
  }, [userVideos, searchQuery]);

  const categories = [
    "all",
    ...Array.from(new Set(userPosts.map((p) => p.category))),
  ];

  // ========== RENDER HELPERS ==========
  const EmptyState = ({ icon: Icon, text }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">
      <Icon className="mx-auto text-3xl text-gray-300 mb-3" />
      <p className="text-xs text-gray-500">{text}</p>
    </div>
  );

  const PostCard = ({ post }) => (
    <div
      className={
        "bg-white border border-gray-200 rounded-lg p-3 " +
        (viewMode === "grid" ? "h-full flex flex-col" : "mb-3")
      }
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <h4 className="text-xs font-semibold text-gray-900">
              {userProfile.name}
            </h4>
            <p className="text-[10px] text-gray-500">
              {formatRelative(post.createdAt)} • {post.category}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleCyclePrivacy(post.id)}
            className="text-gray-400 hover:text-gray-600 flex items-center gap-0.5"
            title={privacyLabel(post.privacy)}
            aria-label="Changer la confidentialité"
          >
            {privacyIcon(post.privacy)}
          </button>
          <button
            type="button"
            onClick={() => handleDeletePost(post.id)}
            className="text-gray-400 hover:text-red-500"
            title="Supprimer"
            aria-label="Supprimer la publication"
          >
            <FiTrash2 className="text-xs" />
          </button>
        </div>
      </div>

      <h3 className="text-xs font-semibold text-gray-900 mb-1">{post.title}</h3>
      <p className="text-[10px] text-gray-600 mb-2 line-clamp-3">{post.content}</p>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-40 object-cover rounded-lg mb-2"
        />
      )}

      {post.videoThumbnail && (
        <div className="relative mb-2">
          <img
            src={post.videoThumbnail}
            alt={post.title}
            className="w-full h-40 object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/50 rounded-full p-2">
              <FiVideo className="text-white text-lg" />
            </div>
          </div>
        </div>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-[10px] text-gray-500 mt-auto">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleLikePost(post.id)}
            className={
              "flex items-center gap-1 " +
              (post.isLiked ? "text-red-500" : "hover:text-red-500")
            }
            aria-label="J'aime"
          >
            <FiHeart className="text-xs" />
            <span>{post.likes}</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1 hover:text-blue-500"
            aria-label="Commentaires"
          >
            <FiMessageCircle className="text-xs" />
            <span>{post.comments}</span>
          </button>
          <button
            type="button"
            onClick={() => handleSharePost(post.id)}
            className="flex items-center gap-1 hover:text-green-500"
            aria-label="Partager"
          >
            <FiShare2 className="text-xs" />
            <span>{post.shares}</span>
          </button>
        </div>
        <button
          type="button"
          onClick={() => handleSavePost(post.id)}
          className={post.isSaved ? "text-yellow-500" : "hover:text-yellow-500"}
          title="Sauvegarder"
          aria-label="Sauvegarder"
        >
          <FiBookmark className="text-xs" />
        </button>
      </div>
    </div>
  );

  const GroupCard = ({ group }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-3">
      <div className="flex items-start gap-3">
        <img
          src={group.image}
          alt={group.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            <h4 className="text-xs font-semibold text-gray-900 truncate">
              {group.name}
            </h4>
            {group.isPrivate && (
              <FiLock className="text-xs text-orange-500 flex-shrink-0" />
            )}
            <span className="text-[9px] bg-blue-100 text-blue-800 px-1 rounded ml-auto flex-shrink-0">
              {group.role}
            </span>
          </div>
          <p className="text-[10px] text-gray-500 mb-2 line-clamp-2">
            {group.description}
          </p>
          <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-2">
            <span className="flex items-center gap-1">
              <FiUsers className="text-[10px]" />
              {group.members}
            </span>
            <span>{group.lastActivity}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleViewGroup(group)}
              className="px-3 py-1 bg-[#00796B] text-white text-[10px] rounded hover:bg-[#00695C]"
            >
              Voir le groupe
            </button>
            <button
              type="button"
              onClick={() => handleLeaveGroup(group.id)}
              className="px-3 py-1 border border-gray-300 text-gray-600 text-[10px] rounded hover:border-red-300 hover:text-red-600 flex items-center gap-1"
              aria-label="Quitter le groupe"
            >
              <FiLogOut className="text-[10px]" />
              Quitter
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#f7f9fa] pb-8">
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-xs px-4 py-2 rounded-full shadow-lg">
          {toast}
        </div>
      )}

      {/* COVER + AVATAR */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4">
        <div className="relative h-36 md:h-44 bg-gray-200">
          <img
            src={userProfile.cover}
            alt="Couverture"
            className="w-full h-full object-cover"
          />
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverChange}
          />
          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/50 text-white text-[10px] rounded hover:bg-black/70"
            aria-label="Changer la couverture"
          >
            <FiCamera className="text-xs" />
            Couverture
          </button>
        </div>

        <div className="px-4 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-end gap-3 -mt-10 relative z-10">
            <div className="relative">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-20 h-20 rounded-full border-4 border-white object-cover bg-gray-100"
              />
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow hover:bg-gray-50"
                aria-label="Changer la photo de profil"
              >
                <FiCamera className="text-xs text-gray-600" />
              </button>
            </div>

            <div className="flex-1 pt-2 sm:pt-0 sm:pb-1">
              <h1 className="text-lg font-bold text-gray-900">
                {userProfile.name}
              </h1>
              {isPro && (
                <p className="text-xs text-[#00796B]">
                  {userProfile.specialty || "Psychiatre"}
                  {userProfile.price > 0 ? ` · ${userProfile.price} DA` : ""}
                </p>
              )}
              <p className="text-xs text-gray-500">{userProfile.username}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenEdit}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#00796B] text-white text-xs rounded-md hover:bg-[#00695C]"
              >
                <FiEdit3 className="text-xs" />
                Modifier
              </button>
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="p-1.5 border border-gray-300 rounded-md hover:bg-gray-50"
                aria-label="Paramètres"
              >
                <FiSettings className="text-sm text-gray-600" />
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-700 mt-3 leading-5">{userProfile.bio}</p>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-gray-500">
            {userProfile.location && (
              <span className="flex items-center gap-1">
                <FiMapPin className="text-[10px]" />
                {userProfile.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <FiCalendar className="text-[10px]" />
              {userProfile.joinDate}
            </span>
          </div>

          {/* Stats cliquables */}
          <div className="flex items-center gap-5 mt-4 pt-3 border-t border-gray-100">
            <div className="text-center">
              <p className="text-sm font-bold text-gray-900">
                {userProfile.stats.posts}
              </p>
              <p className="text-[10px] text-gray-500">Publications</p>
            </div>
            <button
              type="button"
              onClick={() => setShowFollowers("followers")}
              className="text-center hover:opacity-80"
            >
              <p className="text-sm font-bold text-gray-900">
                {userProfile.stats.followers}
              </p>
              <p className="text-[10px] text-gray-500">Abonnés</p>
            </button>
            <button
              type="button"
              onClick={() => setShowFollowers("following")}
              className="text-center hover:opacity-80"
            >
              <p className="text-sm font-bold text-gray-900">
                {userProfile.stats.following}
              </p>
              <p className="text-[10px] text-gray-500">Abonnements</p>
            </button>
            <div className="text-center">
              <p className="text-sm font-bold text-gray-900">
                {userProfile.stats.groups}
              </p>
              <p className="text-[10px] text-gray-500">Groupes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* SIDEBAR MENU */}
        <div className="lg:w-48 flex-shrink-0 space-y-2">
          <div className="bg-white border border-gray-200 rounded-lg p-2 space-y-0.5">
            <button
              type="button"
              onClick={() => setShowPersonalInfo(true)}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded"
            >
              <FiUser className="text-xs" /> Infos personnelles
            </button>
            <button
              type="button"
              onClick={() => setShowSavedContent(true)}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded"
            >
              <FiBookmark className="text-xs" /> Contenu sauvegardé
            </button>
            <button
              type="button"
              onClick={() => setShowGroupManagement(true)}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded"
            >
              <FiUsers className="text-xs" /> Gérer les groupes
            </button>
            <button
              type="button"
              onClick={() => setShowBadges(true)}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded"
            >
              <FiAward className="text-xs" /> Badges
            </button>
            <button
              type="button"
              onClick={() => setShowActivityHistory(true)}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded"
            >
              <FiClock className="text-xs" /> Historique
            </button>
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded"
            >
              <FiSettings className="text-xs" /> Paramètres
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 min-w-0">
          {/* Tabs */}
          <div className="bg-white border border-gray-200 rounded-lg mb-3">
            <div className="flex items-center gap-1 p-1 border-b border-gray-100 flex-wrap">
              {[
                { id: "posts", label: "Publications", icon: FiEdit3 },
                { id: "groups", label: "Groupes", icon: FiUsers },
                { id: "videos", label: "Vidéos", icon: FiVideo },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchQuery("");
                    setFilterCategory("all");
                  }}
                  className={
                    "flex items-center gap-1 px-3 py-1.5 text-xs rounded " +
                    (activeTab === tab.id
                      ? "bg-[#00796B] text-white"
                      : "text-gray-600 hover:bg-gray-50")
                  }
                >
                  <tab.icon className="text-xs" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Toolbar: search + filter + view mode + create */}
            <div className="p-2 flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-gray-100 rounded px-2 h-8 flex-1 min-w-[140px]">
                <FiSearch className="text-gray-400 text-xs mr-1" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="bg-transparent outline-none text-xs w-full"
                />
              </div>

              {activeTab === "posts" && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowFilterMenu((v) => !v)}
                    className="flex items-center gap-1 px-2 h-8 border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50"
                  >
                    <FiFilter className="text-xs" />
                    Filtre
                  </button>
                  {showFilterMenu && (
                    <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg z-20 py-1 min-w-[120px]">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setFilterCategory(cat);
                            setShowFilterMenu(false);
                          }}
                          className={
                            "w-full text-left px-3 py-1.5 text-[10px] hover:bg-gray-50 " +
                            (filterCategory === cat
                              ? "text-[#00796B] font-medium"
                              : "text-gray-700")
                          }
                        >
                          {cat === "all" ? "Toutes" : cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "posts" && (
                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={
                      "p-1.5 " +
                      (viewMode === "list"
                        ? "bg-[#00796B] text-white"
                        : "text-gray-500 hover:bg-gray-50")
                    }
                    aria-label="Vue liste"
                  >
                    <FiList className="text-xs" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={
                      "p-1.5 " +
                      (viewMode === "grid"
                        ? "bg-[#00796B] text-white"
                        : "text-gray-500 hover:bg-gray-50")
                    }
                    aria-label="Vue grille"
                  >
                    <FiGrid className="text-xs" />
                  </button>
                </div>
              )}

              {activeTab === "posts" && (
                <button
                  type="button"
                  onClick={() => setShowCreatePost(true)}
                  className="flex items-center gap-1 px-3 h-8 bg-[#00796B] text-white text-xs rounded hover:bg-[#00695C]"
                >
                  <FiPlus className="text-xs" />
                  Publier
                </button>
              )}
              {activeTab === "groups" && (
                <button
                  type="button"
                  onClick={() => setShowCreateGroup(true)}
                  className="flex items-center gap-1 px-3 h-8 bg-[#00796B] text-white text-xs rounded hover:bg-[#00695C]"
                >
                  <FiPlus className="text-xs" />
                  Créer
                </button>
              )}
            </div>
          </div>

          {/* TAB CONTENT */}
          {activeTab === "posts" &&
            (filteredPosts.length === 0 ? (
              <EmptyState
                icon={FiEdit3}
                text={
                  searchQuery
                    ? "Aucune publication ne correspond à votre recherche."
                    : "Aucune publication pour le moment."
                }
              />
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
                    : "space-y-0"
                }
              >
                {filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ))}

          {activeTab === "groups" &&
            (filteredGroups.length === 0 ? (
              <EmptyState
                icon={FiUsers}
                text={
                  searchQuery
                    ? "Aucun groupe trouvé."
                    : "Vous n'avez rejoint aucun groupe."
                }
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredGroups.map((g) => (
                  <GroupCard key={g.id} group={g} />
                ))}
              </div>
            ))}

          {activeTab === "videos" &&
            (filteredVideos.length === 0 ? (
              <EmptyState
                icon={FiVideo}
                text={
                  searchQuery
                    ? "Aucune vidéo trouvée."
                    : "Aucune vidéo pour le moment."
                }
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredVideos.map((v) => (
                  <div
                    key={v.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={v.thumbnail}
                        alt={v.title}
                        className="w-full h-32 object-cover"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1 rounded">
                        {v.duration}
                      </span>
                    </div>
                    <div className="p-3">
                      <h4 className="text-xs font-semibold text-gray-900">
                        {v.title}
                      </h4>
                      <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">
                        {v.description}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-2">
                        {v.views} vues • {formatRelative(v.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>

      {/* ========== MODAL: EDIT PROFILE ========== */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg max-w-md w-full p-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-900">
                Modifier le profil
              </h3>
              <button type="button" onClick={() => setIsEditing(false)}>
                <FiX className="text-gray-500" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { key: "name", label: "Nom complet *", type: "text" },
                { key: "username", label: "Identifiant", type: "text" },
                { key: "location", label: "Localisation", type: "text" },
                { key: "email", label: "Email", type: "email" },
                { key: "phone", label: "Téléphone", type: "tel" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={editForm[field.key] || ""}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                    className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#00796B]"
                  />
                </div>
              ))}
              <div>
                <label className="block text-[11px] font-medium text-gray-600 mb-1">
                  Bio
                </label>
                <textarea
                  value={editForm.bio || ""}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  rows={3}
                  className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#00796B] resize-none"
                />
              </div>

              {/* Champs pro — uniquement psychiatre, DANS le modal */}
              {isPro && (
                <>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">
                      Spécialité
                    </label>
                    <select
                      value={editForm.specialty || "Psychiatre"}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          specialty: e.target.value,
                        }))
                      }
                      className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#00796B]"
                    >
                      {[
                        "Psychiatre",
                        "Psychologue",
                        "Psychothérapeute",
                        "Addictologie",
                      ].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">
                      N° CNOM
                    </label>
                    <input
                      value={editForm.registrationNumber || ""}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          registrationNumber: e.target.value,
                        }))
                      }
                      className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#00796B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">
                      Tarif (DA / séance)
                    </label>
                    <input
                      type="number"
                      value={editForm.price ?? ""}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }))
                      }
                      className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#00796B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">
                      Expérience
                    </label>
                    <input
                      value={editForm.experience || ""}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          experience: e.target.value,
                        }))
                      }
                      placeholder="Ex: 8 ans"
                      className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#00796B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">
                      Disponibilités
                    </label>
                    <input
                      value={editForm.availability || ""}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          availability: e.target.value,
                        }))
                      }
                      placeholder="Ex: Lun–Ven 9h–17h"
                      className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#00796B]"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-[#00796B] text-white text-xs rounded-md hover:bg-[#00695C] flex items-center gap-1"
              >
                <FiCheck className="text-xs" />
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL: CREATE POST ========== */}
      {showCreatePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg max-w-md w-full p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-900">
                Créer une publication
              </h3>
              <button type="button" onClick={() => setShowCreatePost(false)}>
                <FiX className="text-gray-500" />
              </button>
            </div>
            <textarea
              placeholder="Partagez vos pensées..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full h-28 p-3 border border-gray-200 rounded-lg text-xs resize-none outline-none focus:border-[#00796B]"
            />
            {newPostImage && (
              <div className="relative mt-2 inline-block">
                <img
                  src={newPostImage.url}
                  alt={newPostImage.name}
                  className="max-h-32 rounded-md border"
                />
                <button
                  type="button"
                  onClick={() => setNewPostImage(null)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 text-white rounded-full flex items-center justify-center"
                >
                  <FiX className="text-[10px]" />
                </button>
              </div>
            )}
            <div className="flex items-center gap-2 mt-3">
              <input
                ref={postImageRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePostImageChange}
              />
              <button
                type="button"
                onClick={() => postImageRef.current?.click()}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs hover:bg-gray-50"
              >
                <FiImage className="text-blue-500" />
                Photo
              </button>
              <div className="flex items-center gap-1 ml-auto text-xs text-gray-600">
                <button
                  type="button"
                  onClick={() =>
                    setNewPostPrivacy((p) =>
                      p === "public"
                        ? "friends"
                        : p === "friends"
                        ? "private"
                        : "public"
                    )
                  }
                  className="flex items-center gap-1 hover:text-[#00796B]"
                >
                  {privacyIcon(newPostPrivacy)}
                  {privacyLabel(newPostPrivacy)}
                </button>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setShowCreatePost(false)}
                className="px-4 py-2 text-xs text-gray-600"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleCreatePost}
                disabled={!newPostContent.trim() && !newPostImage}
                className="px-4 py-2 bg-[#00796B] text-white text-xs rounded-lg disabled:opacity-40"
              >
                Publier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL: CREATE GROUP ========== */}
      {showCreateGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg max-w-md w-full p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-900">Créer un groupe</h3>
              <button type="button" onClick={() => setShowCreateGroup(false)}>
                <FiX className="text-gray-500" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  value={newGroupData.name}
                  onChange={(e) =>
                    setNewGroupData({ ...newGroupData, name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-[#00796B]"
                  placeholder="Nom du groupe"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newGroupData.description}
                  onChange={(e) =>
                    setNewGroupData({
                      ...newGroupData,
                      description: e.target.value,
                    })
                  }
                  className="w-full h-20 p-2 border border-gray-200 rounded-lg text-xs resize-none outline-none focus:border-[#00796B]"
                  placeholder="Description..."
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setNewGroupData({ ...newGroupData, isPrivate: false })
                  }
                  className={
                    "flex items-center gap-1 px-3 py-2 border rounded-lg text-xs " +
                    (!newGroupData.isPrivate
                      ? "border-[#00796B] text-[#00796B] bg-[#00796B]/10"
                      : "border-gray-300 text-gray-600")
                  }
                >
                  <FiGlobe /> Public
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setNewGroupData({ ...newGroupData, isPrivate: true })
                  }
                  className={
                    "flex items-center gap-1 px-3 py-2 border rounded-lg text-xs " +
                    (newGroupData.isPrivate
                      ? "border-[#00796B] text-[#00796B] bg-[#00796B]/10"
                      : "border-gray-300 text-gray-600")
                  }
                >
                  <FiLock /> Privé
                </button>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setShowCreateGroup(false)}
                className="px-4 py-2 text-xs text-gray-600"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleCreateGroup}
                disabled={!newGroupData.name.trim()}
                className="px-4 py-2 bg-[#00796B] text-white text-xs rounded-lg disabled:opacity-40"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL: SETTINGS ========== */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
              <h3 className="text-sm font-bold text-gray-900">
                Paramètres du compte
              </h3>
              <button type="button" onClick={() => setShowSettings(false)}>
                <FiX className="text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-gray-900 mb-2">
                  Confidentialité
                </h4>
                {["profile", "posts", "groups"].map((key) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-2 border border-gray-200 rounded mb-2"
                  >
                    <span className="text-xs capitalize">
                      {key === "profile"
                        ? "Profil"
                        : key === "posts"
                        ? "Publications"
                        : "Groupes"}
                    </span>
                    <select
                      value={userProfile.privacy[key]}
                      onChange={(e) =>
                        setUserProfile((prev) => ({
                          ...prev,
                          privacy: {
                            ...prev.privacy,
                            [key]: e.target.value,
                          },
                        }))
                      }
                      className="text-xs border border-gray-200 rounded px-2 py-1 outline-none"
                    >
                      <option value="public">Public</option>
                      <option value="friends">Amis</option>
                      <option value="private">Privé</option>
                    </select>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-900 mb-2">
                  Notifications
                </h4>
                {[
                  { key: "email", label: "Notifications par email" },
                  { key: "push", label: "Notifications push" },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-2 border border-gray-200 rounded mb-2"
                  >
                    <span className="text-xs">{item.label}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setUserProfile((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            [item.key]: !prev.notifications[item.key],
                          },
                        }))
                      }
                      className={
                        "w-10 h-5 rounded-full transition-colors relative " +
                        (userProfile.notifications[item.key]
                          ? "bg-[#00796B]"
                          : "bg-gray-300")
                      }
                      aria-label={item.label}
                    >
                      <span
                        className={
                          "absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform " +
                          (userProfile.notifications[item.key]
                            ? "left-5"
                            : "left-0.5")
                        }
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL: PERSONAL INFO ========== */}
      {showPersonalInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg max-w-md w-full p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-900">
                Informations personnelles
              </h3>
              <button type="button" onClick={() => setShowPersonalInfo(false)}>
                <FiX className="text-gray-500" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2 p-2 border border-gray-100 rounded">
                <FiMail className="text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-400">Email</p>
                  <p className="text-gray-800">{userProfile.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 border border-gray-100 rounded">
                <FiPhone className="text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-400">Téléphone</p>
                  <p className="text-gray-800">{userProfile.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 border border-gray-100 rounded">
                <FiMapPin className="text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-400">Localisation</p>
                  <p className="text-gray-800">{userProfile.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 border border-gray-100 rounded">
                <FiCalendar className="text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-400">Membre depuis</p>
                  <p className="text-gray-800">{userProfile.joinDate}</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowPersonalInfo(false);
                handleOpenEdit();
              }}
              className="w-full mt-4 py-2 bg-[#00796B] text-white text-xs rounded-md hover:bg-[#00695C]"
            >
              Modifier ces informations
            </button>
          </div>
        </div>
      )}

      {/* ========== MODAL: SAVED ========== */}
      {showSavedContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
              <h3 className="text-sm font-bold text-gray-900">
                Contenu sauvegardé
              </h3>
              <button type="button" onClick={() => setShowSavedContent(false)}>
                <FiX className="text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              {savedContent.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-6">
                  Aucun contenu sauvegardé.
                </p>
              ) : (
                savedContent.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between p-3 border border-gray-100 rounded-lg"
                  >
                    <div>
                      <p className="text-xs font-medium text-gray-900">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {item.author} • {item.date}
                      </p>
                      <p className="text-[10px] text-gray-600 mt-1 line-clamp-2">
                        {item.excerpt}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSaved(item.id)}
                      className="text-gray-400 hover:text-red-500 ml-2"
                      aria-label="Retirer"
                    >
                      <FiTrash2 className="text-xs" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL: GROUP MANAGEMENT ========== */}
      {showGroupManagement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
              <h3 className="text-sm font-bold text-gray-900">
                Gérer les groupes
              </h3>
              <button
                type="button"
                onClick={() => setShowGroupManagement(false)}
              >
                <FiX className="text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              {userGroups.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-6">
                  Aucun groupe.
                </p>
              ) : (
                userGroups.map((g) => (
                  <div
                    key={g.id}
                    className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={g.image}
                        alt={g.name}
                        className="w-9 h-9 rounded object-cover"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-900 truncate">
                          {g.name}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          {g.role} • {g.members} membres
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleLeaveGroup(g.id)}
                      className="text-[10px] text-red-600 hover:underline flex-shrink-0 ml-2"
                    >
                      Quitter
                    </button>
                  </div>
                ))
              )}
              <button
                type="button"
                onClick={() => {
                  setShowGroupManagement(false);
                  setShowCreateGroup(true);
                }}
                className="w-full mt-2 py-2 border border-dashed border-gray-300 text-xs text-gray-600 rounded-lg hover:border-[#00796B] hover:text-[#00796B]"
              >
                + Créer un groupe
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL: BADGES ========== */}
      {showBadges && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
              <h3 className="text-sm font-bold text-gray-900">
                Badges et récompenses
              </h3>
              <button type="button" onClick={() => setShowBadges(false)}>
                <FiX className="text-gray-500" />
              </button>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {userBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="border border-gray-200 rounded-lg p-3 text-center"
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <p className="text-xs font-semibold text-gray-900">
                    {badge.name}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1">
                    {badge.description}
                  </p>
                  <p className="text-[9px] text-gray-400 mt-2">
                    {badge.earnedDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL: ACTIVITY ========== */}
      {showActivityHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
              <h3 className="text-sm font-bold text-gray-900">
                Historique d&apos;activité
              </h3>
              <button
                type="button"
                onClick={() => setShowActivityHistory(false)}
              >
                <FiX className="text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              {activityHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-[#e6f5f3] flex items-center justify-center flex-shrink-0">
                    {item.type === "post" && (
                      <FiEdit3 className="text-[#00796B] text-xs" />
                    )}
                    {item.type === "like" && (
                      <FiHeart className="text-red-500 text-xs" />
                    )}
                    {item.type === "group" && (
                      <FiUsers className="text-[#00796B] text-xs" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-gray-500">{item.details}</p>
                    <p className="text-[9px] text-gray-400 mt-0.5">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL: FOLLOWERS / FOLLOWING ========== */}
      {showFollowers && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg max-w-sm w-full max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
              <h3 className="text-sm font-bold text-gray-900">
                {showFollowers === "followers" ? "Abonnés" : "Abonnements"}
              </h3>
              <button type="button" onClick={() => setShowFollowers(null)}>
                <FiX className="text-gray-500" />
              </button>
            </div>
            <div className="p-3 space-y-2">
              {fakeFollowers.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
                >
                  <img
                    src={f.avatar}
                    alt={f.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="text-xs font-medium text-gray-900">{f.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;