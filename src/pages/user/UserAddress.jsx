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
    <div> UserCurrentAddress :
      <UserHeader user={user} />
      <button onClick={ ()=>hdlAddAddress() }
              className="btn">Add New Address</button>

      <div> current location</div>    

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
  )
}

export default UserAddress