import React, { useEffect, useState } from 'react'
import useDriverStored from '../../store/driver-store'
import useNotifyStored from '../../store/notify-store'

//socket
import io from "socket.io-client"
const socket = io('http://localhost:8877', {
  // autoConnect: false
})

console.log("TEST")

function DriverBookingNoti() {
  const driver = useDriverStored(state => state.driver)

  const socketData = useNotifyStored(state => state.socketData)
  const actionSetSocketData = useNotifyStored(state => state.actionSetSocketData)

  useEffect(() => {
    socket.on("U"+driver.id, (data) => {
      // if(sender=="USER") {
      console.log("effectat driver", data)
      actionSetSocketData(data)
      // }
      //global storage
    })
  }, [])

  console.log("socket from user", socketData.length)


  const hdlDriversubmit = () => {
    const data = {
      id: '1',
      name: "driver1",
      userId: '1',
      bookingId: '1',
      result:'COMPLETE'
    }
    //.emit("driver_noti", (driver.userId))
  }

  const hdlDriverReject = () => {
    const data = {
      id: '1',
      name: "driver1",
      userId: '1',
      bookingId: '1',
      result:'REJECT'
    }
    //socket.emit("driver_noti", (driver.userId))
  }

  return (
    <div>DriverBookingNoti
      {(socketData) &&
        <div>
          {socketData?.map((item, index) => (
            <div key={index}>
              <p>ID: {item.id}</p>
              <p>Booking ID: {item.bookingId}</p>

              <button
            onClick={()=>hdlDriversubmit()}
            className='btn'>  SEND ACCEPT </button>
                      <button
            onClick={()=>hdlDriverReject()}
            className='btn'>  SEND REJECT </button>
              
            </div>
          ))}


        </div> 

        
      }

    </div>
  )
}

export default DriverBookingNoti