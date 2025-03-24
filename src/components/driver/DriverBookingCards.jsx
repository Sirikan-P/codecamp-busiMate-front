import React, { useState } from 'react'
import DriverBookingDetail from './DriverBookingDetail'
import { Link } from 'react-router'

function DriverBookingCards(props) {
  const { booking } = props
  const [isShow, setIsShow] = useState(false)
  const showmap = () => {
    setIsShow(!isShow)
  }

  const userAddress = booking?.UserAddress
  const hospital = booking?.hospital


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
              <label className="text-slate-300">Booking Date</label>
              <div className="font-semibold">{booking.appointmentDate}</div>
            </div>
            {/* Status of Booking */}
            <div>
              <label className=" text-slate-300">Request</label>
              <div className="font-semibold">{booking.specialRequirement}</div>
            </div>
            <div>
              <label className=" text-slate-300">Need wheelchair</label>
              <div className="font-semibold">{booking.needWheelChair}</div>
            </div>
            <div>
              <label className=" text-slate-300">Need Assistant</label>
              <div className="font-semibold">{booking.needAssist}</div>
            </div>
          </div>  
        <div >
          <button onClick={showmap}
                  className="btn" > {isShow ? "HIDEN LOCATION" : "SHOW LOCATION"} </button>    
          <div 
            className='m-2 text-pink-800 underline hover:text-2xl' > 
            {/* <Link to={`https://www.google.com/maps/dir/${Number(userAddress.lat),Number(userAddress.long)}/${ Number(hospital.lat), Number(hospital.long)}`} >   Get Direction  </Link>  */}
            <Link to={`https://www.google.com/maps/dir/${13,100}/${13.1,100.1}`} >   Get Direction  </Link> 
            
            </div>
        </div>
        <div>
          {isShow &&
            <DriverBookingDetail booking={booking} />
          }
        </div>
     
    </div>
  )
}

export default DriverBookingCards