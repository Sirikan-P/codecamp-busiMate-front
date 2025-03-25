import React from "react";
import useUserBookingStore from "../../../store/booking-store";
import MapShowOneBooking from "../../../components/booking/MapShowOneBook";
import {MoveVertical} from "lucide-react"
import { useNavigate } from "react-router";

function ShowOneBooking() {
  const showOneBook = useUserBookingStore((state) => state.showOneBook);
  const userBooking = useUserBookingStore((state) => state.userbooking);
  const navigate = useNavigate()
  console.log(userBooking);
  console.log(showOneBook);
  const actionBack = () =>{
    navigate('/user/booking')
  }

  return (
    <div className=" w-full flex justify-center bg-cyan-600 pb-15">
      <div className="flex flex-col mt-10 p-5 pt-10 w-90 bg-white rounded-md shadow-2xl">
        <img src={showOneBook.appointmentImage} alt="" />
        <div className=" flex justify-end absolute top-25 -right-5">
        <button className="text-rose-800 p-2 w-50 text-sm rounded-md mt-5">refund</button>
        </div>


        {/* Booking Status  and Appointment Date */}
        <div className="flex flex-col p-5 border-b-1 border-cyan-700">
          {" "}
          
          {/* patient info */}
          <div className="text-xl text-slate-400">
            Status:{" "}
            <span className="font-semibold text-cyan-700">
              {showOneBook.bookingStatus}
            </span>
          </div>
          <div className="text-slate-400">
            Appointment Date:{" "}
            <span className="text-pink-800 font-semibold">
              {" "}
              {showOneBook.appointmentDate}{" "}
            </span>
          </div>
        </div>
        {/* Patient */}
        <div className="flex flex-col p-5 gap-5">
          {" "}
          {/* patient info */}
          <div className="flex flex-col">
            <div className="flex place-items-center gap-2">
              <div className="flex gap-2 font-semibold text-xl text-slate-400">
                Patient :{" "}
              </div>
              <div className="text-2xl text-cyan-600 font-semibold">
                {showOneBook.patient.firstName}
              </div>
              <div className="text-2xl text-cyan-600 font-semibold">
                {showOneBook.patient.lastName}
              </div>
            </div>
            

            {/* Condition */}
            <div className="flex flex-col mt-5">
              {" "}
              {/* patient info */}
              <label className="text-pink-800 text-xl font-semibold">Conditions of Patient</label>
             <div className="flex gap-2">
             <div className=" text-slate-400">Need Assist : </div>
             <div className=" text-cyan-700 font-semibold">{showOneBook.needAssist}</div>
             </div>
             <div className="flex gap-2">
             <div className=" text-slate-400">Need Wheelchair: </div>
             <div className=" text-cyan-700 font-semibold">{showOneBook.needWheelChair}</div>
             </div>
             <div className="flex flex-col bg-slate-50 p-5 rounded-md mt-2">
             <div className=" text-cyan-700 font-semibold">Special Requiremennt: </div>
             <div className=" text-pink-800 font-semibold">{showOneBook.specialRequirement}</div>
             </div>
            </div>
          </div> 

          {/* User Address and Hospital Address */}
          <div className="flex flex-col p-10 gap-5 border-1 border-cyan-200 rounded-md shadow-xl">
            {" "}
            {/* user address */}
            <div>
            <div className="flex gap-2 font-semibold text-pink-800">
              Pick Up Address:
            </div>
            <div className="text-md font-semibold text-cyan-600 ">
              {" "}
              {showOneBook.UserAddress.address}
            </div>
            </div>
            <div className="flex justify-center w-full p-2">
            <MoveVertical className="text-cyan-700 " />
            </div>
            {/* hospital address */}
            <div>
              <label className="flex gap-2 font-semibold text-pink-800 ">
                Hospital :
              </label>
              <div className="text-md font-semibold text-cyan-600">
                {" "}
                {showOneBook.hospital.name}
              </div>
              <div className="text-md font-semibold text-cyan-600">
                {showOneBook.hospital.address}
              </div>
            </div>
          </div>
        </div>

        {/* Driver info */}
        <div className="flex flex-col p-5 border-t-1 border-cyan-700">
          {" "}
          <div className="flex gap-2 place-items-center">
            <label className="flex gap-2 font-semibold text-xl text-slate-400">Driver :</label>
            <div className="text-2xl text-cyan-600 font-semibold"> {showOneBook.driver.firstName}</div>
            <div className="text-2xl text-cyan-600 font-semibold">{showOneBook.driver.lastName}</div>
          </div>
          <div className="flex gap-2">
            <label className=" text-slate-400">Car Type : </label>
            <div className=" text-cyan-700 font-semibold">
              {showOneBook.driver.carType === "SEETS_4"
                ? "4 SEATS"
                : showOneBook.driver.carType === "SEETS_7"
                ? "7 SEATS"
                : showOneBook.driver.carType === "SEETS_9"
                ? "9 SEATS"
                : "-"}
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="flex flex-col p-5 border-b-1 border-cyan-700">
          {" "}
          <label className="text-pink-800 text-xl font-semibold" >PAYMENT</label>
          {/* total */}
          <div className="flex place-items-center gap-2">
          <div className="text-slate-400">Total :</div>
          <div className="text-cyan-700 text-2xl font-semibold">{showOneBook.totalPrice} </div>
          <div className="text-slate-400">BAHT</div>
          </div>
          {/* payment status */}
          <div className="flex place-items-center gap-2">
          <div className="text-slate-400">Payment Status :</div>
          <div className="text-pink-800  font-semibold">{showOneBook.paymentStatus} </div>
          </div>

        </div>

        {/* Map */} 
        <div className="shadow-xl w-full">
          <MapShowOneBooking />
        </div>

        <button onClick={actionBack} className="btn bg-cyan-600 w-full rounded-md text-white mt-110">CONFIRM</button>
      </div>
    </div>
  );
}

export default ShowOneBooking;
