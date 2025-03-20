import React, { useEffect } from 'react'
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useUserBookingStore from '../../store/booking-store';

export default function MapShowOneBooking() {
    const showOneBook = useUserBookingStore((state) => state.showOneBook);
console.log(showOneBook);
  // Hospital Lat and Long
  const hospitalLat = showOneBook?.hospital.lat;
   const hospitalLong = showOneBook?.hospital.long;
   const hospitalPosition = [hospitalLat, hospitalLong];

  //  User Lat and Long
  const userLat = showOneBook?.UserAddress?.lat;
  const userLong = showOneBook?.UserAddress?.long;
  const userPosition = [+userLat, +userLong];


  const calculateMidpoint = (pos1, pos2) => {
    if (!pos1 || !pos2) {
      return null;
    }
   const midLat =( pos1[0] + pos2[0] )/ 2
   const midLong = (pos1[1] + pos2[1]) /2

   return [midLat, midLong]
  }

  const midpoint = calculateMidpoint(userPosition, hospitalPosition)

  return (
    <div>
          {/* Map */}
      <div className="absolute z-10 w-80 h-[400px] justify-center">
        <MapContainer
          center={midpoint}
          zoom={11}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Hospital Marker */}
          <Marker position={hospitalPosition}>
            <Popup>
             Hospital 🏥
            </Popup>
          </Marker>
          {/* User Marker */}
          <Marker position={userPosition}>
            <Popup>🏠 Pick Up Patient</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}
