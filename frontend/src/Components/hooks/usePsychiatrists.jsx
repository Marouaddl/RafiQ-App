import { useState, useMemo, useEffect } from "react";

const psychiatristsData = [
  {
    id: 1,
    name: "Dr. Sara Ahmed",
    specialty: "Psychiatre",
    description:
      "Spécialiste en thérapie cognitive et troubles anxieux avec 8 ans d'expérience",
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
    verified: true,
    phone: "+213 555 01 01 01",
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
    verified: true,
    phone: "+213 555 02 02 02",
  },
  {
    id: 3,
    name: "Dr. Leila Mansour",
    specialty: "Psychothérapeute",
    description: "Spécialiste en thérapie familiale et systémique",
    rating: 4.9,
    reviews: 156,
    experience: "10 ans",
    location: "Ben Aknoun",
    price: 3000,
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    available: false,
    online: true,
    languages: ["Français"],
    nextAvailable: "Lundi prochain",
    responseTime: "1 heure",
    verified: true,
    phone: "+213 555 03 03 03",
  },
  {
    id: 4,
    name: "Dr. Youssef Alami",
    specialty: "Psychiatre",
    description: "Spécialiste enfants et adolescents",
    rating: 4.7,
    reviews: 94,
    experience: "7 ans",
    location: "Baba Hassen",
    price: 2800,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    available: true,
    online: true,
    languages: ["Arabe", "Français"],
    nextAvailable: "Aujourd'hui 16:00",
    responseTime: "20 min",
    verified: true,
    phone: "+213 555 04 04 04",
  },
  {
    id: 5,
    name: "Dr. Nadia Bennis",
    specialty: "Psychologue",
    description: "Expert en traumatismes et thérapie EMDR",
    rating: 4.8,
    reviews: 112,
    experience: "9 ans",
    location: "El Biar",
    price: 2200,
    image: "https://randomuser.me/api/portraits/women/60.jpg",
    available: true,
    online: true,
    languages: ["Français", "Arabe"],
    nextAvailable: "Aujourd'hui 11:00",
    responseTime: "10 min",
    verified: true,
    phone: "+213 555 05 05 05",
  },
  {
    id: 6,
    name: "Dr. Sophie Martin",
    specialty: "Psychothérapeute",
    description: "Expert en thérapie de couple et relations",
    rating: 4.5,
    reviews: 78,
    experience: "5 ans",
    location: "Dely Ibrahim",
    price: 1800,
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    available: true,
    online: false,
    languages: ["Arabe"],
    nextAvailable: "Demain 15:00",
    responseTime: "45 min",
    verified: false,
    phone: "+213 555 06 06 06",
  },
  {
    id: 7,
    name: "Dr. Ahmed Boudiaf",
    specialty: "Psychiatre",
    description: "Spécialiste en addictologie",
    rating: 4.7,
    reviews: 134,
    experience: "12 ans",
    location: "Kouba",
    price: 3200,
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    available: false,
    online: true,
    languages: ["Arabe", "Français"],
    nextAvailable: "Mercredi 09:00",
    responseTime: "25 min",
    verified: true,
    phone: "+213 555 07 07 07",
  },
  {
    id: 8,
    name: "Dr. Amira Khelifi",
    specialty: "Psychologue",
    description: "Spécialiste anxiété sociale et estime de soi",
    rating: 4.4,
    reviews: 61,
    experience: "4 ans",
    location: "Bir Mourad Raïs",
    price: 1900,
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    available: true,
    online: true,
    languages: ["Français", "Arabe", "Anglais"],
    nextAvailable: "Aujourd'hui 17:30",
    responseTime: "20 min",
    verified: true,
    phone: "+213 555 08 08 08",
  },
];

const STORAGE_KEY = "rafiq_psy_favorites";
const PUBLIC_KEY = "rafiq_public_psychiatrists";

