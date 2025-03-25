import React, { useEffect } from 'react'
import { MapContainer, TileLayer, useMap ,Marker , Popup } from 'react-leaflet'

import "leaflet/dist/leaflet.css"
import { useNavigate } from 'react-router'
import { createAlert } from '../../utils/createAlert'
import useUserStored from '../../store/user-store'
import UserAddressCards from '../../components/user/UserAddressCard'
import UserHeader from '../../components/user/UserHeader'

//----เปลี่ยนตำแหน่งของแผนที่เมื่อเปลี่ยน driverCurrentLatLng
function ChangeCenter({ center }) {
  const map = useMap(); // ดึง object ของแผนที่
  useEffect(() => {
    map.setView(center); // เปลี่ยนตำแหน่งของแผนที่
  }, [center]); // รอค่า center เปลี่ยน
  return null;
}

function UserAddress() {
  const token = localStorage.getItem("token")
  
  //zustand : global state  
  const user = useUserStored(state => state.user)
  const userAddress = useUserStored(state => state.userAddress)
  const actionGetUserWithZustand = useUserStored( state=> state.actionGetUserWithZustand)
  const userCurrentLatLng = useUserStored(state => state.userCurrentLatLng)

  const actionDeleteUserAddressWithZustand = useUserStored( state=> state.actionDeleteUserAddressWithZustand)
  const actionUpdateUserAddressWithZustand = useUserStored( state=> state.actionUpdateUserAddressWithZustand)


  const navigate = useNavigate()
  const hdlAddAddress = ()=>{
    navigate('/user/address/add')
  }

 useEffect( ()=>{ actionGetUserWithZustand(token) } ,[])

  const hdlSetUse = async (addressId)=>{
    try {     
      const value = {
        "id": addressId,
        "status" : "USE"
    }
      const res = await actionUpdateUserAddressWithZustand(token,value)

      return { success: true ,res }
   } catch (error) {
       return ("fail")
   }
  }

  const hdlDelete = async (addressId)=>{
    try {   
      const res = await actionDeleteUserAddressWithZustand(token,addressId)
      if (res) {
        createAlert("info","Delete complete")
      }
      return { success: true , res }
   } catch (error) {
       return ("fail")
   }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-600 p-5">
    <div className="bg-white w-full max-w-md p-6 m-5 pt-20 rounded-lg shadow-lg h-screen">
      <div className="font-semibold  text-cyan-700  text-4xl flex gap-5">
        User Address
      </div>
      <div className='text-xl text-cyan-600 flex flex-col gap-2'>
      <UserHeader user={user} />
        User Current Address :
      <UserHeader user={user} />
      </div>
      <button onClick={ ()=>hdlAddAddress() } className="bg-cyan-700 w-45 text-lg text-slate-300 p-2 rounded-md mt-5 shadow-2xl">Add New Address</button>
    <div> 
      <div  className='text-xl text-cyan-600 mt-5 flex flex-col gap-2'> current location</div>    

      {/* แผนที่ ต้องวางไว้ layer ด้านหลัง*/}
      <MapContainer className='h-[50vh] absolute -z-10 w-full'
                    center={userCurrentLatLng} 
                    zoom={10} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeCenter center={userCurrentLatLng} className='h-[50vh] absolute -z-10 w-full'/>
        <Marker position={userCurrentLatLng}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      {/* จบ แผนที่ */}

      <div className='mt-[50vh]'>
      {userAddress.map(el => (
          <UserAddressCards key={el.id} address={el} hdlDelete={hdlDelete} hdlSetUse={hdlSetUse}/>
        ))
        }
      </div>
    </div>
    </div>
    </div>
  )
}

export default UserAddress