//connect backend
import axios from "axios";

//payment
export const actionCheckOut = async ( token , id)=>{
  console.log("id" ,id)
  console.log("token" ,token)

    return await axios.post('http://localhost:8877/api/user/payment/checkout',{ id }, {
        headers: { 
            Authorization:`Bearer ${token}`
        }
    })
}

export const actionCheckOutStatus = async ( token , session)=>{

  return await axios.get('http://localhost:8877/api/user/payment/checkout-status/' + session , {
      headers: { 
          Authorization:`Bearer ${token}`
      }
  })
}

export const actionCheckOutRefund = async ( token , value)=>{

    return await axios.psot('http://localhost:8877/api/user/payment/checkout/refund' + value , {
        headers: { 
            Authorization:`Bearer ${token}`
        }
    })
  }