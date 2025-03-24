import React from "react";
import { createAlert } from "../../utils/createAlert";

const ListBooking = (props) => {
  const { bookingData } = props;
  console.log("bookingData ==== ", bookingData);

  if (!bookingData) {
    return createAlert("info", "Cannot received booking data!!")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETE":
        return "bg-green-300";
      case "FIND_DRIVER":
        return "bg-yellow-300";
      case "UP_COMING":
        return "bg-blue-300";
      case "IN_PROCESS":
        return "bg-purple-300";
      case "CANCEL":
        return "bg-red-300";
      default:
        return "bg-gray-300"; // สีเริ่มต้น
    }
  };

  const statusColor = getStatusColor(bookingData.bookingStatus);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          {/* booking id และ ชื่อโรงพยาบาล */}
          <div>
            <h1>Booking ID: {bookingData.id} </h1>
            <h1>Hospital: {bookingData.hospital.name} </h1>
          </div>
          {/* คูณแม่ รูป ชื่อ หมายเลขโทรศัพท์ */}
          <div className="flex flex-col">
            <div className="text-center">
              <h3>Patient</h3>
            </div>
            <div className="flex">
              <div className="relative">
                <img
                  src={bookingData.patient.profileImage}
                  alt={`Profile picture of ${bookingData.patient.firstName}  ${bookingData.patient.lastName}`}
                  className="w-16 h-16 rounded-full object-cover border"
                />
              </div>
              <div>
                <h3>{`${bookingData.patient.firstName} ${bookingData.patient.lastName}`}</h3>
                <h3>{bookingData.patient.phoneNumber}</h3>
              </div>
            </div>
          </div>
          {/* คูณลูกค้า รูป ชื่อ หมายเลขโทรศัพท์ */}
          <div className="flex flex-col">
            <div className="text-center">
              <h3>User</h3>
            </div>
            <div className="flex">
              <div className="relative">
                <img
                  src={bookingData.patient.user.profileImage}
                  alt={`Profile picture of ${bookingData.patient.user.firstName}  ${bookingData.patient.user.lastName}`}
                  className="w-16 h-16 rounded-full object-cover border"
                />
              </div>
              <div>
                <h3>{`${bookingData.patient.user.firstName} ${bookingData.patient.user.lastName}`}</h3>
                <h3>{bookingData.patient.user.phoneNumber}</h3>
              </div>
            </div>
          </div>
          {/* driver รูป ชื่อ หมายเลขโทรศัพท์ */}
          <div className="flex flex-col">
            <div className="text-center">
              <h3>Driver</h3>
            </div>
            <div className="flex">
              <div className="relative">
                <img
                  src={bookingData.driver.profileImageUrl}
                  alt={`Profile picture of ${bookingData.driver.firstName}  ${bookingData.driver.lastName}`}
                  className="w-16 h-16 rounded-full object-cover border"
                />
              </div>
              <div>
                <h3>{`${bookingData.driver.firstName} ${bookingData.driver.lastName}`}</h3>
                <h3>{bookingData.driver.phoneNumber}</h3>
              </div>
            </div>
          </div>

          <div>
            <h1>Booking Status</h1>
            <div className={statusColor}
            >{bookingData.bookingStatus}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListBooking;
