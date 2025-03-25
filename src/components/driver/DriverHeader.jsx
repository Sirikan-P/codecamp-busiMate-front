import React from 'react'

function DriverHeader(props) {
  const {driver} = props
  return (
    <div className="flex flex-col">
       <h1 className="text-xl font-bold text-center pt-10 text-slate-200 ">
      {driver?.firstName} {driver?.lastName} 
        </h1>
    </div>
  )
}

export default DriverHeader