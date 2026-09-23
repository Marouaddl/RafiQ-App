import React from "react";
import { FiUser, FiUsers, FiPhone } from "react-icons/fi";

const RightSidebar = ({ groups: groupsProp }) => {
  const doctors = [
    {
      name: "Dr. Sophie Martin",
      specialty: "Psychiatrie",
      online: true,
      avatar: "https://randomuser.me/api/portraits/women/41.jpg",
    },
    {
      name: "Dr. Pierre Dubois",
      specialty: "Thérapie Cognitive",
      online: false,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Dr. Marie Lambert",
      specialty: "Stress et Anxiété",
      online: true,
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    },
  ];

  // Groupes du state central (si fournis), sinon fallback
  const groups =
    groupsProp && groupsProp.length > 0
      ? groupsProp.slice(0, 5).map((g) => ({
          name: g.name,
          members: String(g.members),
          active: true,
          avatar: g.image,
        }))
      : [
          {
            name: "Gestion Stress",
            members: "245",
            active: true,
            avatar: "https://randomuser.me/api/portraits/women/32.jpg",
          },
          {
            name: "Méditation",
            members: "189",
            active: false,
            avatar: "https://randomuser.me/api/portraits/women/25.jpg",
          },
          {
            name: "Soutien Anxiété",
            members: "156",
            active: true,
            avatar: "https://randomuser.me/api/portraits/men/29.jpg",
          },
        ];

  const emergencyContacts = [
    { name: "Urgences", number: "15", available: true },
    { name: "SOS Médecins", number: "36 24", available: true },
    { name: "Prévention Suicide", number: "3114", available: true },
  ];
  return (
    <div className="w-56 mr-0">
      <div className="space-y-3 sticky top-16">
        {/* Médecins */}
        <div className="bg-white rounded-lg border border-gray-200 p-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-xs text-gray-900">Médecins en ligne</h3>
            <FiUser className="text-[#30A196] text-xs" />
          </div>
          <div className="space-y-1.5">
            {doctors.map((doctor, index) => (
              <div key={index} className="flex items-center justify-between p-1 rounded hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-1.5">
                  <div className="relative">
                    <img 
                      src={doctor.avatar} 
                      alt={doctor.name} 
                      className="w-5 h-5 rounded-full"
                    />
                    {doctor.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full border border-white"></div>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-gray-900 truncate w-20">{doctor.name}</p>
                    <p className="text-[9px] text-gray-500">{doctor.specialty}</p>
                  </div>
                </div>
                <button className="text-[#30A196] hover:text-[#00796B] text-[9px] transition-colors">
                  Contacter
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-1 text-center text-[#30A196] hover:text-[#00796B] text-[10px] py-1 transition-colors">
            Voir plus de médecins
          </button>
        </div>

        {/* Groupes */}
        <div className="bg-white rounded-lg border border-gray-200 p-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-xs text-gray-900">Groupes actifs</h3>
            <FiUsers className="text-[#30A196] text-xs" />
          </div>
          <div className="space-y-1.5">
            {groups.map((group, index) => (
              <div key={index} className="flex items-center justify-between p-1 rounded hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-1.5">
                  <img 
                    src={group.avatar} 
                    alt={group.name} 
                    className="w-5 h-5 rounded-full"
                  />
                  <div>
                    <p className="text-[10px] font-medium text-gray-900 truncate w-16">{group.name}</p>
                    <p className="text-[9px] text-gray-500">{group.members} membres</p>
                  </div>
                </div>
                <span className={`text-[9px] px-1 py-0.5 rounded-full ${
                  group.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {group.active ? 'Actif' : 'Inactif'}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-1 text-center text-[#30A196] hover:text-[#00796B] text-[10px] py-1 transition-colors">
            Voir plus de groupes
          </button>
        </div>

        {/* Urgences */}
        <div className="bg-white rounded-lg border border-gray-200 p-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-xs text-gray-900">Contacts d'urgence</h3>
            <FiPhone className="text-red-500 text-xs" />
          </div>
          <div className="space-y-1">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-1 rounded hover:bg-red-50 transition-colors">
                <div>
                  <p className="text-[10px] font-medium text-gray-900">{contact.name}</p>
                  <p className="text-[9px] text-gray-500">{contact.number}</p>
                </div>
                <span className="text-[9px] px-1 py-0.5 rounded-full bg-green-100 text-green-600">
                  Disponible
                </span>
              </div>
            ))}
          </div>
          <div className="mt-1 p-1.5 bg-red-50 rounded border border-red-200">
            <p className="text-[9px] text-red-700 text-center">
              En cas d'urgence médicale, composez le 15
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;