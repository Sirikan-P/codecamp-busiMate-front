import React from 'react'

function DriverAddressCards(props) {
  const {address ,hdlDelete , hdlSetUse} = props

  // return (
  //   <div className='flex'  > DriverAddressCards  :
  //     <div> Address ID :{address.id} </div>
  //     <div> STATUS :{address.status} </div>
  //     <div> Address : {address.address} </div>
      
  //     {address.status === "NOTUSE" && (
  //     <button onClick={()=>hdlSetUse(address.id)}
  //             className='btn hover:text-blue-600'> 
  //        SETUSE 
  //     </button>
  //   )}
  //     <button  onClick={()=>hdlDelete(address.id)}
  //           className='btn hover:text-blue-600'> DELETE </button>
  //   </div>
  // )
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <table className="w-full border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="bg-gray-100 text-gray-700 uppercase text-sm text-left">
            <th className="py-3 px-4 text-left border-b w-12">ID</th>
            <th className="py-3 px-4 text-left border-b w-24">Status</th>
            <th className="py-3 px-4 text-left border-b w-40">Address</th>
            <th className="py-3 px-4 text-left border-b w-50">Action</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          <tr className="hover:bg-gray-50 transition-colors text-left">
            <td className="py-4 px-4 border-b">{address.id}</td>
            <td className="py-4 px-4 border-b">
              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                  address.status === "NOTUSE"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {address.status}
              </span>
            </td>
            <td className="py-4 px-4 border-b">{address.address}</td>
            <td className="py-4 px-4 border-b space-x-2">
              {address.status === "NOTUSE" && (
                <button
                  onClick={() => hdlSetUse(address.id)}
                  className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
                >
                  Set Use
                </button>
              )}
              <button
                onClick={() => hdlDelete(address.id)}
                className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DriverAddressCards