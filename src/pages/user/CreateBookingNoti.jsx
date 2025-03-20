import React from 'react'
import io from "socket.io-client"

const socket = io('http://localhost:8877')

function CreateBookingNoti() {

  const driver = {
    id: '1',
    name:"driver1" 
  }

  const hdlGetDriver = ()=> {
      socket.emit('send_noti',(driver))
  }

  return (
    <div>CreateBookingNoti
      <button onClick={hdlGetDriver}
      className='btn'> driver </button>
    </div>
  )
}

export default CreateBookingNoti