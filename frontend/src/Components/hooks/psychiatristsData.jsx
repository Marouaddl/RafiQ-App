import { useState, useMemo } from "react";

// Données directement dans le hook pour simplifier
const psychiatristsData = [
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
    verified: true
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
    verified: true
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
    verified: true
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
    verified: false
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
    verified: true
  }
];

export const usePsychiatrists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPsychiatrist, setSelectedPsychiatrist] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // Recherche corrigée - plus robuste
  const filteredPsychiatrists = useMemo(() => {
    if (!searchTerm.trim()) {
      return psychiatristsData;
    }
    
    const term = searchTerm.toLowerCase().trim();
    return psychiatristsData.filter((psy) =>
      psy.name.toLowerCase().includes(term) ||
      psy.specialty.toLowerCase().includes(term) ||
      psy.description.toLowerCase().includes(term) ||
      psy.location.toLowerCase().includes(term) ||
      psy.languages.some(lang => lang.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredPsychiatrists.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPsychiatrists = filteredPsychiatrists.slice(startIndex, startIndex + itemsPerPage);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const handleContact = (psychiatrist) => {
    setSelectedPsychiatrist(psychiatrist);
    setShowModal(true);
  };

  const handleShare = async (psychiatrist) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: psychiatrist.name,
          text: psychiatrist.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Erreur de partage:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier !');
    }
  };

  // Réinitialiser la page quand la recherche change
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset à la première page
  };

  return {
    searchTerm,
    setSearchTerm: handleSearch, // Utiliser la version corrigée
    selectedPsychiatrist,
    setSelectedPsychiatrist,
    showModal,
    setShowModal,
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
    handleShare
  };
};