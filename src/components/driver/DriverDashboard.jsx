import React, { useState } from 'react'
import DriverAvatar from './DriverAvatar'
import {MoreIcon} from '../../icons/driverIcon'
import { useNavigate } from 'react-router'
import defaultImg from "../../assets/default-driver-avatar.svg";
import EditProfileModal from "../../pages/user/EditProfileModal";
import {
  Cake,
  MapPinned,
  MessageSquareWarning,
  NotebookPen,
  Phone,
  Star,
  User,
  Venus,
} from "lucide-react"

function DriverDashboard(props) {
  //JS
  const {driver} = props
  const navigate = useNavigate()
  const hdlEdit = ()=>{
    navigate('/driver/edit')
  }

  const address =  driver.DriverAddress ? driver.DriverAddress[0] : {}
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profile, setProfile] = useState({});

  const handleSaveProfile = (updatedProfile) => {
    setProfile(updatedProfile);
  };
  return (
    // <div className='border-2'>
      
    //     <div> < DriverAvatar className='w-24 h-24 rounded-full ' 
    //                                 menu = {false}
    //                                 imgSrc = {driver?.profileImageUrl}/>
    //     </div>
    //     <button onClick={() => hdlEdit()}
    //             type="button" 
    //             className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">edit </button>
    //   <p> name:  {driver?.firstName} {driver?.lastName} </p> 
    //   <p> phone: {driver?.phoneNumber} </p> 
    //   <p> Age: {driver?.age}</p> 
    //   <p> Gender: {driver?.gender}</p> 
     
    //   <div className='flex'>            
    //       <div> 
    //         <p>  Address:    {address?.id}  </p>            
    //       </div>
    //       <div>  {address?.address} 
    //       </div> 
    //   </div>  
    // </div>
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="avatar online">
              <div className="w-28 rounded-full ring-white ring ring-offset-base-100 ring-offset-2">
                <img
                  src={driver?.profileImageUrl || defaultImg}
                  alt="Profile"
                />
              </div>
            </div>
          </div>
          {/*   info driver ja */}
          <div className="flex-1">
            <h2 className="text-3xl text-center font-semibold text-rose-800 mb-4">
              {driver?.firstName} {driver?.lastName}
            </h2>
            <div className="space-y-2 text-lg">
              <span className="flex items-center text text-gray-700">
                <Phone className="mr-2 text-rose-800" size={18} />
                Tel. <p className="pl-1 text-cyan-800">{driver?.phoneNumber}</p>
              </span>
              <span className="flex items-center text-gray-700">
                <Cake className="mr-2 text-rose-800" size={18} />
                Age: <p className="pl-1 text-cyan-800">{driver?.age}</p>
              </span>
              <span className="flex items-center text-gray-700">
                {driver?.gender === "Male" ? (
                  <User className="mr-2 text-rose-800" size={18} />
                ) : (
                  <Venus className="mr-2 text-rose-800" size={18} />
                )}
                Gender: <p className="pl-1 text-cyan-800">{driver?.gender}</p>
              </span>

              <span className="flex items-center text-gray-700">
                <MapPinned className="mr-2 text-rose-800" size={18} />
                Address:{" "}
                <p className="pl-1 text-cyan-800">
                  {address?.id} {address?.address}
                </p>
              </span>

              <div className="divider"></div>

              <div className="flex  gap-4 ">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="flex items-center">
                      <Star className="mr-2 text-rose-800" size={18} />
                      <p className="text-sm text-gray-500">Rating</p>
                    </div>
                    <span className="text-xl font-semibold text-rose-800">
                      <p className="text-cyan-800">
                        {driver?.rating || 4.9 || "N/A"}
                      </p>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="flex items-center">
                      <NotebookPen className="mr-2 text-rose-800" size={18} />
                      <p className="text-sm text-gray-500">Total Booking</p>
                    </div>
                    <span className="text-xl font-semibold text-rose-800">
                      <p className="text-cyan-800">
                        {driver?.bookingTotal || 24 || "N/A"}
                      </p>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="flex items-center">
                      <MessageSquareWarning
                        className="mr-2 text-rose-800"
                        size={18}
                      />
                      <p className="text-sm text-gray-500">Report</p>
                    </div>
                    <span className="text-xl font-semibold text-rose-800">
                      <p className="text-cyan-800">{driver?.report || 0}</p>
                    </span>
                  </div>
                </div>
              </div>
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
  );

}

export default DriverDashboard