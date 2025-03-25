import React from 'react'

function UserAddressCards(props) {
  const {address ,hdlDelete , hdlSetUse} = props

  return (
    <div className='flex flex-col fonst-semibold mt-10 border-1 border-cyan-600 p-5 rounded-md'  > 
    Address  :
    <div className='text-xl gap-2 flex flex-col'>
      <div> STATUS : <span className='text-2xl text-rose-800'>{address.status}</span> </div>
      <div> Address : {address.address} </div>
    </div>
      {address.status === "NOTUSE" && (
        <div className='flex gap-5'>
      <button onClick={()=>hdlSetUse(address.id)}
              className="bg-cyan-700 w-40 text-lg text-slate-300 p-2 rounded-md mt-10 shadow-2xl"> 
        SETUSE 
      </button>
    
            </div>
    )}
    </div>
  )
}

export default UserAddressCards