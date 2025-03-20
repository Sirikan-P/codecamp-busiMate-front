import React, { useEffect } from 'react'
import io from "socket.io-client"

const socket = io('http://localhost:8877', {
  // autoConnect: false
})

function CreateBookingNoti() {
  const userId = 2
  const driver = {
    id: '1',
    name: "driver1",
    userId: '2',
    bookingId: '1',
  }

//  useEffect(()=>{ 
//     socket.on( userId ,(data)=>{ 
//       console.log("effectat user",data) 
//     }) 
//   },[])

  const hdlGetDriver = () => {
    socket.emit('send_noti', (driver)) // create socket event 
  }

  return (
    <div>CreateBookingNoti
      <p>driver : {driver.name} </p>
      <p>booking : {driver.bookingId} </p>
      <button
        onClick={hdlGetDriver}
        className='btn'>  confirm </button>
    </div>
  )
}

export default CreateBookingNoti