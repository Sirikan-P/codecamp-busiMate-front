import React, { useState } from 'react'
import DriverBookingDetail from './DriverBookingDetail'
import { Link } from 'react-router'
import { actionUpdateBookingStatus } from '../../api/driverBooking'

function DriverBookingCards(props) {
  const token = localStorage.getItem("driverToken")
  const { booking , status , getMybooking } = props
  const [isShow, setIsShow] = useState(false)
  const showmap = () => {
    setIsShow(!isShow)
  }
  


  console.log(booking)

  const updateStatus = async(status)=>{
    try {
      let newStatus 
      if (status =="UP_COMING") { 
        newStatus= { status: "IN_PROCESS"}
      }
      else if(status =="IN_PROCESS") {
        newStatus= { status: "COMPLETE" }
      }
      const res = await actionUpdateBookingStatus(token,newStatus,booking.id)
      const { result } = res.data      
      console.log("result update" , result)

      getMybooking(status)

    } catch (error) {
        return ("fail")
    }

  }

  return (
    <div className="p-5 bg-white shadow-2xl rounded-md flex flex-col gap-2">
      
      {/* Section 1 */}
          <div className="flex justify-between">
            {/* Patient Name */}
            <div className="text-cyan-600">
              <label className="text-pink-800 font-semibold text-lg">Patient</label>
              <div className="flex gap-2">
                <div className="text-xl font-semibold">
                  {booking.patient?.firstName}
                </div>
                <div className="text-xl font-semibold">
                  {booking.patient?.lastName}
                </div>
              </div>
            </div>
            {/* Hospital Name */}
            <div className="text-cyan-600">
              <label className="text-pink-800">Hospital</label>
              <div className="text-lg font-semibold">
                {booking.hospital?.name}
              </div>
            </div>
          </div>
          {/* Section 2 */}
          <div className="flex flex-col justify-between text-cyan-600">
            {/* Booking Date */}
            <div>
              <label className="text-slate-400">Booking Date</label>
              <div className="font-semibold">{booking.appointmentDate}</div>
            </div>
            {/* Status of Booking */}
            <div>
              <label className="text-pink-800 font-semibold text-lg">Request</label>
              <div className="font-semibold">{booking.specialRequirement}</div>
            </div>
            <div>
              <label className=" text-slate-400">Need wheelchair</label>
              <div className="font-semibold">{booking.needWheelChair}</div>
            </div>
            <div>
              <label className=" text-slate-4 00">Need Assistant</label>
              <div className="font-semibold">{booking.needAssist}</div>
            </div>
          </div>  
        <div className='flex flex-col justify-center'>
            <button onClick={showmap}
                  className="btn  bg-cyan-600 text-lg" > {isShow ? "HIDEN LOCATION" : "SHOW LOCATION"} </button>    
            
            <div>
              {isShow &&
                <DriverBookingDetail booking={booking} />
              }
            </div>

            <button onClick={()=>updateStatus(status)}
                    className="btn bg-cyan-700 text-lg text-slate-300 p-2 rounded-md mt-4 shadow-2xl"
                  > {(status=="UP_COMING") ? "SET INPROCESS" :  "SET COMPLETE" } </button> 
        </div>
     
    </div>
  )
}

export default DriverBookingCards