function loadPublicList() {
  try {
    const raw = localStorage.getItem(PUBLIC_KEY);
    if (!raw || raw === "null") return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const usePsychiatrists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPsychiatrist, setSelectedPsychiatrist] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState(null);

  // Comptes psychiatres réels (publiés depuis le profil)
  const [publicList, setPublicList] = useState(() => loadPublicList());

  // Filtres
  const [filterSpecialty, setFilterSpecialty] = useState("all");
  const [filterAvailability, setFilterAvailability] = useState("all");
  const [filterPrice, setFilterPrice] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [filterFavoritesOnly, setFilterFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  const itemsPerPage = 6;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      /* ignore */
    }
  }, [favorites]);

  // Recharger la liste publique
  useEffect(() => {
    const refresh = () => setPublicList(loadPublicList());
    window.addEventListener("storage", refresh);
    window.addEventListener("rafiq-public-psy-updated", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("rafiq-public-psy-updated", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const filteredPsychiatrists = useMemo(() => {
    let list = [...publicList, ...psychiatristsData];
    const term = searchTerm.toLowerCase().trim();

    if (term) {
      list = list.filter((psy) => {
        const name = (psy.name || "").toLowerCase();
        const specialty = (psy.specialty || "").toLowerCase();
        const description = (psy.description || "").toLowerCase();
        const location = (psy.location || "").toLowerCase();
        const langs = Array.isArray(psy.languages) ? psy.languages : [];
        return (
          name.includes(term) ||
          specialty.includes(term) ||
          description.includes(term) ||
          location.includes(term) ||
          langs.some((lang) => (lang || "").toLowerCase().includes(term))
        );
      });
    }

    if (filterSpecialty !== "all") {
      list = list.filter((psy) => psy.specialty === filterSpecialty);
    }

    if (filterAvailability === "available") {
      list = list.filter((psy) => psy.available);
    } else if (filterAvailability === "online") {
      list = list.filter((psy) => psy.online);
    }

    if (filterPrice === "lt2000") {
      list = list.filter((psy) => Number(psy.price) < 2000);
    } else if (filterPrice === "2000-3000") {
      list = list.filter(
        (psy) => Number(psy.price) >= 2000 && Number(psy.price) <= 3000
      );
    } else if (filterPrice === "gt3000") {
      list = list.filter((psy) => Number(psy.price) > 3000);
    }

    if (filterRating === "4.5") {
      list = list.filter((psy) => Number(psy.rating) >= 4.5);
    } else if (filterRating === "4.0") {
      list = list.filter((psy) => Number(psy.rating) >= 4.0);
    } else if (filterRating === "3.5") {
      list = list.filter((psy) => Number(psy.rating) >= 3.5);
    }

    if (filterFavoritesOnly) {
      list = list.filter((psy) => favorites.includes(psy.id));
    }

    if (sortBy === "rating") {
      list.sort((a, b) => Number(b.rating) - Number(a.rating));
    } else if (sortBy === "price_asc") {
      list.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price_desc") {
      list.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "available") {
      list.sort((a, b) => Number(b.available) - Number(a.available));
    }

    return list;
  }, [
    publicList,
    searchTerm,
    filterSpecialty,
    filterAvailability,
    filterPrice,
    filterRating,
    filterFavoritesOnly,
    favorites,
    sortBy,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPsychiatrists.length / itemsPerPage)
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPsychiatrists = filteredPsychiatrists.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id];
      return next;
    });
  };

  const handleContact = (psychiatrist) => {
    setSelectedPsychiatrist(psychiatrist);
    setShowModal(true);
  };

  const handleOpenDetail = (psychiatrist) => {
    setSelectedPsychiatrist(psychiatrist);
    setShowDetail(true);
  };

  const handleShare = async (psychiatrist) => {
    const shareData = {
      title: psychiatrist.name,
      text: `${psychiatrist.name} — ${psychiatrist.specialty}. ${psychiatrist.description}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}`
        );
        showToast("Informations copiées");
      } else {
        showToast("Partage non supporté sur ce navigateur");
      }
    } catch {
      /* user cancelled */
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilterSpecialty("all");
    setFilterAvailability("all");
    setFilterPrice("all");
    setFilterRating("all");
    setFilterFavoritesOnly(false);
    setSortBy("default");
    setSearchTerm("");
    setCurrentPage(1);
  };

  const favoritePsychiatristsList = useMemo(() => {
    const all = [...publicList, ...psychiatristsData];
    return all.filter((psy) => favorites.includes(psy.id));
  }, [favorites, publicList]);

  return {
    searchTerm,
    setSearchTerm: handleSearch,
    selectedPsychiatrist,
    setSelectedPsychiatrist,
    showModal,
    setShowModal,
    showDetail,
    setShowDetail,
    showFilters,
    setShowFilters,
    favorites,
    toggleFavorite,
    currentPage,
    setCurrentPage,
    filteredPsychiatrists,
    currentPsychiatrists,
    totalPages,
    handleContact,
    handleOpenDetail,
    handleShare,
    favoritePsychiatristsList,
    toast,
    showToast,
    filterSpecialty,
    setFilterSpecialty: (v) => {
      setFilterSpecialty(v);
      setCurrentPage(1);
    },
    filterAvailability,
    setFilterAvailability: (v) => {
      setFilterAvailability(v);
      setCurrentPage(1);
    },
    filterPrice,
    setFilterPrice: (v) => {
      setFilterPrice(v);
      setCurrentPage(1);
    },
    filterRating,
    setFilterRating: (v) => {
      setFilterRating(v);
      setCurrentPage(1);
    },
    filterFavoritesOnly,
    setFilterFavoritesOnly: (v) => {
      setFilterFavoritesOnly(v);
      setCurrentPage(1);
    },
    sortBy,
    setSortBy: (v) => {
      setSortBy(v);
      setCurrentPage(1);
    },
    resetFilters,
  };
};