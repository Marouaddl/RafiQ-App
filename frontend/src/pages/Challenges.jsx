import React, { useState, useMemo, useEffect } from "react";
import {
  FiAward,
  FiCheck,
  FiPlus,
  FiTarget,
  FiTrendingUp,
  FiX,
  FiSearch,
  FiStar,
  FiCalendar,
  FiPlay,
  FiFlag,
  FiWind,
  FiEdit3,
  FiSmartphone,
  FiNavigation,
  FiDroplet,
  FiMoon,
  FiMessageCircle,
  FiActivity,
  FiHeart,
  FiBookOpen,
} from "react-icons/fi";

const STORAGE_KEY = "rafiq_challenges_v1";

// Map catégorie / type → icône (pas d'emojis)
const ICON_MAP = {
  meditation: FiHeart,
  respiration: FiWind,
  journal: FiEdit3,
  digital: FiSmartphone,
  marche: FiNavigation,
  hydratation: FiDroplet,
  sommeil: FiMoon,
  pensee: FiMessageCircle,
  default: FiActivity,
  custom: FiStar,
};

const INITIAL_CHALLENGES = [
  {
    id: 1,
    title: "Méditation 7 jours",
    description: "Méditez 10 min par jour pendant 7 jours pour calmer l'esprit.",
    category: "Mindfulness",
    durationDays: 7,
    points: 100,
    difficulty: "facile",
    iconKey: "meditation",
    color: "#30A196",
  },
  {
    id: 2,
    title: "Exercice Respiration",
    description: "Pratiquez la respiration profonde 5 minutes, 5 jours de suite.",
    category: "Relaxation",
    durationDays: 5,
    points: 60,
    difficulty: "facile",
    iconKey: "respiration",
    color: "#4F46E5",
  },
  {
    id: 3,
    title: "Journal de Gratitude",
    description: "Notez 3 choses positives chaque soir pendant 14 jours.",
    category: "Écriture",
    durationDays: 14,
    points: 150,
    difficulty: "moyen",
    iconKey: "journal",
    color: "#D97706",
  },
  {
    id: 4,
    title: "Déconnexion Digitale",
    description: "1 heure sans écran avant le coucher pendant 7 jours.",
    category: "Habitudes",
    durationDays: 7,
    points: 120,
    difficulty: "moyen",
    iconKey: "digital",
    color: "#DC2626",
  },
  {
    id: 5,
    title: "Marche active",
    description: "Marchez 30 minutes par jour pendant 10 jours.",
    category: "Sport",
    durationDays: 10,
    points: 110,
    difficulty: "facile",
    iconKey: "marche",
    color: "#059669",
  },
  {
    id: 6,
    title: "Hydratation",
    description: "Buvez 8 verres d'eau par jour pendant 7 jours.",
    category: "Santé",
    durationDays: 7,
    points: 50,
    difficulty: "facile",
    iconKey: "hydratation",
    color: "#0284C7",
  },
  {
    id: 7,
    title: "Sommeil réparateur",
    description: "Couchez-vous avant 23h pendant 14 jours.",
    category: "Habitudes",
    durationDays: 14,
    points: 140,
    difficulty: "difficile",
    iconKey: "sommeil",
    color: "#7C3AED",
  },
  {
    id: 8,
    title: "Pensées positives",
    description:
      "Remplacez une pensée négative par une positive, chaque jour, 10 jours.",
    category: "Mindfulness",
    durationDays: 10,
    points: 130,
    difficulty: "moyen",
    iconKey: "pensee",
    color: "#DB2777",
  },
];

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveState(progressMap, totalPoints) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ progressMap, totalPoints })
    );
  } catch {
    /* ignore */
  }
}

const ChallengeIcon = ({ iconKey, color, size = "text-lg" }) => {
  const Icon = ICON_MAP[iconKey] || ICON_MAP.default;
  return (
    <Icon className={size} style={{ color: color || "#30A196" }} />
  );
};

