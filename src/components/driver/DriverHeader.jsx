import React from 'react'

function DriverHeader(props) {
  const {driver} = props
  return (
    <div> {driver?.firstName} {driver?.lastName} </div>
  )
}

export default DriverHeader