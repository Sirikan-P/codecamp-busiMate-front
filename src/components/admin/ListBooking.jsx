import React from "react";

const ListBooking = (props) => {
  const { bookingData } = props;
  console.log("bookingData ==== ", bookingData);

  if (!bookingData) {
    return <div>Loading...</div>; // หรือแสดง message อื่นๆ
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <h1>Booking ID: {bookingData.id} </h1>
            <h1>Hospital: {bookingData.hospital.name} </h1>
          </div>
          <div>
            <h1>Patient</h1>
          </div>
          <div>
            <h1>User</h1>
          </div>
          <div>
            <h1>Driver</h1>
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