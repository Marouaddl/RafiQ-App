import React, { useState, useEffect, useMemo } from "react";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiCheck,
  FiX,
  FiInbox,
  FiTrendingUp,
  FiMessageSquare,
} from "react-icons/fi";

const STORAGE_KEY = "rafiq_appointments_v1";

function loadAppointments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAppointments(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

const formatDate = (isoDate) => {
  if (!isoDate) return "";
  const d = new Date(isoDate + "T12:00:00");
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

/**
 * Dashboard réservé au rôle psychiatre.
 * user = { id, name, email, role }
 */
const PsychiatristDashboard = ({ user }) => {
  const [appointments, setAppointments] = useState(() => loadAppointments());
  const [toast, setToast] = useState(null);

  useEffect(() => {
    saveAppointments(appointments);
  }, [appointments]);

  // Recharger si un autre onglet / la page patient a modifié les RDV
  useEffect(() => {
    const onStorage = () => setAppointments(loadAppointments());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const todayStr = new Date().toISOString().slice(0, 10);
  const myName = user?.name || "";

  // RDV liés à ce psychiatre (par nom pour la démo frontend)
  const myAppointments = useMemo(() => {
    return appointments.filter((a) => {
      if (a.psychiatristId && user?.id) {
        return String(a.psychiatristId) === String(user.id);
      }
      // fallback : match sur le nom du médecin
      return (
        a.doctorName &&
        myName &&
        a.doctorName.toLowerCase().includes(myName.toLowerCase().split(" ")[0] || "")
      );
    });
  }, [appointments, user, myName]);

  // Si aucun match par nom (démo), montrer tous les RDV pending/confirmed
  // pour que le pro puisse tester sans backend
  const visible = useMemo(() => {
    if (myAppointments.length > 0) return myAppointments;
    return appointments;
  }, [myAppointments, appointments]);

  const pending = visible.filter((a) => a.status === "pending");
  const today = visible.filter(
    (a) => a.date === todayStr && a.status === "confirmed"
  );
  const upcoming = visible.filter(
    (a) =>
      a.status === "confirmed" &&
      a.date >= todayStr
  );

  const handleAccept = (id) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "confirmed" } : a
      )
    );
    showToast("Rendez-vous accepté");
  };

  const handleRefuse = (id) => {
    if (!window.confirm("Refuser cette demande ?")) return;
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "cancelled" } : a
      )
    );
    showToast("Demande refusée");
  };

  const handleDone = (id) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "done" } : a))
    );
    showToast("Séance marquée terminée");
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#f7f9fa] pb-8 max-w-3xl mx-auto px-2 sm:px-4">
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-xs px-4 py-2 rounded-full shadow-lg">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <h1 className="text-lg font-bold text-gray-900">
          Tableau de bord
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Bonjour {user?.name || "Docteur"} — espace professionnel
        </p>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-[#e6f5f3] border border-[#30A196]/20 rounded-lg p-3 text-center">
            <FiInbox className="mx-auto text-[#30A196] mb-1" />
            <p className="text-sm font-bold text-gray-900">{pending.length}</p>
            <p className="text-[10px] text-gray-500">Demandes</p>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-center">
            <FiCalendar className="mx-auto text-[#30A196] mb-1" />
            <p className="text-sm font-bold text-gray-900">{today.length}</p>
            <p className="text-[10px] text-gray-500">Aujourd&apos;hui</p>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-center">
            <FiTrendingUp className="mx-auto text-[#30A196] mb-1" />
            <p className="text-sm font-bold text-gray-900">{upcoming.length}</p>
            <p className="text-[10px] text-gray-500">À venir</p>
          </div>
        </div>
      </div>

      {/* Demandes en attente */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <FiInbox className="text-[#30A196]" />
          Demandes en attente
        </h2>

        {pending.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-4">
            Aucune demande pour le moment.
          </p>
        ) : (
          <div className="space-y-2">
            {pending.map((a) => (
              <div
                key={a.id}
                className="border border-gray-100 rounded-lg p-3 flex items-start justify-between gap-2"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-900">
                    {a.patientName || a.patientEmail || "Patient"}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5 flex flex-wrap gap-2">
                    <span className="flex items-center gap-0.5">
                      <FiCalendar className="text-[10px]" />
                      {formatDate(a.date)}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <FiClock className="text-[10px]" />
                      {a.time}
                    </span>
                    <span>{a.type || "en ligne"}</span>
                  </p>
                  {a.note && (
                    <p className="text-[10px] text-gray-600 mt-1 bg-gray-50 rounded px-2 py-1">
                      {a.note}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleAccept(a.id)}
                    className="flex items-center gap-1 px-2 py-1 bg-[#30A196] text-white text-[10px] rounded"
                  >
                    <FiCheck className="text-[10px]" />
                    Accepter
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRefuse(a.id)}
                    className="flex items-center gap-1 px-2 py-1 border border-red-200 text-red-600 text-[10px] rounded"
                  >
                    <FiX className="text-[10px]" />
                    Refuser
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Consultations à venir */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <FiCalendar className="text-[#30A196]" />
          Consultations confirmées
        </h2>

        {upcoming.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-4">
            Aucune consultation confirmée.
          </p>
        ) : (
          <div className="space-y-2">
            {upcoming.map((a) => (
              <div
                key={a.id}
                className="border border-gray-100 rounded-lg p-3 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#e6f5f3] flex items-center justify-center flex-shrink-0">
                    <FiUser className="text-[#30A196] text-sm" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">
                      {a.patientName || a.patientEmail || "Patient"}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {formatDate(a.date)} • {a.time} • {a.type || "en ligne"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDone(a.id)}
                  className="text-[10px] px-2 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 flex-shrink-0"
                >
                  Terminer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-[10px] text-gray-400 text-center mt-4">
        Les demandes viennent des réservations patients (même navigateur en démo).
      </p>
    </div>
  );
};

export default PsychiatristDashboard;