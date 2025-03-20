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
        <h1 className="text-3xl font-bold text-center pt-10 p-5 text-slate-200 ">
          ALL BOOKING
        </h1>
      </div>
      <div className="flex justify-center gap-5 rounded-md ">
        <div className="flex gap-2 place-items-center ">
        <label className="text-xl text-slate-200">Firstname : </label>
        <div className="text-2xl text-pink-200 font-semibold">{authUser.result.firstName}</div>
        </div>
        <div  className=" flex gap-2 place-items-center ">
        <label className="text-xl text-slate-200">Lastname :</label>
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
