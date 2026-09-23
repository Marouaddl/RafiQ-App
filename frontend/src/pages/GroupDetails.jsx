import React, { useState, useRef } from "react";
import {
  FiArrowLeft,
  FiUsers,
  FiSettings,
  FiFileText,
  FiVideo,
  FiCalendar,
  FiMoreHorizontal,
  FiLogOut,
  FiShield,
  FiImage,
  FiX,
  FiMapPin,
  FiCheckCircle,
  FiTrash2,
  FiSearch,
} from "react-icons/fi";
import PostActions from "../Components/PostActions";
import PostStats from "../Components/PostStats";
import CommentsSection from "../Components/CommentsSection";


const GroupDetails = ({
  group,
  onBack,
  onManageGroup,
  onAddPost,
  onDeletePost,
  onLikePost,
  onSavePost,
  onSharePost,
  onAddComment,
  onLikeComment,
  onEditComment,
  onDeleteComment,
  onRemoveMember,
  onPromoteMember,
  onDemoteMember,
  onLeaveGroup,
}) => {

  const [activeTab, setActiveTab] = useState("posts");

  // affichage des commentaires par post (clé = id du post)
  const [openComments, setOpenComments] = useState({});
  const [commentDrafts, setCommentDrafts] = useState({});

  // ==================================================
  // COMPOSEUR DE PUBLICATION
  // ==================================================

  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [postVideo, setPostVideo] = useState(null);
  const [postSearch, setPostSearch] = useState("");

  const [showEventForm, setShowEventForm] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);

  // participation locale aux événements (juste visuel, pas de backend)
  const [joinedEvents, setJoinedEvents] = useState([]);


  // ==================================================
  // SÉCURITÉ
  // ==================================================

  if (!group) {

    return (
      <div className="p-8 text-center">

        <p className="text-sm text-gray-500">
          Groupe introuvable.
        </p>

        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-[#008f83] text-white rounded-md text-xs"
        >
          Retour
        </button>

      </div>
    );

  }


  // ==================================================
  // VÉRIFICATION MEMBRE
  // ==================================================

  if (group.membershipStatus !== "member") {

    return (
      <div className="p-8">

        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs text-gray-600"
        >
          <FiArrowLeft />
          Retour
        </button>


        <div className="mt-8 bg-white border border-gray-200 rounded-lg p-10 text-center">

          <FiUsers className="mx-auto text-4xl text-gray-300" />

          <h2 className="mt-3 text-sm font-semibold text-gray-800">
            Accès limité
          </h2>

          <p className="text-xs text-gray-500 mt-2">
            Vous devez être membre de ce groupe pour accéder
            à son contenu.
          </p>

        </div>

      </div>
    );

  }
  // Nombre d'admins dans le groupe
  const adminCount = (group.membersList || []).filter(
    (m) => m.role === "admin"
  ).length;

  // Un admin peut quitter seulement s'il reste au moins 1 autre admin
  const canLeaveAsAdmin =
    group.currentUserRole === "admin" && adminCount >= 2;

  // Afficher le bouton Quitter :
  // - pour les membres simples
  // - OU pour un admin s'il reste ≥ 2 admins
  const canShowLeaveButton =
    group.currentUserRole !== "admin" || canLeaveAsAdmin;

  // ==================================================
  // GESTION PHOTO / VIDÉO (aperçu local uniquement,
  // pas d'upload réel car il n'y a pas de backend)
  // ==================================================

  const handleImageChange = (e) => {

    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setPostVideo(null);

    const url = URL.createObjectURL(file);

    setPostImage({ url, name: file.name });

    e.target.value = "";
  };

  const handleVideoChange = (e) => {

    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setPostImage(null);

    const url = URL.createObjectURL(file);

    setPostVideo({ url, name: file.name });

    e.target.value = "";
  };

  const handleRemoveImage = () => setPostImage(null);
  const handleRemoveVideo = () => setPostVideo(null);


  // ==================================================
  // GESTION ÉVÉNEMENT
  // ==================================================

  const handleToggleEventForm = () => {
    setShowEventForm((prev) => !prev);
  };

  const handleRemoveEventDraft = () => {
    setShowEventForm(false);
    setEventTitle("");
    setEventDate("");
    setEventLocation("");
  };


  // ==================================================
  // PUBLIER
  // ==================================================

  const hasEventDraft = showEventForm && eventTitle.trim();

  const canSubmit =
    postContent.trim() ||
    postImage ||
    postVideo ||
    hasEventDraft;

  const handleSubmitPost = () => {

    if (!canSubmit) {
      return;
    }

    onAddPost?.(group.id, {
      content: postContent,
      image: postImage,
      video: postVideo,
      event: hasEventDraft
        ? {
          title: eventTitle.trim(),
          date: eventDate,
          location: eventLocation.trim(),
        }
        : null,
    });

    // reset composeur
    setPostContent("");
    setPostImage(null);
    setPostVideo(null);
    handleRemoveEventDraft();

  };


  // ==================================================
  // QUITTER LE GROUPE
  // ==================================================

  const handleConfirmLeave = () => {
    onLeaveGroup?.(group.id);
    setShowLeaveConfirm(false);
  };


  // ==================================================
  // PARTICIPATION ÉVÉNEMENT (local, cosmétique)
  // ==================================================

  const toggleJoinEvent = (postId) => {
    setJoinedEvents((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };


  // ==================================================
  // COMMENTAIRES (état local par post)
  // ==================================================

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentDraftChange = (postId, value) => {
    setCommentDrafts((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  const handleSubmitComment = (postId) => {
    const text = commentDrafts[postId];

    if (!text?.trim()) {
      return;
    }

    onAddComment?.(group.id, postId, text);

    setCommentDrafts((prev) => ({
      ...prev,
      [postId]: "",
    }));
  };








  const posts = group.posts || [];

  // Recherche dans les publications
  const filteredPosts = posts.filter((post) => {
    const q = postSearch.toLowerCase().trim();
    if (!q) return true;
    const content = (post.content || "").toLowerCase();
    const author = (post.author || "").toLowerCase();
    const eventTitle = (post.event?.title || "").toLowerCase();
    return (
      content.includes(q) ||
      author.includes(q) ||
      eventTitle.includes(q)
    );
  });


  const membersList = group.membersList || [];

  const videoPosts = posts.filter((post) => post.video);
  const eventPosts = posts.filter((post) => post.event);


  // ==================================================
  // RENDU D'UN POST (réutilisé dans le fil)
  // ==================================================

  const renderPost = (post) => {

    const canDelete =
      post.author === "Vous" || group.currentUserRole === "admin";

    return (

      <div
        key={post.id}
        className="bg-white border border-gray-200 rounded-lg overflow-hidden"
      >

        <div className="flex items-center justify-between p-4 pb-0 sm:p-5 sm:pb-0">

          <div className="flex items-center gap-3 min-w-0">

            <div className="w-9 h-9 rounded-full bg-[#e6f5f3] flex items-center justify-center flex-shrink-0">

              <FiUsers className="text-[#008f83]" />

            </div>

            <div className="min-w-0">

              <p className="text-xs font-semibold truncate">
                {post.author}
              </p>

              <p className="text-[10px] text-gray-400">
                {post.createdAt}
              </p>

            </div>

          </div>


          {canDelete ? (

            <button
              onClick={() => {
                if (window.confirm("Supprimer cette publication ?")) {
                  onDeletePost?.(group.id, post.id);
                }
              }}
              className="text-gray-400 hover:text-red-500 flex-shrink-0"
              title="Supprimer la publication"
            >
              <FiTrash2 />
            </button>

          ) : (

            <FiMoreHorizontal className="text-gray-400 flex-shrink-0" />

          )}

        </div>


        <div className="p-4 pt-3 sm:p-5 sm:pt-3">

          {post.content && (

            <p className="text-xs text-gray-700 leading-5">

              {post.content}

            </p>

          )}


          {post.image && (

            <div className="mt-3 rounded-md overflow-hidden border border-gray-100">

              <img
                src={post.image.url}
                alt={post.image.name || "Photo publiée"}
                className="w-full max-h-96 object-cover"
              />

            </div>

          )}


          {post.video && (

            <div className="mt-3 rounded-md overflow-hidden border border-gray-100">

              <video
                src={post.video.url}
                controls
                className="w-full max-h-96 bg-black"
              />

            </div>

          )}


          {post.event && (

            <div className="mt-3 border border-[#008f83]/30 bg-[#e6f5f3] rounded-md p-3 sm:p-4">

              <div className="flex items-center gap-2 text-[#008f83]">

                <FiCalendar className="flex-shrink-0" />

                <span className="text-xs font-semibold">
                  {post.event.title}
                </span>

              </div>


              {post.event.date && (

                <p className="text-[11px] text-gray-600 mt-2">

                  📅 {post.event.date}

                </p>

              )}


              {post.event.location && (

                <p className="text-[11px] text-gray-600 mt-1 flex items-center gap-1">

                  <FiMapPin className="text-[10px] flex-shrink-0" />

                  {post.event.location}

                </p>

              )}


              <button
                onClick={() => toggleJoinEvent(post.id)}
                className={`mt-3 flex items-center gap-2 px-3 py-1.5 rounded-md text-[11px] font-medium ${joinedEvents.includes(post.id)
                  ? "bg-[#008f83] text-white"
                  : "bg-white border border-[#008f83] text-[#008f83]"
                  }`}
              >

                <FiCheckCircle />

                {joinedEvents.includes(post.id) ? "Vous participez" : "Je participe"}

              </button>

            </div>

          )}

        </div>


        {/* COMPTEURS */}

        <PostStats
          post={{
            ...post,
            comments: (post.commentsList || []).length,
          }}
        />


        {/* LIKES / COMMENTAIRES / PARTAGE */}

        <PostActions
          post={post}
          onLike={() => onLikePost?.(group.id, post.id)}
          onSave={() => onSavePost?.(group.id, post.id)}
          onShare={() => onSharePost?.(group.id, post.id)}
          onToggleComments={() => toggleComments(post.id)}
        />


        {openComments[post.id] && (

          <CommentsSection
            post={post}
            newComment={commentDrafts[post.id] || ""}
            onNewCommentChange={(value) =>
              handleCommentDraftChange(post.id, value)
            }
            onAddComment={() => handleSubmitComment(post.id)}
            onLikeComment={(postId, commentId) =>
              onLikeComment?.(group.id, postId, commentId)
            }
            onEditComment={(postId, commentId, newText) =>
              onEditComment?.(group.id, postId, commentId, newText)
            }
            onDeleteComment={(postId, commentId) =>
              onDeleteComment?.(group.id, postId, commentId)
            }
          />

        )}

      </div>

    );

  };


  return (

    <div className="min-h-[calc(100vh-60px)] bg-[#f7f9fa]">


      {/* =================================================
          BACK
      ================================================= */}

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#008f83] mb-4"
      >

        <FiArrowLeft />

        Retour à mes groupes

      </button>


      {/* =================================================
          GROUP HEADER
      ================================================= */}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">


        {/* COVER */}

        <div className="h-28 xs:h-32 sm:h-40">

          <img
            src={group.image}
            alt={group.name}
            className="w-full h-full object-cover"
          />

        </div>


        {/* INFO */}

        <div className="p-4 sm:p-5">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className="min-w-0">

              <h1 className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                {group.name}
              </h1>

              <p className="text-xs text-gray-500 mt-1">
                {group.members} membres
              </p>

            </div>


            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">

              {/* ADMIN ONLY — Gérer le groupe */}
              {group.currentUserRole === "admin" && (
                <button
                  onClick={() => onManageGroup(group)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-md text-xs"
                >
                  <FiSettings />
                  Gérer le groupe
                </button>
              )}

              {/* QUITTER — membre simple OU admin s'il reste ≥ 2 admins */}
              {canShowLeaveButton && (
                <button
                  onClick={() => setShowLeaveConfirm(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:border-red-300 hover:text-red-600 text-gray-600 rounded-md text-xs"
                >
                  <FiLogOut />
                  Quitter le groupe
                </button>
              )}

            </div>

          </div>


          {/* =================================================
              TABS
          ================================================= */}

          <div className="flex items-center gap-x-4 gap-y-3 sm:gap-6 mt-6 border-t border-gray-100 pt-4 flex-wrap">

            <button
              onClick={() => setActiveTab("posts")}
              className={`flex items-center gap-2 text-xs font-medium whitespace-nowrap ${activeTab === "posts" ? "text-[#008f83]" : "text-gray-500"
                }`}
            >

              <FiFileText />

              Publications

            </button>


            <button
              onClick={() => setActiveTab("videos")}
              className={`flex items-center gap-2 text-xs font-medium whitespace-nowrap ${activeTab === "videos" ? "text-[#008f83]" : "text-gray-500"
                }`}
            >

              <FiVideo />

              Vidéos ({videoPosts.length})

            </button>


            <button
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-2 text-xs font-medium whitespace-nowrap ${activeTab === "events" ? "text-[#008f83]" : "text-gray-500"
                }`}
            >

              <FiCalendar />

              Événements ({eventPosts.length})

            </button>


            <button
              onClick={() => setActiveTab("members")}
              className={`flex items-center gap-2 text-xs font-medium whitespace-nowrap ${activeTab === "members" ? "text-[#008f83]" : "text-gray-500"
                }`}
            >

              <FiUsers />

              Membres ({membersList.length})

            </button>

          </div>

        </div>

      </div>


      {/* =================================================
          ONGLET : MEMBRES
      ================================================= */}

      {activeTab === "members" && (

        <div className="bg-white border border-gray-200 rounded-lg mt-5 p-4 sm:p-5">

          {membersList.length === 0 ? (

            <p className="text-xs text-gray-500 text-center py-6">
              Aucun membre à afficher.
            </p>

          ) : (

            <div className="space-y-3">

              {membersList.map((member) => {

                const isSelf = member.name === "Vous";
                const isAdminViewer = group.currentUserRole === "admin";

                return (

                  <div
                    key={member.id}
                    className="flex flex-wrap items-center justify-between gap-2 p-3 border border-gray-100 rounded-md"
                  >

                    <div className="flex items-center gap-3 min-w-0">

                      <div className="w-9 h-9 rounded-full bg-[#e6f5f3] flex items-center justify-center flex-shrink-0">
                        <FiUsers className="text-[#008f83]" />
                      </div>

                      <p className="text-xs font-medium text-gray-800 truncate">
                        {member.name}
                      </p>

                    </div>


                    <div className="flex items-center gap-2 flex-wrap">

                      {member.role === "admin" ? (

                        <span className="flex items-center gap-1 text-[10px] px-2 py-1 bg-gray-900 text-white rounded-full whitespace-nowrap">
                          <FiShield className="text-[10px]" />
                          Admin
                        </span>

                      ) : (

                        <span className="text-[10px] px-2 py-1 bg-[#e6f5f3] text-[#008f83] rounded-full whitespace-nowrap">
                          Membre
                        </span>

                      )}


                      {/* ACTIONS ADMIN (jamais sur soi-même) */}

                      {isAdminViewer && !isSelf && (

                        <>

                          {member.role === "admin" ? (

                            <button
                              onClick={() => onDemoteMember?.(group.id, member.id)}
                              className="text-[10px] px-2 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap"
                            >
                              Rétrograder
                            </button>

                          ) : (

                            <button
                              onClick={() => onPromoteMember?.(group.id, member.id)}
                              className="text-[10px] px-2 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap"
                            >
                              Promouvoir admin
                            </button>

                          )}

                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Retirer ${member.name} du groupe ?`
                                )
                              ) {
                                onRemoveMember?.(group.id, member.id);
                              }
                            }}
                            className="text-gray-400 hover:text-red-500"
                            title="Retirer du groupe"
                          >
                            <FiTrash2 className="text-xs" />
                          </button>

                        </>

                      )}

                    </div>

                  </div>

                );

              })}

            </div>

          )}

        </div>

      )}


      {/* =================================================
          ONGLET : VIDÉOS
      ================================================= */}

      {activeTab === "videos" && (

        videoPosts.length === 0 ? (

          <div className="bg-white border border-gray-200 rounded-lg mt-5 p-6 sm:p-10 text-center">

            <FiVideo className="mx-auto text-3xl text-gray-300 mb-3" />

            <p className="text-xs text-gray-500">
              Aucune vidéo pour le moment.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">

            {videoPosts.map((post) => (

              <div
                key={post.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >

                <video
                  src={post.video.url}
                  controls
                  className="w-full max-h-64 bg-black"
                />

                <div className="p-3">

                  <p className="text-[11px] font-semibold text-gray-800">
                    {post.author}
                  </p>

                  <p className="text-[10px] text-gray-400">
                    {post.createdAt}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )

      )}


      {/* =================================================
          ONGLET : ÉVÉNEMENTS
      ================================================= */}

      {activeTab === "events" && (

        eventPosts.length === 0 ? (

          <div className="bg-white border border-gray-200 rounded-lg mt-5 p-6 sm:p-10 text-center">

            <FiCalendar className="mx-auto text-3xl text-gray-300 mb-3" />

            <p className="text-xs text-gray-500">
              Aucun événement pour le moment.
            </p>

          </div>

        ) : (

          <div className="space-y-4 mt-5">

            {eventPosts.map((post) => renderPost(post))}

          </div>

        )

      )}


      {/* =================================================
          ONGLET : PUBLICATIONS
      ================================================= */}

      {activeTab === "posts" && (

        <>

          {/* RECHERCHE DANS LES PUBLICATIONS */}
          <div className="mt-4 mb-2">
            <div className="flex items-center bg-white border border-gray-300 rounded-md h-9 px-3 w-full max-w-sm">
              <FiSearch className="text-gray-400 mr-2 text-sm flex-shrink-0" />
              <input
                type="text"
                value={postSearch}
                onChange={(e) => setPostSearch(e.target.value)}
                placeholder="Rechercher dans les publications..."
                className="w-full text-xs outline-none min-w-0"
              />
            </div>
          </div>

          {/* =================================================
              COMPOSEUR
          ================================================= */}

          <div className="bg-white border border-gray-200 rounded-lg mt-5 p-4">

            <p className="text-xs font-medium text-gray-700 mb-3">

              Que souhaitez-vous partager ?

            </p>


            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Écrivez une publication..."
              className="w-full h-20 border border-gray-200 rounded-md p-3 text-xs resize-none outline-none focus:border-[#008f83]"
            />


            {/* APERÇU PHOTO */}

            {postImage && (

              <div className="relative mt-3 inline-block max-w-full">

                <img
                  src={postImage.url}
                  alt={postImage.name}
                  className="max-h-48 max-w-full rounded-md border border-gray-200"
                />

                <button
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center"
                >
                  <FiX className="text-xs" />
                </button>

              </div>

            )}


            {/* APERÇU VIDÉO */}

            {postVideo && (

              <div className="relative mt-3 inline-block max-w-full">

                <video
                  src={postVideo.url}
                  controls
                  className="max-h-48 max-w-full rounded-md border border-gray-200"
                />

                <button
                  onClick={handleRemoveVideo}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center"
                >
                  <FiX className="text-xs" />
                </button>

              </div>

            )}


            {/* FORMULAIRE ÉVÉNEMENT */}

            {showEventForm && (

              <div className="mt-3 border border-gray-200 rounded-md p-3 space-y-2">

                <div className="flex items-center justify-between">

                  <p className="text-[11px] font-semibold text-gray-700 flex items-center gap-2">
                    <FiCalendar className="text-[#008f83]" />
                    Nouvel événement
                  </p>

                  <button onClick={handleRemoveEventDraft}>
                    <FiX className="text-gray-400 text-sm" />
                  </button>

                </div>

                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Titre de l'événement"
                  className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#008f83]"
                />

                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#008f83]"
                />

                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="Lieu (optionnel)"
                  className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#008f83]"
                />

              </div>

            )}


            {/* BOUTONS D'ATTACHEMENT */}

            <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-gray-100">

              <div className="flex items-center gap-1 flex-wrap">

                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <button
                  onClick={() => imageInputRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-1.5 text-[11px] text-gray-600 hover:bg-gray-100 rounded-md whitespace-nowrap"
                >
                  <FiImage className="text-green-600" />
                  Photo
                </button>


                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="hidden"
                />

                <button
                  onClick={() => videoInputRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-1.5 text-[11px] text-gray-600 hover:bg-gray-100 rounded-md whitespace-nowrap"
                >
                  <FiVideo className="text-red-500" />
                  Vidéo
                </button>


                <button
                  onClick={handleToggleEventForm}
                  className="flex items-center gap-2 px-3 py-1.5 text-[11px] text-gray-600 hover:bg-gray-100 rounded-md whitespace-nowrap"
                >
                  <FiCalendar className="text-[#008f83]" />
                  Événement
                </button>

              </div>


              <button
                onClick={handleSubmitPost}
                disabled={!canSubmit}
                className="ml-auto px-5 py-2 bg-[#008f83] hover:bg-[#00796B] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-md text-xs"
              >

                Publier

              </button>

            </div>

          </div>


          {/* =================================================
              FIL DE PUBLICATIONS
          ================================================= */}

          <div className="mt-5 space-y-4">

            {filteredPosts.length === 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-10 text-center">
                <FiFileText className="mx-auto text-3xl text-gray-300 mb-3" />
                <p className="text-xs text-gray-500">
                  {postSearch.trim()
                    ? "Aucune publication ne correspond à votre recherche."
                    : "Aucune publication pour le moment. Soyez le premier à partager quelque chose !"}
                </p>
              </div>
            )}
            {filteredPosts.map((post) => renderPost(post))}

          </div>

        </>

      )}


      {/* =================================================
          CONFIRMATION QUITTER LE GROUPE
      ================================================= */}

      {showLeaveConfirm && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-lg p-5 sm:p-6 max-w-sm w-full">

            <h3 className="text-sm font-semibold text-gray-900">
              Quitter le groupe ?
            </h3>

            <p className="text-xs text-gray-500 mt-2">
              Vous ne ferez plus partie de "{group.name}". Vous pourrez
              renvoyer une demande d'adhésion plus tard.
              {group.currentUserRole === "admin" && (
                <span className="block mt-1 text-amber-600">
                  Attention : vous êtes admin. Un autre admin restera dans le groupe.
                </span>
              )}
            </p>

            <div className="flex justify-end gap-2 mt-5">

              <button
                onClick={() => setShowLeaveConfirm(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs"
              >
                Annuler
              </button>

              <button
                onClick={handleConfirmLeave}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs"
              >
                Quitter
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};


export default GroupDetails;