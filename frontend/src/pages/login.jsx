import React, { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";

// ✅ importer correctement l'image
import img1 from "../assets/img1.png";

export default function Login({
  onNavigateToSignUp,
  onLoginSuccess,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const email = formData.email.trim().toLowerCase();
      let user = null;

      const raw = localStorage.getItem("rafiq_users");
      const users = raw ? JSON.parse(raw) : [];
      const found = users.find((u) => u.email === email);

      if (found) {
        // Compte déjà inscrit → vérifier le mot de passe
        if (found.password && found.password !== formData.password) {
          alert("Email ou mot de passe incorrect");
          setIsLoading(false);
          return;
        }
        user = {
          id: found.id,
          name: found.name,
          email: found.email,
          role: found.role || "patient", // "patient" | "psychiatre"
          accountType: found.accountType,
          registrationNumber: found.registrationNumber || null,
          loggedInAt: new Date().toISOString(),
        };
      } else {
        // Pas de compte enregistré → connexion démo en patient
        user = {
          id: Date.now(),
          name: email.split("@")[0],
          email,
          role: "patient",
          accountType: "rafiq",
          loggedInAt: new Date().toISOString(),
        };
      }

      // Session
      localStorage.setItem("rafiq_auth", JSON.stringify(user));

      // Important : passer l'user à App
      if (onLoginSuccess) {
        onLoginSuccess(user);
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
      {/* Animation de fond */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-[#00796B]/5 to-[#004D40]/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-[#00796B]/5 to-[#004D40]/5 rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* ------- Partie gauche (formulaire) ------- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8 relative z-10">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          {/* En-tête avec animation */}
          <div className="text-center animate-slide-down">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#00796B] rounded-2xl mb-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="w-6 h-6 bg-white rounded-lg"></div>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Bienvenue
            </h1>
            <h2 className="text-lg lg:text-xl font-semibold text-gray-700 mb-1">
              Connectez-vous à votre compte
            </h2>
            <p className="text-gray-500 text-sm">
              Entrez vos coordonnées pour accéder à votre espace
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up">
            {/* Champ Email */}
            <div className="space-y-2 transform hover:scale-[1.02] transition-transform duration-300">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-[#00796B]/10 rounded-lg blur-sm group-hover:blur transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-[#00796B] transition-colors duration-300" />
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@company.com"
                    className="w-full h-11 pl-12 pr-6 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00796B] focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div className="space-y-2 transform hover:scale-[1.02] transition-transform duration-300">
              <label className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-[#00796B]/10 rounded-lg blur-sm group-hover:blur transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-[#00796B] transition-colors duration-300" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full h-11 pl-12 pr-12 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00796B] focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#00796B] transition-colors duration-300 hover:scale-110"
                  >
                    {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Lien mot de passe oublié */}
            <div className="flex justify-end transform hover:translate-x-1 transition-transform duration-300">
              <a
                href="#"
                className="text-sm text-[#00796B] font-medium hover:text-[#00695C] transition-colors duration-300 flex items-center space-x-1"
              >
                <span>Mot de passe oublié ?</span>
                <FiArrowRight className="text-xs" />
              </a>
            </div>

            {/* Bouton se connecter */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-[#00796B] text-white font-semibold rounded-xl hover:bg-[#00695C] focus:outline-none focus:ring-2 focus:ring-[#00796B] focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden shadow-lg"
            >
              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Connexion...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Se connecter</span>
                  <FiArrowRight className="text-lg" />
                </div>
              )}
            </button>

            {/* Lien s'inscrire */}
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <p className="text-gray-600 text-sm">
                Vous n'avez pas de compte ?{" "}
                <button
                  type="button"
                  onClick={onNavigateToSignUp}
                  className="text-[#00796B] font-medium hover:text-[#00695C] transition-colors duration-300 inline-flex items-center space-x-1"
                >
                  <span>S'inscrire</span>
                  <FiArrowRight className="text-xs" />
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* ------- Partie droite (illustration 3D) ------- */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#00796B] to-[#004D40] items-center justify-center relative overflow-hidden">
        {/* Effets de fond animés */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full animate-float-slow"></div>
          <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-white/5 rounded-full animate-float-medium"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-white/5 rounded-full animate-pulse"></div>
        </div>

        {/* Container illustration 3D */}
        <div className="relative z-10 flex flex-col items-center text-center text-white px-8 animate-scale-in">
          <div className="relative group cursor-pointer">
            {/* Effet de halo */}
            <div className="absolute -inset-4 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-1000 opacity-0 group-hover:opacity-100 animate-pulse"></div>

            {/* Image avec effet 3D */}
            <div className="relative transform transition-all duration-700 group-hover:scale-105 group-hover:-translate-y-2">
              <img
                src={img1}
                alt="Illustration connexion sécurisée"
                className="w-72 h-72 object-contain drop-shadow-2xl filter brightness-110 contrast-110"
                style={{
                  transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                  transformStyle: 'preserve-3d'
                }}
              />

              {/* Reflet 3D */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent rounded-lg mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg) translateZ(10px)',
                }}
              ></div>

              {/* Ombre portée 3D */}
              <div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-56 h-4 bg-black/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"
                style={{
                  transform: 'perspective(1000px) rotateX(75deg) translateZ(-50px)',
                }}
              ></div>
            </div>
          </div>

          {/* Texte descriptif */}
          <div className="mt-6 space-y-3 animate-fade-in-up">
            <h3 className="text-xl font-bold tracking-tight">
              Sécurité Avancée
            </h3>
            <p className="text-white/80 leading-relaxed text-base max-w-md">
              Accédez à votre espace personnel en toute sécurité avec notre système d'authentification protégé
            </p>
          </div>

          {/* Points d'information animés */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 animate-stagger">
            {['Chiffrement SSL', 'Authentification 2FA', 'Protection des données'].map((item, index) => (
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