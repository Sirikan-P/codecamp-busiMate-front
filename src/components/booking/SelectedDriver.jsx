import React from 'react'
import useUserBookingStore from '../../store/booking-store';

export default function SelectedDriver() {
    const selectDriver = useUserBookingStore((state) => state.selectDriver);
  const driverData = selectDriver.data;
  const carType = [
    { value: "SEETS_4", label: "4 SEATS" },
    { value: "SEETS_5", label: "5 SEATS" },
    { value: "SEETS_7", label: "7 SEATS" },
  ];

  console.log(driverData);
  console.log(driverData.profileImageUrl);

  return (
    <div className='flex flex-col place-items-center'>
        <div className="text-2xl font-semibold text-cyan-600 mb-5 mt-10">CONFIRM BOOKING</div>
        <div className="flex flex-col text-2xl text-cyan-600 shadow-2xl p-6 pb-10 rounded-md bg-white">
        {/* Title */}
        <div className="flex flex-col gap-2">
          {/* Driver img */}
          <div className="w-30 rounded-md">
            <img
              src={driverData.profileImageUrl}
              alt=""
              className="w-25 h-25 rounded-md"
            />
          </div>
          {/* Driver Name */}
          <div className="flex gap-2 place-items-center">
            <label className="text-slate-400 text-lg ">Driver Name :</label>
            <div className="text-xl  font-semibold">{driverData.firstName}</div>
            <div className="text-xl font-semibold">{driverData.lastName}</div>
          </div>

          {/* Driver Phone */}
          <div className="flex gap-2">
            <label className=" text-lg text-slate-400">Phone Number :</label>
            <div className="text-lg font-semibold text-pink-800">{driverData.phoneNumber}</div>
          </div>
          {/* Driver CarType */}
          <div className="flex gap-2">
            <label className=" text-lg text-slate-400">Car :</label>
            <div className="font-semibold text-lg text-pink-800">
              {driverData.carType === "SEET_4"
                ? "4 SEATS"
                : driverData.carType === "SEET_5"
                ? "5 SEATS"
                : "7 SEATS"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
