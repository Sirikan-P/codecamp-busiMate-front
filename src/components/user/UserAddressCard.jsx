import React from 'react'

function UserAddressCards(props) {
  const {address ,hdlDelete , hdlSetUse} = props

  return (
    <div className='flex'  > DriverAddressCards  :
      <div> Address ID :{address.id} </div>
      <div> STATUS :{address.status} </div>
      <div> Address : {address.address} </div>
      
      {address.status === "NOTUSE" && (
      <button onClick={()=>hdlSetUse(address.id)}
              className='btn hover:text-blue-600'> 
        : SETUSE 
      </button>
    )}
      <button  onClick={()=>hdlDelete(address.id)}
            className='btn hover:text-blue-600'> : DELETE </button>
    </div>
  )
}

export default UserAddressCards