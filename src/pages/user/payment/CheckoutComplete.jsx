import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { actionCheckOutStatus } from '../../../api/payment'
import { createAlert } from '../../../utils/createAlert'

function CheckoutComplete() {

  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const { session } = useParams()


  useEffect ( ()=> {
    checkSession()
  },[])


  const checkSession = async()=>{
    if(!session) return
  
  try {

    console.log(session)
    const res = await actionCheckOutStatus (token , session)
    createAlert("success",res.data.message || "Payment Successfully")

  } catch (error) {

    createAlert("error" ,"failed to verify payment")
    console.error("Payment verify error:" , error)
  }
  }
  return (
    <div> loading ... </div>
  )
}

export default CheckoutComplete