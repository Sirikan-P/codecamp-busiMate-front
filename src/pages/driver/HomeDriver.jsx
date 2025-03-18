import React, { useEffect, useState } from 'react'
import DriverDashboard from '../../components/driver/DriverDashboard'
import DriverWallet from '../../components/driver/DriverWallet'
import { actionGetDriver } from '../../api/driver'
import useDriverStored from '../../store/driver-store'

function HomeDriver() {

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQyMDUwNDQ0LCJleHAiOjE3NDMzNDY0NDR9.LlBUSVelok5Pk8ecWjdhk0fGvovX-uyVvuKUIb3I6Ks"
  const driver = useDriverStored(state => state.driver)
  const actionGetDriverWithZustand = useDriverStored( state=> state.actionGetDriverWithZustand)


  //useEffect : get driver data find current  driver
  useEffect( ()=>{ actionGetDriverWithZustand(token) } ,[])

  return (
    <div>Home Driver Dashboard :  
      <DriverDashboard driver={driver} />
      <DriverWallet driver={driver} />
    </div>
  )
}

export default HomeDriver