import React, { useEffect } from 'react'
import useDriverStored from '../../store/driver-store'
import useNotifyStored from '../../store/notify-store'
import { useNavigate } from 'react-router'

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
      actionSetSocketData(data)
      // }
      //global storage
    })
  }, [])

  console.log("socket from user", socketData) //array

  const navigate = useNavigate()
  const hdlDriversubmit = (booking) => {
    const data = {...booking , result:'ACCEPT'} 
    // const data = {
    //   driverId: '1',
    //   name: "driver1",
    //   userId: '2',
    //   bookingId: bookingId,
    //   result:'ACCEPT'
    // }
    console.log(data)
    actionClearSocketData(booking.id)
    actionClearSocketUsersReq(booking.id)
    socket.emit("driver_noti", (data))
    //navigate('/driver/booking')
  }

  const hdlDriverReject = (booking) => {
   
   const data = {...booking , result:'REJECT'} 
    actionClearSocketData(booking.id)
    actionClearSocketUsersReq(booking.id)
    socket.emit("driver_noti", (data))
    navigate('/driver/booking')
  }

  return (
    <div>DriverBookingNoti
      {(socketData) &&
        <div>
          {socketData?.map((item, index) => (
            <div key={index}>
              <p>Booking ID: {item.id}</p>
              <p>appointmentDate: {item.appointmentDate}</p>
              <p>Booking patient: {item.patient.name}</p>
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
      }

    </div>
  )
}

export default DriverBookingNoti