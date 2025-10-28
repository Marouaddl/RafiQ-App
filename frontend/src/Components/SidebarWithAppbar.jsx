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
import Profile from '../pages/Profile'; // ✅ Import de la page Profile

const SidebarWithAppbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Public');
  const [activeNav, setActiveNav] = useState('Accueil');
  const [expandedMenus, setExpandedMenus] = useState([]);
  const [showFavoritesPage, setShowFavoritesPage] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false); // ✅ Nouvel état pour le profil

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

  const menuItems = [
    { name: 'Public', icon: FiUsers },
    { name: 'RafiQ AI', icon: FiZap },
    { 
      name: 'Actions rapides', 
      icon: FiChevronRight,
      hasSubmenu: true,
      submenu: [
        { name: 'Réserver une séance', icon: FiPlay, color: '#30A196' },
        { name: 'Exercices de relaxation', icon: FiLock, color: '#0000FF' },
        { name: 'Contenu éducatif', icon: FiAward, color: '#E25DC5' },
        { name: 'Rejoindre un groupe', icon: FiUsers, color: '#7D13C5' },
      ]
    },
    { 
      name: 'Favoris', 
      icon: FiHeart,
      action: 'showFavorites'
    },
    { name: 'Mes rendez-vous', icon: FiCalendar },
  ];

  // Navigation principale reste inchangée
  const navItems = [
    { name: 'Accueil', icon: FiHome },
    { name: 'Messages', icon: FiMessageSquare },
    { name: 'Groupes', icon: FiUsers },
    { name: 'Psychiatres', icon: FiUser },
    { name: 'Défis', icon: FiAward },
  ];

  // ✅ Fonction pour gérer les actions du menu
  const handleMenuAction = (item) => {
    if (item.action === 'showFavorites') {
      setShowFavoritesPage(true);
      setShowProfilePage(false); // ✅ Désactiver le profil
      setActiveMenu(item.name);
      setMobileOpen(false);
    } else {
      setActiveMenu(item.name);
      setShowFavoritesPage(false);
      setShowProfilePage(false); // ✅ Désactiver le profil
      setMobileOpen(false);
    }
  };

  // ✅ Fonction pour afficher le profil
  const handleShowProfile = () => {
    setShowProfilePage(true);
    setShowFavoritesPage(false); // ✅ Désactiver les favoris
    setMobileOpen(false);
  };

  // ✅ Fonction pour retourner à la navigation normale
  const handleBackToNormalNav = () => {
    setShowProfilePage(false);
    setShowFavoritesPage(false);
  };

  const renderActivePage = () => {
    // ✅ Afficher la page Profile si l'état est activé
    if (showProfilePage) {
      return <Profile />;
    }

    // ✅ Afficher la page Favoris si l'état est activé
    if (showFavoritesPage) {
      return <Favoris />;
    }

    // Navigation normale
    switch (activeNav) {
      case 'Accueil':
        return <Home />;
      case 'Messages':
        return <Messages />;
      case 'Groupes':
        return <Groups />;
      case 'Psychiatres':
        return <Psychiatrists />;
      case 'Défis':
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
              onClick={handleDrawerToggle}
              className="p-1 rounded text-gray-600 hover:bg-gray-100"
            >
              <FiMenu className="text-base" />
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
                    handleBackToNormalNav(); // ✅ Retour à la navigation normale
                  }}
                  className={`flex items-center px-2 py-1 rounded-full text-[11px] font-medium transition-colors ${
                    activeNav === item.name 
                      ? 'bg-[#00796B] text-white' 
                      : 'text-gray-600 hover:text-[#30A196]'
                  }`}
                >
                  <item.icon className={`mr-1 text-xs ${
                    activeNav === item.name ? 'text-white' : 'text-gray-500'
                  }`} />
                  {item.name}
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
                handleBackToNormalNav(); // ✅ Retour à la navigation normale
              }}
              className={`flex flex-col items-center justify-center p-1 flex-1 transition-colors ${
                activeNav === item.name 
                  ? 'text-[#00796B]' 
                  : 'text-gray-600'
              }`}
            >
              <item.icon className={`text-lg mb-0.5 ${
                activeNav === item.name ? 'text-[#00796B]' : 'text-gray-500'
              }`} />
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
            <h3 className="font-semibold text-gray-900 text-[10px]">Ahmed Ali</h3>
            <p className="text-[10px] text-gray-500">3 mois</p>
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
                    className={`w-full flex items-center justify-between p-1.5 rounded text-left transition-colors ${
                      activeMenu === item.name 
                        ? 'bg-[#00796B] text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-1.5 ${
                        activeMenu === item.name ? 'bg-white' : 'bg-[#30A196]'
                      }`}>
                        <item.icon className={`text-[10px] ${
                          activeMenu === item.name ? 'text-[#00796B]' : 'text-white'
                        }`} />
                      </div>
                      <span className="font-medium text-[11px]">{item.name}</span>
                    </div>
                    {item.hasSubmenu && (
                      <FiChevronDown className={`text-[10px] transform transition-transform ${
                        expandedMenus.includes(item.name) ? 'rotate-180' : ''
                      } ${activeMenu === item.name ? 'text-white' : 'text-gray-400'}`} />
                    )}
                  </button>

                  {/* Submenu */}
                  {item.hasSubmenu && expandedMenus.includes(item.name) && (
                    <div className="ml-3 mt-0 space-y-0">
                      {item.submenu.map((subItem, subIndex) => (
                        <button
                          key={subIndex}
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
            <button className="w-full flex items-center justify-center p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
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
                <h3 className="font-semibold text-gray-900 text-xs">Ahmed Ali</h3>
                <p className="text-[10px] text-gray-500 mt-0.5">Membre depuis 3 mois</p>
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
                        className={`w-full flex items-center justify-between p-1.5 rounded text-left transition-colors ${
                          activeMenu === item.name 
                            ? 'bg-[#00796B] text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                            activeMenu === item.name ? 'bg-white' : 'bg-[#30A196]'
                          }`}>
                            <item.icon className={`text-[10px] ${
                              activeMenu === item.name ? 'text-[#00796B]' : 'text-white'
                            }`} />
                          </div>
                          <span className="font-medium text-xs">{item.name}</span>
                        </div>
                        {item.hasSubmenu && (
                          <FiChevronDown className={`text-[10px] transform transition-transform ${
                            expandedMenus.includes(item.name) ? 'rotate-180' : ''
                          } ${activeMenu === item.name ? 'text-white' : 'text-gray-400'}`} />
                        )}
                      </button>

                      {/* Submenu */}
                      {item.hasSubmenu && expandedMenus.includes(item.name) && (
                        <div className="ml-6 mt-0.5 space-y-0.5">
                          {item.submenu.map((subItem, subIndex) => (
                            <button
                              key={subIndex}
                              onClick={() => setMobileOpen(false)}
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
                  onClick={() => setMobileOpen(false)}
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
    </div>
  );
};

export default SidebarWithAppbar;