import {
  Bike,
  Combine as ChartNoAxesCombined,
  Mouse as House,
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  FileText,
  Settings,
  LogOut,
  Ambulance,
} from "lucide-react";
import React, { useState } from "react";
import { ArrowLeft, Edit2, PlusCircle, CreditCard } from "lucide-react";
import EditCardModal from "./PaymentEditUser";
import EditProfileModal from "./EditProfileModal";

function MockUserProfile() {
  const stats = [
    { label: "Reports", value: "28" },
    { label: "Drivers", value: "12" },
    { label: "User", value: "5" },
  ];

  const quickActions = [
    { icon: Edit, label: "Edit Profile" },
    { icon: FileText, label: "Create Report" },
    { icon: Settings, label: "Settings" },
    { icon: LogOut, label: "Logout" },
  ];
  const [cards, setCards] = useState([
    { number: "1234 5678 9012 3456", expiry: "12/24", holder: "Card Holder" },
    { number: "9876 5432 1098 7654", expiry: "09/27", holder: "Card Holder" },
  ]);

  const mockPatients = [
    {
      name: "John Doe",
      relative: "Father",
      profileImage:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop",
    },
    {
      name: "Jane Doe",
      relative: "Mother",
      profileImage:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop",
    },
    {
      name: "John Doe",
      relative: "Father",
      profileImage:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop",
    },
    {
      name: "Jane Doe",
      relative: "Mother",
      profileImage:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit:crop",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "Andro Strassmann",
    position: "Senior Project Manager",
    phone: "+66 666 66666",
    location: "Bangkok, Thailand",
  });

  const handleAddCard = () => {
    setEditingCard(null); // Reset editing card
    setIsModalOpen(true); // Open modal
  };
  const handleSaveProfile = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const handleEditCard = (card, index) => {
    setEditingCard({ card, index });
    setIsModalOpen(true);
  };

  const handleSaveCard = (cardData) => {
    // Save card data
    if (editingCard !== null) {
      // Edit existing card
      const newCards = [...cards];
      newCards[editingCard.index] = cardData;
      setCards(newCards);
    } else {
      // Add new card
      setCards((prev) => [...prev, cardData]);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto">
        <div className="bg-white overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-cyan-500 to-cyan-900">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                alt="Profile picture of Andro Strassmann"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 pb-8 px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Andro Strassmann
            </h1>
            <p className="text-gray-600 mt-1">Senior Project Manager</p>

            <div className="flex justify-center items-center gap-4 mt-4 text-gray-600">
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>+66 666 66666</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Bangkok, Thailand</span>
              </div>
            </div>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              Edit Profile
            </button>
          </div>
          {/* // Payment Detail */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Payment Detail
            </h2>
          </div>
          {/* Card */}
          <div className="overflow-x-auto snap-x flex gap-4 mb-6 px-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[320px] h-[190px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-5 shadow-md snap-center relative group"
                onClick={() => handleEditCard(card, index)}
              >
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 rounded-xl transition-opacity cursor-pointer" />
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-6 bg-yellow-400 rounded"></div>
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <p className="text-white text-lg tracking-wider font-medium mb-1">
                  {card.number}
                </p>
                <div className="flex justify-between text-white/80 text-sm">
                  <span>{card.holder}</span>
                  <span>{card.expiry}</span>
                </div>
              </div>
            ))}

            {/* Add Card Button */}
            <div
              onClick={handleAddCard}
              className="flex-shrink-0 w-[320px] h-[190px] bg-gray-100 flex items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col items-center">
                <PlusCircle className="w-10 h-10 text-gray-400" />
                <p className="text-gray-500 text-sm mt-2">Add New Card</p>
              </div>
            </div>
            <EditCardModal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setEditingCard(null);
              }}
              onSave={handleSaveCard}
              initialCard={editingCard?.card}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mt-4 px-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Patient Lists
            </h2>
            <button className="text-blue-500 text-sm">Add Patient</button>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-4">
          {mockPatients.map((patient, index) => (
            <div
              key={index}
              className="flex border-2 items-center justify-between px-6 py-4 border-b border-red-200"
            >
              <div className="flex items-center gap-3 border-2">
                <div>
                  <img
                    src={patient.profileImage}
                    alt={patient.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="border-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {patient.name}
                  </h3>
                  <p className="text-gray-600">{patient.relative}</p>
                </div>
              </div>
              <div>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full">
                  Edit Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <EditProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSave={handleSaveProfile}
        initialProfile={profile}
      />
    </div>
  );
}

export default MockUserProfile;