const Challenges = () => {
  const saved = loadState();
  const [progressMap, setProgressMap] = useState(saved?.progressMap || {});
  const [totalPoints, setTotalPoints] = useState(saved?.totalPoints || 0);
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [customChallenges, setCustomChallenges] = useState([]);
  const [toast, setToast] = useState(null);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    durationDays: 7,
    category: "Habitudes",
  });

  useEffect(() => {
    saveState(progressMap, totalPoints);
  }, [progressMap, totalPoints]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const allChallenges = useMemo(
    () => [...INITIAL_CHALLENGES, ...customChallenges],
    [customChallenges]
  );

  const categories = useMemo(() => {
    const set = new Set(allChallenges.map((c) => c.category));
    return ["all", ...Array.from(set)];
  }, [allChallenges]);

  const getProgress = (id) =>
    progressMap[id] || {
      joined: false,
      daysDone: 0,
      completed: false,
      lastCheckIn: null,
    };

  const percent = (challenge) => {
    const p = getProgress(challenge.id);
    if (!p.joined) return 0;
    return Math.min(
      100,
      Math.round((p.daysDone / challenge.durationDays) * 100)
    );
  };

  const stats = useMemo(() => {
    let active = 0;
    let completed = 0;
    Object.values(progressMap).forEach((p) => {
      if (p.completed) completed += 1;
      else if (p.joined) active += 1;
    });
    return {
      active,
      completed,
      points: totalPoints,
      available: allChallenges.length - active - completed,
    };
  }, [progressMap, totalPoints, allChallenges]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return allChallenges.filter((c) => {
      const p = getProgress(c.id);
      if (filter === "active" && !(p.joined && !p.completed)) return false;
      if (filter === "completed" && !p.completed) return false;
      if (filter === "available" && p.joined) return false;
      if (category !== "all" && c.category !== category) return false;
      if (q) {
        const hay = `${c.title} ${c.description} ${c.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allChallenges, progressMap, filter, category, search]);

  const handleJoin = (challenge) => {
    const p = getProgress(challenge.id);
    if (p.joined) return;
    setProgressMap((prev) => ({
      ...prev,
      [challenge.id]: {
        joined: true,
        daysDone: 0,
        completed: false,
        lastCheckIn: null,
      },
    }));
    showToast(`Défi « ${challenge.title} » rejoint`);
  };

  const handleLeave = (challenge) => {
    if (!window.confirm(`Quitter le défi « ${challenge.title} » ?`)) return;
    setProgressMap((prev) => {
      const next = { ...prev };
      delete next[challenge.id];
      return next;
    });
    showToast("Défi quitté");
    setSelected(null);
  };

  const handleCheckIn = (challenge) => {
    const p = getProgress(challenge.id);
    if (!p.joined || p.completed) return;

    const today = new Date().toDateString();
    if (p.lastCheckIn === today) {
      showToast("Déjà validé aujourd'hui");
      return;
    }

    const daysDone = p.daysDone + 1;
    const completed = daysDone >= challenge.durationDays;

    setProgressMap((prev) => ({
      ...prev,
      [challenge.id]: {
        joined: true,
        daysDone,
        completed,
        lastCheckIn: today,
      },
    }));

    if (completed) {
      setTotalPoints((pts) => pts + challenge.points);
      showToast(`Défi terminé ! +${challenge.points} points`);
    } else {
      showToast(`Jour ${daysDone}/${challenge.durationDays} validé`);
    }
  };

  const handleCreateCustom = () => {
    if (!newChallenge.title.trim()) {
      showToast("Titre obligatoire");
      return;
    }
    const c = {
      id: Date.now(),
      title: newChallenge.title.trim(),
      description: newChallenge.description.trim() || "Défi personnalisé",
      category: newChallenge.category,
      durationDays: Number(newChallenge.durationDays) || 7,
      points: Math.max(20, (Number(newChallenge.durationDays) || 7) * 10),
      difficulty: "moyen",
      iconKey: "custom",
      color: "#00796B",
      custom: true,
    };
    setCustomChallenges((prev) => [c, ...prev]);
    setNewChallenge({
      title: "",
      description: "",
      durationDays: 7,
      category: "Habitudes",
    });
    setShowCreate(false);
    showToast("Défi créé");
  };

  const difficultyLabel = (d) => {
    if (d === "facile")
      return { text: "Facile", cls: "bg-green-100 text-green-700" };
    if (d === "difficile")
      return { text: "Difficile", cls: "bg-red-100 text-red-700" };
    return { text: "Moyen", cls: "bg-amber-100 text-amber-700" };
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#f7f9fa] pb-8 relative">
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-xs px-4 py-2 rounded-full shadow-lg">
          {toast}
        </div>
      )}

      {/* Header stats */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FiAward className="text-[#30A196]" />
              Défis bien-être
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Progressez chaque jour et gagnez des points
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#30A196] text-white text-xs rounded-md hover:bg-[#00796B]"
          >
            <FiPlus className="text-xs" />
            Créer un défi
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            {
              label: "En cours",
              value: stats.active,
              icon: FiPlay,
              color: "text-[#30A196]",
            },
            {
              label: "Terminés",
              value: stats.completed,
              icon: FiFlag,
              color: "text-green-600",
            },
            {
              label: "Points",
              value: stats.points,
              icon: FiStar,
              color: "text-amber-500",
            },
            {
              label: "Disponibles",
              value: stats.available,
              icon: FiTarget,
              color: "text-gray-500",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-center"
            >
              <s.icon className={`mx-auto text-lg mb-1 ${s.color}`} />
              <p className="text-sm font-bold text-gray-900">{s.value}</p>
              <p className="text-[10px] text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-gray-200 rounded-lg p-2 mb-4 flex flex-wrap items-center gap-2">
        <div className="flex items-center bg-gray-100 rounded px-2 h-8 flex-1 min-w-[140px]">
          <FiSearch className="text-gray-400 text-xs mr-1" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un défi..."
            className="bg-transparent outline-none text-xs w-full"
          />
        </div>

        <div className="flex gap-1 flex-wrap">
          {[
            { id: "all", label: "Tous" },
            { id: "active", label: "En cours" },
            { id: "completed", label: "Terminés" },
            { id: "available", label: "À rejoindre" },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={
                "px-2.5 py-1 text-[10px] rounded-full border " +
                (filter === f.id
                  ? "bg-[#30A196] text-white border-[#30A196]"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50")
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-xs border border-gray-200 rounded px-2 h-8 outline-none"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "Toutes catégories" : c}
            </option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">
          <FiTarget className="mx-auto text-3xl text-gray-300 mb-3" />
          <p className="text-xs text-gray-500">Aucun défi trouvé.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((challenge) => {
            const p = getProgress(challenge.id);
            const pct = percent(challenge);
            const diff = difficultyLabel(challenge.difficulty);
            const checkedToday = p.lastCheckIn === new Date().toDateString();

            return (
              <div
                key={challenge.id}
                className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: (challenge.color || "#30A196") + "18" }}
                    >
                      <ChallengeIcon
                        iconKey={challenge.iconKey}
                        color={challenge.color}
                      />
                    </span>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-900">
                        {challenge.title}
                      </h3>
                      <p className="text-[10px] text-gray-500">
                        {challenge.category}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full ${diff.cls}`}
                  >
                    {diff.text}
                  </span>
                </div>

                <p className="text-[11px] text-gray-600 mb-3 line-clamp-2 flex-1">
                  {challenge.description}
                </p>

                <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-2">
                  <span className="flex items-center gap-0.5">
                    <FiCalendar className="text-[10px]" />
                    {challenge.durationDays} j
                  </span>
                  <span className="flex items-center gap-0.5">
                    <FiStar className="text-[10px] text-amber-500" />
                    {challenge.points} pts
                  </span>
                  {p.joined && !p.completed && (
                    <span className="flex items-center gap-0.5">
                      <FiTrendingUp className="text-[10px]" />
                      {p.daysDone}/{challenge.durationDays}
                    </span>
                  )}
                </div>

                <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: p.completed
                        ? "#16a34a"
                        : challenge.color || "#30A196",
                    }}
                  />
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] text-gray-500">
                    {p.completed
                      ? "Terminé"
                      : p.joined
                      ? `${pct}% complété`
                      : "Pas encore commencé"}
                  </span>
                  {p.completed && (
                    <span className="text-[10px] text-green-600 font-medium flex items-center gap-0.5">
                      <FiCheck /> Réussi
                    </span>
                  )}
                </div>

                <div className="flex gap-2 mt-auto">
                  {!p.joined && (
                    <button
                      type="button"
                      onClick={() => handleJoin(challenge)}
                      className="flex-1 py-1.5 bg-[#30A196] text-white text-[11px] rounded-md hover:bg-[#00796B]"
                    >
                      Rejoindre
                    </button>
                  )}
                  {p.joined && !p.completed && (
                    <button
                      type="button"
                      onClick={() => handleCheckIn(challenge)}
                      disabled={checkedToday}
                      className={
                        "flex-1 py-1.5 text-[11px] rounded-md " +
                        (checkedToday
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-[#30A196] text-white hover:bg-[#00796B]")
                      }
                    >
                      {checkedToday ? "Validé aujourd'hui" : "Valider le jour"}
                    </button>
                  )}
                  {p.completed && (
                    <button
                      type="button"
                      disabled
                      className="flex-1 py-1.5 bg-green-50 text-green-700 text-[11px] rounded-md"
                    >
                      Défi accompli
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelected(challenge)}
                    className="px-3 py-1.5 border border-gray-200 text-gray-600 text-[11px] rounded-md hover:bg-gray-50"
                  >
                    Détails
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DETAIL MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <div className="bg-white rounded-lg max-w-md w-full p-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span
                  className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: (selected.color || "#30A196") + "18",
                  }}
                >
                  <ChallengeIcon
                    iconKey={selected.iconKey}
                    color={selected.color}
                    size="text-xl"
                  />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    {selected.title}
                  </h3>
                  <p className="text-[10px] text-gray-500">
                    {selected.category} • {selected.durationDays} jours •{" "}
                    {selected.points} pts
                  </p>
                </div>
              </div>
              <button type="button" onClick={() => setSelected(null)}>
                <FiX className="text-gray-400" />
              </button>
            </div>

            <p className="text-xs text-gray-600 leading-5 mb-4">
              {selected.description}
            </p>

            {(() => {
              const p = getProgress(selected.id);
              const pct = percent(selected);
              return (
                <>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 mb-1">
                    <div
                      className="h-2.5 rounded-full"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: selected.color,
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 mb-4">
                    {p.joined
                      ? `Jour ${p.daysDone} / ${selected.durationDays}`
                      : "Vous n'avez pas encore rejoint ce défi"}
                  </p>

                  {p.joined && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {Array.from({ length: selected.durationDays }).map(
                        (_, i) => (
                          <div
                            key={i}
                            className={
                              "w-7 h-7 rounded-full text-[10px] flex items-center justify-center font-medium " +
                              (i < p.daysDone
                                ? "bg-[#30A196] text-white"
                                : "bg-gray-100 text-gray-400")
                            }
                          >
                            {i + 1}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    {!p.joined && (
                      <button
                        type="button"
                        onClick={() => handleJoin(selected)}
                        className="flex-1 py-2 bg-[#30A196] text-white text-xs rounded-md"
                      >
                        Rejoindre
                      </button>
                    )}
                    {p.joined && !p.completed && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleCheckIn(selected)}
                          className="flex-1 py-2 bg-[#30A196] text-white text-xs rounded-md"
                        >
                          Valider le jour
                        </button>
                        <button
                          type="button"
                          onClick={() => handleLeave(selected)}
                          className="px-3 py-2 border border-red-200 text-red-600 text-xs rounded-md"
                        >
                          Quitter
                        </button>
                      </>
                    )}
                    {p.completed && (
                      <button
                        type="button"
                        onClick={() => setSelected(null)}
                        className="flex-1 py-2 bg-green-600 text-white text-xs rounded-md"
                      >
                        Bravo
                      </button>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* CREATE MODAL */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg max-w-md w-full p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-900">
                Créer un défi personnel
              </h3>
              <button type="button" onClick={() => setShowCreate(false)}>
                <FiX className="text-gray-400" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] text-gray-600 mb-1">
                  Titre *
                </label>
                <input
                  type="text"
                  value={newChallenge.title}
                  onChange={(e) =>
                    setNewChallenge({ ...newChallenge, title: e.target.value })
                  }
                  className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#30A196]"
                  placeholder="Ex: Méditation du matin"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  value={newChallenge.description}
                  onChange={(e) =>
                    setNewChallenge({
                      ...newChallenge,
                      description: e.target.value,
                    })
                  }
                  rows={2}
                  className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#30A196] resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">
                    Durée (jours)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={90}
                    value={newChallenge.durationDays}
                    onChange={(e) =>
                      setNewChallenge({
                        ...newChallenge,
                        durationDays: e.target.value,
                      })
                    }
                    className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#30A196]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">
                    Catégorie
                  </label>
                  <select
                    value={newChallenge.category}
                    onChange={(e) =>
                      setNewChallenge({
                        ...newChallenge,
                        category: e.target.value,
                      })
                    }
                    className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#30A196]"
                  >
                    {[
                      "Mindfulness",
                      "Relaxation",
                      "Écriture",
                      "Habitudes",
                      "Sport",
                      "Santé",
                    ].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 text-xs text-gray-600"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleCreateCustom}
                className="px-4 py-2 bg-[#30A196] text-white text-xs rounded-md"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenges;