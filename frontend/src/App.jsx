import { useState } from "react";
import "./App.css";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import SidebarWithAppbar from "./Components/SidebarWithAppbar";

function loadAuth() {
  try {
    const raw = localStorage.getItem("rafiq_auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function App() {
  // "landing" | "login" | "signup" | "app"
  const [currentPage, setCurrentPage] = useState(() =>
    loadAuth() ? "app" : "landing"
  );
  const [user, setUser] = useState(() => loadAuth());

  const handleLoginSuccess = (loggedUser) => {
    setUser(loggedUser || loadAuth());
    setCurrentPage("app");
  };

  const handleSignUpSuccess = (loggedUser) => {
    setUser(loggedUser || loadAuth());
    setCurrentPage("app");
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("rafiq_auth");
    } catch {
      /* ignore */
    }
    setUser(null);
    setCurrentPage("landing"); // retour landing après déconnexion
  };

  if (currentPage === "landing") {
    return (
      <Landing
        onLogin={() => setCurrentPage("login")}
        onSignUp={() => setCurrentPage("signup")}
      />
    );
  }

  if (currentPage === "login") {
    return (
      <Login
        onNavigateToSignUp={() => setCurrentPage("signup")}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (currentPage === "signup") {
    return (
      <SignUp
        onNavigateToLogin={() => setCurrentPage("login")}
        onSignUpSuccess={handleSignUpSuccess}
      />
    );
  }

  return (
    <SidebarWithAppbar onLogout={handleLogout} user={user} />
  );
}

export default App;