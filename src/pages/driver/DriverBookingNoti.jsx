import React, { useEffect, useState } from 'react'
import useDriverStored from '../../store/driver-store'
import useNotifyStored from '../../store/notify-store'

//socket
import io from "socket.io-client"
const socket = io('http://localhost:8877', {
  // autoConnect: false
})

function DriverBookingNoti() {
  const driver = useDriverStored(state => state.driver)

  const socketData = useNotifyStored(state => state.socketData)
  const actionSetSocketData = useNotifyStored(state => state.actionSetSocketData)
  const actionClearSocketUsersReq = useNotifyStored(state => state.actionClearSocketUsersReq)
  const actionClearSocketData = useNotifyStored(state => state.actionClearSocketData)

  useEffect(() => {
    console.log("test test",driver.id)
    socket.on("U"+driver.id, (data) => {
      // if(sender=="USER") {
      console.log("effect at driver", data)
      //actionSetSocketData(data)
      // }
      //global storage
    })
  }, [])

  ///console.log("socket from user", socketData)


  const hdlDriversubmit = (booking) => {
    const data = {...booking , result:'ACCEPT'}    
    
    actionClearSocketData(booking.id)
    actionClearSocketUsersReq(booking.id)
    socket.emit("driver_noti", (data))
  }

  const hdlDriverReject = (booking) => {
   
   const data = {...booking , result:'REJECT'} 
    actionClearSocketData(booking.id)
    actionClearSocketUsersReq(booking.id)
    socket.emit("driver_noti", (data))
  }

  return (
    <div>DriverBookingNoti
      {/* {(socketData) &&
        <div>
          {socketData?.map((item, index) => (
            <div key={index}>
              <p>Booking ID: {item.id}</p>
              <p>Booking date: {item.date}</p>
              <p>Booking userId: {item.userId}</p>
              <p>Booking patient: {item.patient}</p>
              <p>Booking lat: {item.lat}</p>
              <p>Booking long: {item.long}</p>

              <button
            onClick={()=>hdlDriversubmit(item)}
            className='btn'>  SEND ACCEPT </button>
                      <button
            onClick={()=>hdlDriverReject(item)}
            className='btn'>  SEND REJECT </button>
              
            </div>
          ))}
        </div>         
      } */}

    </div>
  )
}

export default DriverBookingNoti