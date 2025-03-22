import React, { useState } from 'react'
import DriverBookingDetail from './DriverBookingDetail'

function DriverBookingCards(props) {
  const { booking } = props
  const [isShow , setIsShow] = useState(false)
  const showmap = ()=>{
    setIsShow(!isShow)
  }
  return (
    <div className='flex flex-col'>
      <div>    
        <div> ID : {booking.id} ,</div>
    <div> STATUS : {booking.status} ,</div>
    <div> AMOUNT : {booking.patientId} ,</div>
    <div> DATE : {booking.createdAt} </div>
    <button onClick={showmap} 
          className="btn" > {isShow ? "hide" : "show"} </button>
          </div>
    <div> 
      {isShow  && 
      <DriverBookingDetail booking={booking} />
      }  
    </div>   
  </div>
  )
}

export default DriverBookingCards