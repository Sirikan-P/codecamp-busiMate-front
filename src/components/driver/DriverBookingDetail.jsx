
import React from 'react'
import { MapContainer, TileLayer, useMap ,Marker , Popup } from 'react-leaflet'
import { Link } from 'react-router'


function DriverBookingDetail(props) {
  const {booking } = props 
  console.log(booking)

  const userAddress = booking?.UserAddress
  const hospital = booking?.hospital

  const bookingLatLng = { lat: 13.750,lng: 100.499}
  return (
    <div> 
        <div 
            className='m-2 text-pink-800 underline hover:text-xl' > 
            <Link to={`https://www.google.com/maps/dir/${Number(userAddress.lat)},${Number(userAddress.long)}/${ Number(hospital.lat)}, ${Number(hospital.long)}`} >   Get Direction  </Link> 
            {/* <Link to={`https://www.google.com/maps/dir/${13,100}/${13.1,100.1}`} >   Get Direction  </Link>  */}
            
        </div>
      {/* แผนที่ ต้องวางไว้ layer ด้านหลัง*/}
      <MapContainer className='h-[40vh] w-full'
                    center={bookingLatLng} 
                    zoom={10} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={bookingLatLng}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      {/* จบ แผนที่ */}

    </div>
  )
}

export default DriverBookingDetail