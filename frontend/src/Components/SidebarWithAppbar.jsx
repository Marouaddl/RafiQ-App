import React, { useState } from 'react';
import {
  FiMenu,
  FiX,
  FiSearch,
  FiHome,
  FiMessageSquare,
  FiUsers,
  FiUser,
  FiAward,
  FiLogOut,
  FiHeart,
  FiCalendar,
  FiPlay,
  FiLock,
  FiZap,
  FiChevronDown,
  FiChevronRight,
  FiBell
} from 'react-icons/fi';

// Import des pages séparées
import Home from '../pages/Home';
import Messages from '../pages/Messages';
import Groups from '../pages/Groups';
import Psychiatrists from '../pages/Psychiatrists';
import Challenges from '../pages/Challenges';
import Favoris from '../pages/Favoris';
import Profile from '../pages/Profile';
import RafiQAI from '../pages/RafiQAI';
import DiscoverGroups from '../pages/DiscoverGroups';
import GroupDetails from '../pages/GroupDetails';
import AdminGroupRequests from '../pages/AdminGroupRequests';
import MesRendezVous from '../pages/MesRendezVous';
import PsychiatristDashboard from '../pages/PsychiatristDashboard';


const SidebarWithAppbar = ({ onLogout, user }) => {
  const role = user?.role === "psychiatre" ? "psychiatre" : "patient";
  const displayName = user?.name || "Utilisateur";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Public');
  const [activeNav, setActiveNav] = useState('Accueil');
  const [expandedMenus, setExpandedMenus] = useState([]);
  const [showFavoritesPage, setShowFavoritesPage] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [showRafiQAIPage, setShowRafiQAIPage] = useState(false);
  const [showDiscoverGroupsPage, setShowDiscoverGroupsPage] = useState(false);


  const [selectedGroup, setSelectedGroup] = useState(null);

  const [showGroupDetailsPage, setShowGroupDetailsPage] = useState(false);

  const [showAdminGroupRequests, setShowAdminGroupRequests] = useState(false);
  const [showQuickBooking, setShowQuickBooking] = useState(false);
  const [showRelaxModal, setShowRelaxModal] = useState(false);
  const [showAppointmentsPage, setShowAppointmentsPage] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Confiance en Soi",
      category: "Confiance en soi",
      members: 121,
      description:
        "Un espace bienveillant pour partager ses expériences et renforcer sa confiance en soi.",
      image:
        "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80",

      // utilisateur actuel
      membershipStatus: "member",
      currentUserRole: "admin",

      // membres
      membersList: [
        {
          id: 1,
          name: "Vous",
          role: "admin",
        },
        {
          id: 2,
          name: "Sara Benali",
          role: "member",
        },
        {
          id: 3,
          name: "Ahmed Ali",
          role: "member",
        },
      ],

      // demandes
      joinRequests: [
        {
          id: 1,
          user: {
            id: "user-test",
            name: "Sara Benali",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          },
          status: "pending",
          requestedAt: "Il y a 5 min",
        },
      ],

      // publications du groupe
      posts: [],

      // favori de l'utilisateur courant
      isFavorite: false,
    },

    {
      id: 2,
      name: "Gestion du Stress",
      category: "Stress",
      members: 246,
      description:
        "Un groupe pour échanger autour du stress et découvrir des méthodes pour mieux le gérer.",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",

      membershipStatus: "member",
      currentUserRole: "member",

      membersList: [
        {
          id: 1,
          name: "Admin du groupe",
          role: "admin",
        },
        {
          id: 2,
          name: "Vous",
          role: "member",
        },
      ],

      joinRequests: [],

      posts: [],

      isFavorite: false,
    },

    {
      id: 3,
      name: "Soutien Anxiété",
      category: "Anxiété",
      members: 156,
      description:
        "Un espace d'écoute et de partage pour mieux comprendre l'anxiété.",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",

      membershipStatus: "not_member",
      currentUserRole: null,

      membersList: [],

      joinRequests: [],

      posts: [],

      isFavorite: false,
    },

    {
      id: 4,
      name: "Relaxation et Méditation",
      category: "Relaxation",
      members: 210,
      description:
        "Découvrez des techniques de relaxation, respiration et méditation.",
      image:
        "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80",

      membershipStatus: "not_member",
      currentUserRole: null,

      membersList: [],

      joinRequests: [],

      posts: [],

      isFavorite: false,
    },
  ]);

  const handleJoinGroup = (groupId) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) {
          return group;
        }

        if (group.membershipStatus !== "not_member") {
          return group;
        }

        return {
          ...group,

          membershipStatus: "pending",

          joinRequests: [
            ...group.joinRequests,

            {
              id: Date.now(),
              user: {
                id: "current-user",
                name: "Vous",
                avatar: "https://randomuser.me/api/portraits/men/41.jpg",
              },
              status: "pending",
              requestedAt: "À l'instant",
            },
          ],
        };
      })
    );
  };
  const handleAcceptJoinRequest = (groupId, requestId) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) {
          return group;
        }

        const request = group.joinRequests.find(
          (item) => item.id === requestId
        );

        if (!request) {
          return group;
        }

        return {
          ...group,

          membershipStatus: "member",

          currentUserRole: "member",

          members: group.members + 1,

          membersList: [
            ...group.membersList,

            {
              id: "current-user",
              name: "Vous",
              role: "member",
            },
          ],

          joinRequests: group.joinRequests.filter(
            (item) => item.id !== requestId
          ),
        };
      })
    );
  };
  const handleRejectJoinRequest = (groupId, requestId) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) {
          return group;
        }

        return {
          ...group,

          joinRequests: group.joinRequests.filter(
            (item) => item.id !== requestId
          ),
        };
      })
    );
  };


  // Total des demandes d'adhésion en attente (groupes où l'utilisateur est admin)
  const totalPendingRequests = groups.reduce((acc, group) => {
    if (group.currentUserRole !== "admin") return acc;
    const pending = (group.joinRequests || []).filter(
      (r) => r.status === "pending"
    ).length;
    return acc + pending;
  }, 0);

  // ==================================================
  // PUBLIER UN POST DANS UN GROUPE
  // (texte, photo, vidéo et/ou événement)
  // ==================================================

  const handleAddPost = (groupId, postInput) => {

    const hasContent = (postInput?.content || "").trim();
    const hasImage = !!postInput?.image;
    const hasVideo = !!postInput?.video;
    const hasEvent = !!postInput?.event;

    // il faut au moins un élément dans la publication
    if (!hasContent && !hasImage && !hasVideo && !hasEvent) {
      return;
    }

    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) {
          return group;
        }

        const newPost = {
          id: Date.now(),
          author: "Vous",
          content: (postInput.content || "").trim(),
          image: postInput.image || null,
          video: postInput.video || null,
          event: postInput.event || null,
          createdAt: "À l'instant",

          // interactions façon réseau social
          likes: 0,
          isLiked: false,
          shares: 0,
          isSaved: false,
          commentsList: [],
        };

        return {
          ...group,

          posts: [newPost, ...(group.posts || [])],
        };
      })
    );
  };

  // ==================================================
  // SUPPRIMER UN POST DE GROUPE
  // ==================================================

  const handleDeleteGroupPost = (groupId, postId) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) {
          return group;
        }

        return {
          ...group,

          posts: (group.posts || []).filter(
            (post) => post.id !== postId
          ),
        };
      })
    );
  };

  // ==================================================
  // AIMER / SAUVEGARDER / PARTAGER UN POST DE GROUPE
  // ==================================================

  const handleLikeGroupPost = (groupId, postId) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) {
          return group;
        }

        return {
          ...group,

          posts: (group.posts || []).map((post) => {
            if (post.id !== postId) {
              return post;
            }

            const isLiked = !post.isLiked;

            return {
              ...post,
              isLiked,
              likes: post.likes + (isLiked ? 1 : -1),
            };
          }),
        };
      })
    );
  };

  const handleSaveGroupPost = (groupId, postId) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) {
          return group;
        }

        return {
          ...group,

          posts: (group.posts || []).map((post) =>
            post.id === postId
              ? { ...post, isSaved: !post.isSaved }
              : post
          ),
        };
      })
    );
  };

  const handleShareGroupPost = (groupId, postId) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) {
          return group;
        }

        return {
          ...group,

          posts: (group.posts || []).map((post) =>
            post.id === postId
              ? { ...post, shares: post.shares + 1 }
              : post
          ),
        };
      })
    );
  };

  // ==================================================
  // COMMENTAIRES SUR UN POST DE GROUPE
  // ==================================================

  const handleAddGroupComment = (groupId, postId, text) => {

    const trimmed = (text || "").trim();

    if (!trimmed) {
      return;
    }

    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) {
          return group;
        }

        return {
          ...group,

          posts: (group.posts || []).map((post) => {
            if (post.id !== postId) {
              return post;
            }

            const newComment = {
              id: Date.now(),
              user: "Vous",
              time: "à l'instant",
              text: trimmed,
              likes: 0,
              isLiked: false,
            };

            return {
              ...post,
              commentsList: [...(post.commentsList || []), newComment],
            };
          }),
        };
      })
    );
  };

  const handleLikeGroupComment = (groupId, postId, commentId) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) {
          return group;
        }

        return {
          ...group,

          posts: (group.posts || []).map((post) => {
            if (post.id !== postId) {
              return post;
            }

            return {
              ...post,

              commentsList: (post.commentsList || []).map((comment) => {
                if (comment.id !== commentId) {
                  return comment;
                }

                const isLiked = !comment.isLiked;

                return {
                  ...comment,
                  isLiked,
                  likes: comment.likes + (isLiked ? 1 : -1),
                };
              }),
            };
          }),
        };
      })
    );
  };

  // ==================================================
  // MODIFIER UN COMMENTAIRE DE GROUPE
  // ==================================================
  const handleEditGroupComment = (groupId, postId, commentId, newText) => {
    const trimmed = (newText || "").trim();
    if (!trimmed) return;

    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) return group;
        return {
          ...group,
          posts: (group.posts || []).map((post) => {
            if (post.id !== postId) return post;
            return {
              ...post,
              commentsList: (post.commentsList || []).map((comment) =>
                comment.id === commentId
                  ? { ...comment, text: trimmed }
                  : comment
              ),
            };
          }),
        };
      })
    );
  };

  // ==================================================
  // SUPPRIMER UN COMMENTAIRE DE GROUPE
  // ==================================================
  const handleDeleteGroupComment = (groupId, postId, commentId) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) return group;
        return {
          ...group,
          posts: (group.posts || []).map((post) => {
            if (post.id !== postId) return post;
            return {
              ...post,
              commentsList: (post.commentsList || []).filter(
                (comment) => comment.id !== commentId
              ),
            };
          }),
        };
      })
    );
  };

  // ==================================================
  // GESTION DES MEMBRES (admin uniquement)
  // ==================================================

  const handleRemoveMember = (groupId, memberId) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) {
          return group;
        }

        const target = group.membersList.find(
          (member) => member.id === memberId
        );

        if (!target) {
          return group;
        }

        const adminCount = group.membersList.filter(
          (member) => member.role === "admin"
        ).length;

        // on ne peut pas retirer le dernier admin
        if (target.role === "admin" && adminCount <= 1) {
          return group;
        }

        const isRemovingSelf =
          memberId === "current-user" || target.name === "Vous";

        return {
          ...group,

          members: Math.max(0, group.members - 1),

          membersList: group.membersList.filter(
            (member) => member.id !== memberId
          ),

          ...(isRemovingSelf
            ? { membershipStatus: "not_member", currentUserRole: null }
            : {}),
        };
      })
    );
  };

  const handlePromoteMember = (groupId, memberId) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) {
          return group;
        }

        return {
          ...group,

          membersList: group.membersList.map((member) =>
            member.id === memberId
              ? { ...member, role: "admin" }
              : member
          ),
        };
      })
    );
  };

  // Rétrograder un admin en membre — impossible s'il est le seul admin restant
  const handleDemoteMember = (groupId, memberId) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) {
          return group;
        }

        const adminCount = group.membersList.filter(
          (member) => member.role === "admin"
        ).length;

        if (adminCount <= 1) {
          return group;
        }

        return {
          ...group,

          membersList: group.membersList.map((member) =>
            member.id === memberId
              ? { ...member, role: "member" }
              : member
          ),
        };
      })
    );
  };

  // ==================================================
  // QUITTER UN GROUPE
  // ==================================================

  const handleLeaveGroup = (groupId) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) {
          return group;
        }

        const adminCount = (group.membersList || []).filter(
          (m) => m.role === "admin"
        ).length;

        // Empêcher le DERNIER admin de quitter
        if (group.currentUserRole === "admin" && adminCount <= 1) {
          return group; // aucun changement
        }

        return {
          ...group,
          membershipStatus: "not_member",
          currentUserRole: null,
          members: Math.max(0, group.members - 1),
          membersList: group.membersList.filter(
            (member) =>
              member.id !== "current-user" && member.name !== "Vous"
          ),
        };
      })
    );
  };

  // ==================================================
  // FAVORI SUR UN GROUPE
  // ==================================================

  const handleToggleFavoriteGroup = (groupId) => {

    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) {
          return group;
        }

        return {
          ...group,

          isFavorite: !group.isFavorite,
        };
      })
    );
  };

  // ==================================================
  // MODIFIER LES INFOS DU GROUPE
  // ==================================================

  const handleUpdateGroupInfo = (groupId, updates) => {

    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) {
          return group;
        }

        return {
          ...group,
          ...updates,
        };
      })
    );
  };

  // ==================================================
  // SUPPRIMER UN GROUPE ENTIÈREMENT
  // ==================================================

  const handleDeleteGroup = (groupId) => {

    setGroups((prevGroups) =>
      prevGroups.filter((group) => group.id !== groupId)
    );

    setSelectedGroup(null);
    setShowGroupDetailsPage(false);
    setShowAdminGroupRequests(false);
  };

  // ==================================================
  // CRÉER UN NOUVEAU GROUPE
  // ==================================================

  const handleCreateGroup = (groupInput) => {

    const name = (groupInput?.name || "").trim();

    if (!name) {
      return;
    }

    const newGroup = {
      id: Date.now(),
      name,
      category: (groupInput.category || "Général").trim(),
      members: 1,
      description: (groupInput.description || "").trim(),
      image:
        groupInput.image ||
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",

      membershipStatus: "member",
      currentUserRole: "admin",

      membersList: [
        {
          id: "current-user",
          name: "Vous",
          role: "admin",
        },
      ],

      joinRequests: [],
      posts: [],
      isFavorite: false,
    };

    setGroups((prevGroups) => [newGroup, ...prevGroups]);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleSubmenu = (menuName) => {
    setExpandedMenus(prev =>
      prev.includes(menuName)
        ? prev.filter(item => item !== menuName)
        : [...prev, menuName]
    );
  };

  // ----- Menu latéral -----
  const menuItemsPatient = [
    { name: "Public", icon: FiUsers },
    { name: "RafiQ AI", icon: FiZap },
    {
      name: "Actions rapides",
      icon: FiChevronRight,
      hasSubmenu: true,
      submenu: [
        { name: "Réserver une séance", icon: FiPlay, color: "#30A196" },
        { name: "Exercices de relaxation", icon: FiLock, color: "#0000FF" },
        { name: "Rejoindre un groupe", icon: FiUsers, color: "#7D13C5" },
      ],
    },
    { name: "Favoris", icon: FiHeart, action: "showFavorites" },
    { name: "Mes rendez-vous", icon: FiCalendar },
  ];

  const menuItemsPsychiatre = [
    { name: "Tableau de bord", icon: FiCalendar, action: "showDashboard" },
    { name: "Public", icon: FiUsers },
    { name: "RafiQ AI", icon: FiZap },
    {
      name: "Actions rapides",
      icon: FiChevronRight,
      hasSubmenu: true,
      submenu: [
        { name: "Exercices de relaxation", icon: FiLock, color: "#0000FF" },
      ],
    },
    { name: "Favoris", icon: FiHeart, action: "showFavorites" },
    { name: "Mes rendez-vous", icon: FiCalendar },
  ];

  const menuItems =
    role === "psychiatre" ? menuItemsPsychiatre : menuItemsPatient;

  // ----- Nav haut / bas -----
  const navItemsPatient = [
    { name: "Accueil", icon: FiHome },
    { name: "Messages", icon: FiMessageSquare },
    { name: "Groupes", icon: FiUsers },
    { name: "Psychiatres", icon: FiUser },
    { name: "Défis", icon: FiAward },
  ];

  const navItemsPsychiatre = [
    { name: "Accueil", icon: FiHome },
    { name: "Messages", icon: FiMessageSquare },
    { name: "Groupes", icon: FiUsers },
  ];

  const navItems =
    role === "psychiatre" ? navItemsPsychiatre : navItemsPatient;

  const handleOpenDiscoverGroups = () => {

    setShowDiscoverGroupsPage(true);

    setShowGroupDetailsPage(false);
    setShowAdminGroupRequests(false);
    setShowProfilePage(false);
    setShowFavoritesPage(false);
    setShowRafiQAIPage(false);

  };
  const handleOpenGroup = (group) => {

    setSelectedGroup(group);

    setShowGroupDetailsPage(true);

    setShowDiscoverGroupsPage(false);
    setShowAdminGroupRequests(false);

  };
  const handleOpenAdminRequests = (group) => {

    setSelectedGroup(group);

    setShowAdminGroupRequests(true);

    setShowGroupDetailsPage(false);
    setShowDiscoverGroupsPage(false);

  };

  const handleMenuAction = (item) => {
    // RafiQ AI
    if (item.name === 'RafiQ AI') {
      setShowRafiQAIPage(true);
      setShowFavoritesPage(false);
      setShowProfilePage(false);
      setActiveMenu(item.name);
      setMobileOpen(false);
      return;
    }

    // Favoris
    if (item.action === 'showFavorites') {
      setShowFavoritesPage(true);
      setShowRafiQAIPage(false);
      setShowProfilePage(false);
      setActiveMenu(item.name);
      setMobileOpen(false);
      return;
    }

    if (item.action === "showDashboard") {
      setShowDashboard(true);
      setShowFavoritesPage(false);
      setShowProfilePage(false);
      setShowRafiQAIPage(false);
      setShowDiscoverGroupsPage(false);
      setActiveMenu(item.name);
      setMobileOpen(false);
      return;
    }

    if (item.name === 'Mes rendez-vous') {
      setShowAppointmentsPage(true);
      setShowFavoritesPage(false);
      setShowProfilePage(false);
      setShowRafiQAIPage(false);
      setShowDiscoverGroupsPage(false);
      setActiveMenu(item.name);
      setMobileOpen(false);
      return;
    }

    // Autres menus
    setShowRafiQAIPage(false);
    setShowFavoritesPage(false);
    setShowProfilePage(false);
    setShowDiscoverGroupsPage(false);
    setShowGroupDetailsPage(false);
    setShowAdminGroupRequests(false);
    setActiveMenu(item.name);
    setMobileOpen(false);
  };

  const handleQuickAction = (actionName) => {
    setShowFavoritesPage(false);
    setShowProfilePage(false);
    setShowRafiQAIPage(false);
    setShowDiscoverGroupsPage(false);
    setShowGroupDetailsPage(false);
    setShowAdminGroupRequests(false);
    setMobileOpen(false);

    if (actionName === "Rejoindre un groupe") {
      setShowDiscoverGroupsPage(true);
      return;
    }

    if (actionName === "Réserver une séance") {
      setShowQuickBooking(true);
      return;
    }

    if (actionName === "Exercices de relaxation") {
      setShowRelaxModal(true);
      return;
    }

    if (actionName === "Contenu éducatif") {
      setActiveNav("Accueil");
      setActiveMenu("Public");
      return;
    }
  };


  //  Fonction pour afficher le profil
  const handleShowProfile = () => {
    setShowProfilePage(true);
    setShowFavoritesPage(false);
    setShowRafiQAIPage(false);
    setMobileOpen(false);
  };

  const handleBackToNormalNav = () => {
    setShowProfilePage(false);
    setShowFavoritesPage(false);
    setShowRafiQAIPage(false);
    setShowDiscoverGroupsPage(false);
    setShowGroupDetailsPage(false);
    setShowAdminGroupRequests(false);
    setShowAppointmentsPage(false);
    setShowDashboard(false);
  };

  const renderActivePage = () => {

    // =========================
    // PROFILE
    // =========================
    if (showProfilePage) {
      return <Profile user={user} />;
    }

    // =========================
    // FAVORIS
    // =========================
    if (showFavoritesPage) {
      return <Favoris />;
    }

    // =========================
    // RAFIQ AI
    // =========================
    if (showRafiQAIPage) {
      return <RafiQAI />;
    }


    if (showAdminGroupRequests) {

      return (
        <AdminGroupRequests
          group={groups.find(
            (group) => group.id === selectedGroup?.id
          )}
          onBack={() => {
            setShowAdminGroupRequests(false);
            setShowGroupDetailsPage(true);
          }}
          onAccept={handleAcceptJoinRequest}
          onReject={handleRejectJoinRequest}
          onUpdateGroup={handleUpdateGroupInfo}
          onDeleteGroup={(groupId) => {
            handleDeleteGroup(groupId);
          }}
        />
      );

    }


    if (showGroupDetailsPage) {

      return (
        <GroupDetails
          group={groups.find(
            (group) => group.id === selectedGroup?.id
          )}
          onBack={() => {
            setShowGroupDetailsPage(false);
          }}
          onManageGroup={handleOpenAdminRequests}
          onAddPost={handleAddPost}
          onDeletePost={handleDeleteGroupPost}
          onLikePost={handleLikeGroupPost}
          onSavePost={handleSaveGroupPost}
          onSharePost={handleShareGroupPost}
          onAddComment={handleAddGroupComment}
          onLikeComment={handleLikeGroupComment}
          onEditComment={handleEditGroupComment}
          onDeleteComment={handleDeleteGroupComment}
          onRemoveMember={handleRemoveMember}
          onPromoteMember={handlePromoteMember}
          onDemoteMember={handleDemoteMember}
          onLeaveGroup={(groupId) => {
            handleLeaveGroup(groupId);
            setShowGroupDetailsPage(false);
          }}
        />
      );

    }


    if (showDiscoverGroupsPage) {

      return (
        <DiscoverGroups
          groups={groups}
          onBack={() => {
            setShowDiscoverGroupsPage(false);
          }}
          onJoinGroup={handleJoinGroup}
        />
      );

    }
    if (showAppointmentsPage) {
      return <MesRendezVous />;
    }

    if (showDashboard && role === "psychiatre") {
      return <PsychiatristDashboard user={user} />;
    }
    // =========================
    // NAVIGATION PRINCIPALE
    // =========================
    switch (activeNav) {

      case "Accueil":
        return <Home
          groups={groups.filter((g) => g.membershipStatus === "member")}
        />
          ;

      case "Messages":
        return <Messages />;

      case "Groupes":
        return (
          <Groups
            groups={groups}
            onDiscoverGroups={handleOpenDiscoverGroups}
            onOpenGroup={handleOpenGroup}
            onToggleFavorite={handleToggleFavoriteGroup}
            onCreateGroup={handleCreateGroup}
          />
        );

      case "Psychiatres":
        return <Psychiatrists />;

      case "Défis":
        return <Challenges />;

      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* AppBar - Complètement responsive */}
      <div className="fixed top-0 left-0 right-0 h-12 bg-white border-b border-gray-200 shadow-sm z-50">
        <div className="flex items-center justify-between h-full px-3 lg:px-4">
          {/* Left section - Logo and mobile menu */}
          <div className="flex items-center space-x-2">
            {/* Mobile menu button - Toujours visible sur mobile */}
            <button
              type="button"
              onClick={handleDrawerToggle}
              className="lg:hidden p-1.5 rounded-md text-gray-600 hover:bg-gray-100"
              aria-label="Ouvrir le menu"
            >
              <FiMenu className="text-lg" />
            </button>

            {/* Logo - Toujours visible */}
            <div className="text-lg font-bold text-[#30A196]">
              RafiQ
            </div>

            {/* Search bar - Visible sur tablette et desktop */}
            <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-2 py-1 w-40 md:w-64 border border-gray-300">
              <FiSearch className="text-gray-500 text-xs mr-1" />
              <input
                type="text"
                placeholder="Recherche..."
                className="bg-transparent outline-none text-[11px] w-full"
              />
            </div>
          </div>

          {/* Right section - Navigation and user */}
          <div className="flex items-center space-x-2">
            {/* Navigation links - Visible uniquement sur desktop */}
            <div className="hidden lg:flex items-center space-x-0">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveNav(item.name);
                    handleBackToNormalNav();
                  }}
                  className={`flex items-center px-2 py-1 rounded-full text-[11px] font-medium transition-colors relative ${activeNav === item.name
                    ? "bg-[#00796B] text-white"
                    : "text-gray-600 hover:text-[#30A196]"
                    }`}
                >
                  <item.icon
                    className={`mr-1 text-xs ${activeNav === item.name ? "text-white" : "text-gray-500"
                      }`}
                  />
                  {item.name}

                  {/* Badge demandes en attente sur Groupes */}
                  {item.name === "Groupes" && totalPendingRequests > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center px-0.5">
                      {totalPendingRequests > 9 ? "9+" : totalPendingRequests}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile search button - Visible uniquement sur mobile */}
            <button className="sm:hidden p-1 text-gray-600 hover:text-[#30A196]">
              <FiSearch className="text-base" />
            </button>

            {/* Notification icon - Toujours visible */}
            <button className="p-1 text-gray-600 hover:text-[#30A196] relative">
              <FiBell className="text-base" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>

            {/* ✅ User avatar - Clic pour ouvrir le profil */}
            <button
              onClick={handleShowProfile}
              className="w-7 h-7 rounded-full border-2 border-[#30A196] cursor-pointer overflow-hidden hover:border-[#00796B] transition-colors"
            >
              <img
                src="https://randomuser.me/api/portraits/men/41.jpg"
                alt="Ahmed Ali"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar - En bas de l'écran sur mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg lg:hidden z-40">
        <div className="flex justify-around items-center h-14">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveNav(item.name);
                handleBackToNormalNav();
              }}
              className={`flex flex-col items-center justify-center p-1 flex-1 transition-colors relative ${activeNav === item.name ? "text-[#00796B]" : "text-gray-600"
                }`}
            >
              <div className="relative">
                <item.icon
                  className={`text-lg mb-0.5 ${activeNav === item.name ? "text-[#00796B]" : "text-gray-500"
                    }`}
                />
                {/* Badge mobile sur Groupes */}
                {item.name === "Groupes" && totalPendingRequests > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center px-0.5">
                    {totalPendingRequests > 9 ? "9+" : totalPendingRequests}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex pt-12 pb-14 lg:pb-0">
        {/* Sidebar for desktop */}
        <div className="hidden lg:flex flex-col w-40 bg-white border-r border-gray-200 fixed top-12 bottom-0 left-0 z-40">
          {/* User profile avec clic pour ouvrir le profil */}
          <button
            onClick={handleShowProfile}
            className="p-2 text-center border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full border-2 border-[#30A196] mx-auto mb-1 overflow-hidden">
              <img
                src="https://randomuser.me/api/portraits/men/41.jpg"
                alt="Ahmed Ali"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-gray-900 text-xs truncate px-2">
              {displayName}
            </h3>
            <p className="text-[10px] text-[#30A196] mt-0.5">
              {role === "psychiatre" ? "Compte psychiatre" : "Compte patient"}
            </p>
          </button>

          {/* Navigation menu */}
          <div className="flex-1 p-1">
            <nav className="space-y-0">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <button
                    onClick={() => {
                      if (item.hasSubmenu) {
                        toggleSubmenu(item.name);
                      } else {
                        handleMenuAction(item);
                      }
                    }}
                    className={`w-full flex items-center justify-between p-1.5 rounded text-left transition-colors ${activeMenu === item.name
                      ? 'bg-[#00796B] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-1.5 ${activeMenu === item.name ? 'bg-white' : 'bg-[#30A196]'
                        }`}>
                        <item.icon className={`text-[10px] ${activeMenu === item.name ? 'text-[#00796B]' : 'text-white'
                          }`} />
                      </div>
                      <span className="font-medium text-[11px]">{item.name}</span>
                    </div>
                    {item.hasSubmenu && (
                      <FiChevronDown className={`text-[10px] transform transition-transform ${expandedMenus.includes(item.name) ? 'rotate-180' : ''
                        } ${activeMenu === item.name ? 'text-white' : 'text-gray-400'}`} />
                    )}
                  </button>

                  {/* Submenu */}
                  {item.hasSubmenu && expandedMenus.includes(item.name) && (
                    <div className="ml-3 mt-0 space-y-0">
                      {item.submenu.map((subItem, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() => handleQuickAction(subItem.name)}
                          className="w-full flex items-center p-1 pl-3 rounded text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          <subItem.icon
                            className="text-[10px] mr-1.5"
                            style={{ color: subItem.color }}
                          />
                          <span className="text-[9px]">{subItem.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Logout section */}
          <div className="p-1 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                if (onLogout) onLogout();
              }}
              className="w-full flex items-center justify-center p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center mr-1.5">
                <FiLogOut className="text-[10px] text-gray-600" />
              </div>
              <span className="font-medium text-[11px]">Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 lg:ml-40 min-h-[calc(100vh-3rem)]">
          <div className="p-3 h-full">
            {renderActivePage()}
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleDrawerToggle}
        >
          {/* Mobile sidebar */}
          <div
            className="fixed top-0 left-0 bottom-0 w-56 bg-white shadow-xl z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Header with close button */}
              <div className="flex items-center justify-between p-3 border-b border-gray-200">
                <div className="text-base font-bold text-[#30A196]">RafiQ</div>
                <button
                  onClick={handleDrawerToggle}
                  className="p-1 rounded text-gray-600 hover:bg-gray-100"
                >
                  <FiX className="text-base" />
                </button>
              </div>

              {/* User profile avec clic pour ouvrir le profil */}
              <button
                onClick={() => {
                  handleShowProfile();
                  setMobileOpen(false);
                }}
                className="p-3 text-center border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full border-2 border-[#30A196] mx-auto mb-2 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/41.jpg"
                    alt="Ahmed Ali"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 text-xs truncate px-2">
                  {displayName}
                </h3>
                <p className="text-[10px] text-[#30A196] mt-0.5">
                  {role === "psychiatre" ? "Compte psychiatre" : "Compte patient"}
                </p>
              </button>

              {/* Navigation menu */}
              <div className="flex-1 p-2">
                <nav className="space-y-0.5">
                  {menuItems.map((item, index) => (
                    <div key={index}>
                      <button
                        onClick={() => {
                          if (item.hasSubmenu) {
                            toggleSubmenu(item.name);
                          } else {
                            handleMenuAction(item);
                          }
                        }}
                        className={`w-full flex items-center justify-between p-1.5 rounded text-left transition-colors ${activeMenu === item.name
                          ? 'bg-[#00796B] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                          }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${activeMenu === item.name ? 'bg-white' : 'bg-[#30A196]'
                            }`}>
                            <item.icon className={`text-[10px] ${activeMenu === item.name ? 'text-[#00796B]' : 'text-white'
                              }`} />
                          </div>
                          <span className="font-medium text-xs">{item.name}</span>
                        </div>
                        {item.hasSubmenu && (
                          <FiChevronDown className={`text-[10px] transform transition-transform ${expandedMenus.includes(item.name) ? 'rotate-180' : ''
                            } ${activeMenu === item.name ? 'text-white' : 'text-gray-400'}`} />
                        )}
                      </button>

                      {/* Submenu */}
                      {item.hasSubmenu && expandedMenus.includes(item.name) && (
                        <div className="ml-6 mt-0.5 space-y-0.5">
                          {item.submenu.map((subItem, subIndex) => (
                            <button
                              key={subIndex}
                              onClick={() => handleQuickAction(subItem.name)}
                              className="w-full flex items-center p-1 rounded text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                              <subItem.icon
                                className="text-xs mr-2"
                                style={{ color: subItem.color }}
                              />
                              <span className="text-xs">{subItem.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Logout section */}
              <div className="p-2 border-t border-gray-200">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    if (onLogout) onLogout();
                  }}
                  className="w-full flex items-center justify-center p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center mr-1.5">
                    <FiLogOut className="text-[10px] text-gray-600" />
                  </div>
                  <span className="font-medium text-xs">Déconnexion</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showQuickBooking && (
        <QuickBookingModal onClose={() => setShowQuickBooking(false)} />
      )}
      {showRelaxModal && (
        <RelaxModal onClose={() => setShowRelaxModal(false)} />
      )}
    </div>
  );
};
const QuickBookingModal = ({ onClose }) => {
  const doctors = [
    { id: 1, name: "Dr. Sara Ahmed", specialty: "Psychiatre" },
    { id: 2, name: "Dr. Karim Benali", specialty: "Psychologue" },
    { id: 3, name: "Dr. Leila Mansour", specialty: "Psychothérapeute" },
  ];
  const [doctorId, setDoctorId] = useState(doctors[0].id);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [done, setDone] = useState(false);

  const tomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-lg max-w-sm w-full p-4 shadow-xl">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-gray-900">Réserver une séance</h3>
          <button type="button" onClick={onClose} className="text-gray-400 text-sm">✕</button>
        </div>
        {done ? (
          <div className="text-center py-4">
            <p className="text-sm font-semibold text-gray-900 mb-1">Demande envoyée</p>
            <p className="text-[11px] text-gray-500 mb-4">(Simulation frontend)</p>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-[#30A196] text-white text-xs rounded-md">
              Fermer
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] text-gray-600 mb-1">Médecin</label>
              <select
                value={doctorId}
                onChange={(e) => setDoctorId(Number(e.target.value))}
                className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none"
              >
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-gray-600 mb-1">Date *</label>
              <input
                type="date"
                min={tomorrow()}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-600 mb-1">Heure</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none"
              >
                {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              disabled={!date}
              onClick={() => {
                const doc = doctors.find((d) => d.id === doctorId) || doctors[0];

                let auth = null;
                try {
                  auth = JSON.parse(localStorage.getItem("rafiq_auth") || "null");
                } catch {
                  auth = null;
                }

                const newAppt = {
                  id: Date.now(),
                  patientName: auth?.name || "Patient",
                  patientEmail: auth?.email || "",
                  doctorName: doc.name,
                  date: date,
                  time: time,
                  type: "en ligne",
                  note: "",
                  status: "pending",
                };

                try {
                  const raw = localStorage.getItem("rafiq_appointments_v1");
                  const list = raw ? JSON.parse(raw) : [];
                  list.unshift(newAppt);
                  localStorage.setItem("rafiq_appointments_v1", JSON.stringify(list));
                } catch {
                  /* ignore */
                }

                setDone(true);
              }}
              className="w-full py-2 bg-[#30A196] text-white text-xs rounded-md disabled:opacity-40"
            >
              Confirmer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const RelaxModal = ({ onClose }) => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const phase = seconds % 10 < 5 ? "Inspirez…" : "Expirez…";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-lg max-w-sm w-full p-5 shadow-xl text-center">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-gray-900">Respiration guidée</h3>
          <button type="button" onClick={onClose} className="text-gray-400 text-sm">✕</button>
        </div>
        <div className="w-24 h-24 mx-auto rounded-full bg-[#30A196]/15 flex items-center justify-center mb-3">
          <span className="text-2xl font-bold text-[#30A196]">{seconds}s</span>
        </div>
        <p className="text-sm text-gray-700 mb-4">{running ? phase : "Appuyez pour commencer"}</p>
        <div className="flex gap-2 justify-center">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="px-4 py-2 bg-[#30A196] text-white text-xs rounded-md"
          >
            {running ? "Pause" : "Démarrer"}
          </button>
          <button
            type="button"
            onClick={() => { setRunning(false); setSeconds(0); }}
            className="px-4 py-2 border border-gray-200 text-gray-600 text-xs rounded-md"
          >
            Reset
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-3">5 sec inspire / 5 sec expire</p>
      </div>
    </div>
  );
};

export default SidebarWithAppbar;