import React, { useEffect } from 'react'
import { MapContainer, TileLayer, useMap ,Marker , Popup } from 'react-leaflet'

import "leaflet/dist/leaflet.css"
import DriverLocationMarker from '../../components/driver/DriverLocationMarker'
import useDriverStored from '../../store/driver-store'
import DriverAddressCards from '../../components/driver/DriverAddressCards'
import { useNavigate } from 'react-router'


function DriverAddress() {

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQyMDUwNDQ0LCJleHAiOjE3NDMzNDY0NDR9.LlBUSVelok5Pk8ecWjdhk0fGvovX-uyVvuKUIb3I6Ks"
  const driver = useDriverStored(state => state.driver)
  const driverAddress = useDriverStored(state => state.driverAddress)
  const actionGetDriverWithZustand = useDriverStored( state=> state.actionGetDriverWithZustand)
  const driverCurrentLatLng = useDriverStored(state => state.driverCurrentLatLng)

  const navigate = useNavigate()
  const hdlAddAddress = ()=>{
    navigate('/driver/address/add')
  }

  //console.log(driver)
  //console.log(driverAddress)

  useEffect( ()=>{ actionGetDriverWithZustand(token) } ,[])

  //const driverAddress = driver?.DriverAddress ? driver?.DriverAddress: []

  return (
    <div>DriverCurrentAddress

      <button onClick={ ()=>hdlAddAddress() }
              className="btn">Add New Address</button>
      <div> current location</div>
      {/* แผนที่ */}
      <MapContainer className='h-[50vh]'
                    center={[Number( driverCurrentLatLng.lat),Number(driverCurrentLatLng.lng)]} 
                    zoom={10} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[Number(driverCurrentLatLng.lat),Number(driverCurrentLatLng.lng)]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      {/* จบ แผนที่ */}

      {driverAddress.map(el => (
          <DriverAddressCards key={el.id} address={el} />
        ))
        }

    </div>
  )
}

export default DriverAddress