import React from 'react'

function DriverWalletCard(props) {
  const { wallet } = props  
  return (
    <div className='flex'>
      <div> ID : {wallet.id} ,</div>
      <div> TYPE : {wallet.type} ,</div>
      <div> AMOUNT : {wallet.amount} ,</div>
      <div> DATE : {wallet.createdAt} </div>
    </div>
  )
}

export default DriverWalletCard