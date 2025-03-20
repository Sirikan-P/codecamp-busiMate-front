import DriverAvatar from "./DriverAvatar";
import { MoreIcon } from "../../icons/driverIcon";
import { useNavigate } from "react-router";
import { Edit } from "lucide-react";
import React, { useState } from "react";
import EditProfileModal from "../../pages/user/EditProfileModal";

function DriverDashboard(props) {
  //JS
  // const { driver } = props;
  // const navigate = useNavigate();
  // const hdlEdit = () => {
  //   navigate("/driver/edit");
  // };

  // const address = driver.DriverAddress ? driver.DriverAddress[0] : {};

  const { driver } = props;
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "Andro Strassmann",
    position: "Senior Project Manager",
    phone: "+66 666 66666",
    location: "Bangkok, Thailand",
  });

  const handleSaveProfile = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="avatar online">
              <div className="w-24 rounded-full ring-white ring ring-offset-base-100 ring-offset-2">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400"
                  alt="Profile"
                />
              </div>
            </div>
            <button className="btn btn-circle btn-sm absolute bottom-0 right-0 shadow-lg hover:scale-105 transition-transform">
              <Edit size={14} />
            </button>
          </div>

          <div className="text-center md:text-left">
            <div className="flex items-center gap-2">
              <h2 className="text-3xl text-rose-800 font-bold">
                Driver1 Lastname1
              </h2>
            </div>
            <div className="mt-3 text-sm opacity-75">
              <p>Phone: 0810010001</p>
              <p>Male</p>
              <p>Age: 26</p>
              <p>Location: Bangkok 1</p>
            </div>
          </div>
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className=" bg-cyan-700 text-white px-4 py-2 rounded-md"
          >
            Edit Profile
          </button>
          <EditProfileModal
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            onSave={handleSaveProfile}
            initialProfile={profile}
          />
        </div>
      </div>
    </div>
    // <div className="border-2">
    //   <div>
    //     {" "}
    //     <DriverAvatar
    //       className="w-24 h-24 rounded-full "
    //       menu={false}
    //       imgSrc={driver?.profileImageUrl}
    //     />
    //   </div>
    //   <button
    //     onClick={() => hdlEdit()}
    //     type="button"
    //     className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    //   >
    //     edit{" "}
    //   </button>
    //   <p>
    //     {" "}
    //     name: {driver?.firstName} {driver?.lastName}{" "}
    //   </p>
    //   <p> phone: {driver?.phoneNumber} </p>
    //   <p> Age: {driver?.age}</p>
    //   <p> Gender: {driver?.gender}</p>

    //   <div className="flex">
    //     <div>
    //       <p> Address: {address?.id} </p>
    //     </div>
    //     <div> {address?.address}</div>
    //   </div>
    // </div>
  );
}

export default DriverDashboard;
