import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import useNotifyStored from '../../store/notify-store'
import io from "socket.io-client"

const socket = io('http://localhost:8877', {})

function CreateBookingNotiResult() {
 
 
 const bookingId = 1 // น้องแพรว ... หาจาก store นะคะ
 const [socketResult,setSocketResult]  = useState({})
 const navigate = useNavigate()
 
 useEffect(()=>{ 
    socket.on( bookingId ,(data)=>{ 
      console.log("effectat user",data) 
      setSocketResult(data)
    }) 
  },[])

  const hdlAccept= ()=>{
    socket.off(bookingId)
    navigate(`/user/checkout/${bookingId}`);
    console.log('hello see you')
  }
  const hdlReject= ()=>{
    socket.off(bookingId)
    console.log('byeeee ')
  }

  return (
    <div>CreateBookingNotiResult
    <p> this booking is created ,please wait for driver action....   </p>
    <p> { (socketResult=='ACCEPT') && <button onClick={hdlAccept} className='btn'> go to payment </button> } </p>
    <p> { (socketResult=='REJECT') && <button onClick={hdlReject} className='btn'> go to select new driver </button> } </p>

   
    </div>
  )
}

export default CreateBookingNotiResult