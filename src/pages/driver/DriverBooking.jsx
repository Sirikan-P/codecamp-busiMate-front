import React, { useEffect, useState } from 'react'
import useDriverStored from '../../store/driver-store'
import DriverHeader from '../../components/driver/DriverHeader'
import { actionGetDriverBooking } from '../../api/driverBooking'
import DriverBookingCards from '../../components/driver/DriverBookingCards'

function DriverBooking() {
  const token = localStorage.getItem("token")
  const [myBooking,setMyBooking] = useState([])
  
  //zustand : global state  
  const driver = useDriverStored(state => state.driver)
  //const actionGetDriverWithZustand = useDriverStored( state=> state.actionGetDriverWithZustand)

  const getMybooking =  async()=>{     
    try {
      const res = await actionGetDriverBooking(token,"UP_COMING")
      const { result } = res.data
      setMyBooking( result )
      console.log(myBooking)
    } catch (error) {
        return ("fail")
    }
  }
  //useEffect : get driver data find current  driver
  useEffect( ()=>{getMybooking()} ,[])

  return (
    <div>DriverBooking up comming ...
      <DriverHeader driver={driver} />
      
      

      {myBooking.map(el => (
            <DriverBookingCards key={el.id} booking={el} />
          ))
          }



    </div>
  )
}

export default DriverBooking