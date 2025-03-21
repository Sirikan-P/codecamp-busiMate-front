import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import useNotifyStored from '../../store/notify-store'
import io from "socket.io-client"

const socket = io('http://localhost:8877', {})

function CreateBookingNoti() {

  const booking = { //ต้องการ booking ID และข้อมูล booking น้องแพรว ... หาจาก store นะคะ
    id: '1',
    date: '27MAR25',
    driverId: 1,
    userId: 3,
    lat:13, 
    long:100 , 
    patient:"grandma"
  }

  const socketUsersReq = useNotifyStored(state => state.socketUsersReq)
  const actionSetSocketUsersReq = useNotifyStored(state => state.actionSetSocketUsersReq)
  
  const navigate = useNavigate()
  const hdlGetDriver = () => {
    socket.emit('send_noti', (booking)) // create socket event 
    actionSetSocketUsersReq(booking)
    navigate('/driver/receiveNotiresult')
  }

  return (
    <div>CreateBookingNoti
      <p>driver : {booking.driverId} </p>
      <p>booking : {booking.id} </p>
      <p>user : {booking.userId} </p>
      <p>patient : {booking.patient} </p>
      <button
        onClick={hdlGetDriver}
        className='btn'>  confirm </button>
        
       {(socketUsersReq) &&
        <div>
          {socketUsersReq?.map((item, index) => (
            <div key={index}>
              <p>Booking ID: {item.id}</p>
              <p>Booking date: {item.date}</p>
              <p>Booking userId: {item.userId}</p>
              <p>Booking patient: {item.patient}</p>
              <p>Booking lat: {item.lat}</p>
              <p>Booking long: {item.long}</p>   
              <p>Booking status: waiting </p>           
            </div>
          ))}
        </div>         
      }
    </div>
  )
}

export default CreateBookingNoti