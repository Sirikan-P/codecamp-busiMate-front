import React, { useEffect } from 'react'
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useUserBookingStore from '../../store/booking-store';

export default function MapUserFindDriver() {
  const bookingData = useUserBookingStore((state) => state.bookingwithId);
console.log(bookingData);

  // Hospital Lat and Long
  const hospitalLat = bookingData?.hospital?.lat;
   const hospitalLong = bookingData?.hospital?.long;
   const hospitalPosition = [hospitalLat, hospitalLong];

  //  User Lat and Long
  const userLat = bookingData?.UserAddress?.lat;
  const userLong = bookingData?.UserAddress?.long;
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
      <div className="w-100 h-[400px]">
        <MapContainer
          center={midpoint}
          zoom={11}
          scrollWheelZoom={true}
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
