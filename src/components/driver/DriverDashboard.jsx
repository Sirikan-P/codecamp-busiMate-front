import React from 'react'
import DriverAvatar from './DriverAvatar'
import {MoreIcon} from '../../icons/driverIcon'
import { useNavigate } from 'react-router'

function DriverDashboard(props) {
  //JS
  const {driver} = props
  const navigate = useNavigate()
  const hdlEdit = ()=>{
    navigate('/driver/edit')
  }

  const address =  driver.DriverAddress ? driver.DriverAddress[0] : {}
  return (
    <div className='border-2'>
      
        <div> < DriverAvatar className='w-24 h-24 rounded-full ' 
                                    menu = {false}
                                    imgSrc = {driver?.profileImageUrl}/>
        </div>
        <button onClick={() => hdlEdit()}
                type="button" 
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">edit </button>
      <p> name:  {driver?.firstName} {driver?.lastName} </p> 
      <p> phone: {driver?.phoneNumber} </p> 
      <p> Age: {driver?.age}</p> 
      <p> Gender: {driver?.gender}</p> 
     
      <div className='flex'>            
          <div> 
            <p>  Address:    {address?.id}  </p>            
          </div>
          <div>  {address?.address} 
          </div> 
      </div>  
    </div>
  )
}

export default DriverDashboard