import React, { useEffect, useState } from 'react'
import { actionGetDriverWallet } from '../../api/wallet'
import DriverWalletCard from './DriverWalletCard'

function DriverWallet(props) {
  //JS
  const {driver} = props
  const [myWallet,setMyWallet] = useState([])
  
  const getMyWallet = async()=> {
    try {
       const token = localStorage.getItem("driverToken")
       const res = await actionGetDriverWallet(token)
       const { result } = res.data
       setMyWallet(result)
       console.log(myWallet)
    } catch (error) {
        return ("fail")
    }
  }

  useEffect( ()=>{ getMyWallet() } ,[])
  const driverWallet = myWallet?.DriverWallet? myWallet?.DriverWallet: []
  return (
    <div> DriverWallet
        <p>wallet : {myWallet?.wallet}</p>
        
        {driverWallet.map(el => (
          <DriverWalletCard key={el.id} wallet={el} />
        ))
        }

    </div>
  )
}

export default DriverWallet