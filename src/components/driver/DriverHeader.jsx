import React from 'react'
import DriverAvatar from './DriverAvatar'

function DriverHeader(props) {
  const {driver} = props
  return (
    <div className="flex  py-4">
        < DriverAvatar className='flex w-24 h-24 rounded-full' 
                                    menu = {false}
                                    imgSrc = {driver?.profileImageUrl}/>
        <div className='flex flex-col'> 
          <div className="text-xl font-semibold text-rose-800 px-4 ">
            {driver?.firstName} {driver?.lastName} 
          </div>
            <div className="text-lg  text-left  text-slate-400 px-4 ">
            {driver?.phoneNumber} 
            </div>
            <div className="text-lg  text-left  text-slate-400 px-4 ">
            {driver?.status} 
            </div>
        </div>
              
    </div>
  )
}

export default DriverHeader