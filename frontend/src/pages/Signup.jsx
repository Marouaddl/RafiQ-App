import React, { useState } from "react";
import { FiMail, FiLock, FiUser, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import img1 from "../assets/img1.png";

export default function SignUp({
  onNavigateToLogin,
  onSignUpSuccess,
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    accountType: "",
    registrationNumber: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation type de compte
  if (!formData.accountType) {
    alert("Choisissez un type de compte (Psychiatre ou Rafiq)");
    return;
  }
  if (formData.accountType === "psychiatre" && !formData.registrationNumber.trim()) {
    alert("Le numéro CNOM est obligatoire pour un psychiatre");
    return;
  }
  if (!formData.username.trim() || formData.username.trim().length < 3) {
    alert("Nom d'utilisateur : au moins 3 caractères");
    return;
  }
  if (formData.password.length < 6) {
    alert("Mot de passe : au moins 6 caractères");
    return;
  }

  setIsLoading(true);

  try {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // role interne utilisé dans toute l'app
    const role =
      formData.accountType === "psychiatre" ? "psychiatre" : "patient";

    const user = {
      id: Date.now(),
      name: formData.username.trim(),
      email: formData.email.trim().toLowerCase(),
      role, // "patient" | "psychiatre"
      accountType: formData.accountType, // "rafiq" | "psychiatre" (label UI)
      registrationNumber:
        formData.accountType === "psychiatre"
          ? formData.registrationNumber.trim()
          : null,
      loggedInAt: new Date().toISOString(),
    };

    // Session courante
    localStorage.setItem("rafiq_auth", JSON.stringify(user));

    // Registre des comptes (pour la connexion plus tard)
    const raw = localStorage.getItem("rafiq_users");
    const users = raw ? JSON.parse(raw) : [];
    const without = users.filter((u) => u.email !== user.email);
    without.push({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      accountType: user.accountType,
      registrationNumber: user.registrationNumber,
      password: formData.password, // démo only — jamais en prod
    });
    localStorage.setItem("rafiq_users", JSON.stringify(without));

    // Important : passer l'user au parent
    if (onSignUpSuccess) {
      onSignUpSuccess(user);
    }
  } catch (error) {
    console.error("Erreur:", error);
    alert("Une erreur est survenue");
  } finally {
    setIsLoading(false);
  }
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen max-h-screen font-[Poppins] bg-white overflow-hidden">

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-[#00796B]/5 to-[#004D40]/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-[#00796B]/5 to-[#004D40]/5 rounded-full animate-pulse delay-1000"></div>
      </div>

      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-6 relative z-10">
        <div className="w-full max-w-sm space-y-4">
       
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-[#00796B] rounded-lg mb-2 shadow-lg">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <h1 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">
              Créer un compte
            </h1>
            <p className="text-gray-500 text-xs">
              Rejoignez notre communauté
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-2">
            
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">
                Nom d'utilisateur
              </label>
              <div className="relative">
                <FiUser className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Votre nom d'utilisateur"
                  className="w-full h-8 pl-7 pr-2 bg-white border border-gray-300 rounded-md text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00796B] focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@company.com"
                  className="w-full h-8 pl-7 pr-2 bg-white border border-gray-300 rounded-md text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00796B] focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="relative">
                <FiLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full h-8 pl-7 pr-7 bg-white border border-gray-300 rounded-md text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00796B] focus:border-transparent transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#00796B] transition-colors"
                >
                  {showPassword ? <FiEyeOff className="text-xs" /> : <FiEye className="text-xs" />}
                </button>
              </div>
            </div>

            
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">
                Type de compte
              </label>
              <div className="grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, accountType: 'psychiatre'})}
                  className={`h-8 border rounded-md font-medium transition-all duration-200 text-xs ${
                    formData.accountType === 'psychiatre' 
                      ? 'border-[#00796B] bg-[#00796B] text-white shadow-sm' 
                      : 'border-gray-300 bg-white text-gray-700 hover:border-[#00796B] hover:bg-[#00796B]/5'
                  }`}
                >
                  Psychiatre
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, accountType: 'rafiq'})}
                  className={`h-8 border rounded-md font-medium transition-all duration-200 text-xs ${
                    formData.accountType === 'rafiq' 
                      ? 'border-[#00796B] bg-[#00796B] text-white shadow-sm' 
                      : 'border-gray-300 bg-white text-gray-700 hover:border-[#00796B] hover:bg-[#00796B]/5'
                  }`}
                >
                  Rafiq
                </button>
              </div>
            </div>

            
            {formData.accountType === 'psychiatre' && (
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-700">
                  Numéro CNOM
                </label>
                <div className="relative">
                  <input
                    name="registrationNumber"
                    type="text"
                    required
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="Votre numéro CNOM"
                    className="w-full h-8 pl-2 pr-2 bg-white border border-gray-300 rounded-md text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00796B] focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            )}

            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-8 bg-[#00796B] text-white font-medium rounded-md hover:bg-[#00695C] focus:outline-none focus:ring-1 focus:ring-[#00796B] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-xs mt-1"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-1">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Inscription...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-1">
                  <span>S'inscrire</span>
                  <FiArrowRight className="text-xs" />
                </div>
              )}
            </button>

           
            <div className="text-center pt-1">
              <p className="text-gray-600 text-xs">
                Vous avez déjà un compte ?{" "}
                <button 
                  type="button"
                  onClick={onNavigateToLogin}
                  className="text-[#00796B] font-medium hover:text-[#00695C] transition-colors duration-200 inline-flex items-center space-x-1"
                >
                  <span>Se connecter</span>
                  <FiArrowRight className="text-xs" />
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* ------- Partie droite (illustration 3D) ------- */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#00796B] to-[#004D40] items-center justify-center relative overflow-hidden">
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full animate-float-slow"></div>
          <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-white/5 rounded-full animate-float-medium"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-white/5 rounded-full animate-pulse"></div>
        </div>

        
        <div className="relative z-10 flex flex-col items-center text-center text-white px-8 animate-scale-in">
          <div className="relative group cursor-pointer">
            
            <div className="absolute -inset-4 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-1000 opacity-0 group-hover:opacity-100 animate-pulse"></div>
            
            
            <div className="relative transform transition-all duration-700 group-hover:scale-105 group-hover:-translate-y-2">
              <img
                src={img1}
                alt="Illustration inscription"
                className="w-72 h-72 object-contain drop-shadow-2xl filter brightness-110 contrast-110"
                style={{
                  transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                  transformStyle: 'preserve-3d'
                }}
              />
              
              
              <div 
                className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent rounded-lg mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg) translateZ(10px)',
                }}
              ></div>

              
              <div 
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-56 h-4 bg-black/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"
                style={{
                  transform: 'perspective(1000px) rotateX(75deg) translateZ(-50px)',
                }}
              ></div>
            </div>
          </div>

          
          <div className="mt-6 space-y-3 animate-fade-in-up">
            <h3 className="text-xl font-bold tracking-tight">
              Rejoignez Notre Réseau
            </h3>
            <p className="text-white/80 leading-relaxed text-base max-w-md">
              Créez votre compte et bénéficiez d'un accompagnement personnalisé selon votre profil
            </p>
          </div>

          
          <div className="mt-6 flex flex-wrap justify-center gap-4 animate-stagger">
            {['Profil Personnalisé', 'Accompagnement', 'Réseau Professionnel'].map((item, index) => (
              <div 
                key={item}
                className="flex items-center space-x-2 text-white/90 transform hover:scale-110 transition-transform duration-300"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Styles d'animation */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-down {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes stagger {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-down { animation: slide-down 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.6s ease-out 0.2s both; }
        .animate-scale-in { animation: scale-in 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out 0.4s both; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-stagger > * { animation: stagger 0.5s ease-out both; }
      `}</style>
    </div>
  );
}