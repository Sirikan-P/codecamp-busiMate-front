import React, { useEffect, useState } from "react";
import useUserBookingStore from "../../../store/booking-store";
import MapUserFindDriver from "../../../components/booking/MapUserFindDriver";
import SelectedDriver from "../../../components/booking/SelectedDriver";
import BookingData from "../../../components/booking/BookingData";
import { actionGetOneUserBooking } from "../../../api/userBooking";

function FindDriver() {
  const [bookingData, setBookingData] = useState();

  const bookingUser = async () => {
    const res = await actionGetOneUserBooking();
    setBookingData(res.data);
  };
console.log(bookingData);
  useEffect(() => {
    bookingUser();
  }, []);

  return (
    <div className="flex flex-col place-items-center bg-cyan-600">
      <div className="bg-white flex flex-col shadow-2xl justify-center place-items-center gap-5 m-5 pb-5 rounded">
        {/* Selected Driver */}
        <SelectedDriver />
        {/* Map */}
        <MapUserFindDriver />
        {/* Booking Data */}
        <BookingData bookingData={bookingData}/>
        <button className="btn bg-cyan-600 w-60 mb-5 p-5 h-10 rounded-md text-white">CONFIRM</button>
      </div>
    </div>
  );
}

export default FindDriver;
