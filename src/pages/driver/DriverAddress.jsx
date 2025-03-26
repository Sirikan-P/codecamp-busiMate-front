import React, { useEffect } from 'react'
import { MapContainer, TileLayer, useMap ,Marker , Popup } from 'react-leaflet'

import "leaflet/dist/leaflet.css"
import DriverLocationMarker from '../../components/driver/DriverLocationMarker'
import useDriverStored from '../../store/driver-store'
import DriverAddressCards from '../../components/driver/DriverAddressCards'
import { useNavigate } from 'react-router'
import DriverHeader from '../../components/driver/DriverHeader'
import { createAlert } from '../../utils/createAlert'

//----เปลี่ยนตำแหน่งของแผนที่เมื่อเปลี่ยน driverCurrentLatLng
function ChangeCenter({ center }) {
  const map = useMap(); // ดึง object ของแผนที่
  useEffect(() => {
    map.setView(center); // เปลี่ยนตำแหน่งของแผนที่
  }, [center]); // รอค่า center เปลี่ยน
  return null;
}

function DriverAddress() {
  const token = localStorage.getItem("driverToken")
  
  //zustand : global state  
  const driver = useDriverStored(state => state.driver)
  const driverAddress = useDriverStored(state => state.driverAddress)
  const actionGetDriverWithZustand = useDriverStored( state=> state.actionGetDriverWithZustand)
  const driverCurrentLatLng = useDriverStored(state => state.driverCurrentLatLng)

  const actionDeleteDriverAddressWithZustand = useDriverStored( state=> state.actionDeleteDriverAddressWithZustand)
  const actionUpdateDriverAddressWithZustand = useDriverStored( state=> state.actionUpdateDriverAddressWithZustand)


  const navigate = useNavigate()
  const hdlAddAddress = ()=>{
    navigate('/driver/address/add')
  }

 useEffect( ()=>{ actionGetDriverWithZustand(token) } ,[])

  const hdlSetUse = async (addressId)=>{
    try {     
      const value = {
        "id": addressId,
        "status" : "USE"
    }
      const res = await actionUpdateDriverAddressWithZustand(token,value)

      return { success: true ,res }
   } catch (error) {
       return ("fail")
   }
  }

  const hdlDelete = async (addressId)=>{
    try {   
      const res = await actionDeleteDriverAddressWithZustand(token,addressId)
      if (res) {
        createAlert("info","Delete complete")
      }
      return { success: true , res }
   } catch (error) {
       return ("fail")
   }
  }
  return (
    <div className="bg-cyan-600 min-h-screen p-4" > 
    <div className=" bg-white p-4 rounded-lg shadow-lg">
      <h1 className="text-center font-semibold text-xl text-rose-800  pb-4">
          Driver Current Address
      </h1>
      <div className=" bg-white px-4 py-2 gap-8 my-4 shadow-2xl rounded-md">  
          <DriverHeader driver={driver} />
      </div>  

      {/* Add Button */} 
      <div className="flex justify-end mb-4">
        <button onClick={ ()=>hdlAddAddress() }
                className="btn bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition">
                  Add New Address
        </button>
      </div>
      <div>
          <h1 className="text-rose-700 font-semibold pb-2 text-xl">
            Current Location
          </h1>
          <div className="border-t-1 border-cyan-600"></div>
      </div>   

      {/* แผนที่ ต้องวางไว้ layer ด้านหลัง*/}
      <div className="h-[400px]">
        <MapContainer className='h-full w-full'
                    center={driverCurrentLatLng} 
                    zoom={10} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeCenter center={driverCurrentLatLng} className='h-[50vh] absolute -z-10 w-full'/>
        <Marker position={driverCurrentLatLng}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      </div>
      {/* จบ แผนที่ */}

      <div className='mt-6 space-y-4'>
      {driverAddress.map(el => (
          <DriverAddressCards key={el.id} address={el} hdlDelete={hdlDelete} hdlSetUse={hdlSetUse}/>
        ))
        }
      </div>
    </div>
  </div>
  )
}

export default DriverAddress