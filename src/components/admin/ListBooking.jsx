// rafce
import React from "react";

const ListBooking = (props) => {
  console.log("props ==== ", props)
  const {bookingDataByDate} = props
  console.log("bookingDataByDate ==== ", bookingDataByDate)
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <h1>Booking ID & Hostpital</h1>
          </div>
          <div>
            <h1>Patient</h1>
          </div>
          <div>
            <h1>User</h1>
          </div>
          <div>
            <h1>Booking Status</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListBooking;
