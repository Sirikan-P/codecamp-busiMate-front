import React from 'react'

function DriverWalletCard(props) {
  const { wallet } = props  
  return (
    // <div className='flex'>
    //   <div> ID : {wallet.id} ,</div>
    //   <div> TYPE : {wallet.type} ,</div>
    //   <div> AMOUNT : {wallet.amount} ,</div>
    //   <div> DATE : {wallet.createdAt} </div>
    // </div>
    <div className="bg-base-200 p-4 rounded-lg shadow-md hover:scale-105 transition-transform">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div>
          <span className="font-medium text-rose-800">
            ID: {wallet.id}{" "}
          </span>
          <span className="font-medium text-cyan-700">
            - {wallet.description}
          </span>
          <p className="text-sm opacity-70">
            {new Date(wallet.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div
        className={`text-xl font-bold ${
          wallet.type === "INCOME" ? "text-success" : "text-error"
        }`}
      >
        {wallet.type === "INCOME" ? "+" : "-"}฿{wallet.amount}
      </div>
    </div>
  </div>
  )
}

export default DriverWalletCard