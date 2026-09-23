import React, { useState, useEffect, useRef } from "react";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

// Illustration hero (comme Login / Signup)
import landingHero from "../assets/img1.png";

/* ---------- Hook : apparition au scroll ---------- */
function useInView(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

const FadeIn = ({ children, className = "", delay = 0, direction = "up" }) => {
  const [ref, visible] = useInView();
  const transforms = {
    up: "translateY(28px)",
    down: "translateY(-20px)",
    left: "translateX(-28px)",
    right: "translateX(28px)",
    none: "none",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction] || transforms.up,
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const Landing = ({ onLogin, onSignUp }) => {
  const [storyIndex, setStoryIndex] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  const stories = [
    {
      name: "Amina B.",
      role: "Membre RafiQ",
      text: "RafiQ m'a permis de trouver un espace d'écoute sans jugement. Les groupes et mon suivi avec un professionnel ont changé mon quotidien.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Yacine K.",
      role: "Patient",
      text: "Réserver une séance était simple et rapide. Je me sens enfin accompagné dans mon parcours de bien-être mental.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Dr. Sara M.",
      role: "Psychiatre",
      text: "La plateforme m'aide à rester proche de mes patients et à organiser mes consultations efficacement.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-slide témoignages
  useEffect(() => {
    const id = setInterval(() => {
      setStoryIndex((i) => (i === stories.length - 1 ? 0 : i + 1));
    }, 6000);
    return () => clearInterval(id);
  }, [stories.length]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const DARK_TEAL = "#00796B";
  const LIGHT_TEAL = "#4DB6AC";
  const PILL_TEAL = "#00695C";

  return (
    <div
      className="min-h-screen bg-white text-gray-800 overflow-x-hidden"
      style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}
    >
      {/* ========== HERO + NAVBAR ========== */}
      <section id="hero" className="relative overflow-hidden">
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background: DARK_TEAL,
            clipPath: "polygon(0% 0%, 58% 0%, 48% 100%, 0% 100%)",
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background: LIGHT_TEAL,
            clipPath: "polygon(58% 0%, 100% 0%, 100% 100%, 48% 100%)",
          }}
        />
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background: `linear-gradient(160deg, ${DARK_TEAL} 0%, ${LIGHT_TEAL} 100%)`,
          }}
        />

        {/* Navbar */}
        <div
          className="relative z-20 max-w-[1100px] mx-auto px-5 h-[52px] flex items-center justify-between transition-all duration-300"
          style={{
            backdropFilter: navScrolled ? "blur(8px)" : "none",
          }}
        >
          <div
            className="flex items-center gap-2"
            style={{
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? "none" : "translateY(-12px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <span className="text-white font-bold text-[18px] tracking-wide">
              RafiQ
            </span>
          </div>

          <nav
            className="hidden md:flex items-center gap-7 text-[13px] text-white/90"
            style={{
              opacity: heroReady ? 1 : 0,
              transition: "opacity 0.6s ease 0.15s",
            }}
          >
            {[
              ["hero", "Accueil"],
              ["about", "À propos"],
              ["services", "Services"],
              ["stories", "Histoires de succès"],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={onLogin}
            className="text-[12px] font-semibold px-5 py-[7px] rounded-full text-white transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95"
            style={{
              background: PILL_TEAL,
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? "none" : "translateY(-12px)",
              transition:
                "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s, scale 0.2s ease",
            }}
          >
            Se connecter
          </button>
        </div>

        {/* Contenu hero */}
        <div className="relative z-10 max-w-[1100px] mx-auto px-5 pt-8 pb-16 md:pt-10 md:pb-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 items-center min-h-[380px] md:min-h-[420px]">
          <div
            className="text-white order-2 md:order-1"
            style={{
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? "none" : "translateX(-32px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            <h1 className="text-[26px] sm:text-[32px] md:text-[36px] font-extrabold leading-[1.2]">
              Nous ne sommes pas seulement
              <br />
              des médecins, nous sommes
              <br />
              des amis.
            </h1>
            <p className="mt-4 text-[13px] sm:text-[14px] text-white/90 leading-relaxed max-w-[420px]">
              RafiQ est un espace sûr, sans jugement, où tu peux être toi-même.
              Nous croyons que chaque parcours mérite d&apos;être écouté et
              accompagné sans être jugé. Commence ton chemin ici, en toute
              confidentialité, et souviens-toi : tu n&apos;es pas seul.
            </p>
            <button
              type="button"
              onClick={onSignUp}
              className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold px-6 py-2.5 rounded-full bg-white shadow-md transition-all duration-300 hover:bg-gray-50 hover:shadow-lg hover:scale-[1.03] active:scale-95 group"
              style={{ color: DARK_TEAL }}
            >
              Commencer le voyage de la guérison
              <FiArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div
            className="order-1 md:order-2 flex justify-center md:justify-end"
            style={{
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? "none" : "translateX(32px) scale(0.96)",
              transition: "opacity 0.9s ease 0.35s, transform 0.9s ease 0.35s",
            }}
          >
            <img
              src={landingHero}
              alt="Psychologue et accompagnement RafiQ"
              className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] h-auto max-h-[320px] md:max-h-[360px] object-contain object-bottom drop-shadow-xl animate-float"
            />
          </div>
        </div>
      </section>

      {/* ========== QUI SOMMES-NOUS ========== */}
      <section id="about" className="bg-white py-14 md:py-16">
        <div className="max-w-[900px] mx-auto px-5 text-center">
          <FadeIn>
            <h2 className="text-[22px] md:text-[26px] font-bold text-gray-900">
              Qui sommes-nous ?
            </h2>
            <p className="mt-3 text-[13px] text-gray-500 leading-relaxed max-w-[560px] mx-auto">
              La plateforme RafiQ est née d&apos;une conviction simple : personne
              ne devrait affronter seul ses défis de santé mentale. Nous
              connectons patients et professionnels dans un environnement sûr,
              empathique et accessible à tous.
            </p>
            <button
              type="button"
              onClick={onSignUp}
              className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold px-5 py-2 rounded-full text-white transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95"
              style={{ background: "#0B5E56" }}
            >
              Nous rejoindre
              <FiArrowRight className="text-xs" />
            </button>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Communauté solidaire",
                text: "Échangez avec des personnes qui comprennent votre parcours, dans un cadre bienveillant.",
                svg: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0B5E56" strokeWidth="1.8">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                ),
              },
              {
                title: "Soutien professionnel",
                text: "Accédez à des psychiatres et psychologues qualifiés pour un accompagnement personnalisé.",
                svg: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0B5E56" strokeWidth="1.8">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                ),
              },
              {
                title: "Confidentialité assurée",
                text: "Vos échanges et données restent privés. Vous contrôlez ce que vous partagez.",
                svg: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0B5E56" strokeWidth="1.8">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 120}>
                <div className="flex flex-col items-center px-2 group transition-transform duration-300 hover:-translate-y-1">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "#E6F5F3" }}
                  >
                    {item.svg}
                  </div>
                  <h3 className="text-[14px] font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[12px] text-gray-500 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ========== NOS SERVICES ========== */}
      <section
        id="services"
        className="py-14 md:py-16"
        style={{ background: "#0B5E56" }}
      >
        <div className="max-w-[1100px] mx-auto px-5 text-center">
          <FadeIn>
            <h2 className="text-[22px] md:text-[26px] font-bold text-white">
              Nos services
            </h2>
            <p className="mt-2 text-[13px] text-white/75 max-w-[480px] mx-auto">
              Des outils concrets pour prendre soin de votre santé psychologique
              au quotidien.
            </p>
          </FadeIn>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                title: "Groupes de soutien",
                text: "Rejoignez des communautés thématiques et échangez en toute bienveillance.",
                bg: "from-sky-100 to-sky-50",
                visual: (
                  <div className="flex items-end gap-2">
                    <div className="w-10 h-10 rounded-full bg-sky-300" />
                    <div className="w-14 h-16 rounded-xl bg-white shadow border border-sky-100 flex flex-col items-center justify-center gap-1 p-1">
                      <div className="w-6 h-6 rounded-full bg-sky-200" />
                      <div className="w-8 h-1.5 rounded bg-sky-100" />
                      <div className="w-6 h-1.5 rounded bg-sky-100" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-sky-400" />
                  </div>
                ),
              },
              {
                title: "Rendez-vous professionnels",
                text: "Trouvez un psychiatre vérifié et réservez une séance en quelques clics.",
                bg: "from-amber-50 to-orange-50",
                visual: (
                  <div className="flex items-center gap-2">
                    <div className="w-11 h-11 rounded-full bg-amber-200" />
                    <div className="w-16 h-14 rounded-xl bg-white shadow border border-amber-100 flex items-center justify-center">
                      <span className="text-amber-400 text-lg">★★★</span>
                    </div>
                    <div className="w-11 h-11 rounded-full bg-orange-200" />
                  </div>
                ),
              },
              {
                title: "Défis & suivi bien-être",
                text: "Progressez chaque jour avec des défis motivants et l'aide de RafiQ AI.",
                bg: "from-emerald-50 to-teal-50",
                visual: (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-teal-200" />
                    <div className="w-16 h-16 rounded-xl bg-white shadow border border-teal-100 flex flex-col items-center justify-center gap-1 p-2">
                      <div className="w-full h-1.5 rounded bg-teal-200" />
                      <div className="w-3/4 h-1.5 rounded bg-teal-100" />
                      <div className="w-full h-1.5 rounded bg-teal-200" />
                      <div className="w-1/2 h-1.5 rounded bg-teal-100" />
                    </div>
                  </div>
                ),
              },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 140}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
                  <div
                    className={
                      "h-[140px] bg-gradient-to-br flex items-center justify-center transition-transform duration-500 group-hover:scale-105 " +
                      card.bg
                    }
                  >
                    {card.visual}
                  </div>
                  <div className="p-5">
                    <h3 className="text-[14px] font-bold text-gray-900">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-[12px] text-gray-500 leading-relaxed">
                      {card.text}
                    </p>
                    <div className="mt-3 flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span key={n} className="text-amber-400 text-[12px]">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HISTOIRES DE SUCCÈS ========== */}
      <section id="stories" className="bg-white py-14 md:py-16">
        <div className="max-w-[900px] mx-auto px-5 text-center">
          <FadeIn>
            <h2 className="text-[22px] md:text-[26px] font-bold text-gray-900">
              Histoires de succès
            </h2>
            <p className="mt-2 text-[13px] text-gray-500 max-w-[420px] mx-auto">
              Ce que nos membres et professionnels disent de leur expérience
              RafiQ.
            </p>
          </FadeIn>

          <FadeIn delay={150} className="mt-10 relative max-w-[520px] mx-auto">
            <div
              key={storyIndex}
              className="bg-[#F7FAF9] border border-gray-100 rounded-2xl p-6 text-left animate-fade-in"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={stories[storyIndex].avatar}
                  alt={stories[storyIndex].name}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-[14px] font-semibold text-gray-900">
                    {stories[storyIndex].name}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {stories[storyIndex].role}
                  </p>
                </div>
              </div>
              <p className="text-[13px] text-gray-600 leading-relaxed italic">
                « {stories[storyIndex].text} »
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 mt-5">
              <button
                type="button"
                onClick={() =>
                  setStoryIndex((i) =>
                    i === 0 ? stories.length - 1 : i - 1
                  )
                }
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-[#00796B] hover:text-[#00796B] transition-all duration-200"
                aria-label="Précédent"
              >
                <FiChevronLeft />
              </button>
              <div className="flex gap-1.5">
                {stories.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setStoryIndex(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === storyIndex ? 20 : 8,
                      height: 8,
                      background: i === storyIndex ? "#0B5E56" : "#D1D5DB",
                    }}
                    aria-label={`Témoignage ${i + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  setStoryIndex((i) =>
                    i === stories.length - 1 ? 0 : i + 1
                  )
                }
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-[#00796B] hover:text-[#00796B] transition-all duration-200"
                aria-label="Suivant"
              >
                <FiChevronRight />
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section
        className="py-12 md:py-14"
        style={{
          background: "linear-gradient(90deg, #1AA89A 0%, #0E7D72 100%)",
        }}
      >
        <FadeIn className="max-w-[700px] mx-auto px-5 text-center text-white">
          <h2 className="text-[20px] md:text-[24px] font-bold leading-snug">
            Tu n&apos;es pas seul dans ton combat psychologique.
          </h2>
          <p className="mt-3 text-[13px] text-white/85">
            Rejoins la communauté RafiQ aujourd&apos;hui et commence ton parcours
            vers un mieux-être durable.
          </p>
          <button
            type="button"
            onClick={onSignUp}
            className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold px-6 py-2.5 rounded-full bg-white shadow-md transition-all duration-300 hover:bg-gray-50 hover:shadow-lg hover:scale-[1.03] active:scale-95 group"
            style={{ color: "#0B5E56" }}
          >
            Commencer mon parcours maintenant
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </FadeIn>
      </section>

      {/* ========== FOOTER ========== */}
      <footer style={{ background: "#072E2B" }}>
        <div className="max-w-[1100px] mx-auto px-5 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white mb-3">
              <span className="font-bold text-[18px]">RafiQ</span>
            </div>
            <p className="text-[12px] text-white/55 leading-relaxed">
              Plateforme de santé mentale qui unit patients et professionnels
              pour un accompagnement humain et accessible.
            </p>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold text-white mb-3">
              Liens rapides
            </h4>
            <ul className="space-y-2 text-[12px] text-white/65">
              {[
                ["hero", "Accueil"],
                ["about", "À propos"],
                ["services", "Services"],
              ].map(([id, label]) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(id)}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={onLogin}
                  className="hover:text-white transition-colors duration-200"
                >
                  Connexion
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onSignUp}
                  className="hover:text-white transition-colors duration-200"
                >
                  Inscription
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold text-white mb-3">
              Contactez-nous
            </h4>
            <ul className="space-y-2.5 text-[12px] text-white/65">
              <li className="flex items-center gap-2">
                <FiMail className="text-[#5EC4B8]" /> contact@rafiq.app
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="text-[#5EC4B8]" /> +213 555 00 00 00
              </li>
              <li className="flex items-center gap-2">
                <FiMapPin className="text-[#5EC4B8]" /> Alger, Algérie
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-[11px] text-white/40">
          © {new Date().getFullYear()} RafiQ. Tous droits réservés.
        </div>
      </footer>

      {/* Animations CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in {
          animation: fade-in 0.45s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Landing;