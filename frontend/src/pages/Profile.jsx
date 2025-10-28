import React, { useState } from 'react';
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
  FiFileText,
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
  FiCopy,
  FiDownload,
  FiBarChart2,
  FiFilter,
  FiSearch,
  FiArrowLeft
} from 'react-icons/fi';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showSavedContent, setShowSavedContent] = useState(false);
  const [showGroupManagement, setShowGroupManagement] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [showActivityHistory, setShowActivityHistory] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [newPostContent, setNewPostContent] = useState('');
  const [newGroupData, setNewGroupData] = useState({ name: '', description: '', isPrivate: false });

  // Données du profil utilisateur
  const [userProfile, setUserProfile] = useState({
    name: "Ahmed Ali",
    username: "@ahmedali",
    bio: "Passionné par le bien-être mental et le développement personnel. Je partage mon parcours et mes découvertes.",
    location: "Alger, Algérie",
    email: "ahmed.ali@example.com",
    phone: "+213 123 456 789",
    joinDate: "Membre depuis Octobre 2023",
    stats: {
      posts: 24,
      followers: 345,
      following: 156,
      groups: 8
    },
    privacy: {
      profile: 'public',
      posts: 'public',
      groups: 'friends'
    }
  });

  // Posts de l'utilisateur
  const [userPosts, setUserPosts] = useState([
    {
      id: 1,
      type: 'text',
      title: "Mon parcours avec l'anxiété",
      content: "Aujourd'hui, je veux partager mon expérience avec l'anxiété et comment j'ai appris à la gérer au quotidien. La méditation et les exercices de respiration ont changé ma vie.",
      likes: 45,
      comments: 12,
      shares: 5,
      date: "2 heures",
      category: "Santé Mentale",
      isPublic: true,
      tags: ["anxiété", "méditation", "bien-être"]
    },
    {
      id: 2,
      type: 'image',
      title: "Moment de méditation",
      content: "Un beau moment de paix ce matin 🌅. La nature nous offre tant de sérénité.",
      image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400",
      likes: 89,
      comments: 23,
      shares: 8,
      date: "1 jour",
      category: "Bien-être",
      isPublic: true,
      tags: ["méditation", "nature", "paix"]
    },
    {
      id: 3,
      type: 'video',
      title: "Exercice de respiration",
      content: "Une technique simple pour calmer l'anxiété en 5 minutes. Parfait pour les moments de stress intense.",
      videoThumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
      likes: 156,
      comments: 34,
      shares: 15,
      date: "3 jours",
      category: "Exercices",
      isPublic: false,
      tags: ["respiration", "anxiété", "relaxation"]
    }
  ]);

  // Groupes rejoints
  const [userGroups, setUserGroups] = useState([
    {
      id: 1,
      name: "Gestion du Stress",
      description: "Groupe d'entraide pour la gestion du stress quotidien",
      members: 234,
      posts: 45,
      isPrivate: false,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100",
      lastActivity: "2 heures",
      role: "Admin",
      joinedDate: "15 Jan 2024"
    },
    {
      id: 2,
      name: "Méditation Guidée",
      description: "Séances de méditation guidée quotidiennes",
      members: 156,
      posts: 23,
      isPrivate: true,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100",
      lastActivity: "5 heures",
      role: "Membre",
      joinedDate: "20 Fév 2024"
    },
    {
      id: 3,
      name: "Parents et Anxiété",
      description: "Support pour parents faisant face à l'anxiété",
      members: 89,
      posts: 12,
      isPrivate: false,
      image: "https://images.unsplash.com/photo-1516627145497-ae69578cfc06?w=100",
      lastActivity: "1 jour",
      role: "Modérateur",
      joinedDate: "10 Mar 2024"
    }
  ]);

  // Vidéos postées
  const [userVideos, setUserVideos] = useState([
    {
      id: 1,
      title: "Introduction à la pleine conscience",
      description: "Découvrez les bases de la pleine conscience en 15 minutes",
      views: "1.2K",
      likes: 234,
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300",
      duration: "15:30",
      date: "1 semaine",
      category: "Éducation"
    },
    {
      id: 2,
      title: "Yoga pour débutants",
      description: "Séance de yoga douce pour commencer la journée",
      views: "856",
      likes: 145,
      thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300",
      duration: "22:15",
      date: "2 semaines",
      category: "Exercice"
    }
  ]);

  // Contenu sauvegardé
  const [savedContent, setSavedContent] = useState([
    {
      id: 1,
      type: 'post',
      title: "10 techniques pour mieux dormir",
      author: "Dr. Sophia Chen",
      date: "5 jours",
      excerpt: "Découvrez des méthodes scientifiquement prouvées pour améliorer votre sommeil..."
    },
    {
      id: 2,
      type: 'article',
      title: "L'impact de la nutrition sur la santé mentale",
      author: "Nutrition Today",
      date: "1 semaine",
      excerpt: "Comment votre alimentation influence votre bien-être mental..."
    }
  ]);

  // Badges et récompenses
  const [userBadges, setUserBadges] = useState([
    {
      id: 1,
      name: "Contributeur Actif",
      description: "A publié plus de 20 posts",
      icon: "📝",
      earnedDate: "15 Mar 2024",
      level: "gold"
    },
    {
      id: 2,
      name: "Leader Communautaire",
      description: "A créé 3 groupes ou plus",
      icon: "👥",
      earnedDate: "20 Fév 2024",
      level: "silver"
    },
    {
      id: 3,
      name: "Aide Précieuse",
      description: "A aidé 50 membres",
      icon: "🤝",
      earnedDate: "10 Jan 2024",
      level: "bronze"
    }
  ]);

  // Historique d'activité
  const [activityHistory, setActivityHistory] = useState([
    {
      id: 1,
      type: 'post',
      action: 'created',
      title: "Mon parcours avec l'anxiété",
      date: "2 heures",
      details: "Nouvelle publication"
    },
    {
      id: 2,
      type: 'like',
      action: 'received',
      title: "Exercice de respiration",
      date: "5 heures",
      details: "15 nouvelles réactions"
    },
    {
      id: 3,
      type: 'group',
      action: 'joined',
      title: "Méditation Guidée",
      date: "1 jour",
      details: "Nouveau groupe rejoint"
    }
  ]);

  // Fonctions pour gérer les posts
  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      const newPost = {
        id: userPosts.length + 1,
        type: 'text',
        title: "Nouvelle publication",
        content: newPostContent,
        likes: 0,
        comments: 0,
        shares: 0,
        date: "À l'instant",
        category: "Général",
        isPublic: true,
        tags: []
      };
      setUserPosts([newPost, ...userPosts]);
      setNewPostContent('');
      setShowCreatePost(false);
      // Mettre à jour les stats
      setUserProfile(prev => ({
        ...prev,
        stats: { ...prev.stats, posts: prev.stats.posts + 1 }
      }));
    }
  };

  const handleDeletePost = (postId) => {
    setUserPosts(userPosts.filter(post => post.id !== postId));
    setUserProfile(prev => ({
      ...prev,
      stats: { ...prev.stats, posts: prev.stats.posts - 1 }
    }));
  };

  const handleTogglePostPrivacy = (postId) => {
    setUserPosts(userPosts.map(post => 
      post.id === postId ? { ...post, isPublic: !post.isPublic } : post
    ));
  };

  // Fonctions pour gérer les groupes
  const handleCreateGroup = () => {
    if (newGroupData.name.trim()) {
      const newGroup = {
        id: userGroups.length + 1,
        name: newGroupData.name,
        description: newGroupData.description,
        members: 1,
        posts: 0,
        isPrivate: newGroupData.isPrivate,
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100",
        lastActivity: "À l'instant",
        role: "Admin",
        joinedDate: new Date().toLocaleDateString('fr-FR')
      };
      setUserGroups([newGroup, ...userGroups]);
      setNewGroupData({ name: '', description: '', isPrivate: false });
      setShowCreateGroup(false);
      setUserProfile(prev => ({
        ...prev,
        stats: { ...prev.stats, groups: prev.stats.groups + 1 }
      }));
    }
  };

  const handleLeaveGroup = (groupId) => {
    setUserGroups(userGroups.filter(group => group.id !== groupId));
    setUserProfile(prev => ({
      ...prev,
      stats: { ...prev.stats, groups: prev.stats.groups - 1 }
    }));
  };

  // Fonctions pour le profil
  const handleUpdateProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
    setIsEditing(false);
  };

  // Composant pour créer un post
  const CreatePostModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-md w-full p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-gray-900">Créer une publication</h3>
          <button 
            onClick={() => setShowCreatePost(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-3">
          <textarea 
            placeholder="Partagez vos pensées..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg text-xs resize-none focus:outline-none focus:ring-1 focus:ring-[#00796B]"
          />
          
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-xs hover:bg-gray-50">
              <FiImage className="text-blue-500" />
              Photo
            </button>
            <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-xs hover:bg-gray-50">
              <FiVideo className="text-red-500" />
              Vidéo
            </button>
            <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-xs hover:bg-gray-50">
              <FiUsers className="text-green-500" />
              Groupe
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <FiGlobe className="text-xs" />
            <span>Public</span>
            <button className="ml-auto flex items-center gap-1 text-gray-500 hover:text-gray-700">
              <FiSettings className="text-xs" />
              Paramètres
            </button>
          </div>
          
          <div className="flex justify-end gap-2">
            <button 
              onClick={() => setShowCreatePost(false)}
              className="px-4 py-2 text-xs text-gray-600 hover:text-gray-800"
            >
              Annuler
            </button>
            <button 
              onClick={handleCreatePost}
              className="px-4 py-2 bg-[#00796B] text-white text-xs rounded-lg hover:bg-[#00695C] disabled:opacity-50"
              disabled={!newPostContent.trim()}
            >
              Publier
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Composant pour créer un groupe
  const CreateGroupModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-md w-full p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-gray-900">Créer un groupe</h3>
          <button 
            onClick={() => setShowCreateGroup(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Nom du groupe *</label>
            <input 
              type="text" 
              placeholder="Nom de votre groupe..."
              value={newGroupData.name}
              onChange={(e) => setNewGroupData({...newGroupData, name: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#00796B]"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              placeholder="Décrivez votre groupe..."
              value={newGroupData.description}
              onChange={(e) => setNewGroupData({...newGroupData, description: e.target.value})}
              className="w-full h-20 p-2 border border-gray-300 rounded-lg text-xs resize-none focus:outline-none focus:ring-1 focus:ring-[#00796B]"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Type de groupe</label>
            <div className="flex gap-2">
              <button 
                onClick={() => setNewGroupData({...newGroupData, isPrivate: false})}
                className={`flex items-center gap-1 px-3 py-2 border rounded-lg text-xs transition-colors ${
                  !newGroupData.isPrivate 
                    ? 'border-[#00796B] bg-[#00796B] bg-opacity-10 text-[#00796B]' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FiGlobe className="text-xs" />
                Public
              </button>
              <button 
                onClick={() => setNewGroupData({...newGroupData, isPrivate: true})}
                className={`flex items-center gap-1 px-3 py-2 border rounded-lg text-xs transition-colors ${
                  newGroupData.isPrivate 
                    ? 'border-[#00796B] bg-[#00796B] bg-opacity-10 text-[#00796B]' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FiLock className="text-xs" />
                Privé
              </button>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <button 
              onClick={() => setShowCreateGroup(false)}
              className="px-4 py-2 text-xs text-gray-600 hover:text-gray-800"
            >
              Annuler
            </button>
            <button 
              onClick={handleCreateGroup}
              className="px-4 py-2 bg-[#00796B] text-white text-xs rounded-lg hover:bg-[#00695C] disabled:opacity-50"
              disabled={!newGroupData.name.trim()}
            >
              Créer le groupe
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Composant pour les paramètres
  const SettingsModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-sm font-bold text-gray-900">Paramètres du compte</h3>
          <button 
            onClick={() => setShowSettings(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-gray-900 mb-2">Confidentialité</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 border border-gray-200 rounded">
                <span className="text-xs">Profil public</span>
                <button className="text-[#00796B] text-xs">Modifier</button>
              </div>
              <div className="flex items-center justify-between p-2 border border-gray-200 rounded">
                <span className="text-xs">Publications visibles par tous</span>
                <button className="text-[#00796B] text-xs">Modifier</button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-900 mb-2">Notifications</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 border border-gray-200 rounded">
                <span className="text-xs">Notifications par email</span>
                <button className="w-8 h-4 bg-[#00796B] rounded-full"></button>
              </div>
              <div className="flex items-center justify-between p-2 border border-gray-200 rounded">
                <span className="text-xs">Notifications push</span>
                <button className="w-8 h-4 bg-gray-300 rounded-full"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Composant pour un post
  const PostCard = ({ post }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#00796B] flex items-center justify-center">
            <span className="text-white text-xs font-bold">AA</span>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-900">{userProfile.name}</h4>
            <p className="text-[10px] text-gray-500">{post.date} • {post.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => handleTogglePostPrivacy(post.id)}
            className="text-gray-400 hover:text-gray-600"
            title={post.isPublic ? "Rendre privé" : "Rendre public"}
          >
            {post.isPublic ? <FiEye className="text-xs" /> : <FiEyeOff className="text-xs" />}
          </button>
          <button 
            onClick={() => handleDeletePost(post.id)}
            className="text-gray-400 hover:text-red-500"
            title="Supprimer"
          >
            <FiTrash2 className="text-xs" />
          </button>
        </div>
      </div>

      <h3 className="text-xs font-semibold text-gray-900 mb-1">{post.title}</h3>
      <p className="text-[10px] text-gray-600 mb-2">{post.content}</p>

      {post.image && (
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-48 object-cover rounded-lg mb-2"
        />
      )}

      {post.videoThumbnail && (
        <div className="relative">
          <img 
            src={post.videoThumbnail} 
            alt={post.title}
            className="w-full h-48 object-cover rounded-lg mb-2"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 rounded-full p-2">
              <FiVideo className="text-white text-lg" />
            </div>
          </div>
        </div>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {post.tags.map((tag, index) => (
            <span key={index} className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-[10px] text-gray-500">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 hover:text-red-500">
            <FiHeart className="text-xs" />
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-blue-500">
            <FiMessageCircle className="text-xs" />
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-green-500">
            <FiShare2 className="text-xs" />
            <span>{post.shares}</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="hover:text-yellow-500" title="Sauvegarder">
            <FiBookmark className="text-xs" />
          </button>
          <button className="hover:text-purple-500" title="Analytiques">
            <FiBarChart2 className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );

  // Composant pour un groupe
  const GroupCard = ({ group }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-3">
      <div className="flex items-start gap-3">
        <img 
          src={group.image} 
          alt={group.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-1">
            <h4 className="text-xs font-semibold text-gray-900">{group.name}</h4>
            {group.isPrivate && <FiLock className="text-xs text-orange-500" />}
            <span className="text-[9px] bg-blue-100 text-blue-800 px-1 rounded ml-auto">
              {group.role}
            </span>
          </div>
          <p className="text-[10px] text-gray-500 mb-2">
            {group.members} membres • {group.posts} publications
          </p>
          <p className="text-[10px] text-gray-600 mb-2">{group.description}</p>
          <p className="text-[9px] text-gray-400">Rejoint le {group.joinedDate}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <button className="flex-1 py-1.5 bg-[#00796B] text-white text-[10px] font-medium rounded hover:bg-[#00695C] transition-colors">
          Voir le groupe
        </button>
        <button 
          onClick={() => handleLeaveGroup(group.id)}
          className="px-3 py-1.5 border border-red-300 text-red-600 text-[10px] rounded hover:bg-red-50 transition-colors"
          title="Quitter le groupe"
        >
          <FiLogOut className="text-xs" />
        </button>
      </div>
    </div>
  );

  // Composant pour une vidéo
  const VideoCard = ({ video }) => (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-32 object-cover"
        />
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-[9px] px-1 rounded">
          {video.duration}
        </div>
        <div className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-[8px] px-1 rounded">
          {video.category}
        </div>
      </div>
      <div className="p-2">
        <h4 className="text-xs font-semibold text-gray-900 mb-1 line-clamp-2">{video.title}</h4>
        <p className="text-[10px] text-gray-600 mb-2 line-clamp-2">{video.description}</p>
        <div className="flex justify-between text-[10px] text-gray-500">
          <span>{video.views} vues</span>
          <span>{video.likes} likes</span>
        </div>
        <p className="text-[9px] text-gray-400 mt-1">{video.date}</p>
      </div>
    </div>
  );

  // Composant pour un badge
  const BadgeCard = ({ badge }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
      <div className="text-2xl mb-2">{badge.icon}</div>
      <h4 className="text-xs font-semibold text-gray-900 mb-1">{badge.name}</h4>
      <p className="text-[10px] text-gray-600 mb-2">{badge.description}</p>
      <p className="text-[9px] text-gray-400">Obtenu le {badge.earnedDate}</p>
    </div>
  );

  // Composant pour un élément d'activité
  const ActivityItem = ({ activity }) => (
    <div className="flex items-start gap-3 p-2 border-b border-gray-100 last:border-b-0">
      <div className="w-6 h-6 rounded-full bg-[#00796B] flex items-center justify-center mt-0.5">
        <span className="text-white text-[8px]">
          {activity.type === 'post' && '📝'}
          {activity.type === 'like' && '❤️'}
          {activity.type === 'group' && '👥'}
        </span>
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-900">
          <span className="font-semibold">{activity.action === 'created' ? 'Créé' : 
                                         activity.action === 'received' ? 'Reçu' : 
                                         'Rejoint'} </span>
          {activity.title}
        </p>
        <p className="text-[10px] text-gray-500">{activity.details}</p>
        <p className="text-[9px] text-gray-400 mt-1">{activity.date}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header du profil */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Photo de profil */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[#00796B] flex items-center justify-center text-white text-xl font-bold">
                  AA
                </div>
                <button className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1 shadow-sm hover:bg-gray-50">
                  <FiCamera className="text-xs text-gray-600" />
                </button>
              </div>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="mt-2 flex items-center gap-1 px-3 py-1 bg-[#00796B] text-white text-xs rounded-full hover:bg-[#00695C] transition-colors"
              >
                <FiEdit3 className="text-xs" />
                Modifier
              </button>
            </div>

            {/* Informations du profil */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-3">
                <div>
                  <h1 className="text-lg font-bold text-gray-900">{userProfile.name}</h1>
                  <p className="text-xs text-gray-500">{userProfile.username}</p>
                  <p className="text-xs text-gray-600 mt-1">{userProfile.bio}</p>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button 
                    onClick={() => setShowCreatePost(true)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#00796B] text-white text-xs rounded-full hover:bg-[#00695C] transition-colors"
                  >
                    <FiPlus className="text-xs" />
                    Nouveau post
                  </button>
                  <button 
                    onClick={() => setShowCreateGroup(true)}
                    className="flex items-center gap-1 px-3 py-1.5 border border-[#00796B] text-[#00796B] text-xs rounded-full hover:bg-[#00796B] hover:text-white transition-colors"
                  >
                    <FiUsers className="text-xs" />
                    Créer groupe
                  </button>
                </div>
              </div>

              {/* Statistiques */}
              <div className="flex gap-4 text-center">
                <div className="cursor-pointer hover:bg-gray-50 rounded p-1">
                  <div className="text-sm font-bold text-gray-900">{userProfile.stats.posts}</div>
                  <div className="text-[10px] text-gray-500">Publications</div>
                </div>
                <div className="cursor-pointer hover:bg-gray-50 rounded p-1">
                  <div className="text-sm font-bold text-gray-900">{userProfile.stats.followers}</div>
                  <div className="text-[10px] text-gray-500">Abonnés</div>
                </div>
                <div className="cursor-pointer hover:bg-gray-50 rounded p-1">
                  <div className="text-sm font-bold text-gray-900">{userProfile.stats.following}</div>
                  <div className="text-[10px] text-gray-500">Abonnements</div>
                </div>
                <div className="cursor-pointer hover:bg-gray-50 rounded p-1">
                  <div className="text-sm font-bold text-gray-900">{userProfile.stats.groups}</div>
                  <div className="text-[10px] text-gray-500">Groupes</div>
                </div>
              </div>

              {/* Informations de contact */}
              <div className="flex flex-wrap gap-4 mt-3 text-[10px] text-gray-600">
                <div className="flex items-center gap-1">
                  <FiMapPin className="text-xs" />
                  <span>{userProfile.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiMail className="text-xs" />
                  <span>{userProfile.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiPhone className="text-xs" />
                  <span>{userProfile.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiClock className="text-xs" />
                  <span>{userProfile.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation des onglets */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto">
          <div className="flex overflow-x-auto">
            {[
              { id: 'posts', label: 'Publications', icon: FiFileText, count: userPosts.length },
              { id: 'groups', label: 'Groupes', icon: FiUsers, count: userGroups.length },
              { id: 'videos', label: 'Vidéos', icon: FiVideo, count: userVideos.length },
              { id: 'saved', label: 'Enregistrés', icon: FiBookmark, count: savedContent.length },
              { id: 'activity', label: 'Activité', icon: FiAward, count: activityHistory.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#00796B] text-[#00796B]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="text-xs" />
                <span>{tab.label}</span>
                <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full text-[10px]">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-3 sticky top-20">
              <h3 className="text-xs font-semibold text-gray-900 mb-3">Menu du profil</h3>
              <nav className="space-y-1">
                {[
                  { icon: FiUser, label: 'Informations personnelles', action: () => setShowPersonalInfo(true) },
                  { icon: FiSettings, label: 'Paramètres du compte', action: () => setShowSettings(true) },
                  { icon: FiBookmark, label: 'Contenu sauvegardé', action: () => setShowSavedContent(true) },
                  { icon: FiUsers, label: 'Gérer les groupes', action: () => setShowGroupManagement(true) },
                  { icon: FiAward, label: 'Badges et récompenses', action: () => setShowBadges(true) },
                  { icon: FiCalendar, label: 'Historique d\'activité', action: () => setShowActivityHistory(true) },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded transition-colors text-left"
                  >
                    <item.icon className="text-xs" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Groupes rapides */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <h4 className="text-xs font-semibold text-gray-900 mb-2">Mes groupes</h4>
                <div className="space-y-2">
                  {userGroups.slice(0, 3).map((group) => (
                    <div key={group.id} className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded cursor-pointer">
                      <img 
                        src={group.image} 
                        alt={group.name}
                        className="w-6 h-6 rounded object-cover"
                      />
                      <span className="text-[10px] text-gray-600">{group.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contenu de l'onglet actif */}
          <div className="lg:col-span-3">
            {activeTab === 'posts' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Mes publications</h3>
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <FiSearch className="text-xs" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <FiFilter className="text-xs" />
                    </button>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-1 ${viewMode === 'grid' ? 'text-gray-600' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        <FiGrid className="text-xs" />
                      </button>
                      <button 
                        onClick={() => setViewMode('list')}
                        className={`p-1 ${viewMode === 'list' ? 'text-gray-600' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        <FiList className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {userPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'groups' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Mes groupes</h3>
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <FiSearch className="text-xs" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <FiFilter className="text-xs" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {userGroups.map((group) => (
                    <GroupCard key={group.id} group={group} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'videos' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Mes vidéos</h3>
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <FiSearch className="text-xs" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <FiFilter className="text-xs" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {userVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Contenu sauvegardé</h3>
                {savedContent.length > 0 ? (
                  <div className="space-y-3">
                    {savedContent.map((item) => (
                      <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-xs font-semibold text-gray-900 mb-1">{item.title}</h4>
                            <p className="text-[10px] text-gray-600 mb-1">{item.excerpt}</p>
                            <p className="text-[9px] text-gray-500">Par {item.author} • {item.date}</p>
                          </div>
                          <button className="text-gray-400 hover:text-red-500">
                            <FiBookmark className="text-xs fill-yellow-400 text-yellow-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FiBookmark className="text-3xl text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Aucun contenu enregistré</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'activity' && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Historique d'activité</h3>
                {activityHistory.length > 0 ? (
                  <div className="bg-white border border-gray-200 rounded-lg">
                    {activityHistory.map((activity) => (
                      <ActivityItem key={activity.id} activity={activity} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FiAward className="text-3xl text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Aucune activité récente</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCreatePost && <CreatePostModal />}
      {showCreateGroup && <CreateGroupModal />}
      {showSettings && <SettingsModal />}
      
      {/* Autres modals (simplifiés pour l'exemple) */}
      {showPersonalInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-md w-full p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-900">Informations personnelles</h3>
              <button onClick={() => setShowPersonalInfo(false)}>✕</button>
            </div>
            <p className="text-xs text-gray-600">Fonctionnalité en développement...</p>
          </div>
        </div>
      )}

      {showBadges && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-900">Badges et récompenses</h3>
              <button onClick={() => setShowBadges(false)}>✕</button>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {userBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;