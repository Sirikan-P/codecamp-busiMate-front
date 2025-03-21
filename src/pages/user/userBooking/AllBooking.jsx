import React, { useEffect } from "react";
import useHospitalStore from "../../../store/hospital-store";
import useUserBookingStore from "../../../store/booking-store";
import AllBookingForm from "../../../components/booking/AllBookingForm";
import { userAuthStore } from "../../../store/userAuthStore";

function AllBooking() {
  const authUser = userAuthStore((state) => state.authUser);
  console.log(authUser);

  return (
    <div className="bg-cyan-600 w-full h-full p-5 flex flex-col gap-5">
      {/* User Info */}
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-center pt-10 text-slate-200 ">
          ALL BOOKING
        </h1>
      </div>
      <div className="flex justify-center gap-5 rounded-md pb-5">
        <div className="flex gap-2 place-items-center ">
        <div className="text-2xl text-pink-200 font-semibold">{authUser.result.firstName}</div>
        <div className="text-2xl text-pink-200 font-semibold">{authUser.result.lastName}</div>
        </div>
        
        
      </div>
    

      <div className="bg-white p-5 rounded-md">
        <AllBookingForm />
      </div>
    </div>
  );
}

export default AllBooking;
