import React from 'react'

function UserHeader(props) {
  const {user} = props
  return (
    <div> {user?.firstName} {user?.lastName} </div>
  )
}

export default UserHeader