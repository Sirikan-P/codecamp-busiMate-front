import React from 'react'

function DriverAddressCards(props) {
  const {address} = props
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQyMDUwNDQ0LCJleHAiOjE3NDMzNDY0NDR9.LlBUSVelok5Pk8ecWjdhk0fGvovX-uyVvuKUIb3I6Ks"

  const hdlDelete = async (token,addressId)=>{
    try {     
      const res = await actionDeleteDriverAddressWithZustand(token,addressId)
        return { success: true , res }
   } catch (error) {
       return ("fail")
   }
  }
  return (
    <div className='flex'  > DriverAddressCards 
      <div> ID :{address.id} </div>
      <div> STATUS :{address.status} </div>
      <div> Address : {address.address} </div>

      <div  onClick={()=>{hdlDelete(token,address.id)}}
            className='hover:text-blue-600'> : DELETE </div>
    </div>
  )
}

export default DriverAddressCards