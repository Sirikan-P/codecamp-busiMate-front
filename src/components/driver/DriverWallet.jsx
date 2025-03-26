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
    <div className="card bg-base-100 shadow-xl p-6 my-6">    
      <h2 className="card-title flex text-2xl text-rose-800 items-center">
        Driver Wallet
      </h2>
      <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="">
              <div>
                <div className="stat-title">Current Balance</div>
                <div className="stat-value text-success">฿ {myWallet?.wallet}</div>
              </div>
            </div>
          </div>
        </div>

      <div className="card-body space-y-4">        
        {driverWallet.map(el => (
          <DriverWalletCard key={el.id} wallet={el} />
        ))
        }
      </div>
    </div>
  )
}

export default DriverWallet