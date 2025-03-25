import React, { useState } from 'react'
import { MapContainer, TileLayer, useMap ,Marker , Popup, useMapEvents } from 'react-leaflet'

import "leaflet/dist/leaflet.css"
import useUserStored from '../../store/user-store'

function UserLocationMarker() {

  const userSelectLatLng = useUserStored(state => state.userSelectLatLng)
  const actionSetCurrentLatLong = useUserStored(state => state.actionSetCurrentLatLong)
  const mapZoom = 13
  const map = useMapEvents({

    click(e) {
      console.log(e)
     // map.locate()
      actionSetCurrentLatLong(e.latlng)
      map.flyTo(e.latlng, mapZoom   ) 
    },
    // locationfound(e) {
    //   setPosition(e.latlng)
    //   map.flyTo(e.latlng, map.getZoom())
    // },
  })

  return userSelectLatLng === null ? null : (
    <Marker position={userSelectLatLng}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

export default UserLocationMarker