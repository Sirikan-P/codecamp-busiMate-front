import React,{useEffect,useState} from 'react'
import io from "socket.io-client"

const socket = io('http://localhost:8877')

function DriverBookingNoti() {
  const [socketData,setSocketData] = useState()
  
  useEffect(()=>{ 
    socket.on( '1' ,(data)=>{ 
      setSocketData(data)
    }) 
  },[])

  useEffect(()=>{}

)
  return (
    <div>DriverBookingNoti
      <>{socketData}</>
    </div>
  )
}

export default DriverBookingNoti