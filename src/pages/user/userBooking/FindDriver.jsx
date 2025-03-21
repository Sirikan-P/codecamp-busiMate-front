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
    <div className="flex flex-col place-items-center p-5 bg-cyan-600">
      <div className="bg-white flex flex-col shadow-2xl justify-center place-items-center gap-5 rounded">
        {/* Selected Driver */}
        <SelectedDriver />
        {/* Map */}
        <MapUserFindDriver />
        {/* Booking Data */}
        <BookingData bookingData={bookingData}/>
        
      </div>
    </div>
  );
}

export default FindDriver;
