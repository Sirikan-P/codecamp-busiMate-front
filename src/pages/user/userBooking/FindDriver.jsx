import React, { useEffect, useState } from "react";
import useUserBookingStore from "../../../store/booking-store";
import MapUserFindDriver from "../../../components/booking/MapUserFindDriver";
import SelectedDriver from "../../../components/booking/SelectedDriver";
import BookingData from "../../../components/booking/BookingData";
import { actionFindDriver, actionGetOneUserBooking, actionGetUserBooking } from "../../../api/userBooking";
import { CircleCheckBig, CircleDashed } from "lucide-react";
import io from "socket.io-client"
import { useNavigate } from "react-router";
import useNotifyStored from "../../../store/notify-store";
import { use } from "react";

function FindDriver() {
  const navigate = useNavigate()
  const bookingData = useUserBookingStore((state) => state.bookingwithId);
  const selectDriver = useUserBookingStore((state) => state.selectDriver);  
  const userbooking = useUserBookingStore((state) => state.userbooking);
  const setBookingwithId = useUserBookingStore((state)=> state.setBookingwithId)
  const setSelectDriver = useUserBookingStore((state) => state.setSelectDriver);
  const driverDataToSendNoti = selectDriver.data

console.log(userbooking.id);
  const bookingUser = async () => {
    const res = await actionGetOneUserBooking(userbooking.id);
    console.log(res.data);
    setBookingwithId(res.data);
    console.log(bookingData);
};

useEffect(() => {
  bookingUser();
}, []);


// send noti to driver
const socket = io('http://localhost:8877')

const socketUsersReq = useNotifyStored(state => state.socketUsersReq)
const actionSetSocketUsersReq = useNotifyStored(state => state.actionSetSocketUsersReq)

const hdlGetDriver = () => {
  socket.emit('send_noti', (bookingData)) // create socket event 
  actionSetSocketUsersReq(bookingData)
  navigate('/user/booking/handlebookingres')
}

  return (
    <div className="flex flex-col place-items-center bg-cyan-600">
         {/* progess */}
         <div className="flex gap-5 w-full text-white place-items-center justify-center mt-10">
        <CircleDashed size={32} />
        <div className=" w-20 h-1 bg-white"></div>
        <CircleCheckBig size={48} color="#ffff"/>
        <div className=" w-20 h-1 bg-white"></div>
        <CircleDashed size={32} />
      </div>
      <div className="bg-white flex flex-col shadow-2xl justify-center place-items-center gap-5 m-5 pb-5 rounded">
        {/* Selected Driver */}
        {/* <SelectedDriver /> */}
        {/* Map */}
        {/* <MapUserFindDriver bookingData={bookingData}/> */}
        {/* Booking Data */}
        {/* <BookingData bookingData={bookingData} /> */}
        <button onClick={hdlGetDriver} className="btn bg-cyan-600 w-60 mb-5 p-5 h-10 rounded-md text-white">CONFIRM</button>
      </div>
    </div>
  );
}

export default FindDriver;
