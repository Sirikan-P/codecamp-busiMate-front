import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuthStore } from "../../store/userAuthStore";
import useHospitalStore from "../../store/hospital-store";
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
  CreditCard,
  PlusCircle,
} from "lucide-react";
import EditCardModal from "./PaymentEditUser";

const ProfilePageUser = () => {
  const checkAuth = userAuthStore((state) => state.checkAuth);
  const authUser = userAuthStore((state) => state.authUser);
  const fetchGetPatients = userAuthStore((state) => state.fetchGetPatients);
  const patients = userAuthStore((state) => state.patients);
  const fetchHospitalData = useHospitalStore(
    (state) => state.fetchHospitalData
  );
  const fetchGetUserAddress = userAuthStore(
    (state) => state.fetchGetUserAddress
  );
  console.log(authUser);

  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchGetPatients();
    fetchHospitalData();
  }, [checkAuth, fetchGetPatients, fetchHospitalData]);

  const hdlEdit = () => {
    navigate("/user/setting");
  };

  const hdlSelect = () => {
    navigate("/user/patients");
  };

  console.log("authUser", authUser);
  console.log("patients", patients);

  // card

  const [cards, setCards] = useState([
    { number: "1234 5678 9012 3456", expiry: "12/24", holder: "Card Holder" },
    { number: "9876 5432 1098 7654", expiry: "09/27", holder: "Card Holder" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profile, setProfile] = useState({});

  const handleAddCard = () => {
    setEditingCard(null);
    setIsModalOpen(true);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-600 p-5">
      <div className="bg-white w-full max-w-md p-6 m-5 pt-20 rounded-lg shadow-lg h-full">
          <div className="font-semibold  text-cyan-700  text-4xl flex gap-5">
            My Profile
          </div>
        <div className="flex justify-between items-center mb-5">
          {/* title && make booking btn */}
          <div className="w-full flex justify-end">
            {/* Make booking button */}
            <button
              onClick={() => navigate("/user/booking/create")}
              className="bg-cyan-700 w-50 text-lg text-slate-300 p-2 rounded-md mt-10 shadow-2xl"
            >
              MAKE BOOKING
            </button>
          </div>
        </div>
        {/*User  Profile */}
        <div className="flex gap-5 p-5 mb-5 rounded-lg border-1 border-cyan-200">
          {/* img profile */}
          <div className="w-20 h-20 rounded-full overflow-hidden bg-amber-300 ">
            <img src={authUser.profileImage} alt="Profile" />
          </div>
          <div>
            <div className="text-cyan-600 mb-5 text-xl">
              <div className="font-semibold text-cyan-700 text-2xl">
                {authUser.firstName + " " + authUser.lastName}
              </div>
              <div>{authUser?.phoneNumber}</div>
              <div className="text-md">{authUser?.status}</div>
            </div>
          </div>
        </div>
        {/* edit profile btn */}
        <button
          className="bg-cyan-600 w-40 text-md text-slate-300 p-2 rounded-md "
          onClick={hdlEdit}
        >
          EDIT PROFILE
        </button>

        {/* card */}
        <div className="overflow-x-auto snap-x flex gap-4  px-4 py-4 mt-5 mx-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[320px] h-[190px] bg-gradient-to-r from-cyan-800 to-cyan-500 rounded-xl p-5 shadow-md snap-center relative group"
              onClick={() => handleEditCard(card, index)}
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 rounded-xl transition-opacity cursor-pointer" />
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-6 bg-slate-200 rounded"></div>
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
            className="flex-shrink-0 w-[320px] h-[190px] bg-gray-100 flex items-center justify-center rounded-xl cursor-pointer border-2 border-gray-300 border-dashed hover:bg-gray-50 transition-colors"
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
        <div className="border-1 mx-6 my-4 mb-10 border-cyan-700"></div>

        <div>
          <div className="">
            <div className="flex items-center justify-between my-4 px-6 border-gray-200 ">
              <h2 className="text-2xl font-semibold text-rose-800">
                Patient Lists
              </h2>
          <div className="flex justify-end px-6 py-4 w-80">
                  <button onClick={()=> navigate('/user/patients')} className=" bg-cyan-700 text-white px-4 py-2 rounded-md">
                    All Patients
                  </button>
                </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden ">
            {patients.map((patient, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-6 py-4 border-b border-gray-200"
              >
                <div className="flex  items-center gap-3 ">
                  <div className="">
                    <h3 className="text-lg text-cyan-600">
                      {patient.firstName} {patient.lastName}
                    </h3>
                  </div>
                </div>
               
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageUser;
