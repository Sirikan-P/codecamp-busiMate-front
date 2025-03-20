import React from 'react'
import useUserBookingStore from '../../store/booking-store';

export default function BookingData({bookingData}) {

    return (
        <div className="mb-5">
          <div className="flex flex-col w-full p-5 pt-10 pb-20 mb-5 bg-white  rounded-md shadow-2xl">
            {/* <img src={showOneBook.appointmentImage} alt="" /> */}
    
            {/* Booking Status  and Appointment Date */}
            <div className="flex flex-col p-5 border-b-1 border-rose-200">
              {" "}
              {/* patient info */}
              <div className="text-xl text-slate-400">
                Status:{" "}
                <span className="font-semibold text-cyan-700">
                  {bookingData?.id}
                </span>
              </div>
              <div className="text-slate-400">
                Appointment Date:{" "}
                <span className="text-pink-800 font-semibold">
                  {" "}
                  {bookingData?.appointmentDate}{" "}
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
                  <div>{bookingData?.patientId}</div>
                
                </div>
    
                {/* Condition */}
                <div className="flex flex-col mt-5">
                  {" "}
                  {/* patient info */}
                  <label className="text-pink-800 text-xl font-semibold">Conditions of Patient</label>
                 <div className="flex gap-2">
                 <div className=" text-slate-400">Need Assist : </div>
                 <div className=" text-cyan-700 font-semibold">{bookingData?.needAssist}</div>
                 </div>
                 <div className="flex gap-2">
                 <div className=" text-slate-400">Need Wheelchair: </div>
                 <div className=" text-cyan-700 font-semibold">{bookingData?.needWheelChair}</div>
                 </div>
                 <div className="flex flex-col bg-slate-50 p-5 rounded-md mt-2">
                 <div className=" text-cyan-700 font-semibold">Special Requiremennt: </div>
                 <div className=" text-pink-800 font-semibold">{bookingData?.specialRequirement}</div>
                 </div>
                </div>
              </div> 
    
            
            </div>
    
    
            {/* Payment */}
            <div className="flex flex-col p-5 border-b-1 border-rose-200">
              {" "}
              <label className="text-pink-800 text-xl font-semibold" >PAYMENT</label>
              {/* total */}
              <div className="flex place-items-center gap-2">
              <div className="text-slate-400">Total :</div>
              <div className="text-cyan-700 text-2xl font-semibold">{bookingData?.totalPrice} </div>
              <div className="text-slate-400">BAHT</div>
              </div>
              {/* payment status */}
              <div className="flex place-items-center gap-2">
              <div className="text-slate-400">Payment Status :</div>
              <div className="text-pink-800  font-semibold">{bookingData?.paymentStatus} </div>
              </div>
    
            </div>
    
       
    
          </div>
        </div>
      );
    }

