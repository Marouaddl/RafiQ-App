import React, { useState, useEffect, useMemo } from "react";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiPlus,
  FiX,
  FiCheck,
  FiTrash2,
  FiMapPin,
} from "react-icons/fi";

const STORAGE_KEY = "rafiq_appointments_v1";

const DOCTORS = [
  { id: 1, name: "Dr. Sara Ahmed", specialty: "Psychiatre", avatar: "https://randomuser.me/api/portraits/women/45.jpg" },
  { id: 2, name: "Dr. Karim Benali", specialty: "Psychologue", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 3, name: "Dr. Leila Mansour", specialty: "Psychothérapeute", avatar: "https://randomuser.me/api/portraits/women/50.jpg" },
  { id: 4, name: "Dr. Youssef Alami", specialty: "Psychiatre", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
];

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
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const MesRendezVous = () => {
  const [appointments, setAppointments] = useState(() => {
    const saved = loadAppointments();
    if (saved.length > 0) return saved;
    // Exemples de départ
    return [
      {
        id: 1,
        doctorId: 1,
        doctorName: "Dr. Sara Ahmed",
        specialty: "Psychiatre",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        date: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
        time: "14:00",
        type: "en ligne",
        status: "confirmed",
        note: "Suivi anxiété",
      },
      {
        id: 2,
        doctorId: 2,
        doctorName: "Dr. Karim Benali",
        specialty: "Psychologue",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        date: new Date(Date.now() - 5 * 86400000).toISOString().slice(0, 10),
        time: "10:00",
        type: "en personne",
        status: "done",
        note: "",
      },
    ];
  });

  const [filter, setFilter] = useState("upcoming"); // upcoming | past | all
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    doctorId: DOCTORS[0].id,
    date: "",
    time: "10:00",
    type: "en ligne",
    note: "",
  });

  useEffect(() => {
    saveAppointments(appointments);
  }, [appointments]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const tomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  };

  const todayStr = new Date().toISOString().slice(0, 10);

  const filtered = useMemo(() => {
    let list = [...appointments];
    if (filter === "upcoming") {
      list = list.filter(
        (a) =>
          a.status !== "cancelled" &&
          a.status !== "done" &&
          a.date >= todayStr
      );
    } else if (filter === "past") {
      list = list.filter(
        (a) => a.date < todayStr || a.status === "done" || a.status === "cancelled"
      );
    }
    list.sort((a, b) => {
      const cmp = a.date.localeCompare(b.date);
      if (cmp !== 0) return filter === "past" ? -cmp : cmp;
      return a.time.localeCompare(b.time);
    });
    return list;
  }, [appointments, filter, todayStr]);

  const stats = useMemo(() => {
    const upcoming = appointments.filter(
      (a) => a.status !== "cancelled" && a.date >= todayStr
    ).length;
    const done = appointments.filter((a) => a.status === "done").length;
    return { upcoming, done, total: appointments.length };
  }, [appointments, todayStr]);

  const handleCreate = () => {
    if (!form.date) {
      showToast("Choisissez une date");
      return;
    }

    const doc =
      DOCTORS.find((d) => d.id === Number(form.doctorId)) || DOCTORS[0];

    // Patient connecté
    let auth = null;
    try {
      auth = JSON.parse(localStorage.getItem("rafiq_auth") || "null");
    } catch {
      auth = null;
    }

    const appt = {
      id: Date.now(),
      patientName: auth?.name || "Patient",
      patientEmail: auth?.email || "",
      doctorName: doc.name,
      doctorId: doc.id,
      specialty: doc.specialty,
      avatar: doc.avatar,
      date: form.date,
      time: form.time,
      type: form.type,
      note: form.note.trim(),
      status: "pending", // ← pour le dashboard psychiatre
    };

    setAppointments((prev) => [appt, ...prev]);
    setForm({
      doctorId: DOCTORS[0].id,
      date: "",
      time: "10:00",
      type: "en ligne",
      note: "",
    });
    setShowForm(false);
    showToast("Demande envoyée — en attente de confirmation");
  };

  const handleCancel = (id) => {
    if (!window.confirm("Annuler ce rendez-vous ?")) return;
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "cancelled" } : a
      )
    );
    showToast("Rendez-vous annulé");
  };

  const handleMarkDone = (id) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "done" } : a))
    );
    showToast("Marqué comme terminé");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Supprimer définitivement ?")) return;
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    showToast("Supprimé");
  };

  const statusBadge = (status) => {
    if (status === "confirmed")
      return "bg-green-100 text-green-700";
    if (status === "done") return "bg-gray-100 text-gray-600";
    if (status === "cancelled") return "bg-red-100 text-red-600";
    if (status === "pending") return "bg-yellow-100 text-yellow-600";
    return "bg-gray-100 text-gray-600";

  };

  const statusLabel = (status) => {
    if (status === "confirmed") return "Confirmé";
    if (status === "done") return "Terminé";
    if (status === "cancelled") return "Annulé";
    if (status === "pending") return "En attente";
    return status;
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#f7f9fa] pb-8 relative max-w-2xl mx-auto px-2 sm:px-4">
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-xs px-4 py-2 rounded-full shadow-lg">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FiCalendar className="text-[#30A196]" />
              Mes rendez-vous
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Gérez vos séances avec les professionnels
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#30A196] text-white text-xs rounded-md hover:bg-[#00796B]"
          >
            <FiPlus className="text-xs" />
            Nouveau RDV
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-center">
            <p className="text-sm font-bold text-gray-900">{stats.upcoming}</p>
            <p className="text-[10px] text-gray-500">À venir</p>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-center">
            <p className="text-sm font-bold text-gray-900">{stats.done}</p>
            <p className="text-[10px] text-gray-500">Terminés</p>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-center">
            <p className="text-sm font-bold text-gray-900">{stats.total}</p>
            <p className="text-[10px] text-gray-500">Total</p>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex gap-1 mb-4 flex-wrap">
        {[
          { id: "upcoming", label: "À venir" },
          { id: "past", label: "Passés" },
          { id: "all", label: "Tous" },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={
              "px-3 py-1.5 text-[10px] rounded-full border " +
              (filter === f.id
                ? "bg-[#30A196] text-white border-[#30A196]"
                : "border-gray-200 text-gray-600 hover:bg-gray-50")
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Liste */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">
          <FiCalendar className="mx-auto text-3xl text-gray-300 mb-3" />
          <p className="text-xs text-gray-500 mb-2">Aucun rendez-vous ici.</p>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="text-[#30A196] text-xs hover:underline"
          >
            Réserver une séance
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => (
            <div
              key={a.id}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <img
                  src={a.avatar}
                  alt={a.doctorName}
                  className="w-11 h-11 rounded-full object-cover border border-[#30A196]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xs font-semibold text-gray-900">
                        {a.doctorName}
                      </h3>
                      <p className="text-[10px] text-[#30A196]">{a.specialty}</p>
                    </div>
                    <span
                      className={
                        "text-[9px] px-1.5 py-0.5 rounded-full flex-shrink-0 " +
                        statusBadge(a.status)
                      }
                    >
                      {statusLabel(a.status)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="text-[10px]" />
                      {formatDate(a.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock className="text-[10px]" />
                      {a.time}
                    </span>
                    <span className="flex items-center gap-1">
                      {a.type === "en ligne" ? (
                        <>
                          <FiUser className="text-[10px]" /> En ligne
                        </>
                      ) : (
                        <>
                          <FiMapPin className="text-[10px]" /> En personne
                        </>
                      )}
                    </span>
                  </div>

                  {a.note && (
                    <p className="text-[10px] text-gray-600 mt-2 bg-gray-50 rounded px-2 py-1">
                      {a.note}
                    </p>
                  )}

                  {a.status === "confirmed" && a.date >= todayStr && (
                    <div className="flex gap-2 mt-3">
                      <button
                        type="button"
                        onClick={() => handleMarkDone(a.id)}
                        className="flex items-center gap-1 px-2.5 py-1 text-[10px] border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50"
                      >
                        <FiCheck className="text-[10px]" />
                        Terminé
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCancel(a.id)}
                        className="flex items-center gap-1 px-2.5 py-1 text-[10px] border border-red-200 rounded-md text-red-600 hover:bg-red-50"
                      >
                        <FiX className="text-[10px]" />
                        Annuler
                      </button>
                    </div>
                  )}

                  {(a.status === "cancelled" || a.status === "done") && (
                    <button
                      type="button"
                      onClick={() => handleDelete(a.id)}
                      className="mt-3 flex items-center gap-1 text-[10px] text-gray-400 hover:text-red-500"
                    >
                      <FiTrash2 className="text-[10px]" />
                      Supprimer
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal nouveau RDV */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
        >
          <div className="bg-white rounded-lg max-w-sm w-full p-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-900">
                Nouveau rendez-vous
              </h3>
              <button type="button" onClick={() => setShowForm(false)}>
                <FiX className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] text-gray-600 mb-1">
                  Professionnel
                </label>
                <select
                  value={form.doctorId}
                  onChange={(e) =>
                    setForm({ ...form, doctorId: Number(e.target.value) })
                  }
                  className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#30A196]"
                >
                  {DOCTORS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.specialty}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-gray-600 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  min={tomorrow()}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#30A196]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-600 mb-1">
                  Heure
                </label>
                <select
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#30A196]"
                >
                  {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"].map(
                    (t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-gray-600 mb-1">
                  Type
                </label>
                <div className="flex gap-2">
                  {["en ligne", "en personne"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm({ ...form, type: t })}
                      className={
                        "flex-1 py-1.5 text-[11px] rounded-md border " +
                        (form.type === t
                          ? "border-[#30A196] text-[#30A196] bg-[#30A196]/10"
                          : "border-gray-200 text-gray-600")
                      }
                    >
                      {t === "en ligne" ? "En ligne" : "En personne"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-gray-600 mb-1">
                  Note (optionnel)
                </label>
                <input
                  type="text"
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="Motif de la consultation..."
                  className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-[#30A196]"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-2 text-xs border border-gray-200 rounded-md text-gray-600"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleCreate}
                disabled={!form.date}
                className="flex-1 py-2 text-xs bg-[#30A196] text-white rounded-md disabled:opacity-40"
              >
                Réserver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MesRendezVous;